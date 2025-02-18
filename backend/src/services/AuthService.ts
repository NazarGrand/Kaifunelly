import { Repository } from "typeorm";
import { User } from "../entities/User.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../db/data-source";
import { Verification } from "../entities/Verification.entity";
import { sgMail } from "../config/SendGrid";
import {
  CLIENT_URL,
  EMAIL_PHOTO,
  LOGO_URL,
  SENDGRID_EMAIL,
  SENDGRID_TEMPLATE_ID,
} from "../env-constants";
import { UserRoles } from "../common/enums/UserRoles";
import fs from "fs";
import { LoginUserDto, RegisterUserDto } from "../common/dtos/AuthDto";

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

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role: UserRoles.USER,
    });

    await this.userRepository.save(user);

    const verificationCode = uuidv4();
    const expireAt = new Date();
    expireAt.setHours(expireAt.getHours() + 1);

    const verification = this.verificationRepository.create({
      verificationCode,
      user: { id: user.id },
      expireAt,
      isUsed: false,
    });

    await this.verificationRepository.save(verification);

    const msg = {
      to: user.email,
      from: SENDGRID_EMAIL!,
      templateId: SENDGRID_TEMPLATE_ID!,
      dynamic_template_data: {
        name: user.first_name,
        verificationLink: `${CLIENT_URL}/account-activated?code=${verificationCode}`,
        logo: LOGO_URL,
        emailPhoto: EMAIL_PHOTO,
      },
    };

    await sgMail.send(msg);

    return { message: "User registered successfully" };
  }

  async login(userLogin: LoginUserDto) {
    const { email, password } = userLogin;
    const user = await this.userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const verification = await this.verificationRepository.findOne({
      where: { user: { id: user.id } },
      order: { createdAt: "DESC" },
    });

    if (!verification || !verification.isUsed) {
      throw new Error("Account is not verified");
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = uuidv4();

    user.refresh_token = refreshToken;
    user.refresh_token_exp_date = new Date(Date.now() + 14 * 86_400_000);

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
      user.refresh_token_exp_date < new Date()
    ) {
      throw new Error("Invalid or expired refresh token");
    }

    const accessToken = this.generateAccessToken(user);
    return { accessToken, user };
  }

  async verifyUser(verificationCode: string) {
    const verification = await this.verificationRepository.findOne({
      where: { verificationCode },
      relations: ["user"],
    });

    if (!verification) {
      throw new Error("Invalid verification code");
    }

    if (verification.isUsed) {
      throw new Error("The user is already verified");
    }

    if (verification.expireAt < new Date()) {
      throw new Error("Verification code expired");
    }

    verification.isUsed = true;
    await this.verificationRepository.save(verification);

    return { message: "User successfully verified" };
  }

  private generateAccessToken(user: User) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "30m" },
    );
  }
}

export default new AuthService();
