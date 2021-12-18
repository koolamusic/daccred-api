/**
 *  @name customer.iam.ts
 *  Default IAM policies for user of type customer
 */

import { DocumentType } from '@typegoose/typegoose';
import { RoleCollection } from '../../models/role.model';
import { UserCollection } from '../../models/user.model';
import { ResourceModelSubject } from '../constants';
import {
  CustomerPolicyInterface,
  EmployeePolicyInterface,
  IAMPolicyRuleDefinition,
  MerchantPolicyInterface,
  ServicePolicyInterface,
  SubscriberPolicyInterface,
  UserRoleEnum,
} from '../definitions';

const userResourceRules: IAMPolicyRuleDefinition<DocumentType<UserCollection>>[] = [
  {
    action: 'read_one',
    subject: ResourceModelSubject.USER,
    conditions: { id: '{{ user_id }}' },
  },
  {
    action: 'update',
    subject: ResourceModelSubject.USER,
    conditions: { id: '{{ user_id }}' },
  },
  {
    inverted: true,
    action: 'create',
    subject: ResourceModelSubject.USER,
    reason: 'user creation not allowed, you need to signup',
  },
  {
    action: 'delete',
    subject: ResourceModelSubject.USER,
    conditions: { id: { $eq: '{{ user_id }}' } },
  },
];

const roleResourceRules: IAMPolicyRuleDefinition<DocumentType<RoleCollection>>[] = [
  {
    inverted: true,
    action: ['create', 'update', 'delete', 'read_all', 'read_one'],
    subject: ResourceModelSubject.ROLE,
    reason: 'you cannot perform this action',
  },
];

const subscriberResourceRules: IAMPolicyRuleDefinition<SubscriberPolicyInterface>[] = [
  {
    inverted: true,
    action: ['create', 'update', 'delete', 'read_all', 'read_one'],
    subject: ResourceModelSubject.SUBSCRIBER,
    reason: 'you are not allowed to access subscribers',
  },
];

const employeeResourceRules: IAMPolicyRuleDefinition<EmployeePolicyInterface>[] = [
  {
    inverted: true,
    action: ['create', 'update', 'delete', 'read_all', 'read_one'],
    subject: ResourceModelSubject.EMPLOYEE,
    reason: 'you are not allowed to perform this action',
  },
];

const merchantResourceRules: IAMPolicyRuleDefinition<MerchantPolicyInterface>[] = [
  {
    inverted: true,
    action: ['create', 'update', 'delete', 'read_all', 'read_one'],
    subject: ResourceModelSubject.PAYMENT_MERCHANT,
    reason: 'you are not allowed to perform this action',
  },
];
const serviceResourceRules: IAMPolicyRuleDefinition<ServicePolicyInterface>[] = [
  {
    action: ['create', 'update', 'delete', 'read_all', 'read_one'],
    subject: ResourceModelSubject.SERVICE,
    conditions: { userId: { $eq: '{{ user_id }}' }, role: UserRoleEnum.CUSTOMER },
  },
];
const customerResourceRules: IAMPolicyRuleDefinition<CustomerPolicyInterface>[] = [
  {
    action: ['update', 'delete', 'read_one'],
    subject: ResourceModelSubject.CUSTOMER,
    conditions: { userId: { $eq: '{{ user_id }}' }, role: UserRoleEnum.CUSTOMER },
  },
  {
    action: ['read_all', 'create'],
    inverted: true,
    reason: 'you cannot perform this action',
    subject: ResourceModelSubject.CUSTOMER,
  },
];

const rules: IAMPolicyRuleDefinition<unknown>[] = [
  ...userResourceRules,
  ...roleResourceRules,
  ...subscriberResourceRules,
  ...employeeResourceRules,
  ...merchantResourceRules,
  ...serviceResourceRules,
  ...customerResourceRules,
];

/* Export default policy rules with placeholder ID */
export default { id: '1ae36ed7', rules };
