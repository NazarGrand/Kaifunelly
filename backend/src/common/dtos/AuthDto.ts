import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { UserRoles } from "../enums/UserRoles";
import { Expose, Transform } from "class-transformer";

export class RegisterUserDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  first_name!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  last_name!: string;

  @Expose()
  @IsEmail()
  @IsString()
  email!: string;

  @Expose()
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  phone_number!: string;

  @Expose()
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;
}

export class LoginUserDto {
  @Expose()
  @IsEmail()
  @IsString()
  email!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class RefreshTokenDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  refresh_token!: string;
}

export class VerifyUserDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  userId!: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  verificationCode!: string;
}
