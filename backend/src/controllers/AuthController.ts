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
import ValidationError from "../common/validators/ValidationError";

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
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json({ message: error.message });
      }

      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error" });
      }

      res.status(500).json({ message: "Internal Server Error" });
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

      res.json({
        accessToken: userData.accessToken,
        user: userData.user,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json({ message: error.message });
      }

      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error" });
      }

      res.status(500).json({ message: "Internal Server Error" });
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

      res.json({
        accessToken: userData.accessToken,
        user: userData.user,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json({ message: error.message });
      }

      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error" });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async verifyUser(req: Request, res: Response) {
    const decoded = jwt.verify(
      req.body.verificationToken,
      constants.JWT_ACCESS_SECRET!,
    );

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
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json({ message: error.message });
      }

      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error" });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const { id } = req.body.user;
      const userData = await AuthService.me(id);

      res.json(userData);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json({ message: error.message });
      }

      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error" });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new AuthController();
