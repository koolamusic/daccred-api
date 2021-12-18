import { HttpError as RouterError } from 'routing-controllers';
export type TErrorOutput = Error & {
  httpCode: number;
  message: string;
  metadata: Record<string, string & number>;
  errors?: unknown;
};

/**
 * Exception for 409 HTTP error.
 */
export class ConflictError implements RouterError {
  name: string;
  message: string;
  httpCode = 409;

  constructor(message?: string) {
    throw new RouterError(this.httpCode, message || 'Please check your data.');
  }
}

/**
 * Exception for 422 HTTP error.
 */
export class UnprocessableEntityError implements RouterError {
  name: string;
  message: string;
  httpCode = 422;

  constructor(message?: string) {
    throw new RouterError(this.httpCode, message || 'Could not process or validate request body.');
  }
}

/**
 * Exception for 501 HTTP error.
 */
export class NotImplementedError implements RouterError {
  name: string;
  message: string;
  httpCode = 501;

  constructor(message?: string) {
    this.name = 'Not Implemented Error';
    throw new RouterError(this.httpCode, message || 'Resource not implemented.');
  }
}

/****
 * @name ErrorHandler
 * Error Message Handler for Try Catch Methods
 * Used in services and controllers to pipe error messages
 * into HttpError Instances
 *
 * */
export default class ErrorHandler {
  constructor(error: TErrorOutput) {
    // console.log(error, 'htis si the error tha tarrive');

    /* Handler for Conflict Error Type */
    if (error instanceof ConflictError || error.httpCode === 409) {
      const errorObj = {
        name: 'Conflict Error',
        httpCode: error.httpCode,
        message: error.message,
      };
      throw errorObj;
    }

    /* Handler for UnprocessableEntityError Type */
    if (error instanceof UnprocessableEntityError || error.httpCode === 422) {
      const errorObj = {
        name: 'Unprocessable Entity',
        httpCode: error.httpCode,
        message: error.message,
      };
      throw errorObj;
    }

    if (error instanceof NotImplementedError || error.httpCode === 501) {
      const errorObj = {
        name: 'Not Implemented Error',
        httpCode: error.httpCode,
        message: error.message,
      };
      throw errorObj;
    }

    if (error.httpCode === 401) {
      const errorObj = {
        ...error,
        name: 'Unauthorized Error',
      };
      throw errorObj;
    }

    if (error.httpCode === 404) {
      const errorObj = {
        ...error,
        name: 'Not Found Error',
      };
      throw errorObj;
    }

    if (error.metadata) {
      error.httpCode = error.metadata.status;
      error.name = error.metadata.name;
    }

    // Throw HTTP Error if Error has HttpCode Status
    if (error.httpCode) {
      throw new RouterError(error.httpCode, error.message);
    }

    // Throw Internal Server Error
    throw new RouterError(500, error.message);
  }
}
