import 'reflect-metadata';
import {
  IsBoolean,
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
import { UserCollection } from '../../models/user.model';
import { DocumentType } from '@typegoose/typegoose';
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
  scope!: string; //  Add to Request Headers [x-titan-scope] - customer | business

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

export class BusinessAccountObject extends CustomerAccountObject {
  @IsNotEmpty()
  @IsString()
  rootEmail!: string;

  @IsNotEmpty()
  @IsString()
  businessName!: string;
}

export class EmployeeAccountObject {
  @IsBoolean()
  inviteStatus!: boolean;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  subscriberId!: string;
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

  @ValidateNested()
  @Type(() => BusinessAccountObject)
  business?: BusinessAccountObject;

  @ValidateNested()
  @Type(() => CustomerAccountObject)
  customer?: CustomerAccountObject;
}

/*------------------------------------------------------------- 
  [Signup]: Types used for Event Publisher and Subscribers
-------------------------------------------------------------*/

export interface IVerifyEmailNotification {
  username: string;
  handler: string;
  verificationLink: string;
}

export interface IForgotPasswordNotification {
  username: string;
  handler: string;
  token: string;
  resetPasswordLink: string;
}

type UserMgtAccountInfo = BusinessAccountObject & CustomerAccountObject & EmployeeAccountObject;

export interface IAccountSetupObject extends Partial<UserMgtAccountInfo> {
  scope: UserType;
  ownerId: keyof DocumentType<UserCollection>;
  customerId?: string;
  subscriberId?: string;
}

/*---------------------------------------------------------------------------- 
  User Validation and Types for Activate Employee Workflow (used by openapi)
----------------------------------------------------------------------------*/

export class AuthOnboardEmployeeRequest {
  @IsString()
  @IsNotEmpty()
  activationToken!: string;

  @MinLength(8)
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class AuthOnboardEmployeeResponse {
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
