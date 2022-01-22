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
  Param,
} from 'routing-controllers';
import HttpResult from '../../infra/result';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CAN_CREATE_CREDENTIAL } from '../shared/constants';
import { DocumentService } from './docs.service';
import {
  CreateDocumentCommand,
  CreateDocumentCommandResponse,
  DocumentCommandOutput,
  DocumentQueryResponse,
  DocumentQueryOutput,
  MutateDocumentCommand,
} from '../shared/dals';
import { User } from '../shared/entities';

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
    @Body({ required: true }) input: CreateDocumentCommand,
    @CurrentUser({ required: true }) user: User
  ) {

    
    const handler = await this.documentService.bootstrapNewAccredDocument({
      owner: user.publicAddress,
      payload: input,
    });
    
    console.log(handler, "reached the controller")
    /* Return response from Controller using HttpResult format */
    return this.result.post<DocumentCommandOutput>({
      name: handler.name,
      slug: handler.slug,
      status: handler.status,
      owner: handler.owner,
      networkId: handler.networkId,
      description: handler.description,
      networkName: handler.networkName,
      editorSchema: handler.editorSchema,
      deployerAddress: handler.deployerAddress,
      recipientListId: handler.recipientsListId.toString(),
    });
  }

  @Get('/:slug')
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized()
  @ResponseSchema(DocumentQueryResponse)
  async getSingleDocument(
    @CurrentUser({ required: true }) user: User,
    @Param('slug') slug: string
  ): Promise<DocumentQueryResponse> {
    const handler = await this.documentService.getOneAccredDocument({
      owner: user.publicAddress,
      hash: slug,
    });

    console.log(handler);

    /* Return response from Controller using HttpResult format */
    return this.result.get<DocumentQueryOutput>({
      id: handler.id,
      name: handler.name,
      slug: handler.slug,
      status: handler.status,
      owner: handler.owner,
      networkId: handler.networkId,
      description: handler.description,
      networkName: handler.networkName,
      editorSchema: handler.editorSchema,
      deployerAddress: handler.deployerAddress,
      recipientListId: handler.recipientsListId.toString(),
    });
  }

  @Get()
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized()
  @ResponseSchema(CreateDocumentCommandResponse)
  async getAllDocumentsForAccount(): // @Body({ required: true, validate: true }) input: any
  Promise<undefined> {
    return undefined;
  }

  @Patch('/:slug')
  @HttpCode(200)
  @OnUndefined(204)
  @Authorized()
  @ResponseSchema(DocumentQueryResponse)
  async updateMetadataForDocument(
    @CurrentUser({ required: true }) user: User,
    @Param('slug') slug: string,
    @Body({ required: true, validate: true }) input: MutateDocumentCommand
  ): Promise<DocumentQueryResponse> {
    const handler = await this.documentService.updateDocumentMetadata({
      owner: user.publicAddress,
      payload: input,
      hash: slug,
    });

    return this.result.patch<DocumentQueryOutput>({
      id: handler.id,
      name: handler.name,
      slug: handler.slug,
      status: handler.status,
      owner: handler.owner,
      networkId: handler.networkId,
      description: handler.description,
      networkName: handler.networkName,
      editorSchema: handler.editorSchema,
      deployerAddress: handler.deployerAddress,
      recipientListId: handler.recipientsListId.toString(),
    });
  }
}
