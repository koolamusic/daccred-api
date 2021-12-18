import { Authorized, Get, JsonController } from 'routing-controllers';
import { CAN_READ_ALL_POLICY } from '../shared/constants';
import { customerPolicy, subscriberPolicy, employeePolicy, superadminPolicy } from '../shared/iam';

@JsonController('/policy')
export class PolicyController {
  /* Admins only */
  @Authorized([CAN_READ_ALL_POLICY])
  @Get('/customer')
  getUserPolicy() {
    return customerPolicy;
  }

  @Authorized([CAN_READ_ALL_POLICY])
  @Get('/subscriber')
  getSubscriberPolicy() {
    return subscriberPolicy;
  }

  @Authorized([CAN_READ_ALL_POLICY])
  @Get('/employee')
  getEmployeePolicy() {
    return employeePolicy;
  }

  @Authorized([CAN_READ_ALL_POLICY])
  @Get('/superadmin')
  getSuperAdminPolicy() {
    return superadminPolicy;
  }
}
