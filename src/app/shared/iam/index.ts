import { UserRoleEnum } from '../definitions';
import policyForMember from './member.iam';
import policyForOwner from './owner.iam';

type TRole = 'member' | 'owner';

const policies = new Map<TRole | UserRoleEnum, typeof policyForMember | typeof policyForOwner>();
policies.set('member', policyForMember);
policies.set('owner', policyForOwner);

export default policies;
export * from './generate.roles';
export { policyForMember, policyForOwner };
