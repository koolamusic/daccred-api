import jwt from 'jsonwebtoken';
import { packRules } from '@casl/ability/extra';
import faker from 'faker';
import { UserType } from '../../src/app/shared/contracts/auth.contracts';
import { IJWTClaim, UserRoleEnum } from '../../src/app/shared/definitions';
import * as iam from '../../src/app/shared/iam';
import config from '../../src/infra/config';

/*----------------------------------------------------------*
 * Mock for authorized subscriber JWT token with roles
 *----------------------------------------------------------*/
const subscriberUserId = faker.datatype.uuid();

const subscriber: Omit<IJWTClaim, 'scope' | 'role' | 'permissions'> = {
  sub: subscriberUserId,
  profile: {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    business: true,
    role: UserRoleEnum.BUSINESS,
    user_id: subscriberUserId,
    subscriber_id: faker.datatype.uuid(),
  },
};

const subscriberRole = iam.interpolateRulesFor(iam.subscriberPolicy.rules, {
  user_id: subscriber.sub,
  subscriber_id: subscriber.profile.subscriber_id,
});

export const subscriberClaim: IJWTClaim = {
  scope: UserType.BUSINESS,
  permissions: packRules(JSON.parse(subscriberRole)),
  ...subscriber,
};

export const subscriberToken = jwt.sign(subscriberClaim, config.SECRET_KEY, {
  expiresIn: config.TOKEN_EXPIRE,
  issuer: config.JWT_ISSUER,
  audience: config.JWT_AUD,
  algorithm: 'HS256',
});
// console.log(subscriberToken)
/*----------------------------------------------------------*
 * Mock for authorized customer JWT token with roles
 *----------------------------------------------------------*/
const customerUserId = faker.datatype.uuid();

const customer: Omit<IJWTClaim, 'scope' | 'role' | 'permissions'> = {
  sub: customerUserId,
  profile: {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    business: true,
    role: UserRoleEnum.CUSTOMER,
    user_id: customerUserId,
    subscriber_id: null,
  },
};

const customerRole = iam.interpolateRulesFor(iam.customerPolicy.rules, {
  user_id: customer.sub,
  subscriber_id: null,
});

export const customerClaim: IJWTClaim = {
  scope: UserType.CUSTOMER,
  permissions: packRules(JSON.parse(customerRole)),
  ...customer,
};

export const customerToken = jwt.sign(customerClaim, config.SECRET_KEY, {
  expiresIn: config.TOKEN_EXPIRE,
  issuer: config.JWT_ISSUER,
  audience: config.JWT_AUD,
  algorithm: 'HS256',
});

/*----------------------------------------------------------*
 * Mock for authorized employee JWT token with roles
 *----------------------------------------------------------*/
const employeeUserId = faker.datatype.uuid();

const employee: Omit<IJWTClaim, 'scope' | 'role' | 'permissions'> = {
  sub: employeeUserId,
  profile: {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    business: true,
    role: UserRoleEnum.EMPLOYEE,
    user_id: employeeUserId,
    subscriber_id: faker.datatype.uuid(),
  },
};

const employeeRole = iam.interpolateRulesFor(iam.employeePolicy.rules, {
  user_id: employee.sub,
  subscriber_id: employee.profile.subscriber_id,
});

export const employeeClaim: IJWTClaim = {
  scope: UserType.BUSINESS,
  permissions: packRules(JSON.parse(employeeRole)),
  ...employee,
};

export const employeeToken = jwt.sign(employeeClaim, config.SECRET_KEY, {
  expiresIn: config.TOKEN_EXPIRE,
  issuer: config.JWT_ISSUER,
  audience: config.JWT_AUD,
  algorithm: 'HS256',
});

/*----------------------------------------------------------*
 * Mock for authorized superadmin JWT token with roles
 *----------------------------------------------------------*/
// Create signed JWT for super admin === add x-titan-superadmin:token
const superadminId = faker.datatype.uuid();

const superadmin: Omit<IJWTClaim, 'scope' | 'role' | 'permissions'> = {
  sub: superadminId,
  profile: {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    business: false,
    role: UserRoleEnum.SUPERADMIN,
    user_id: superadminId,
    subscriber_id: null,
  },
};

const superadminRole = iam.interpolateRulesFor(iam.superadminPolicy.rules, {
  user_id: superadmin.sub,
  subscriber_id: superadmin.profile.subscriber_id,
});

export const superadminClaim: IJWTClaim = {
  scope: 'titan',
  permissions: packRules(JSON.parse(superadminRole)),
  ...superadmin,
};

export const superadminToken = jwt.sign(superadminClaim, config.SECRET_KEY, {
  expiresIn: config.TOKEN_EXPIRE,
  issuer: config.JWT_ISSUER,
  audience: config.JWT_AUD,
  algorithm: 'HS256',
});
