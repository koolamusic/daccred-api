import { isEmpty } from 'lodash';
import { NotFoundError } from 'routing-controllers';
import { RecipientDocument } from '..';
import ServerError from '../../../../infra/errors';
import { ListIngressProp, RecipientModel } from './recipient.model';

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
  static async getRecipientsByListId({ listId, limit, offset }) {
    try {
      const query: Partial<ListIngressProp> = {
        listId: listId,
      };
      const options = {
        limit: parseInt(limit),
        offset: parseInt(offset) || 0,
      };

      const collection = await RecipientModel.paginate(query, options);
      // if (isEmpty(collection.docs)) throw new NotFoundError('Recipients not found');

      console.log(collection);
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
  static async getRecipientsByOwner({ ownerId, limit, offset }) {
    try {
      const query: Partial<ListIngressProp> = {
        listOwnerId: ownerId,
      };
      const options = {
        limit: limit,
        offset: offset,
        customLabels: {
          docs: 'result',
        },
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
   * according to the defined uniqueIdentifier in the List Collection.
   *  // build recipient payload with listOwnerId and listId
   *
   * @params jsonResponse - the JSON response from client
   * @params slug - the url Slug to identify a list
   * @returns ListDocument
   *
   * @returns ListModel
   * @param ListProp
   *
   * @example
   * await this.createNewListRecord({ documents, ownerId })
   */
  static async addOneNewRecipientToList() {
    try {
      /* handle retrieving the list doc */
    } catch (error) {
      console.error(error, `error log from [ListRepository:addNewRecipientToList]`);
      throw new ServerError(error);
    }
  }
}
