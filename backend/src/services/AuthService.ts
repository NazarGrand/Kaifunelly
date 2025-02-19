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
import { deliverMail } from "./MailService";

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
      throw new Error(`User with email ${userData.email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(
      userData.password,
      parseInt(constants.bcryptSalt!),
    );
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role: UserRoles.USER,
    });

    await this.userRepository.save(user);

    const verificationCode = uuidv4();
    const expireAt = dayjs().add(1, "hour");

    const verification = this.verificationRepository.create({
      verificationCode,
      user: { id: user.id },
      expireAt,
      isUsed: false,
    });

    await this.verificationRepository.save(verification);

    const verificationToken = jwt.sign(
      { verificationCode, userId: user.id },
      constants.JWT_ACCESS_SECRET!,
      { expiresIn: "1h" },
    );

    await deliverMail(user.email, user.first_name, verificationToken);

    return { message: "User registered successfully" };
  }

  async login(userLogin: LoginUserDto) {
    const { email, password } = userLogin;
    const user = await this.userRepository.findOneBy({ email });

    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));

    if (!user || !isPasswordValid) {
      throw new Error("Invalid email or password");
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

        const newVerification = this.verificationRepository.create({
          verificationCode,
          user,
          expireAt,
          isUsed: false,
        });

        await this.verificationRepository.save(newVerification);

        const verificationToken = jwt.sign(
          { verificationCode, userId: user.id },
          constants.JWT_ACCESS_SECRET!,
          { expiresIn: "1h" },
        );

        await deliverMail(user.email, user.first_name, verificationToken);

        throw new Error(
          "Account not verified. Please check your email for the verification link.",
        );
      } else {
        throw new Error("Account is not verified. Please verify your account.");
      }
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = uuidv4();

    user.refresh_token = refreshToken;
    user.refresh_token_exp_date = dayjs().add(14, "days").toDate();

    await this.userRepository.save(user);

    return { accessToken, refreshToken, user };
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
      throw new Error("Invalid or expired refresh token");
    }

    const accessToken = this.generateAccessToken(user);
    return { accessToken, user };
  }

  async verifyUser(verificationCode: string, userId: number) {
    const verification = await this.verificationRepository.findOne({
      where: { verificationCode, user: { id: userId } },
      relations: ["user"],
    });

    if (!verification) {
      throw new Error("Invalid verification code or user");
    }

    if (verification.isUsed) {
      throw new Error("The user is already verified");
    }

    if (dayjs(verification.expireAt).isBefore(dayjs())) {
      throw new Error("Verification code expired");
    }

    const duplicateVerifications = await this.verificationRepository.find({
      where: { verificationCode },
    });

    if (duplicateVerifications.length > 1) {
      const otherUserVerification = duplicateVerifications.find(
        (verification) => verification.user.id !== userId,
      );

      if (otherUserVerification) {
        throw new Error(
          "This verification code has already been used by another user",
        );
      }
    }

    verification.isUsed = true;
    await this.verificationRepository.save(verification);

    return { message: "User successfully verified" };
  }

  async me(idUser: number) {
    if (!idUser) {
      throw new Error("No such id user");
    }

    const user = await this.userRepository.findOne({ where: { id: idUser } });

    if (!user) {
      throw new Error("No such user exists");
    }

    return user;
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
