import { NotFoundError, BadRequestError } from 'routing-controllers';
import ErrorHandler, { UnprocessableEntityError } from '../../../infra/errors';
import logger from '../../../infra/logger';
import { SubscriberCollection, SubscriberModel } from '../../models/subscriber.model';
import {
  CreateSubscriberRequest,
  UpdateSubscriberRequest,
  SubscriberProfileDTO,
} from '../../shared/contracts/subscriber.contracts';
import { DocumentType } from '@typegoose/typegoose';
import { UserModel } from '../../models/user.model';

export default class SubscriberService {
  public async createSubscriberOnSignup(data: CreateSubscriberRequest): Promise<DocumentType<SubscriberCollection>> {
    try {
      /* Check that subscriber account does not exist */
      const subscriberDocument = await SubscriberModel.findOne({ subscriberId: data.subscriberId });
      if (subscriberDocument) throw new BadRequestError('Subscriber Already Exist');

      return await SubscriberModel.create({ ...data });
    } catch (err) {
      logger.error(`[SubscriberService:createSubscriber]: ${err}`);
      UserModel.findOneAndDelete(data.ownerId);

      /* Add error to logs and pipe */
      logger.debug(`Failed: Reverting Subscriber account creation because ${err}`);
      throw new ErrorHandler(err);
    }
  }

  public async createSubscriber(data: CreateSubscriberRequest): Promise<DocumentType<SubscriberCollection>> {
    try {
      /* Check that subscriber account does not exist */
      const subscriberDocument = await SubscriberModel.findOne({ subscriberId: data.subscriberId });
      if (subscriberDocument) throw new BadRequestError('Subscriber Already Exist');

      return await SubscriberModel.create({ ...data });
    } catch (err) {
      logger.error(`[SubscriberService:createSubscriber]: ${err}`);
      throw new ErrorHandler(err);
    }
  }

  public async updateSubscriber(ownerId: string, user: UpdateSubscriberRequest): Promise<SubscriberProfileDTO> {
    try {
      const subscriberDocument = await SubscriberModel.findOne({ ownerId });
      if (!subscriberDocument) throw new NotFoundError('Subscriber Does not Exist');

      /* Handle API Update request */
      const updatedSubscriber = await SubscriberModel.findOneAndUpdate({ ownerId }, user, {
        new: true,
      });
      if (!updatedSubscriber) throw new UnprocessableEntityError();

      const updatedData: SubscriberProfileDTO = {
        subscriberId: updatedSubscriber.subscriberId,
        address: updatedSubscriber.address,
        businessName: updatedSubscriber.businessName,
        city: updatedSubscriber.city,
        ownerId: updatedSubscriber.ownerId,
        rootEmail: updatedSubscriber.rootEmail,
        state: updatedSubscriber.state,
        subscriptionId: updatedSubscriber.subscriptionId,
        zip: updatedSubscriber.zip,
      };

      return updatedData;
    } catch (err) {
      logger.error(`[SubscriberService:updateSubscriber]: ${err}`);
      throw new ErrorHandler(err);
    }
  }

  public async findSubscriber(ownerId: string): Promise<void | SubscriberProfileDTO> {
    try {
      const subscriberDocument = await SubscriberModel.findOne({ ownerId });
      if (!subscriberDocument) throw new NotFoundError('Subscriber Does not Exist');

      /* Build response payload */
      const subscriberProfile: SubscriberProfileDTO = {
        subscriberId: subscriberDocument.subscriberId,
        address: subscriberDocument.address,
        city: subscriberDocument.city,
        state: subscriberDocument.state,
        businessName: subscriberDocument.businessName,
        ownerId: subscriberDocument.ownerId,
        zip: subscriberDocument.zip,
        rootEmail: subscriberDocument.rootEmail,
        subscriptionId: subscriberDocument.subscriptionId,
      };

      return subscriberProfile;
    } catch (err) {
      logger.error(`[SubscriberService:findSubscriber]: ${err}`);
      throw new ErrorHandler(err);
    }
  }
}
