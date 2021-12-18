import { Body, HttpCode, JsonController, Param, Get, Patch, Authorized } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import CustomerService from '../services/account/customer.service';
import { CAN_READ_CUSTOMER, CAN_UPDATE_CUSTOMER } from '../shared/constants';
import { CustomerProfileResponse, UpdateCustomerRequest } from '../shared/contracts/customer.contracts';

@JsonController('/customers')
@OpenAPI({
  description: 'Create , Update , Read and Delete Customer Profile',
})
export class CustomerController {
  private service = new CustomerService();

  @Patch('/:userId')
  @Authorized(CAN_UPDATE_CUSTOMER)
  @HttpCode(200)
  @ResponseSchema(CustomerProfileResponse)
  async updateCustomerAccount(
    @Param('userId') userId: string,
    @Body({ validate: true }) user: UpdateCustomerRequest
  ): Promise<CustomerProfileResponse> {
    const result = await this.service.updateCustomer(userId, user);
    return {
      message: 'successfully updated customer',
      result,
    };
  }

  @Get('/:userId')
  @HttpCode(200)
  @Authorized(CAN_READ_CUSTOMER)
  @ResponseSchema(CustomerProfileResponse)
  async getCustomerAccountInfo(@Param('userId') userId: string): Promise<CustomerProfileResponse> {
    const result = await this.service.findCustomer(userId);
    return {
      message: 'successfully returned customer',
      result,
    };
  }
}
