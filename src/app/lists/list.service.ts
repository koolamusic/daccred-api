import { ListRepository } from './entities/list.repository';
import { ListDocument } from './entities/list.model';
import ServerError from '../../infra/errors';
import logger from '../../infra/logger';
import { CreateListCommand, FormIngressCommandInput } from '../shared/dals/command/list.command';
import { NotFoundError } from 'routing-controllers';
import { RecipientRepository } from '../shared/entities';
import { DataIngress } from '../shared/definitions';

export class ListService {
  private logger = logger;

  /**
   * @dev
   * Use the repository to create a new user list and also append default
   * schema and url slug for ingress
   *
   * @param CreateListCommand
   */
  async createRecipientList(data: CreateListCommand): Promise<ListDocument> {
    try {
      return await ListRepository.createNewListRecord(data);
    } catch (error) {
      this.logger.error(`${error} - [ListService:createRecipientList]`);
      throw new ServerError(error);
    }
  }

  /**
   * Get the Data Schema for a list, to use for adding recipients data
   * @param slug - a url safe slug used on the client to reference the list
   */
  async getSchemaFromSlug(slug: string): Promise<ListDocument> {
    try {
      const result = await ListRepository.getListByUrlSlug(slug);
      if (!result) throw new NotFoundError('Waitlist not found');

      /* return result, after validating we have a result */
      return result;
    } catch (error) {
      this.logger.error(`${error} - [ListService:getSchemaFromSlug]`);
      throw new ServerError(error);
    }
  }

  /**
   * Use this service to handle storing of a single recipient data from an
   * ingress method, mostly forms for now
   *
   * @param payload - an object that has the recipient JSON and list slug_id
   *
   * We want to handle this by validating the json-schema against the jsonResponse input
   * Then ensure that we dont have an existing recipient with the two most important identifier
   * wallet_address or email_address, before we then persist them to the collection
   */
  async handleSingleEntityIngress(payload: FormIngressCommandInput) {
    try {
      /* Get parent list and validate json response */
      const list = await ListRepository.validateRecipientEntryBySlug(payload);

      /* Build payload and create new recipient */
      const result = await RecipientRepository.addOneNewRecipientToList({
        listDocument: list,
        jsonResponse: payload.jsonResponse,
        medium: DataIngress.FORMS,
      });

      /* Return the recipient id back to client */
      return result;
    } catch (error) {
      this.logger.error(`${error} - [ListService:handleSingleEntityIngress]`);
      throw new ServerError(error);
    }
  }

  /**
   * Retrieve all recipients in a list, using paginate params
   * @param RecipientListQueryParams
   */
  async getAllListRecipients() {
    return undefined;
  }
}
