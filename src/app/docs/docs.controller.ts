import { Body, Post, Get, HttpCode, JsonController, OnUndefined, Authorized, Patch } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CAN_CREATE_CREDENTIAL } from '../shared/constants';

@JsonController('/docs')
@OpenAPI({
  description: 'Handle the creation of documents that represent accreditations and certificates',
})
export class DocsController {
  @Post()
  @HttpCode(201)
  @OnUndefined(204)
  @ResponseSchema(class XClassP {})
  async createNewDocument(@Body({ required: true, validate: true }) input: any): Promise<any> {
    return undefined;
  }

  @Get('/:id')
  @HttpCode(201)
  @OnUndefined(204)
  @Authorized([CAN_CREATE_CREDENTIAL]) // This is a stub to simply disable this action tempoarily
  @ResponseSchema(class FClass {})
  async getSingleDocument(@Body({ required: true, validate: true }) input: any): Promise<any> {
    return undefined;
  }

  @Get()
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized([CAN_CREATE_CREDENTIAL]) // This is a stub to simply disable this action tempoarily
  @ResponseSchema(class FClass {})
  async getAllDocumentsForAccount(@Body({ required: true, validate: true }) input: any): Promise<any> {
    return undefined;
  }

  @Patch('/meta')
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized([CAN_CREATE_CREDENTIAL]) // This is a stub to simply disable this action tempoarily
  @ResponseSchema(class FClass {})
  async updateMetadataForDocument(@Body({ required: true, validate: true }) input: any): Promise<any> {
    return undefined;
  }
}
