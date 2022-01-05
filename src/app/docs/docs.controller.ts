import {
  Body,
  Post,
  Get,
  HttpCode,
  JsonController,
  OnUndefined,
  Authorized,
  Patch,
  CurrentUser,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import HttpResult from '../../infra/result';
import { CAN_CREATE_CREDENTIAL } from '../shared/constants';
import { DocumentService } from './docs.service';
import {
  CreateDocumentCommand,
  CreateDocumentCommandResponse,
  DocumentCommandOutput,
} from '../shared/dals/command/doc.command';
import { IJWTClaim } from '../shared/definitions';

@JsonController('/docs')
@OpenAPI({
  description: 'Handle the creation of documents that represent accreditations and certificates',
})
export class DocsController {
  private documentService = new DocumentService();
  private result = new HttpResult({ name: 'Decentralized Credential' });

  @Post()
  @HttpCode(201)
  @OnUndefined(204)
  @Authorized([CAN_CREATE_CREDENTIAL])
  @ResponseSchema(CreateDocumentCommandResponse)
  async createNewDocument(
    @Body({ required: true, validate: true }) input: CreateDocumentCommand,
    @CurrentUser({ required: true }) user: IJWTClaim
  ) {
    const handler = await this.documentService.bootstrapNewAccredDocument({
      owner: user.eth,
      payload: input,
    });

    /* Return response from Controller using HttpResult format */
    this.result.post<DocumentCommandOutput>({
      ...handler,
    });
  }

  @Get('/:id')
  @HttpCode(201)
  @OnUndefined(204)
  @Authorized()
  @ResponseSchema()
  async getSingleDocument(): // @Body({ required: true, validate: true }) input: any
  Promise<undefined> {
    return undefined;
  }

  @Get()
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized()
  @ResponseSchema()
  async getAllDocumentsForAccount(): // @Body({ required: true, validate: true }) input: any
  Promise<undefined> {
    return undefined;
  }

  @Patch('/meta')
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized()
  @ResponseSchema()
  async updateMetadataForDocument(): // @Body({ required: true, validate: true }) input: any
  Promise<undefined> {
    return undefined;
  }
}
