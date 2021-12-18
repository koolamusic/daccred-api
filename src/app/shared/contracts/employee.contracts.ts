import 'reflect-metadata';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseResponseDTO } from './base.contracts';
import { Type } from 'class-transformer';
import { EmployeeCollection } from '../../models/employee.model';
import { GetAllRequestWithParams } from '../definitions';
import { DocumentType } from '@typegoose/typegoose';

export enum EmployeeInviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export class EmployeeCreateResponse {
  @IsOptional()
  @IsNotEmpty()
  activationToken!: string | undefined;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class EmployeeCreateResponseDTO extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => EmployeeCreateResponse)
  result!: EmployeeCreateResponse;
}

export class CreateEmployeeRequest {
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
}

export class CreateEmployeeRequestExt {
  @IsString()
  @IsNotEmpty()
  subscriberId!: string;

  @IsEnum(EmployeeInviteStatus)
  @IsNotEmpty()
  inviteStatus!: EmployeeInviteStatus;

  @IsString()
  @IsNotEmpty()
  invitedBy!: string;
}

export class UpdateEmployeeRequest {
  @IsEnum(EmployeeInviteStatus)
  inviteStatus!: EmployeeInviteStatus;

  @IsOptional()
  @IsString()
  invitedBy!: string;
}

export class EmployeeResponse {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsNotEmpty()
  result!: string;
}

export class EmployeeProfileDTO {
  @IsString()
  @IsNotEmpty()
  id!: DocumentType<EmployeeCollection>['_id'];

  @IsString()
  activationToken!: string | undefined;

  @IsEnum(EmployeeInviteStatus)
  @IsNotEmpty()
  inviteStatus!: EmployeeInviteStatus;

  @IsString()
  @IsNotEmpty()
  invitedBy!: string;

  @ValidateNested()
  @Type(() => EmployeeUserObject)
  profile!: EmployeeUserObject;
}

export class EmployeeProfileResponse extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => EmployeeProfileDTO)
  result!: EmployeeProfileDTO;
}

export class FindEmployeeParamDTO {
  @IsString()
  @IsNotEmpty()
  subscriberId!: string;

  @IsString()
  @IsNotEmpty()
  id!: DocumentType<EmployeeCollection>['_id'];
}

export class GetAllEmployeesRequestDTO {
  @IsObject()
  @IsOptional()
  queryParams!: GetAllRequestWithParams;

  @IsString()
  @IsNotEmpty()
  subscriberId!: string;
}

export class EmployeeUserObject {
  @IsString()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsBoolean()
  isVerified!: boolean;
}

export class AllEmployeesResponse extends BaseResponseDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmployeeProfileDTO)
  result!: EmployeeProfileDTO[];

  @IsNumber()
  @IsNotEmpty()
  total!: number;

  @IsOptional()
  previous?: string;

  @IsOptional()
  next?: string;

  @IsBoolean()
  @IsOptional()
  hasNext?: boolean;

  @IsBoolean()
  @IsOptional()
  hasPrevious?: boolean;
}

export class EmployeeDeleteResponse extends BaseResponseDTO {
  @IsString()
  @IsNotEmpty()
  result!: DocumentType<EmployeeCollection>['id'];
}
