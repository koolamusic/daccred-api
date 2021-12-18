import { DocumentType } from '@typegoose/typegoose';
import { UserCollection } from '../../models/user.model';
import { UserRoleEnum } from '../definitions';

export interface CreateUserRoleObj {
  subscriberId: DocumentType<UserCollection>['subscriberId'];
  role: UserRoleEnum;
  username: string;
  userId: DocumentType<UserCollection>['_id'];
  policyId: string;
  permissions: string; // JSON.stringified permissions payload
}
