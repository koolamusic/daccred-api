/** __DO_NOT__MODIFY____
 * @name authorizer
 * @description Global Authorization Middleware inherited from authenticator microservice
 * This file is a shared modules and should only be modified within
 * the authenticator service, with test suites passing and shared to other services.
 */

import _ from 'lodash';
import LRUCache from 'lru-cache';
import { Action, UnauthorizedError } from 'routing-controllers';
import { AuthDecoratorRule, TRoleMap, UserRoleEnum } from '../app/shared/definitions';
import config from './config';
import ServerError from './errors';
import logger from './logger';
import { generateGrantsFor } from '../app/shared/iam';
import { UserRepository } from '../app/shared/entities/user/user.repository';
import { User } from '../app/shared/entities/user/user.model';
import { defineRulesForOwner } from '../app/shared/iam/owner.iam';
import { JwtStrategy } from '../app/auth/strategies/jwt.strategy';

/* Module constants */
const jwtStrategy = new JwtStrategy();
const JWT_CACHE = new LRUCache(1000);

const validateUserByToken = async (req: Action['request']): Promise<User> => {
  try {
    // Get the User Token from Header
    const token = req.headers['authorization'].split(' ')[1];
    console.log(req.headers, "Cookie from Request")

    /* Define if claim is cached else return result and cache token */
    if (JWT_CACHE.has(token)) return JWT_CACHE.get(token) as User;

    /* Validate the user information based on signature and address */
    const claim = await jwtStrategy.verify(token);
    const user = await UserRepository.validateUserAccess({ public_address: claim.eth, signature: claim.signature });

    console.log(user, 'Our user before setting to cache >>>>>>>>>>>>>>>>>>');

    /* Set storage in cache */
    JWT_CACHE.set(token, user);
    return user;
  } catch (error) {
    const message = _.isEmpty(error) ? 'Bearer Token must be in authorization header' : (error as string);
    logger.error(`Get Token from Claim: ${error}`);
    throw new UnauthorizedError(message);
  }
};

/**
 * @name getCurrentUser
 * @example (@CurrentUser() user: UserType) passed as an arguement in route controllers
 */

export const getCurrentUser = async (action: Action) => {
  try {
    /* Get user from validation method */
    const user = await validateUserByToken(action.request);
    return user;
  } catch (error) {
    logger.error(`Current User Checker: ${error}`);
    throw new ServerError(error);
  }
};

/**
 * @name authGuard
 * @doc also if decorator defines rules it needs to access the action
 * @doc you can use them to provide granular access check
 * @doc authGuard must return either boolean (true or false) or a promise that resolves a boolean value
 */
export const authGuard = async (action: Action, rules: AuthDecoratorRule): Promise<boolean> => {
  try {
    const user = await validateUserByToken(action.request);
    const roleMap: TRoleMap = {
      personal: UserRoleEnum.OWNER,
      team: UserRoleEnum.OWNER,
      enterprise: UserRoleEnum.OWNER,
    };

    // console.log('the claims I received in Auth', user.profile, rules);

    /* Throw an error if for some reason we're not able to verify JWT token */
    if (!user) throw new UnauthorizedError('You are not authorized. check that JWT token is valid');

    /* Use state switches to manage authorization logic based on entities */
    switch (roleMap[user.scope]) {
      case UserRoleEnum.SUPERADMIN:
        /* Here we check for the superadmin token on request headers and assign the result to a variable */
        // const superadminToken = action.request.headers['x-daccred-admin'];
        /* We can then return a response based on whether this is a valid superadmin token */
        return action.request.headers['x-daccred-admin'] === config.SUPERADMIN_TOKEN;

      default: {
        /* Handle Roles and permissions params for other users */
        const permissions = defineRulesForOwner();
        const ability = generateGrantsFor(permissions);
        // console.log('<<<<<<<<<<<', ability, 'FROM AUTHORIZER >>>>>>>>>>>>>>>>>>>>>>>>>>>');

        // check if all of the required rules in the decorator evaluates to true and allow access
        const isAuthorized = await rules.every((rule) => ability.can(rule.action, rule.subject, rule.field));
        return isAuthorized;
      }
    }
  } catch (error) {
    logger.error(`Authorization Guard: ${error}`);
    throw new ServerError(error);
  }
};
