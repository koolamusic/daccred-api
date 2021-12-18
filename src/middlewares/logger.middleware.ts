import { NextFunction, Response, Request } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import logger from '../infra/logger';

@Middleware({ type: 'after' })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  use = (req: Request, res: Response, next: NextFunction) => {
    //middleware function
    const getActualRequestDurationInMilliseconds = (start: [number, number] | undefined) => {
      const NS_PER_SEC = 1e9; //  convert to nanoseconds
      const NS_TO_MS = 1e6; // convert to milliseconds
      const diff = process.hrtime(start);
      return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
    };

    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
    const log = `(${method}:${url}) ${status} ${durationInMilliseconds.toLocaleString()} ms`;
    logger.info(log);

    next();
  };
}
