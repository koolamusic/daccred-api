/* Imports for Server Bootstrap: reflect metadata must be imported at top */
import 'reflect-metadata';
import express, { Response, Request } from 'express';
import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';

/* App Utils, Controllers and Middlewares */
import { LoggerMiddleware, HttpErrorHandler } from './middlewares';
import { AuthController } from './app/auth';
import { DocsController } from './app/docs';
import { ListController } from './app/lists';
import { ClaimController } from './app/claims';
import { swaggerSpecOptions } from './infra/openapi';
import * as Authorization from './infra/authorization';
import config from './infra/config';
import bodyParser from 'body-parser';

/* API Routes, Middlewares and Controllers */
const routeControllerOptions: RoutingControllersOptions = {
  controllers: [AuthController, ClaimController, ListController, DocsController],
  middlewares: [LoggerMiddleware, HttpErrorHandler],
  defaultErrorHandler: false,
  routePrefix: `${config.API_VERSION}`,
  cors: '*',
  authorizationChecker: Authorization.authGuard,
  currentUserChecker: Authorization.getCurrentUser,
};

const server = express();

/* The JSON files from Design Editor are large, so we have to compromise */
server.use(bodyParser.json({ limit: '7mb' }));

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
