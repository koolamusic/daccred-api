import { ListRepository } from './entities/list.repository';
import { ListDocument } from './entities/list.model';
import ServerError from '../../infra/errors';
import logger from '../../infra/logger';
import { CreateListCommand } from '../shared/dals/command/list.command';
import { NotFoundError } from 'routing-controllers';

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
}
