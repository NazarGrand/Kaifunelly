import { Request, Response } from "express";
import { validate } from "class-validator";
import AuthService from "../services/AuthService";
import {
  RegisterUserDto,
  LoginUserDto,
  RefreshTokenDto,
  VerifyUserDto,
} from "../common/dtos/AuthDto";
import ms from "ms";
import { plainToClass } from "class-transformer";
import { User } from "../entities/User.entity";
import jwt from "jsonwebtoken";
import { constants } from "../env-constants";

class AuthController {
  async registration(req: Request, res: Response) {
    const dto = plainToClass(RegisterUserDto, req.body, {
      excludeExtraneousValues: true,
    });

    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(401).json(errors);
      return;
    }

    try {
      const userData = await AuthService.registration(dto);
      res.json(userData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).json({ message: e.message });
      }
    }
  }

  async login(req: Request, res: Response) {
    const dto = plainToClass(LoginUserDto, req.body, {
      excludeExtraneousValues: true,
    });

    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json(errors);
    }

    try {
      const userData = await AuthService.login(dto);
      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: ms("14d"),
      });

      const { password, refresh_token, refresh_token_exp_date, ...user }: User =
        userData.user;

      res.json({
        accessToken: userData.accessToken,
        user: user,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(401).json({ message: e.message });
      }
    }
  }

  async refresh(req: Request, res: Response) {
    const dto = plainToClass(RefreshTokenDto, req.body, {
      excludeExtraneousValues: true,
    });
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json(errors);
    }

    try {
      const userData = await AuthService.refreshToken(dto.refresh_token);

      const { password, refresh_token, refresh_token_exp_date, ...user }: User =
        userData.user;

      res.json({
        accessToken: userData.accessToken,
        user: user,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(401).json({ message: e.message });
      }
    }
  }

  async verifyUser(req: Request, res: Response) {
    const decoded = jwt.verify(req.body, constants.JWT_ACCESS_SECRET!);

    if (!decoded) {
      res.status(401).json({ message: "Invalid token" });
    }

    const dto = plainToClass(VerifyUserDto, decoded, {
      excludeExtraneousValues: true,
    });

    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json(errors);
    }

    try {
      const userData = await AuthService.verifyUser(
        dto.verificationCode,
        dto.userId,
      );
      res.json(userData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(401).json({ message: e.message });
      }
    }
  }

  async me(req: Request, res: Response) {
    try {
      const { _id } = req.body.user;
      const userData = await AuthService.me(_id);

      const {
        password,
        refresh_token,
        refresh_token_exp_date,
        createdAt,
        ...user
      }: User = userData;

      res.json(user);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(401).json({ message: e.message });
      }
    }
  }
}

export default new AuthController();
