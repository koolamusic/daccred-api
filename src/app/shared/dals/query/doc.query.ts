/*********************************************************************
/ Use Response to determine the DTO output from Rest Controllers
/ Use Output to determine output from Services, Repos etc
/ 
/ Use Query to for query type requests
/ Use QueryParams when it's a REST /:id or ?id= paramaeter
/ Extend the BaseResponseDTO for Response type DTOs
/********************************************************************* */

import 'reflect-metadata';
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BaseResponseDTO } from '../base.dal';
import { Type } from 'class-transformer';
import { DocumentStatus } from '../../definitions';

/*---------------------------------------------------------------------------- 
        API query to document
----------------------------------------------------------------------------*/

export class GetDocumentQueryParams {
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @IsString()
  @IsNotEmpty()
  hash!: string;
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

export class DocumentQueryOutput {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  /* JSON stringified Design Editor Schema */
  @IsObject()
  @IsNotEmpty()
  editorSchema!: object;

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

  @IsString()
  @IsOptional()
  publishDate?: Date;

  @IsString()
  @IsOptional()
  transactionHash?: Date;

  @IsString()
  @IsOptional()
  recipientListSlug?: string;
}

export class DocumentQueryResponse extends BaseResponseDTO {
  @ValidateNested()
  @Type(() => DocumentQueryOutput)
  result!: DocumentQueryOutput;
}
