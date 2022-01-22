import logger from '../../infra/logger';
import { ListRepository } from '../lists';
import ServerError, { UnprocessableEntityError } from '../../infra/errors';
import { CreateDocumentCommand, MutateDocumentCommand } from '../shared/dals/command/doc.command';
import { DocumentRepository } from './entities/doc.repository';
import { AccredDocument } from './entities/doc.model';
import { GetDocumentQueryParams } from '../shared/dals';

export interface MutateDocOptions {
  owner: string;
  hash: string;
  payload: MutateDocumentCommand;
}

export interface DocBootstrapOptions {
  owner: string;
  payload: CreateDocumentCommand;
}

export class DocumentService {
  private logger = logger;

  async bootstrapNewAccredDocument({ owner, payload }: DocBootstrapOptions) {
    try {
      // Handle creation of the document
      const doc = await DocumentRepository.createAccredDocument({ owner, payload });

      console.log(doc)

      // use document info to create a new recipient list
      const recipientList = await ListRepository.createNewListRecord({
        documentId: doc.id,
        publicAddress: owner,
      });

      if (!recipientList) {
        /* Delete the document we created, lets try again */
        doc.deleteOne();
        throw new UnprocessableEntityError('Cannot process request');
      }

      /* Update accred document with attachment to a recipient list and return */
      doc.recipientsListId = recipientList.id;
      return await doc.save();
    } catch (error) {
      this.logger.error(`${error} - [DocumentService:bootstrapNewAccredDocument]`);
      throw new ServerError(error);
    }
  }

  async getAllDocumentsForAccount(): // { owner, query }
  Promise<undefined[]> {
    try {
      return [undefined];
    } catch (error) {
      this.logger.error(`${error} - [DocumentService:getAllDocumentsForAccount]`);
      throw new ServerError(error);
    }
  }

  async updateDocumentMetadata({ hash, owner, payload }: MutateDocOptions) {
    try {
      return await DocumentRepository.updateOneDocument({
        slug: hash,
        owner: owner,
        payload: payload,
      });
    } catch (error) {
      this.logger.error(`${error} - [DocumentService:updateDocumentMetadata]`);
      throw new ServerError(error);
    }
  }

  async getOneAccredDocument({ owner, hash }: GetDocumentQueryParams): Promise<AccredDocument> {
    try {
      return await DocumentRepository.getDocumentByHash({
        hash: hash,
        owner: owner,
      });
    } catch (error) {
      this.logger.error(`${error} - [DocumentService:getOneAccredDocument]`);
      throw new ServerError(error);
    }
  }
}
