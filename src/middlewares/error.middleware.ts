/* Global Error Filter to pipe HttpErrors into API Response and prevent app shutdown */

import { NextFunction, Request, Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { TErrorOutput } from '../infra/errors';

@Middleware({ type: 'after' })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: TErrorOutput, _req: Request, res: Response, next: NextFunction) {
    res.status(error.httpCode).json({
      status: error.httpCode,
      name: error.name,
      message: error.message,
      errors: error.errors,
    });
    next();
  }
}
