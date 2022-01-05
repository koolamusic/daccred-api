/*********************************************************************
/ Use Response to determine the DTO output from Rest Controllers
/ Use Output to determine output from Services, Repos etc
/ 
/ Use Query to for query type requests
/ Use QueryParams when it's a REST /:id or ?id= paramaeter
/ Extend the BaseResponseDTO for Response type DTOs
/********************************************************************* */

import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { BaseResponseDTO } from '../base.dal';

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

  /* The main wallet address associated with this accounts JWT */
  @IsNotEmpty()
  @IsString()
  publicAddress!: string;
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

export class CreateListCommandResponse extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => CreateListCommandOutput)
  result!: CreateListCommandOutput;
}

/*---------------------------------------------------------------------------- 
    DTO for add recipient to list using form ingress entry
----------------------------------------------------------------------------*/

export class FormIngressCommandInput {
  @IsString()
  slug!: string;

  /* The JSON object from field values in user submitted form */
  @IsObject()
  jsonResponse!: object;
}

export class FormIngressCommandOutput {
  @IsString()
  operationId!: string;
}

export class FormIngressCommandResponse extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => FormIngressCommandOutput)
  result!: FormIngressCommandOutput;
}
