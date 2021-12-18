import 'reflect-metadata';
import { DocumentType } from '@typegoose/typegoose';
import { IsEmail, IsNotEmpty, IsString, IsOptional, ValidateNested } from 'class-validator';
import { BaseResponseDTO } from './base.contracts';
import { Type } from 'class-transformer';
import { UserCollection } from '../../models/user.model';

export class SubscriberProfileDTO {
  @IsString()
  @IsNotEmpty()
  subscriberId!: string;

  @IsString()
  @IsNotEmpty()
  ownerId!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsNotEmpty()
  businessName!: string;

  @IsString()
  @IsNotEmpty()
  zip!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  rootEmail!: string;

  @IsString()
  @IsOptional()
  subscriptionId!: string;
}

/* Directly extend the Create DTO from Subscriber Profile */
export class CreateSubscriberRequest {
  @IsString()
  @IsNotEmpty()
  subscriberId!: string;

  @IsString()
  @IsNotEmpty()
  ownerId!: DocumentType<UserCollection>['_id'];

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

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  rootEmail!: string;

  @IsString()
  @IsNotEmpty()
  businessName!: string;

  @IsString()
  @IsOptional()
  subscriptionId!: string;
}

export class UpdateSubscriberRequest {
  @IsOptional()
  @IsString()
  address?: string;

  @IsString()
  @IsOptional()
  ownerId?: string;

  @IsString()
  @IsOptional()
  businessName?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsEmail()
  rootEmail?: string;
}

export class SubscriberCreateDTO {
  @IsString()
  @IsNotEmpty()
  ownerId!: string;
}

export class SubscriberResponse {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsNotEmpty()
  result!: string;
}

export class SubscriberCreateResponse extends BaseResponseDTO {
  @IsString()
  @IsNotEmpty()
  result!: string;
}

export class SubscriberProfileResponse extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => SubscriberProfileDTO)
  result!: SubscriberProfileDTO;
}
