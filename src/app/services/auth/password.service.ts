import { encode } from 'js-base64';
import { HttpError, NotFoundError } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import config from '../../../infra/config';
import ErrorHandler, { ConflictError } from '../../../infra/errors';
import logger from '../../../infra/logger';
import { UserModel } from '../../models/user.model';
import { publishForgotPasswordNotification } from '../../publishers/notifications.publisher';
import {
  AuthForgotPasswordResponse,
  AuthResetPasswordRequest,
  AuthLoginRequest,
  AuthLoginResponse,
  UserType,
} from '../../shared/contracts/auth.contracts';
import { generateIdentifier, packPermissionRules } from '../../shared/utils';
import { RoleModel } from '../../models/role.model';
import { IJWTClaim, UserRoleEnum } from '../../shared/definitions';

export default class PasswordService {
  public async requestResetPassword(data: Omit<AuthLoginRequest, 'password'>): Promise<AuthForgotPasswordResponse> {
    try {
      const userDocument = await UserModel.findOne({ email: data.email });
      if (!userDocument) throw new ConflictError('User account not found');

      /* Create Reset Parameters */
      const resetKey = encode(generateIdentifier(12) + '.' + userDocument.email);
      const tokenExpireDate = DateTime.now().plus({ hours: 6 });
      logger.debug(resetKey);

      /* Persist parameters to user colllection and save */
      userDocument.resetPasswordToken = resetKey;
      userDocument.resetPasswordTokenExpire = tokenExpireDate;
      await userDocument.save();

      /* Publish Event: Forgot Password Notification */
      const publisherObj = {
        username: userDocument.name,
        handler: 'SEND_FORGOTPASSWORD_EMAIL_HANDLER',
        token: resetKey,
        resetPasswordLink: `${config.HOST}/reset-password?token=${resetKey}`, // add token to form payload from route
      };
      await publishForgotPasswordNotification(publisherObj);
      /* return a response to the API */
      return {
        message: 'Processing Forgot password request',
        email: userDocument.email,
      };
    } catch (error) {
      logger.error(`[ForgotPassword: request]: ${error}`);
      throw new ErrorHandler(error);
    }
  }

  /**@todo This needs to change as the logic handler is from login */
  public async resetPassword(data: AuthResetPasswordRequest): Promise<AuthLoginResponse> {
    try {
      const { password, confirmPassword, token } = data;
      if (password !== confirmPassword) throw new ConflictError('Passwords do not match');

      const userDocument = await UserModel.findOne({
        $or: [{ resetPasswordToken: token }],
        resetPasswordExpires: { $gt: DateTime.now() },
      });

      if (!userDocument) throw new HttpError(400, 'OTP expired or invalid password reset token');
      if (userDocument.password == password) throw new ConflictError('cannot reuse previous password');

      /* Handle user document to invalidate token */
      userDocument.resetPasswordToken = undefined;
      userDocument.resetPasswordTokenExpire = undefined;

      const tmp = userDocument;

      /* save new user password */
      userDocument.password = password;
      await userDocument.save();

      /* Retrieve roles for user */
      const roleDocument = await RoleModel.findOne({ userId: userDocument.id });
      if (!roleDocument) throw new NotFoundError('Cannot get user roles');

      /* Build user claims and roles and send ~TODO: retrieve claims dynamically from database */
      const identityScope = userDocument.type === 'customer' ? UserType.CUSTOMER : UserType.BUSINESS;
      const permissions = packPermissionRules(roleDocument.permissions);

      const claim: IJWTClaim = {
        sub: userDocument.id,
        scope: identityScope,
        permissions,
        profile: {
          email: userDocument.email,
          name: userDocument.name,
          role: roleDocument.role,
          user_id: userDocument.id,
          business: !!userDocument.subscriberId,
          subscriber_id: userDocument.subscriberId,
        },
      };
      const tkn = await jwt.sign(claim, config.SECRET_KEY, {
        expiresIn: config.TOKEN_EXPIRE,
        issuer: config.JWT_ISSUER,
        audience: config.JWT_AUD,
        algorithm: 'HS256',
      });

      return {
        id: tmp.id,
        role: (roleDocument.role as unknown) as UserRoleEnum,
        scope: identityScope,
        accessToken: tkn,
        profile: {
          email: userDocument.email,
          name: userDocument.name,
          role: roleDocument.role,
          user_id: userDocument.id,
          business: !!userDocument.subscriberId,
          subscriber_id: userDocument.subscriberId,
        },
      };
    } catch (error) {
      logger.error(`[ForgotPassword: reset]: ${error}`);
      throw new ErrorHandler(error);
    }
  }
}
