import { ListRepository } from './entities/list.repository';
import { ListDocument } from './entities/list.model';
import ServerError from '../../infra/errors';
import logger from '../../infra/logger';
import { CreateListCommand } from '../shared/dals/command/list.command';

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
}
