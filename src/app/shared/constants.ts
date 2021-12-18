import { AuthorizerRule } from './definitions';
import config from '../../infra/config';

export const __WHOAMI__ = ` 
'########:'####:'########::::'###::::'##::: ##:
... ##..::. ##::... ##..::::'## ##::: ###:: ##:
::: ##::::: ##::::: ##:::::'##:. ##:: ####: ##:
::: ##::::: ##::::: ##::::'##:::. ##: ## ## ##:
::: ##::::: ##::::: ##:::: #########: ##. ####:
::: ##::::: ##::::: ##:::: ##.... ##: ##:. ###:
::: ##::::'####:::: ##:::: ##:::: ##: ##::. ##:
:::..:::::....:::::..:::::..:::::..::..::::..::
${config.serviceName}
`;

/*  Constants of all API resources used to map to IAM roles and
 *  permissions Subjects to RESOURCES across the application. This should be shared and constantly
 *  updated across all applications ---> might move to shared.
 *  If there exists an /api endpoint or controller or Model... Then it needs to be mapped here
 *
 *  We're doing this instead of Model classes, because claims cached in JWT tokens used to authenticate
 *  various microservices. and I'm not sure at this time how all model classes can be shared from a single source
 *  of truth (particularly the controller contracts are a solid reference for these)
 */

export enum ResourceModelSubject {
  USER = 'titan_authenticator_User',
  ROLE = 'titan_authenticator_Role',
  EMPLOYEE = 'titan_authenticator_Employee',
  CUSTOMER = 'titan_authenticator_Customer',
  SUBSCRIBER = 'titan_authenticator_Subscriber',
  POLICY = 'titan_authenticator_Policy',
  SERVICE = 'titan_services_Service',
  NOTIFICATIONS = 'titan_notifications_Notifications',
  PAYMENT_MERCHANT = 'titan_payment_PaymentMerchant',
}

export const CAN_READ_ONE_USER: AuthorizerRule = { action: 'read_one', subject: ResourceModelSubject.USER };
export const CAN_CREATE_USER: AuthorizerRule = { action: 'create', subject: ResourceModelSubject.USER };
export const CAN_READ_ALL_POLICY: AuthorizerRule = { action: 'read_all', subject: ResourceModelSubject.POLICY };

export const CAN_CREATE_EMPLOYEE: AuthorizerRule = {
  action: 'create',
  subject: ResourceModelSubject.EMPLOYEE,
};

export const CAN_READ_EMPLOYEE: AuthorizerRule = {
  action: 'read_one',
  subject: ResourceModelSubject.EMPLOYEE,
};

export const CAN_UPDATE_EMPLOYEE: AuthorizerRule = {
  action: 'update',
  subject: ResourceModelSubject.EMPLOYEE,
};

export const CAN_DELETE_EMPLOYEE: AuthorizerRule = {
  action: 'delete',
  subject: ResourceModelSubject.EMPLOYEE,
};

export const CAN_READ_ALL_EMPLOYEES: AuthorizerRule = {
  action: 'read_all',
  subject: ResourceModelSubject.EMPLOYEE,
};

export const CAN_CREATE_CUSTOMER: AuthorizerRule = {
  action: 'create',
  subject: ResourceModelSubject.CUSTOMER,
};

export const CAN_READ_CUSTOMER: AuthorizerRule = {
  action: 'read_one',
  subject: ResourceModelSubject.CUSTOMER,
};

export const CAN_UPDATE_CUSTOMER: AuthorizerRule = {
  action: 'update',
  subject: ResourceModelSubject.CUSTOMER,
};

export const CAN_CREATE_SUBSCRIBER: AuthorizerRule = {
  action: 'create',
  subject: ResourceModelSubject.SUBSCRIBER,
};

export const CAN_READ_SUBSCRIBER: AuthorizerRule = {
  action: 'read_one',
  subject: ResourceModelSubject.SUBSCRIBER,
};

export const CAN_UPDATE_SUBSCRIBER: AuthorizerRule = {
  action: 'update',
  subject: ResourceModelSubject.SUBSCRIBER,
};
