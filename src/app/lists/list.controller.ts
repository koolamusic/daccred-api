import { Body, Post, Get, HttpCode, JsonController, OnUndefined, Authorized, Patch } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CAN_CREATE_CREDENTIAL } from '../shared/constants';

@JsonController('/lists')
@OpenAPI({
  description: 'Handle the creation of documents that represent accreditations and certificates',
})
export class ListController {
  @Post()
  @HttpCode(201)
  @OnUndefined(204)
  @ResponseSchema(class XClassP {})
  async createNewRecipientListWithEntry(@Body({ required: true, validate: true }) input: any): Promise<any> {
    return undefined;
  }

  @Get('/:id')
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized([CAN_CREATE_CREDENTIAL]) // This is a stub to simply disable this action tempoarily
  @ResponseSchema(class FClass {})
  async getListMetadataWithRecipientsById(@Body({ required: true, validate: true }) input: any): Promise<any> {
    /* Add condition to handle if the request also wants the aggregate of recipient data... else return only list metadat or return list with all recorded recipients  */
    return undefined;
  }

  @Patch('/:id')
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized([CAN_CREATE_CREDENTIAL]) // This is a stub to simply disable this action tempoarily
  @ResponseSchema(class FClass {})
  async updateListMetadata(@Body({ required: true, validate: true }) input: any): Promise<any> {
    return undefined;
  }

  @Get('/schema/:slug')
  @HttpCode(200)
  @OnUndefined(204)
  @ResponseSchema(class FClass {})
  async returnPublicListSchemaByRouteSlug(@Body({ required: true, validate: true }) input: any): Promise<any> {
    return undefined;
  }

  @Post('/datasource/forms')
  @HttpCode(201)
  @OnUndefined(204)
  @ResponseSchema(class XClassP {})
  async AddRecipientToListFromFormDatasource(@Body({ required: true, validate: true }) input: any): Promise<any> {
    return undefined;
  }
}
