/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *  @name employee.iam.ts
 *  Default IAM policies for user of type employee
 */

import { ResourceModelSubject } from '../constants';
import { CredentialPolicyInterface, IAMPolicyRuleDefinition, UserRoleEnum } from '../definitions';

const userResourceRules: IAMPolicyRuleDefinition<any>[] = [
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

const credentialResourceRules: IAMPolicyRuleDefinition<CredentialPolicyInterface>[] = [
  {
    action: 'read_one',
    subject: ResourceModelSubject.CREDENTIAL,
    conditions: { workspaceId: '{{ workspace_id }}', userId: '{{ user_id }}', role: UserRoleEnum.MEMBER },
  },
  {
    action: 'read_all',
    inverted: true,
    reason: 'you cannot perform this action',
    subject: ResourceModelSubject.CREDENTIAL,
  },
  {
    action: 'update',
    subject: ResourceModelSubject.CREDENTIAL,
    conditions: { workspaceId: '{{ workspace_id }}', userId: '{{ user_id }}', role: UserRoleEnum.MEMBER },
  },
  {
    action: 'create',
    inverted: true,
    reason: 'you cannot perform this action',
    subject: ResourceModelSubject.CREDENTIAL,
  },
  {
    action: 'delete',
    inverted: true,
    reason: 'you cannot perform this action',
    subject: ResourceModelSubject.CREDENTIAL,
  },
];

const rules: IAMPolicyRuleDefinition<unknown>[] = [...userResourceRules, ...credentialResourceRules];

/* Export default policy rules with placeholder ID */
export default { id: 'd862a09b', rules };
