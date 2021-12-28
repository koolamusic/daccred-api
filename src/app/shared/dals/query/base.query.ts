import 'reflect-metadata';
import { IsBoolean, IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseApiQuery<T> {
  message!: 'success' | 'failure' | string;
  result!: T;
}

/**
 * @name BaseQueryDTO
 * @description Base response class for contracts in controller response
 */
export class BaseQueryDTO {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  message = 'success';

  constructor(message: string) {
    this.message = message;
  }
}

/**
 * @name BaseQueryParamsDTO
 * @description Base query params arguement for Array results GET requests
 */
export class BaseQueryParams {
  @IsString()
  @IsOptional()
  sort!: string;

  @IsDefined()
  limit!: string;

  @IsString()
  @IsOptional()
  sortField!: string;

  @IsBoolean()
  @IsOptional()
  sortAscending!: boolean;

  @IsString()
  @IsOptional()
  next!: string;

  @IsString()
  @IsOptional()
  previous!: string;
}
