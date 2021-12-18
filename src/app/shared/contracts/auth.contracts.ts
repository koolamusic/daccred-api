import 'reflect-metadata';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserProfileDTO } from './user.contracts';

export enum UserType {
  CUSTOMER = 'customer',
  BUSINESS = 'business',
  EMPLOYEE = 'employee',
}

/*---------------------------------------------------------------------------- 
  User Validation and Types for Forgot Password Workflow (used by openapi)
----------------------------------------------------------------------------*/

export class AuthForgotPasswordResponse {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class AuthResetPasswordRequest {
  @IsNotEmpty()
  @IsEmail()
  token!: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password!: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  confirmPassword!: string;
}

/*------------------------------------------------------------- 
  User Validation and Types for Login Workflow (used by openapi)
-------------------------------------------------------------*/

export class AuthLoginRequest {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class AuthLoginResponse {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  scope!: string;

  @IsNotEmpty()
  @IsString()
  role!: string;

  @IsNotEmpty()
  @IsString()
  accessToken!: string;

  @ValidateNested()
  @Type(() => UserProfileDTO)
  profile!: UserProfileDTO;
}

/*------------------------------------------------------------- 
  Validation and Contract for Signup Workflow (used by openapi)
-------------------------------------------------------------*/

export class CustomerAccountObject {
  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsString()
  state!: string;

  @IsNotEmpty()
  @IsString()
  zip!: string;

  @IsDefined()
  @IsNotEmpty()
  phone?: string;
}

export class AuthSignupResponse {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  scope!: UserType;

  @IsUrl()
  nextRoute!: string;
}

export class AuthSignupRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password!: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  type!: UserType;
}
