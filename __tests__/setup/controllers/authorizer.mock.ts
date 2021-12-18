import { Get, Controller, CurrentUser, Authorized, Post, HttpCode } from 'routing-controllers';
import { ResourceModelSubject } from '../../../src/app/shared/constants';
import { AuthorizerRule } from '../../../src/app/shared/definitions';

const CAN_READ_ONE_EMPLOYEE: AuthorizerRule = {
  action: 'read_one',
  subject: ResourceModelSubject.EMPLOYEE,
};
const CAN_DELETE_EMPLOYEE: AuthorizerRule = {
  action: 'delete',
  subject: ResourceModelSubject.EMPLOYEE,
};

const CAN_READ_ONE_SUBSCRIBER: AuthorizerRule = {
  action: 'read_one',
  subject: ResourceModelSubject.SUBSCRIBER,
};

const CAN_CREATE_EMPLOYEE: AuthorizerRule = {
  action: 'create',
  subject: ResourceModelSubject.EMPLOYEE,
};

const CAN_CREATE_SERVICE: AuthorizerRule = {
  action: 'create',
  subject: ResourceModelSubject.SERVICE,
};

const CAN_READ_ALL_POLICY: AuthorizerRule = {
  action: 'read_all',
  subject: ResourceModelSubject.POLICY,
};

@Controller('/guard')
export class MockAuthController {
  /* Authentication Tests only */
  @Post('/')
  @Authorized([])
  @HttpCode(201)
  canRead(@CurrentUser() user: Record<string, string>) {
    return user;
  }

  /* Test mock for Employee Rules to check */
  @Get('/employee')
  @Authorized([CAN_READ_ONE_EMPLOYEE])
  @HttpCode(200)
  getAuthorizedEmployee() {
    return {
      message: 'success',
      data: 'you are authorized to access employee scope',
    };
  }

  @Post('/subscriber')
  @Authorized([CAN_CREATE_EMPLOYEE])
  @HttpCode(201)
  testAuthorizedSubscriber() {
    return {
      message: 'success',
      data: 'you are authorized to access subscriber scope',
    };
  }

  @Post('/customer')
  @Authorized([CAN_CREATE_SERVICE])
  @HttpCode(201)
  testAuthorizedCustomer() {
    return {
      message: 'success',
      data: 'you are authorized to access customer scope',
    };
  }

  @Get('/superadmin')
  @Authorized([CAN_READ_ALL_POLICY])
  @HttpCode(200)
  testAuthorizedSuperadmin() {
    return {
      message: 'success',
      data: 'you are authorized to access superadmin# scope',
    };
  }

  @Get('/fair-cluster')
  @Authorized([CAN_READ_ONE_SUBSCRIBER, CAN_READ_ONE_EMPLOYEE])
  @HttpCode(200)
  testClusteredRulesDefinition() {
    return {
      message: 'success',
      data: 'the clustered# rules here match your authorized scope',
    };
  }

  @Get('/unfair-cluster')
  @Authorized([CAN_DELETE_EMPLOYEE, CAN_READ_ONE_EMPLOYEE, CAN_READ_ALL_POLICY])
  @HttpCode(200)
  testUnfairClusteredRulesDefinition() {
    return {
      message: 'success',
      data: 'the clustered# rules here match your authorized scope',
    };
  }
}
