/* Imports for Server Bootstrap: reflect metadata must be imported at top */
import 'reflect-metadata';
import express, { Response, Request } from 'express';
import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';

/* App Utils, Controllers and Middlewares */
import { LoggerMiddleware, HttpErrorHandler, CorsMiddleware } from './middlewares';
import {
  UserController,
  CustomerController,
  SubscriberController,
  SubscriberEmployeeController,
  PolicyController,
  AuthController,
} from './app/controllers';
import { swaggerSpecOptions } from './infra/openapi';
import * as Authorization from './infra/authorization';
import config from './infra/config';

/* API Routes, Middlewares and Controllers */
const routeControllerOptions: RoutingControllersOptions = {
  controllers: [
    UserController,
    CustomerController,
    SubscriberController,
    SubscriberEmployeeController,
    PolicyController,
    AuthController,
  ],
  middlewares: [LoggerMiddleware, CorsMiddleware, HttpErrorHandler],
  defaultErrorHandler: false,
  routePrefix: `${config.API_VERSION}`,
  authorizationChecker: Authorization.authGuard,
  currentUserChecker: Authorization.getCurrentUser,
};

const server = express();


/* Parse routing-controllers classes into OpenAPI spec: */
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routeControllerOptions, {
  ...swaggerSpecOptions,
});

/* Use root path for documentation */
server.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
server.use('/openapi', (_req: Request, res: Response) => {
  /* Parse routing-controllers classes into OpenAPI spec: */
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, routeControllerOptions, {
    ...swaggerSpecOptions,
  });
  res.set({ 'Access-Control-Allow': '*' });
  res.set({ 'Access-Control-Allow-Origin': '*' });
  res.status(200).json(spec);
});

/* Root UI & API Routes [swagger docs, healthcheck] */
server.use('/_healthcheck', (_req: Request, res: Response) => {
  res.status(200).json({ uptime: process.uptime() });
});

export default server;
export { routeControllerOptions };
