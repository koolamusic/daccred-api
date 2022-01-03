/**
 * @name Result
 * Global class like the error handler to manage API responses
 *
 */

interface IResult<T> {
  message: string;
  result: T;
}

export default class HttpResult {
  name: string;

  constructor(options: { name: string }) {
    this.name = options.name;
  }

  public post<T>(result: T): IResult<T> {
    return {
      message: `OK(Successfully created a new ${this.name})`,
      result: result,
    };
  }

  public patch<T>(result: T): IResult<T> {
    return {
      message: `Successfully updated a ${this.name}`,
      result: result,
    };
  }

  public delete<T>(result: T): IResult<T> {
    return {
      message: `Successfully deleted a ${this.name}`,
      result: result,
    };
  }

  public get<T>(result: T): IResult<T> {
    return {
      message: `Successfully returned a ${this.name}`,
      result: result,
    };
  }

  public list<T>(result: T): IResult<T> {
    return {
      message: `Successfully returned a list of ${this.name}s`,
      result: result,
    };
  }
}
