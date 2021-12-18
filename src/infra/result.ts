/**
 * @name Result
 * Global class like the error handler to manage API responses
 *
 */

interface IResult<T> {
  message: string;
  status: number;
  result: T;
}

export default class HttpResult<T> implements IResult<T> {
  result: T;
  message: string;
  status: number;

  constructor(options: IResult<T>) {
    this.result = options.result;
    this.message = options?.message;
    this.status = options?.status;
  }

  public 201() {
    return {
      status: this.status || 201,
      message: this.message || 'successful post',
      result: this.result,
    };
  }

  public 200() {
    return {
      status: this.status || 201,
      message: this.message || 'successful post',
      result: this.result,
    };
  }
}
