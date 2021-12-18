/**
 *  @name employee.iam.ts
 *  Default IAM policies for user of type employee
 */

import { DocumentType } from '@typegoose/typegoose';
import { RoleCollection } from '../../models/role.model';
import { UserCollection } from '../../models/user.model';
import { ResourceModelSubject } from '../constants';
import {
  EmployeePolicyInterface,
  IAMPolicyRuleDefinition,
  MerchantPolicyInterface,
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
    reason: 'user creation not allowed',
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
    action: 'read_one',
    subject: ResourceModelSubject.SUBSCRIBER,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.EMPLOYEE },
  },
  {
    inverted: true,
    action: ['create', 'update', 'delete', 'read_all'],
    subject: ResourceModelSubject.SUBSCRIBER,
    reason: 'you are not allowed to access subscribers',
  },
];

const employeeResourceRules: IAMPolicyRuleDefinition<EmployeePolicyInterface>[] = [
  {
    action: 'read_one',
    subject: ResourceModelSubject.EMPLOYEE,
    conditions: { subscriberId: '{{ subscriber_id }}', userId: '{{ user_id }}', role: UserRoleEnum.EMPLOYEE },
  },
  {
    action: 'read_all',
    inverted: true,
    reason: 'you cannot perform this action',
    subject: ResourceModelSubject.EMPLOYEE,
  },
  {
    action: 'update',
    subject: ResourceModelSubject.EMPLOYEE,
    conditions: { subscriberId: '{{ subscriber_id }}', userId: '{{ user_id }}', role: UserRoleEnum.EMPLOYEE },
  },
  {
    action: 'create',
    inverted: true,
    reason: 'you cannot perform this action',
    subject: ResourceModelSubject.EMPLOYEE,
  },
  {
    action: 'delete',
    inverted: true,
    reason: 'you cannot perform this action',
    subject: ResourceModelSubject.EMPLOYEE,
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

const rules: IAMPolicyRuleDefinition<unknown>[] = [
  ...userResourceRules,
  ...roleResourceRules,
  ...subscriberResourceRules,
  ...employeeResourceRules,
  ...merchantResourceRules,
];

/* Export default policy rules with placeholder ID */
export default { id: 'f862a09b', rules };
