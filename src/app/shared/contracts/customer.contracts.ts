import 'reflect-metadata';
import { IsNotEmpty, IsString, IsOptional, ValidateNested, IsDefined } from 'class-validator';
import { BaseResponseDTO } from './base.contracts';
import { DocumentType } from '@typegoose/typegoose';
import { UserCollection } from '../../models/user.model';
import { Type } from 'class-transformer';

export class CreateCustomerRequest {
  @IsString()
  @IsNotEmpty()
  userId!: DocumentType<UserCollection>['_id'];

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsNotEmpty()
  @IsString()
  zip!: string;

  @IsDefined()
  @IsNotEmpty()
  phone?: string;
}

export class UpdateCustomerRequest {
  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class CustomerCreateDTO {
  @IsString()
  @IsNotEmpty()
  _id!: string;
}

export class CustomerProfileDTO {
  @IsString()
  // @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsNotEmpty()
  @IsString()
  zip!: string;

  @IsDefined()
  @IsNotEmpty()
  phone?: string;
}

/*----------------------------------------------------------------------*
 * Controller Response DTO used in controllers and Response Schema
 *----------------------------------------------------------------------*/

export class CustomerCreateResponse extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => CustomerCreateDTO)
  result!: CustomerCreateDTO;
}

export class CustomerProfileResponse extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => CustomerProfileDTO)
  result!: CustomerProfileDTO;
}
