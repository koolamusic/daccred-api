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
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BaseResponseDTO } from '../base';
import { DocumentStatus } from '../../definitions';

/*---------------------------------------------------------------------------- 
  API Command to create a new accred document
----------------------------------------------------------------------------*/

export class DocumentCommandOutput {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  /* JSON stringified Design Editor Schema */
  @IsString()
  @IsNotEmpty()
  editorSchema!: string;

  @IsNotEmpty()
  @IsString()
  networkName!: string;

  @IsNotEmpty()
  @IsString()
  networkId!: string; // 0x0 = Ethereum

  /* Sometimes the deployer address could be seperate from the owned account */
  @IsNotEmpty()
  @IsString()
  deployerAddress!: string;

  @IsNotEmpty()
  @IsString()
  slug!: string;

  @IsNotEmpty()
  @IsString()
  owner!: string;

  @IsEnum(DocumentStatus)
  status!: DocumentStatus;

  @IsString()
  @IsOptional()
  contractAddress?: string;

  // <> transactionHash: string;
  @IsString()
  @IsOptional()
  publishDate?: Date;

  @IsString()
  @IsOptional()
  recipientListId?: string;
}

export class CreateDocumentCommand {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  /* JSON stringified Design Editor Schema */
  @IsString()
  @IsNotEmpty()
  editorSchema!: string;

  @IsNotEmpty()
  @IsString()
  networkName!: string;

  @IsNotEmpty()
  @IsString()
  networkId!: string; // 0x0 = Ethereum

  /* Sometimes the deployer address could be seperate from the owned account */
  @IsNotEmpty()
  @IsString()
  deployerAddress!: string;
  // <> transactionHash: string;
  // <> publishDate: Date;
}

export class CreateDocumentCommandResponse extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => DocumentCommandOutput)
  result!: DocumentCommandOutput;
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
