import { PackRule } from '@casl/ability/extra';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IAMPolicyRuleDefinition, IJWTClaim, UserRoleEnum } from '../definitions';

export class UserProfileDTO {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsEnum(UserRoleEnum)
  role!: UserRoleEnum;

  @IsBoolean()
  business!: boolean;

  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @IsOptional()
  subscriber_id?: string | null | undefined;
}

export class UserAccountResponseDTO implements IJWTClaim {
  @IsString()
  @IsNotEmpty()
  sub!: 'userId' | string;

  @ValidateNested()
  @Type(() => UserProfileDTO)
  profile!: UserProfileDTO;

  @IsString()
  scope!: 'customer' | 'business' | 'titan';

  @IsArray()
  permissions!: PackRule<IAMPolicyRuleDefinition<unknown>>[];
}
