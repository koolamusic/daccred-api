import 'reflect-metadata';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserProfileQueryResult } from './user.query';

export enum UserType {
  CUSTOMER = 'customer',
  BUSINESS = 'business',
  EMPLOYEE = 'employee',
}

/*---------------------------------------------------------------------------- 
  User Validation and Types for Forgot Password Workflow (used by openapi)
----------------------------------------------------------------------------*/

export class AuthResetPasswordQueryResult {
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

export class AuthLoginQueryResult {
  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @IsNotEmpty()
  @IsString()
  access_token!: string;

  @ValidateNested()
  @Type(() => UserProfileQueryResult)
  profile!: UserProfileQueryResult;
}

/*------------------------------------------------------------- 
  Validation and Contract for Signup Workflow (used by openapi)
-------------------------------------------------------------*/

export class AuthSignupQueryResult {
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

export class WalletAuthMessageQueryResult {
  @IsString()
  message!: string;
}

export class WalletAuthorizationQueryResult {
  @IsNotEmpty()
  @IsString()
  access_token!: string;
}
