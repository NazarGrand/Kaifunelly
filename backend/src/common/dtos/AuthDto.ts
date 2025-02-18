import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from "class-validator";
import { UserRoles } from "../enums/UserRoles";
import { Expose } from "class-transformer";

export class RegisterUserDto {
  @Expose()
  @IsNotEmpty()
  first_name!: string;

  @Expose()
  @IsNotEmpty()
  last_name!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @Expose()
  @IsNotEmpty()
  phone_number!: string;

  @Expose()
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;
}

export class LoginUserDto {
  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsNotEmpty()
  password!: string;
}

export class RefreshTokenDto {
  @Expose()
  @IsNotEmpty()
  refresh_token!: string;
}

export class VerifyUserDto {
  @Expose()
  @IsNotEmpty()
  verificationCode!: string;
}
