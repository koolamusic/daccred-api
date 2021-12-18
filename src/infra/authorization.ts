/** __DO_NOT__MODIFY____
 * @name authorizer
 * @description Global Authorization Middleware inherited from authenticator microservice
 * This file is a shared modules and should only be modified within
 * the authenticator service, with test suites passing and shared to other services.
 */

import jwt from 'jsonwebtoken';
import _ from 'lodash';
import LRUCache from 'lru-cache';
import { Action, UnauthorizedError } from 'routing-controllers';
import { IJWTClaim, IJWTClaimConf, AuthDecoratorRule } from '../app/shared/definitions';
import { unpackPermissionRules } from '../app/shared/utils/crypto.utils';
import config from './config';
import ErrorHandler from './errors';
import logger from './logger';
import { generateGrantsFor } from '../app/shared/iam';

/* Module constants */
type TClaim = IJWTClaim & IJWTClaimConf;
type TFilterCallback = {
  (claim: TClaim): Omit<TClaim, keyof IJWTClaimConf>;
  (claim: TClaim): IJWTClaim;
  (claim: TClaim): unknown;
};
const JWT_CACHE = new LRUCache(1000);

const getClaimFromToken = (filterCallback: TFilterCallback) => async (req: Action['request']) => {
  try {
    // Get the User Token from Header
    let claim: TClaim;
    const token = req.headers['authorization'].split(' ')[1];

    /* Define if claim is cached else return result and cache token */
    if (JWT_CACHE.has(token)) {
      claim = JWT_CACHE.get(token) as TClaim;
    } else {
      claim = (await jwt.verify(token, config.SECRET_KEY, {
        issuer: config.JWT_ISSUER,
        audience: config.JWT_AUD,
        algorithms: ['HS256'],
      })) as TClaim;
      JWT_CACHE.set(token, claim);
    }
    return filterCallback(claim);
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
    /* Curry a lodash omit method to return particular keys in from claim object */
    const user = await getClaimFromToken((claim: TClaim) => {
      return _.omit(claim, ['iat', 'exp', 'aud', 'iss']);
    })(action.request);

    return user;
  } catch (error) {
    logger.error(`Current User Checker: ${error}`);
    throw new ErrorHandler(error);
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
    const user = await getClaimFromToken(
      (claim: TClaim): IJWTClaim => {
        return _.omit(claim, ['iat', 'exp', 'aud', 'iss']);
      }
    )(action.request);

    // console.log('the claims I received in Auth', user.profile, rules);

    /* Throw an error if for some reason we're not able to verify JWT token */
    if (!user) throw new UnauthorizedError('You are not authorized. check that JWT token is valid');

    /* Use state switches to manage authorization logic based on entities */
    switch (user.profile.role) {
      case 'superadmin':
        /* Here we check for the superadmin token on request headers and assign the result to a variable */
        // const superadminToken = action.request.headers['x-titan-admin'];
        /* We can then return a response based on whether this is a valid superadmin token */
        return action.request.headers['x-titan-admin'] === config.SUPERADMIN_TOKEN;

      default: {
        /* Handle Roles and permissions params for other users */
        const permissions = unpackPermissionRules(user.permissions);
        const ability = generateGrantsFor(permissions);

        // check if all of the required rules in the decorator evaluates to true and allow access
        const isAuthorized = await rules.every((rule) => ability.can(rule.action, rule.subject, rule.field));
        return isAuthorized;
      }
    }
  } catch (error) {
    logger.error(`Authorization Guard: ${error}`);
    throw new ErrorHandler(error);
  }
};
