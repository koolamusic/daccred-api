import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { DocumentType } from '@typegoose/typegoose';
import { UserCollection, UserModel } from '../../models/user.model';
import {
  AuthSignupRequest,
  AuthSignupResponse,
  IVerifyEmailNotification,
  CreateCustomerRequest,
  UserType,
  CreateSubscriberRequest,
  BusinessAccountObject,
  CustomerAccountObject,
} from '../../shared/contracts';

/* ---- Inter dependent services ----- */
import UserRoleService from '../iam/role.service';
import SubscriberService from '../account/subscriber.service';
import CustomerService from '../account/customer.service';
/* ---- Inter dependent services ----- */

import { publishSignupVerificationNotification } from '../../publishers/notifications.publisher';
import logger from '../../../infra/logger';
import config from '../../../infra/config';
import { generateIdentifier } from '../../shared/utils';
import ErrorHandler, { ConflictError, UnprocessableEntityError } from '../../../infra/errors';

export default class SignupUserService {
  private roleService = new UserRoleService();
  private subscriberService = new SubscriberService();
  private customerService = new CustomerService();

  /**--------------------------------------------------------------
   * @name accountVerificationHandler
   * @description Method to manage account verification via email
   * @todo make the pubSub trigger a callback function
   -------------------------------------------------------------- **/
  private async accountVerificationHandler(user: DocumentType<UserCollection>) {
    /* Token value for user verification */
    const verificationPayload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    /* Prepare payload for user verification email */
    const token = await jwt.sign(verificationPayload, config.SECRET_KEY, { expiresIn: config.TOKEN_EXPIRE });

    /* Publish Email Verification Notification */
    const publisherObj: IVerifyEmailNotification = {
      username: user.name,
      verificationLink: `${config.HOST}/emailVerify?token=${token}`,
      handler: 'SEND_VERIFICATION_EMAIL_HANDLER',
    };
    await publishSignupVerificationNotification(publisherObj);
    return token;
  }

  /* Private method to generate the subscriberId */
  public async genSubscriberId(businessName: string): Promise<string> {
    return await `${businessName.replace(/\s/g, '').substring(0, 4)}${generateIdentifier(20)}`;
  }

  /**--------------------------------------------------------------
   * @name signupBusinessUserAccount
   * @description Method to setup business user account
   -------------------------------------------------------------- **/

  private async signupBusinessUserAccount(createUserData: AuthSignupRequest, business: BusinessAccountObject) {
    /* Validate the entry Object and some housekeeping */
    if (_.isEmpty(business)) throw new ConflictError('business information is unknown');

    /* Generate subscriberId using nanoid */
    const subscriberId = await this.genSubscriberId(business.businessName);

    /* Create user account */
    const user: DocumentType<UserCollection> = await UserModel.create({ ...createUserData, subscriberId });
    if (!user) throw new UnprocessableEntityError();

    /* Generate roles for user account */
    await this.roleService.createUserRoleOnSignup(user);

    /* Call handle verification Email private method */
    const token = await this.accountVerificationHandler(user);

    /* Procedure to call the Subscriber Service to create subscriber account */
    const createSubscriberObj: CreateSubscriberRequest = {
      ...business,
      subscriberId,
      subscriptionId: '507f191e810c19729de860ea', // @TODO remove this once the feature and subscriptions service has been setup
      ownerId: user.id,
    };

    logger.info(`[Publish to User Management Subscriber info]: ${JSON.stringify(createSubscriberObj)}`);
    await this.subscriberService.createSubscriberOnSignup(createSubscriberObj);

    /* Return response with Next route action */
    return {
      email: user.email,
      scope: UserType.BUSINESS,
      nextRoute: `http://${config.HOST}/emailVerify?token=${token}`,
    };
  }

  /**--------------------------------------------------------------
   * @name signupCustomerUserAccount
   * @description Method to setup customer user account
   -------------------------------------------------------------- **/
  private async signupCustomerUserAccount(createUserData: AuthSignupRequest, customer: CustomerAccountObject) {
    /* Validate the entry Object */
    if (_.isEmpty(customer)) throw new ConflictError('customer information is unknown');

    /* Create user account */
    const user: DocumentType<UserCollection> = await UserModel.create({ ...createUserData });
    if (!user) throw new UnprocessableEntityError();

    /* Generate roles for user account */
    await this.roleService.createUserRoleOnSignup(user);

    /* Call handle verification Email private method */
    const token = await this.accountVerificationHandler(user);

    /* Procedure to call the Customer Account Service to create subscriber account */
    const accountTypeObj: CreateCustomerRequest = {
      ...customer,
      userId: user.id,
    };

    logger.info(`[Publish to User Management Customer info]: ${JSON.stringify(accountTypeObj)}`);
    await this.customerService.createCustomer(accountTypeObj);

    /* Return response with Next route action */
    return {
      email: user.email,
      scope: UserType.CUSTOMER,
      nextRoute: `http://${config.HOST}/emailVerify?token=${token}`,
    };
  }

  /**--------------------------------------------------------------
   * @name signupUser
   * @description Switcher for routing signup request
   -------------------------------------------------------------- **/

  public async signupUser(data: AuthSignupRequest): Promise<void | AuthSignupResponse> {
    try {
      /* --------------------------------------------------------------
          Rules that need to be met for request
       * --------------------------------------------------------------- */
      const document = await UserModel.findOne({ email: data.email });
      if (document) throw new ConflictError('duplicate email: already exist');

      /* Spread out incoming data in request */
      const { customer, business, ...createUserData } = data;

      /* Determine who handles this users signup */
      switch (data.type) {
        case UserType.BUSINESS:
          return this.signupBusinessUserAccount(createUserData, business as BusinessAccountObject);

        case UserType.CUSTOMER:
          return this.signupCustomerUserAccount(createUserData, customer as CustomerAccountObject);

        default:
          throw new ConflictError();
      }
    } catch (error) {
      logger.error(`[SingupUserService:signup]: ${error}`);
      throw new ErrorHandler(error);
    }
  }
}
