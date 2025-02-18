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

class AuthController {
  async registration(req: Request, res: Response) {
    const dto = plainToClass(RegisterUserDto, req.body, {
      excludeExtraneousValues: true,
    });

    console.log(dto);

    const errors = await validate(dto);

    console.log(errors);

    if (errors.length > 0) {
      res.status(401).json(errors);
      return;
    }

    try {
      const userData = await AuthService.registration(dto);
      res.json(userData);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  async login(req: Request, res: Response) {
    const dto = plainToClass(LoginUserDto, req.body, {
      excludeExtraneousValues: true,
    });

    console.log(dto);

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

      const { password, refresh_token, refresh_token_exp_date, ...user }: any =
        userData.user;

      res.json({
        accessToken: userData.accessToken,
        user: user,
      });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
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

      const { password, refresh_token, refresh_token_exp_date, ...user }: any =
        userData.user;

      res.json({
        accessToken: userData.accessToken,
        user: user,
      });
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }

  async verifyUser(req: Request, res: Response) {
    const dto = plainToClass(VerifyUserDto, req.body, {
      excludeExtraneousValues: true,
    });

    console.log(dto);
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json(errors);
    }

    try {
      const userData = await AuthService.verifyUser(dto.verificationCode);
      res.json(userData);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }
}

export default new AuthController();
