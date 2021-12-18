import 'reflect-metadata';
import { IsBoolean, IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseApiResponse<T extends unknown> {
  message!: 'success' | 'failure' | string;
  result!: T;
}

/**
 * @name BaseResponseDTO
 * @description Base response class for contracts in controller response
 */
export class BaseResponseDTO {
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
export class BaseQueryParamsDTO {
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
