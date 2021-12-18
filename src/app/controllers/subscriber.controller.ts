import { Body, Post, HttpCode, JsonController, Param, Get, Patch, Authorized } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import SubscriberService from '../services/account/subscriber.service';
import { CAN_CREATE_SUBSCRIBER, CAN_READ_SUBSCRIBER, CAN_UPDATE_SUBSCRIBER } from '../shared/constants';
import {
  CreateSubscriberRequest,
  SubscriberCreateResponse,
  UpdateSubscriberRequest,
  SubscriberProfileResponse,
} from '../shared/contracts/subscriber.contracts';

@JsonController('/subscribers')
@OpenAPI({
  description: 'Create , Update , Delete and Read Subscriber Profile',
})
export class SubscriberController {
  private subscriberService = new SubscriberService();

  /* Super Admins only */
  @Post('/')
  @Authorized([CAN_CREATE_SUBSCRIBER])
  @HttpCode(201)
  @ResponseSchema(SubscriberCreateResponse)
  async createSubscriberAccount(
    @Body({ required: true, validate: true }) user: CreateSubscriberRequest
  ): Promise<SubscriberCreateResponse> {
    const { ownerId } = await this.subscriberService.createSubscriber(user);
    return {
      message: 'Successfully Created Subscriber',
      result: ownerId,
    };
  }

  @Patch('/:ownerId')
  @Authorized([CAN_UPDATE_SUBSCRIBER])
  @HttpCode(201)
  @ResponseSchema(SubscriberProfileResponse)
  async updateSubscriberAccount(
    @Param('ownerId') ownerId: string,
    @Body() user: UpdateSubscriberRequest
  ): Promise<void | SubscriberProfileResponse> {
    const result = await this.subscriberService.updateSubscriber(ownerId, user);
    return {
      message: 'Successfully Updated Subscriber',
      result,
    };
  }

  @Get('/:ownerId')
  @Authorized([CAN_READ_SUBSCRIBER])
  @HttpCode(200)
  @ResponseSchema(SubscriberProfileResponse)
  async getSubscriberAccount(@Param('ownerId') ownerId: string) {
    const result = await this.subscriberService.findSubscriber(ownerId);
    return {
      message: 'Successfully Returned Subscriber',
      result,
    };
  }
}
