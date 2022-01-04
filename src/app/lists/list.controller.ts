/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Post, Get, Param, HttpCode, JsonController, OnUndefined, Authorized, Patch } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import HttpResult from '../../infra/result';
import { CAN_CREATE_CREDENTIAL, CAN_CREATE_LIST } from '../shared/constants';
import {
  CreateListCommand,
  CreateListCommandOutput,
  CreateListCommandResponse,
} from '../shared/dals/command/list.command';
import { ListSlugQueryOutput, ListSlugQueryResponse } from '../shared/dals/query/list.query';
import { ListService } from './list.service';

@JsonController('/lists')
@OpenAPI({
  description: 'Handle the creation of documents that represent accreditations and certificates',
})
export class ListController {
  private listService = new ListService();
  private result = new HttpResult({ name: 'Recipient List' });

  @Patch('/:id')
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized([CAN_CREATE_CREDENTIAL]) // This is a stub to simply disable this action tempoarily
  @ResponseSchema(class FClass {})
  async updateListMetadata(): // @Body({ required: true, validate: true }) input: any
  Promise<undefined> {
    return undefined;
  }

  @Post()
  @HttpCode(201)
  @OnUndefined(204)
  @Authorized([CAN_CREATE_LIST])
  @ResponseSchema(CreateListCommandResponse)
  async createNewRecipientListWithSchema(@Body({ required: true, validate: true }) input: CreateListCommand) {
    const handler = await this.listService.createRecipientList(input);
    const result = {
      id: handler.id,
      name: handler.name,
      slug: handler.slug,
      schema: JSON.stringify(handler.schema),
    };

    /* Return response from Controller using HttpResult format */
    return this.result.post<CreateListCommandOutput>(result);
  }

  @Get('/:id')
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized([CAN_CREATE_CREDENTIAL]) // This is a stub to simply disable this action tempoarily
  @ResponseSchema(class FClass {})
  async getAllListRecipientsWithListMeta(@Body({ required: true, validate: true }) _input: any): Promise<any> {
    /* Add condition to handle if the request also wants the aggregate of recipient data... else return only list metadat or return list with all recorded recipients  */
    return undefined;
  }

  @Get('/ingress/:slug')
  @HttpCode(200)
  @OnUndefined(204)
  @ResponseSchema(ListSlugQueryResponse)
  async returnPublicListSchemaByRouteSlug(@Param('slug') slug: string) {
    const handler = await this.listService.getSchemaFromSlug(slug);
    const result = {
      slug: handler.slug,
      schema: JSON.stringify(handler.schema),
    };

    /* Return response from Controller using HttpResult format */
    return this.result.get<ListSlugQueryOutput>(result);
  }

  @Post('/ingress/forms')
  @HttpCode(201)
  @OnUndefined(204)
  @ResponseSchema(ListSlugQueryResponse)
  async addRecipientToListByFormIngressMethod(@Body({ required: true, validate: true }) _input: any): Promise<any> {
    return undefined;
  }
}
