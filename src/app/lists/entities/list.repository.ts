import { ListModel, ListProp, ListDocument } from './list.model';
import { JSONSchema7 } from 'json-schema';
import { generateUniqueName, generateUrlSlug } from '../../shared/utils';
import { CreateListCommand } from '../../shared/dals/command/list.command';

export class ListRepository extends ListModel {
  /**
   * @name _schema
   * The default JSON Schema object to define the shape
   * of recipient data we collect in our lists
   */
  static _schema: JSONSchema7 = {
    title: 'Secure your spot',
    description: 'Secure a spot to claim your certificate',
    type: 'object',
    properties: {
      full_name: {
        type: 'string',
        title: 'Your Full Name',
      },
      email: {
        type: 'string',
        title: 'Your email address',
      },
      wallet_address: {
        type: 'string',
        title: 'Your Wallet Address',
      },
    },
    required: ['full_name', 'email', 'wallet_address'],
  };

  /**
   * @dev
   * Return the configuration of a list using their id
   */
  static async getListById(id: string): Promise<ListDocument | null> {
    return await ListModel.findOne({ _id: id });
  }

  /**
   * @dev
   * Return the metadata for a list using their slug and only
   * output information that can be used in public for ingress methods
   */
  static async getListByUrlSlug(slug: string): Promise<ListDocument | null> {
    return await ListModel.findOne({ slug });
  }

  /**
   * @dev
   * Creates a new list item for an account using the current documentId as master
   * We also stub the list with a default predefined JSONSchema7 Schema object to define
   * the shape of the data we expect from the list
   *
   * @returns ListModel
   * @param ListProp
   *
   * @example
   * await this.createNewListRecord({ documents, ownerId })
   *
   */
  static async createNewListRecord(payload: CreateListCommand): Promise<ListDocument> {
    try {
      const list = await this.create({
        name: generateUniqueName(),
        slug: `lqf${generateUrlSlug()}`,
        schema: this._schema,
        documents: [payload.documentId],
        ownerId: payload.ownerId,
      });

      return list;
    } catch (error) {
      console.error(error, `error log from [createNewListRecord]`);
      throw new Error(error as undefined);
    }
  }
}
