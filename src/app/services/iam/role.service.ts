// TODO: create class methods (createUserRole) for roles service
// To be used by signup service to create user roles
// can be used from pub/sub for employee or consumed from an API endpoint
import { DocumentType } from '@typegoose/typegoose';
import { UserCollection, UserModel } from '../../models/user.model';

import { CreateUserRoleObj } from '../../shared/contracts';
import logger from '../../../infra/logger';
import { UnprocessableEntityError } from '../../../infra/errors';
import { RoleCollection, RoleModel } from '../../models/role.model';
import policies, { interpolateRulesFor } from '../../shared/iam';
import { BadRequestError } from 'routing-controllers';
import { UserRoleEnum, IAMPolicyRuleDefinition } from '../../shared/definitions';

export default class UserRoleService {
  public async createUserRole(createRoleData: CreateUserRoleObj) {
    try {
      /* Create a User Role */
      return await RoleModel.create(createRoleData);
    } catch (error) {
      logger.error(`[UserRoleService:createUserRole]: ${error}`);
      throw new UnprocessableEntityError(error);
    }
  }

  public async createUserRoleOnSignup(user: DocumentType<UserCollection>) {
    try {
      /* Create User roles for account after user account creation */
      const userTypeToRoleHeader = UserRoleEnum[user.type.toUpperCase() as 'CUSTOMER' | 'BUSINESS' | 'EMPLOYEE'];
      const userDefaultPolicy = policies.get(userTypeToRoleHeader);
      const userRulesDef = (userDefaultPolicy?.rules as unknown) as IAMPolicyRuleDefinition<unknown>[];
      const userDefaultRoles = interpolateRulesFor(userRulesDef, {
        user_id: user._id,
        subscriber_id: user.subscriberId,
        role: userTypeToRoleHeader,
      });

      /* Create new user role data */
      const createRoleData: RoleCollection = {
        subscriberId: user.subscriberId,
        role: userTypeToRoleHeader,
        username: user.name,
        userId: user.id,
        policyId: userDefaultPolicy?.id || 'no-policy',
        permissions: userDefaultRoles,
      };

      /* Generate and Create User Role on New Signup */
      return await RoleModel.create(createRoleData).then((doc) => {
        logger.info(`Creating new user account roles ${doc}`);
      });
    } catch (error) {
      logger.error(`[UserRoleService:createUserRoleOnSignup]: ${error}`);
      UserModel.findOneAndDelete(user._id);

      /* Add error to logs and pipe */
      logger.debug(`Failed: Reverting Account creation because ${error}`);
      throw new BadRequestError(error);
    }
  }

  public async createUserRoleOnActivate(user: DocumentType<UserCollection>) {
    try {
      /* Create User roles for account after user account creation */
      const userTypeToRoleHeader = UserRoleEnum[user.type.toUpperCase() as 'CUSTOMER' | 'BUSINESS' | 'EMPLOYEE'];
      const userDefaultPolicy = policies.get(userTypeToRoleHeader);
      const userRulesDef = (userDefaultPolicy?.rules as unknown) as IAMPolicyRuleDefinition<unknown>[];
      const userDefaultRoles = interpolateRulesFor(userRulesDef, {
        user_id: user._id,
        subscriber_id: user.subscriberId,
        role: userTypeToRoleHeader,
      });

      /* Create new user role data */
      const createRoleData: RoleCollection = {
        subscriberId: user.subscriberId,
        role: userTypeToRoleHeader,
        username: user.name,
        userId: user.id,
        policyId: userDefaultPolicy?.id || 'no-policy',
        permissions: userDefaultRoles,
      };

      /* Generate and Create User Role on New Signup */
      return await RoleModel.create(createRoleData).then((doc) => {
        logger.info(`Creating new user account role during onboarding ${doc}`);
        return doc;
      });
    } catch (error) {
      logger.error(`[UserRoleService:createUserRoleOnActivate]: ${error}`);
      UserModel.findOneAndDelete(user._id);

      /* Add error to logs and pipe */
      logger.debug(`Failed: Reverting role creation on onboarding because ${error}`);
      throw new BadRequestError(error);
    }
  }
}
