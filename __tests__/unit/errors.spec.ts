import { HttpError } from 'routing-controllers';
import { ConflictError, NotImplementedError, UnprocessableEntityError } from '../../src/infra/errors';

describe('HttpError', () => {
  test('should be instance of HttpError and Error', () => {
    const error = new HttpError(418, 'Error message');
    expect(error.httpCode).toEqual(418);
    expect(error.message).toEqual('Error message');
    expect(error).toBeInstanceOf(HttpError);
    expect(error).toBeInstanceOf(Error);
  });
});

describe('ConflictError', () => {
  test('should be instance of HttpError and Error', () => {
    try {
      throw new ConflictError();
    } catch (error) {
      expect(error.message).toEqual('Please check your data.');
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toBeInstanceOf(Error);
    }
  });

  test('should return custom error message and http status', () => {
    try {
      throw new ConflictError('There is a conflict');
    } catch (error) {
      expect(error.message).toEqual('There is a conflict');
      expect(error.httpCode).toEqual(409);
      expect(error).toHaveProperty('message');
      expect(error).toHaveProperty('name');
    }
  });
});

describe('UnprocessableEntityError', () => {
  test('should be instance of HttpError and Error', () => {
    try {
      throw new UnprocessableEntityError();
    } catch (error) {
      expect(error.message).toEqual('Could not process or validate request body.');
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toBeInstanceOf(Error);
    }
  });

  test('should be return custom message and http status in error object', () => {
    try {
      throw new UnprocessableEntityError('wahala dey');
    } catch (error) {
      expect(error.message).toEqual('wahala dey');
      expect(error.httpCode).toEqual(422);
      expect(error).toHaveProperty('message');
      expect(error).toHaveProperty('name');
    }
  });
});

describe('NotImplementedError', () => {
  test('should be instance of HttpError and Error', () => {
    try {
      throw new NotImplementedError();
    } catch (error) {
      expect(error.message).toEqual('Resource not implemented.');
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toBeInstanceOf(Error);
    }
  });

  test('should be return custom message and http status in error object', () => {
    try {
      throw new NotImplementedError('na me cause am');
    } catch (error) {
      expect(error.message).toEqual('na me cause am');
      expect(error.httpCode).toEqual(501);
      expect(error).toHaveProperty('message');
      expect(error).toHaveProperty('name');
    }
  });
});
