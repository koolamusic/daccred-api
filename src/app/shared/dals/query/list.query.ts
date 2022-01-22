/*********************************************************************
/ Use Response to determine the DTO output from Rest Controllers
/ Use Output to determine output from Services, Repos etc
/ 
/ Use Query to for query type requests
/ Use QueryParams when it's a REST /:id or ?id= paramaeter
/ Extend the BaseResponseDTO for Response type DTOs
/********************************************************************* */

import 'reflect-metadata';
import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { BaseResponseDTO } from '../base.dal';
import { Type } from 'class-transformer';

/*---------------------------------------------------------------------------- 
        API query to list
----------------------------------------------------------------------------*/

export class RecipientListQueryParams {
  @IsString()
  owner!: string | undefined;

  @IsString()
  listId!: string | undefined;

  @IsNumber()
  limit!: number;

  @IsNumber()
  offset!: number;
}

/*---------------------------------------------------------------------------- 
    DTO for list query response
----------------------------------------------------------------------------*/

export class ListSlugQueryOutput {
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @IsObject()
  schema!: object;
}

export class ListSlugQueryResponse extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => ListSlugQueryOutput)
  result!: ListSlugQueryOutput;
}
