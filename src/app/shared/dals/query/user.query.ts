import { PackRule } from '@casl/ability/extra';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { IAMPolicyRuleDefinition } from '../../definitions';

export class UserProfileQueryResult {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @IsString()
  wsp_id!: string;
}

export class UserAccountQueryResult {
  @IsString()
  @IsNotEmpty()
  sub!: 'userId' | string;

  @ValidateNested()
  @Type(() => UserProfileQueryResult)
  profile!: UserProfileQueryResult;

  @IsString()
  scope!: 'customer' | 'business' | 'titan';

  @IsArray()
  permissions!: PackRule<IAMPolicyRuleDefinition<unknown>>[];
}
