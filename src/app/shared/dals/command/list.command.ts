/*********************************************************************
/ Use Response to determine the DTO output from Rest Controllers
/ Use Output to determine output from Services, Repos etc
/ 
/ Use Query to for query type requests
/ Use QueryParams when it's a REST /:id or ?id= paramaeter
/ Extend the BaseQueryResult for Response type DTOs
/********************************************************************* */

import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { BaseQueryResult } from '../base';

/*---------------------------------------------------------------------------- 
        API Command to create a new recipients lists
----------------------------------------------------------------------------*/

export class CreateListCommand {
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
    DTO for create list command response
----------------------------------------------------------------------------*/

export class CreateListCommandOutput {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  slug!: string;

  @IsString()
  schema!: string;
}

export class CreateListCommandResponse extends BaseQueryResult {
  @ValidateNested()
  @Type(() => CreateListCommandOutput)
  result!: CreateListCommandOutput;
}
