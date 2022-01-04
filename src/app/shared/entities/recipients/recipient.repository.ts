import { isEmpty } from 'lodash';
import { NotFoundError } from 'routing-controllers';
import { RecipientDocument } from '..';
import ServerError, { UnprocessableEntityError } from '../../../../infra/errors';
import { ListDocument } from '../../../lists';
import { RecipientListQueryParams } from '../../dals/query/list.query';
import { DataIngress } from '../../definitions';
import { ListIngressProp, RecipientModel } from './recipient.model';

export interface RecipientIngressOptions {
  jsonResponse: object;
  listDocument: ListDocument;
  medium: DataIngress;
}

export class RecipientRepository extends RecipientModel {
  /**
   * @name getRecipientById
   * Return a single recipient by Id
   */
  static async getRecipientById(id: string): Promise<RecipientDocument> {
    const recipients = await RecipientModel.findOne({ _id: id });
    if (!recipients) throw new NotFoundError('Cannot find recipient');

    /* All checks out, we have the document */
    return recipients;
  }

  /**
   * @name getRecipientsByListId
   * @return [RecipientDocument] - a list of recipients that belong to a recipient list
   */
  static async getRecipientsByListId({ listId, limit, offset }: RecipientListQueryParams) {
    try {
      const query: Partial<ListIngressProp> = {
        listId: listId,
      };
      const options = {
        limit: limit ?? 10,
        offset: offset ?? 0,
      };

      const collection = await RecipientModel.paginate(query, options);
      if (isEmpty(collection.result)) throw new NotFoundError('Recipients not found');

      /* Handle response */
      return collection;
    } catch (error) {
      console.error(error, `error log from [RecipientRepository:getRecipientsByListId]`);
      throw new ServerError(error);
    }
  }

  /**
   * @name getRecipientsByOwner
   * @return [RecipientDocument] - a list of recipients by wallet addres / workspace
   */
  static async getRecipientsByOwner({ ownerId, limit, offset }: RecipientListQueryParams) {
    try {
      const query: Partial<ListIngressProp> = {
        listOwnerId: ownerId,
      };
      const options = {
        limit: limit ?? 10,
        offset: offset ?? 0,
      };

      const collection = await RecipientModel.paginate(query, options);
      if (isEmpty(collection.docs)) throw new NotFoundError('Recipients not found');

      console.log(collection);
      /* Handle response */
      return collection;
    } catch (error) {
      console.error(error, `error log from [RecipientRepository:getRecipientsByListId]`);
      throw new ServerError(error);
    }
  }

  /**
   * @todo Validate that email or wallet_address does not exist in a list collection
   * according to the defined uniqueIdentifier in the List Collection and JSON Schema
   *  // build recipient payload with listOwnerId and listId
   *
   * @params jsonResponse - the JSON response from client
   * @params listDocument - The mongo list document that recipient belongs to
   * @returns string - id of the recipient document
   *
   * @example
   * await this.addOneNewRecipientToList({
   *    listDocument: list,
   *    jsonResponse: payload.jsonResponse,
   *    medium: DataIngress.FORMS
   *  })
   */
  static async addOneNewRecipientToList({ listDocument, medium, jsonResponse }: RecipientIngressOptions) {
    try {
      /* build the recipient create payload */
      const recipient: Partial<ListIngressProp> = {};

      recipient.listId = listDocument.id;
      recipient.listOwnerId = listDocument.ownerId;
      recipient.jsonResponse = jsonResponse;
      recipient.pipeline = medium;

      /* Add recipient to collection */
      const operation = await RecipientModel.create(recipient);

      if (!operation) throw new UnprocessableEntityError('Cannot process operation');
      return operation;
    } catch (error) {
      console.error(error, `error log from [ListRepository:addNewRecipientToList]`);
      throw new ServerError(error);
    }
  }
}
