/*********************************************************************
/ Use Response to determine the DTO output from Rest Controllers
/ Use Output to determine output from Services, Repos etc
/ 
/ Use Query to for query type requests
/ Use QueryParams when it's a REST /:id or ?id= paramaeter
/ Extend the BaseQueryResult for Response type DTOs
/********************************************************************* */

import 'reflect-metadata';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { BaseQueryResult } from '../base';
import { Type } from 'class-transformer';

/*---------------------------------------------------------------------------- 
        API query to list
----------------------------------------------------------------------------*/

export class RecipientListQueryParams {
  @IsString()
  ownerId!: string | undefined;

  @IsString()
  listId!: string | undefined;

  @IsNumber()
  limit!: number;

  @IsNumber()
  offset!: number;
}

export class SingleListQueryResult {
  @IsNotEmpty()
  @IsString()
  documentId!: string;

  /* JSON stringified Schema */
  // @IsNotEmpty()
  // schema!: string;

  @IsNotEmpty()
  @IsString()
  ownerId!: string;
}

/*---------------------------------------------------------------------------- 
    DTO for list query response
----------------------------------------------------------------------------*/

export class ListSlugQueryOutput {
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @IsString()
  schema!: string;
}

export class ListSlugQueryResponse extends BaseQueryResult {
  @ValidateNested()
  @Type(() => ListSlugQueryOutput)
  result!: ListSlugQueryOutput;
}
