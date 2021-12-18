/**
 *  @name subscriber.iam.ts
 *  Default IAM policies for user of type subscriber
 */

import { DocumentType } from '@typegoose/typegoose';
import { RoleCollection } from '../../models/role.model';
import { UserCollection } from '../../models/user.model';
import { ResourceModelSubject } from '../constants';
import {
  UserRoleEnum,
  EmployeePolicyInterface,
  IAMPolicyRuleDefinition,
  MerchantPolicyInterface,
  SubscriberPolicyInterface,
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
    reason: 'user creation not allowed, did you want to create an employee?',
  },
  {
    action: 'delete',
    subject: ResourceModelSubject.USER,
    conditions: { id: { $eq: '{{ user_id }}' } },
  },
];

/* 
  A subscriber can edit the roles of its employees as well as their roles as long and as far as they are 
  project owners which that business identified by subscriberId 
 */
const roleResourceRules: IAMPolicyRuleDefinition<DocumentType<RoleCollection>>[] = [
  {
    action: 'read_one',
    subject: ResourceModelSubject.ROLE,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS },
  },
  {
    action: 'read_all',
    subject: ResourceModelSubject.ROLE,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS },
  },
  {
    action: 'update',
    subject: ResourceModelSubject.ROLE,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS },
  },
  {
    inverted: true,
    action: 'create',
    subject: ResourceModelSubject.ROLE,
    reason: 'you cannot create new user roles at this moment',
  },
  {
    action: 'delete',
    subject: ResourceModelSubject.ROLE,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS, userId: '{{ user_id }}' },
  },
];

const subscriberResourceRules: IAMPolicyRuleDefinition<SubscriberPolicyInterface>[] = [
  {
    action: 'read_one',
    subject: ResourceModelSubject.SUBSCRIBER,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS },
  },
  {
    inverted: true,
    action: 'read_all',
    subject: ResourceModelSubject.SUBSCRIBER,
    reason: 'you are not allowed to access subscribers',
  },
  {
    action: 'update',
    subject: ResourceModelSubject.SUBSCRIBER,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS, ownerId: '{{ user_id }}' },
  },
  {
    action: 'create',
    subject: ResourceModelSubject.SUBSCRIBER,
    conditions: { role: UserRoleEnum.BUSINESS },
  },
  {
    action: 'delete',
    subject: ResourceModelSubject.SUBSCRIBER,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS, ownerId: '{{ user_id }}' },
  },
];

const employeeResourceRules: IAMPolicyRuleDefinition<EmployeePolicyInterface>[] = [
  {
    action: 'read_one',
    subject: ResourceModelSubject.EMPLOYEE,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS, invitedBy: '{{ user_id }}' },
  },
  {
    action: 'read_all',
    subject: ResourceModelSubject.EMPLOYEE,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS },
  },
  {
    action: 'update',
    subject: ResourceModelSubject.EMPLOYEE,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS, invitedBy: '{{ user_id }}' },
  },
  {
    action: 'create',
    subject: ResourceModelSubject.EMPLOYEE,
    conditions: { role: UserRoleEnum.BUSINESS },
  },
  {
    action: 'delete',
    subject: ResourceModelSubject.EMPLOYEE,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS, invitedBy: '{{ user_id }}' },
  },
];

const merchantResourceRules: IAMPolicyRuleDefinition<MerchantPolicyInterface>[] = [
  {
    action: 'read_one',
    subject: ResourceModelSubject.PAYMENT_MERCHANT,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS },
  },
  {
    action: 'read_all',
    subject: ResourceModelSubject.PAYMENT_MERCHANT,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS },
  },
  {
    action: 'update',
    subject: ResourceModelSubject.PAYMENT_MERCHANT,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS },
  },
  {
    action: 'create',
    subject: ResourceModelSubject.PAYMENT_MERCHANT,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS },
  },
  {
    action: 'delete',
    subject: ResourceModelSubject.PAYMENT_MERCHANT,
    conditions: { subscriberId: '{{ subscriber_id }}', role: UserRoleEnum.BUSINESS },
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
export default { id: '8a7c2970', rules };
