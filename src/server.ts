/* Imports for Server Bootstrap: reflect metadata must be imported at top */
import 'reflect-metadata';
import cors from 'cors';
import express, { Response, Request, NextFunction } from 'express';
import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import helmet from 'helmet';

/* App Utils, Controllers and Middlewares */
import { LoggerMiddleware, HttpErrorHandler } from './middlewares';
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
  middlewares: [LoggerMiddleware, HttpErrorHandler],
  defaultErrorHandler: false,
  routePrefix: `${config.API_VERSION}`,
  //   cors: {
  //   "origin": "http://localhost,https://localhost,https://*",
  //   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  //   "preflightContinue": true,
  //   "optionsSuccessStatus": 204
  // },
  authorizationChecker: Authorization.authGuard,
  currentUserChecker: Authorization.getCurrentUser,
};

const server = express();

// var corsOptions = {
//   "origin": "https://*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//   "preflightContinue": true,
//   "optionsSuccessStatus": 204
// }
// server.options('*', cors())
// server.use(cors(corsOptions));

/* Parse routing-controllers classes into OpenAPI spec: */
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routeControllerOptions, {
  ...swaggerSpecOptions,
});

/* --- Custom Settings for Express, add policies and config parameters on init --- */
server.set('secret', config.SECRET_KEY);
server.use(helmet());
server.use(cors());

server.use(function (_req: Request, res: Response, next: NextFunction) {
  //   res.setHeader('access-control-allow-headers', '*');
  //   res.setHeader('access-control-allow-origin', '*');
  //   res.setHeader("access-control-allow", "*");
  //   res.setHeader('access-control-allow-credentials', 'true');
  //   res.setHeader("access-control-allow-origin", "https://titan.dev.worldtreeconsulting.com");

  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader('Access-Control-Allow-Methods', 'DELETE, PUT');
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed
  if ('OPTIONS' == _req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

/* Use root path for documentation */
server.use('/dev-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
server.use('/docs', (_req: Request, res: Response) => {
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

/* Create Express Server with routing controllers */
// const server = createExpressServer(routeControllerOptions);
// useExpressServer(server, routeControllerOptions);

export default server;
export { routeControllerOptions };
