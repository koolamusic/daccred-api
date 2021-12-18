import jwt from 'jsonwebtoken';
import config from '../../../infra/config';
import logger from '../../../infra/logger';
import ErrorHandler, { ConflictError } from '../../../infra/errors';
import { UserModel } from '../../models/user.model';
import {
  AuthOnboardEmployeeRequest,
  AuthOnboardEmployeeResponse,
  UserType,
} from '../../shared/contracts/auth.contracts';
import { NotFoundError } from 'routing-controllers';
import { IJWTClaim, UserRoleEnum } from '../../shared/definitions';
import { packPermissionRules } from '../../shared/utils';
import UserRoleService from '../iam/role.service';
import { EmployeeModel } from '../../models/employee.model';
import { EmployeeInviteStatus } from '../../shared/contracts';

export default class OnboardingService {
  private roleService = new UserRoleService();

  public async onboardSubscriberEmployee(data: AuthOnboardEmployeeRequest): Promise<AuthOnboardEmployeeResponse> {
    try {
      /* Get the user document */
      const user = await UserModel.findOne({ email: data.email });
      if (!user) throw new ConflictError('Invalid account email');

      /* retrieve user id and query employee status, then modify record */
      const employeeDocument = await EmployeeModel.findOne({ userId: user._id, subscriberId: user.subscriberId });
      if (!employeeDocument) throw new NotFoundError('User does not have associated employee profile');

      if (
        employeeDocument.activationToken != data.activationToken ||
        employeeDocument.inviteStatus === EmployeeInviteStatus.ACCEPTED ||
        employeeDocument.inviteStatus === EmployeeInviteStatus.REJECTED
      ) {
        throw new ConflictError('Invalid employee activation');
      } else {
        /* Update user credentials with required info */
        user.password = data.password;
        user.save();

        /* All checks out. activate and Generate roles for user account */
        const roleDocument = await this.roleService.createUserRoleOnActivate(user);

        /* Update employee account status */
        employeeDocument.activationToken = undefined;
        employeeDocument.inviteStatus = EmployeeInviteStatus.ACCEPTED;
        employeeDocument.save();

        /* Build user claims and roles and send ~TODO: retrieve claims dynamically from database */
        const identityScope = user.type === 'customer' ? UserType.CUSTOMER : UserType.BUSINESS;
        const permissions = packPermissionRules(roleDocument.permissions);

        const userProfile: IJWTClaim['profile'] = {
          email: user.email,
          name: user.name,
          role: roleDocument.role,
          user_id: user.id,
          business: !!user.subscriberId,
          subscriber_id: user.subscriberId,
        };

        const claim: IJWTClaim = {
          sub: user.id,
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
          id: user.id,
          role: (roleDocument.role as unknown) as UserRoleEnum,
          scope: identityScope,
          accessToken: token,
          profile: userProfile,
        };
      }
    } catch (error) {
      logger.error(`[OnboardingService:onboardSubscriberEmployee]: ${error}`);
      throw new ErrorHandler(error);
    }
  }
}
