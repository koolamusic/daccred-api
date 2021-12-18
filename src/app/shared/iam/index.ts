import { UserRoleEnum } from '../definitions';
import customerPolicy from './customer.iam';
import employeePolicy from './employee.iam';
import subscriberPolicy from './subscriber.iam';
import superadminPolicy from './superadmin.iam';

type TRole = 'customer' | 'employee' | 'subscriber' | 'superadmin';

const policies = new Map<TRole | UserRoleEnum, typeof customerPolicy | typeof superadminPolicy>();
policies.set('customer', customerPolicy);
policies.set('employee', employeePolicy);
policies.set('subscriber', subscriberPolicy);
policies.set('superadmin', superadminPolicy);

export default policies;
export { customerPolicy, subscriberPolicy, employeePolicy, superadminPolicy };
export * from './generate.roles';
