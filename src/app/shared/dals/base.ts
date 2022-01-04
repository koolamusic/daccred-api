import 'reflect-metadata';
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseResponseDTO {
  @IsString()
  message?: string;
}

export class BaseQueryResponseDTO {
  @IsString()
  message?: string;

  @IsNumber()
  @IsDefined()
  offset!: number;

  @IsNumber()
  @IsDefined()
  limit!: number;

  @IsNumber()
  @IsDefined()
  pages!: number;

  @IsNumber()
  @IsDefined()
  current!: number;

  @IsBoolean()
  @IsDefined()
  hasPrevPage!: boolean;

  @IsBoolean()
  @IsDefined()
  hasNextPage!: boolean;

  @IsString()
  @IsDefined()
  next!: number;

  @IsString()
  @IsDefined()
  prev!: number;
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
  offset!: number;

  @IsDefined()
  limit!: number;

  // @IsString()
  // @IsOptional()
  // sortField!: string;

  // @IsBoolean()
  // @IsOptional()
  // sortAscending!: boolean;

  @IsNumber()
  @IsOptional()
  next!: number;

  @IsNumber()
  @IsOptional()
  prev!: number;
}
