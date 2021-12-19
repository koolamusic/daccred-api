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
  confirm_password!: string;
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
  user_id!: string;

  @IsNotEmpty()
  @IsString()
  access_token!: string;

  @ValidateNested()
  @Type(() => UserProfileDTO)
  profile!: UserProfileDTO;
}

/*------------------------------------------------------------- 
  Validation and Contract for Signup Workflow (used by openapi)
-------------------------------------------------------------*/

export class AuthSignupResponse {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  scope!: UserType;

  @IsUrl()
  next_route!: string;
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

export class WalletAuthMessageResponse {
  @IsString()
  message!: string;
}

export class WalletAuthMessageRequest {
  @IsNotEmpty()
  @IsString()
  public_address!: string;
}

export class WalletAuthorizationRequest {
  @IsNotEmpty()
  @IsString()
  public_address!: string;

  @IsNotEmpty()
  @IsString()
  signature!: string;

  @IsNotEmpty()
  @IsString()
  session_token!: string;

  @IsString()
  object_id!: string;
}

export class WalletAuthorizationResponse {
  @IsNotEmpty()
  @IsString()
  access_token!: string;
}
