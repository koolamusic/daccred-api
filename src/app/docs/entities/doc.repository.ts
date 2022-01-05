import { isEmpty } from 'lodash';
import { NotFoundError } from 'routing-controllers';
import ServerError, { ConflictError } from '../../../infra/errors';
import { GetDocumentQueryParams, ListDocumentsQueryParams } from '../../shared/dals/query/doc.query';
import { AccredDocProp, AccredDocument, AccredModel } from './doc.model';

export interface MutateDocumentProps {
  owner: string;
  payload: Partial<AccredDocProp>;
}

export class DocumentRepository extends AccredModel {
  /**
   * @name getDocumentByHash
   * Return a single document by ID.
   */
  static async getDocumentByHash({ slug, owner }: GetDocumentQueryParams): Promise<AccredDocument> {
    const document = await AccredModel.findOne({ slug, owner });
    if (!document) throw new NotFoundError('Cannot find credential');

    /* All checks out, we have the document */
    return document;
  }

  /**
   * @name getDocumentsQuery
   * @return [AccredDocument] - a list of recipients that belong to a recipient list
   */
  static async getDocumentsQuery({ ownerId, limit, offset }: ListDocumentsQueryParams) {
    try {
      const query: Partial<AccredDocProp> = {
        owner: ownerId,
      };
      const options = {
        limit: limit,
        offset: offset,
      };

      const collection = await AccredModel.paginate(query, options);
      if (isEmpty(collection.result)) throw new NotFoundError('No documents here');

      /* Handle response */
      return collection;
    } catch (error) {
      console.error(error, `error log from [DocumentRepository:getDocumentsQuery]`);
      throw new ServerError(error);
    }
  }

  /**
   * Find the document by owner and slug, then update the credentials from payload
   * we intentionally omit updating some fields in this operation
   *
   * @name updateOneDocument
   * @return AccredDocument - an updated credential document
   */
  static async updateOneDocument({ owner, payload }: MutateDocumentProps): Promise<AccredDocument> {
    try {
      const doc = await AccredModel.findOne({
        owner: owner,
        slug: payload.slug,
      });
      if (!doc) throw new NotFoundError('Not a valid document');

      /* Create the update payload and populate document */
      doc.name = payload.name || doc.name;
      doc.status = payload.status || doc.status;
      doc.networkId = payload.networkId || doc.networkId;
      doc.description = payload.description || doc.description;
      doc.networkName = payload.networkName || doc.networkName;
      doc.publishDate = payload.publishDate || doc.publishDate;
      doc.editorSchema = payload.editorSchema || doc.editorSchema;
      doc.contractAddress = payload.contractAddress || doc.contractAddress;
      doc.deployerAddress = payload.deployerAddress || doc.deployerAddress;

      /* Save document after manual population */
      return await doc.save();
      // return updatedDoc
    } catch (error) {
      console.error(error, `error log from [DocumentRepository:updateOneDocument]`);
      throw new ServerError(error);
    }
  }
  /**
   * Create a new Credential document
   *
   * @name createAccredDocument
   * @return AccredDocument - an new credential document
   */
  static async createAccredDocument({ owner, payload }: MutateDocumentProps): Promise<AccredDocument> {
    try {
      /* Build payload for creating new document */
      const createNewDocInput = {
        name: payload.name,
        decription: payload.description,
        editorSchema: payload.editorSchema,
        networkName: payload.networkName,
        networkId: payload.networkId,
        deployerAddress: payload.deployerAddress,
      };

      /* Handle doc creation to persistence */
      const doc = await AccredModel.findOne({
        ...createNewDocInput,
        owner: owner,
      });
      if (!doc) throw new ConflictError('Cannot create credential');
      return doc;
    } catch (error) {
      console.error(error, `error log from [DocumentRepository:updateOneDocument]`);
      throw new ServerError(error);
    }
  }
}
