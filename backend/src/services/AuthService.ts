import { Repository } from "typeorm";
import { User } from "../entities/User.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../db/data-source";
import { Verification } from "../entities/Verification.entity";
import { constants } from "../env-constants";
import { UserRoles } from "../common/enums/UserRoles";
import { LoginUserDto, RegisterUserDto } from "../common/dtos/AuthDto";
import dayjs from "dayjs";
import { sendVerificationEmail } from "./MailService";
import ValidationError from "../common/validators/ValidationError";

class AuthService {
  private userRepository: Repository<User>;
  private verificationRepository: Repository<Verification>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.verificationRepository = AppDataSource.getRepository(Verification);
  }

  async registration(userData: RegisterUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: userData.email,
    });

    if (existingUser) {
      throw new ValidationError(
        `User with email ${userData.email} already exists`,
        400,
      );
    }

    const hashedPassword = await bcrypt.hash(
      userData.password,
      parseInt(constants.bcryptSalt!),
    );
    const user = await this.userRepository.save({
      ...userData,
      password: hashedPassword,
      role: UserRoles.USER,
    });

    const verificationCode = uuidv4();
    const expireAt = dayjs().add(1, "hour").toDate();

    await this.verificationRepository.save({
      verificationCode,
      user: { id: user.id },
      expireAt,
      isUsed: false,
    });

    const verificationToken = jwt.sign(
      { verificationCode, userId: user.id },
      constants.JWT_ACCESS_SECRET!,
      { expiresIn: "1h" },
    );

    await sendVerificationEmail(user.email, user.first_name, verificationToken);

    return { message: "User registered successfully" };
  }

  async login(userLogin: LoginUserDto) {
    const { email } = userLogin;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new ValidationError("No such user exists", 400);
    }

    const isPasswordValid = await bcrypt.compare(
      userLogin.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ValidationError("Invalid email or password", 400);
    }

    const verification = await this.verificationRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!verification || !verification.isUsed) {
      if (!verification || dayjs(verification.expireAt).isBefore(dayjs())) {
        const verificationCode = uuidv4();
        const expireAt = dayjs().add(1, "hour").toDate();

        if (verification) {
          await this.verificationRepository.remove(verification);
        }

        await this.verificationRepository.save({
          verificationCode,
          user,
          expireAt,
          isUsed: false,
        });

        const verificationToken = jwt.sign(
          { verificationCode, userId: user.id },
          constants.JWT_ACCESS_SECRET!,
          { expiresIn: "1h" },
        );

        await sendVerificationEmail(
          user.email,
          user.first_name,
          verificationToken,
        );

        throw new ValidationError(
          "Account not verified. Please check your email for the verification link.",
          400,
        );
      } else {
        throw new ValidationError(
          "Account is not verified. Please verify your account.",
          400,
        );
      }
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = uuidv4();

    user.refresh_token = refreshToken;
    user.refresh_token_exp_date = dayjs().add(14, "days").toDate();

    await this.userRepository.save(user);

    const {
      password,
      refresh_token,
      refresh_token_exp_date,
      ...userData
    }: User = user;

    return { accessToken, refreshToken, user: userData };
  }

  async refreshToken(refreshToken: string) {
    const user = await this.userRepository.findOneBy({
      refresh_token: refreshToken,
    });

    if (
      !user ||
      !user.refresh_token_exp_date ||
      dayjs(user.refresh_token_exp_date).isBefore(dayjs())
    ) {
      throw new ValidationError("Invalid or expired refresh token", 401);
    }

    const accessToken = this.generateAccessToken(user);

    const {
      password,
      refresh_token,
      refresh_token_exp_date,
      ...userData
    }: User = user;
    return { accessToken, user: userData };
  }

  async verifyUser(verificationCode: string, userId: number) {
    const verification = await this.verificationRepository.findOne({
      where: { verificationCode, user: { id: userId } },
      relations: ["user"],
    });

    if (!verification) {
      throw new ValidationError("Invalid verification code or user", 400);
    }

    if (verification.isUsed) {
      throw new ValidationError("The user is already verified", 400);
    }

    if (dayjs(verification.expireAt).isBefore(dayjs())) {
      throw new ValidationError("Verification code expired", 400);
    }

    verification.isUsed = true;
    await this.verificationRepository.save(verification);

    return { message: "User successfully verified" };
  }

  async me(idUser: number) {
    if (!idUser) {
      throw new ValidationError("User id not provided", 400);
    }

    const user = await this.userRepository.findOne({ where: { id: idUser } });

    if (!user) {
      throw new ValidationError("No such user exists", 400);
    }

    const {
      password,
      refresh_token,
      refresh_token_exp_date,
      createdAt,
      ...userData
    }: User = user;

    return userData;
  }

  private generateAccessToken(user: User) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      constants.JWT_ACCESS_SECRET!,
      { expiresIn: "30m" },
    );
  }
}

export default new AuthService();
