import 'reflect-metadata';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../../definitions';

/*---------------------------------------------------------------------------- 
  User Validation and Types for Forgot Password Workflow (used by openapi)
----------------------------------------------------------------------------*/

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

/*------------------------------------------------------------- 
  Validation and Contract for Signup Workflow (used by openapi)
-------------------------------------------------------------*/

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
