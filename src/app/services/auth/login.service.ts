/** @TODO generateJWTToken should be another method abstracted to enable others use it like onboarding and activation*/
import jwt from 'jsonwebtoken';
import config from '../../../infra/config';
import logger from '../../../infra/logger';
import ErrorHandler, { ConflictError } from '../../../infra/errors';
import { UserModel } from '../../models/user.model';
import { AuthLoginRequest, AuthLoginResponse, UserType } from '../../shared/contracts/auth.contracts';
import { RoleModel } from '../../models/role.model';
import { NotFoundError } from 'routing-controllers';
import { IJWTClaim, UserRoleEnum } from '../../shared/definitions';
import { packPermissionRules } from '../../shared/utils';

export default class LoginUserService {
  public async loginUser(data: AuthLoginRequest): Promise<AuthLoginResponse> {
    try {
      const userDocument = await UserModel.findOne({ email: data.email });
      if (!userDocument) throw new ConflictError('Invalid email or password');

      /* Check that user password matches */
      const passwordMatches = await userDocument.validatePassword(data.password);
      if (!passwordMatches) throw new ConflictError('Login Credentials are incorrect');

      /* Retrieve roles for user */
      const roleDocument = await RoleModel.findOne({ userId: userDocument.id });
      if (!roleDocument) throw new NotFoundError('Cannot get user roles');

      /* Build user claims and roles and send ~TODO: retrieve claims dynamically from database */
      const identityScope = userDocument.type === 'customer' ? UserType.CUSTOMER : UserType.BUSINESS;
      const permissions = packPermissionRules(roleDocument.permissions);

      const userProfile: IJWTClaim['profile'] = {
        email: userDocument.email,
        name: userDocument.name,
        role: roleDocument.role,
        user_id: userDocument.id,
        business: !!userDocument.subscriberId,
        subscriber_id: userDocument.subscriberId,
      };

      const claim: IJWTClaim = {
        sub: userDocument.id,
        scope: identityScope,
        permissions: permissions,
        profile: userProfile,
      };
      const token = await jwt.sign(claim, config.SECRET_KEY, {
        expiresIn: config.TOKEN_EXPIRE,
        issuer: config.JWT_ISSUER,
        audience: config.JWT_AUD,
        algorithm: 'HS256',
      });

      /* Return user token and profile on login */
      return {
        id: userDocument.id,
        role: (roleDocument.role as unknown) as UserRoleEnum,
        scope: identityScope,
        accessToken: token,
        profile: userProfile,
      };
    } catch (error) {
      logger.error(`[LoginUserService:login]: ${error}`);
      throw new ErrorHandler(error);
    }
  }
}
