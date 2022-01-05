/*********************************************************************
/ Use Response to determine the DTO output from Rest Controllers
/ Use Output to determine output from Services, Repos etc
/ 
/ Use Query to for query type requests
/ Use QueryParams when it's a REST /:id or ?id= paramaeter
/ Extend the BaseResponseDTO for Response type DTOs
/********************************************************************* */

import 'reflect-metadata';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { BaseResponseDTO } from '../base';
import { Type } from 'class-transformer';

/*---------------------------------------------------------------------------- 
        API query to document
----------------------------------------------------------------------------*/

export class GetDocumentQueryParams {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;
}

export class ListDocumentsQueryParams {
  @IsNotEmpty()
  @IsString()
  ownerId!: string;

  @IsNumber()
  @IsNotEmpty()
  limit!: number;

  @IsNumber()
  @IsNotEmpty()
  offset!: number;
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

export class ListSlugQueryResponse extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => ListSlugQueryOutput)
  result!: ListSlugQueryOutput;
}
