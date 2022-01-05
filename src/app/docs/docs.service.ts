import ServerError, { UnprocessableEntityError } from '../../infra/errors';
import logger from '../../infra/logger';
import { ListRepository } from '../lists';
import { CreateDocumentCommand } from '../shared/dals/command/doc.command';
import { DocumentRepository } from './entities/doc.repository';

export interface BoostrapDocumentOpts {
  owner: string;
  payload: CreateDocumentCommand;
}

export class DocumentService {
  private logger = logger;

  async bootstrapNewAccredDocument({ owner, payload }: BoostrapDocumentOpts) {
    try {
      // Handle creation of the document
      const doc = await DocumentRepository.createAccredDocument({ owner, payload });

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

  async getAllDocumentsForAccount({ owner, query }) {
    return undefined;
  }

  async updateDocumentMetadata({ owner, payload }) {
    return undefined;
  }

  async getOneAccredDocument({ owner, documentHash }) {
    return undefined;
  }
}
