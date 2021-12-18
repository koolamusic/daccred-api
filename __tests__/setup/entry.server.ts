import 'reflect-metadata';
import { createExpressServer, RoutingControllersOptions } from 'routing-controllers';
import { routeControllerOptions } from '../../src/server';
import { TestingController } from './controllers/errors.mock';
import { MockAuthController } from './controllers/authorizer.mock';
import {
  AuthController,
  CustomerController,
  SubscriberController,
  SubscriberEmployeeController,
  UserController,
} from '../../src/app/controllers';
import config from '../../src/infra/config';
// import connectMongo from './db';
// connectMongo();

const options: RoutingControllersOptions = {
  ...routeControllerOptions,
  controllers: [
    TestingController,
    UserController,
    MockAuthController,
    AuthController,
    SubscriberController,
    SubscriberEmployeeController,
    CustomerController,
  ],
  routePrefix: `${config.TEST_API_PREFIX}`,
};

const server = createExpressServer(options);
export default server;
