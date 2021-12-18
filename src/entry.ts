import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import { __WHOAMI__ } from './app/shared/constants';
import logger from './infra/logger';
import config from './infra/config';
import server, { routeControllerOptions } from './server';
import database from './infra/database';

async function bootstrap() {
  /* Who are we? */
  logger.info(__WHOAMI__);

  /* Setup Express Server to use Routing Controllers */
  await useExpressServer(server, routeControllerOptions);

  /* Database Connection Pool:: A Declaration */
  logger.debug('waiting for database connection');
  await database;

  /* Start & Listen on HTTP Server */
  await server.listen({ port: config.PORT });
  logger.info(`Running at http://${config.HOST}:${config.PORT}`);
}

process.on('unhandledRejection', (err) => {
  if (err) {
    console.error(err);
  }
  process.exit(1);
});

bootstrap();
