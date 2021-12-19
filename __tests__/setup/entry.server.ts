import 'reflect-metadata';
import config from '../../src/infra/config';
import { createExpressServer, RoutingControllersOptions } from 'routing-controllers';
import { routeControllerOptions } from '../../src/server';
import { TestingController } from './controllers/errors.mock';
import { MockAuthController } from './controllers/authorizer.mock';
import { AuthController } from '../../src/app/auth/auth.controller';

const options: RoutingControllersOptions = {
  ...routeControllerOptions,
  controllers: [TestingController, MockAuthController, AuthController],
  routePrefix: `${config.TEST_API_PREFIX}`,
};

const server = createExpressServer(options);
export default server;
