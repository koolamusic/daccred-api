import { JSONSchema7 } from 'json-schema';
import ServerError, { ConflictError } from '../../../infra/errors';
import { ListModel, ListDocument } from './list.model';
import { generateUniqueName, generateUrlSlug, isValidJSONResponse } from '../../shared/utils';
import { CreateListCommand, FormIngressCommandInput } from '../../shared/dals/command/list.command';

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
        ownerId: payload.publicAddress,
      });

      return list;
    } catch (error) {
      console.error(error, `error log from [createNewListRecord]`);
      throw new Error(error as undefined);
    }
  }

  /**
   * Validate the recipient entry from a single ingress route using the slug
   * ensure the jsonResponse validates against the current lists schema
   *
   * @params jsonResponse - the JSON response from client
   * @params slug - the url Slug to identify a list
   * @returns ListDocument
   */
  static async validateRecipientEntryBySlug({ jsonResponse, slug }: FormIngressCommandInput): Promise<ListDocument> {
    try {
      /* handle retrieving the list doc */
      const list = await this.getListByUrlSlug(slug);
      if (!list) throw new Error('Recipient list not found');

      /* Ensure the recipient input is valid against JSON schema object */
      if (isValidJSONResponse({ schema: list.schema, json: jsonResponse })) {
        return list;
      }
      throw new ConflictError('input validation failed');
    } catch (error) {
      console.error(error, `error log from [ListRepository:validateRecipientEntryBySlug]`);
      throw new ServerError(error);
    }
  }
}
