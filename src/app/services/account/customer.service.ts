import { BadRequestError, NotFoundError } from 'routing-controllers';
import { DocumentType, mongoose } from '@typegoose/typegoose';
import ErrorHandler, { UnprocessableEntityError } from '../../../infra/errors';
import logger from '../../../infra/logger';
import { CustomerCollection, CustomerModel } from '../../models/customer.model';
import {
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerProfileDTO,
} from '../../shared/contracts/customer.contracts';

export default class CustomerService {
  public async createCustomer(data: CreateCustomerRequest): Promise<DocumentType<CustomerCollection>> {
    try {
      /* Handle the first case where a user exists */
      const customerDocument = await CustomerModel.findOne({ userId: data.userId });
      if (customerDocument) throw new BadRequestError('Customer Already Exists');

      /* Create new customer and return to api controller */
      const result = await CustomerModel.create({
        ...data,
        _id: mongoose.Types.ObjectId(),
      });
      return result;
    } catch (err) {
      logger.error(`[CustomerService:createCustomer]: ${err}`);
      throw new ErrorHandler(err);
    }
  }

  public async updateCustomer(userId: string, user: UpdateCustomerRequest): Promise<CustomerProfileDTO> {
    try {
      const customerDocument = await CustomerModel.findOne({ userId });
      if (!customerDocument) throw new NotFoundError('Customer Does not Exist');

      /* Update and return to api */
      const updatedCustomer = await CustomerModel.findOneAndUpdate({ userId }, user, { new: true });
      if (!updatedCustomer) throw new UnprocessableEntityError();

      const customerProfile: CustomerProfileDTO = {
        address: updatedCustomer.address,
        city: updatedCustomer.city,
        phone: updatedCustomer.phone,
        state: updatedCustomer.state,
        userId: updatedCustomer.userId,
        zip: updatedCustomer.zip,
      };

      return customerProfile;
    } catch (err) {
      logger.error(`[CustomerService:updateCustomer]: ${err}`);
      throw new ErrorHandler(err);
    }
  }

  public async findCustomer(userId: string): Promise<CustomerProfileDTO> {
    try {
      const customerDocument = await CustomerModel.findOne({ userId });

      if (!customerDocument) throw new NotFoundError('Customer Does not Exist');
      const customerProfile: CustomerProfileDTO = {
        address: customerDocument.address,
        city: customerDocument.city,
        phone: customerDocument.phone,
        state: customerDocument.state,
        userId: customerDocument.userId,
        zip: customerDocument.zip,
      };
      return customerProfile;
    } catch (err) {
      logger.error(`[CustomerService:findCustomer]: ${err}`);
      throw new ErrorHandler(err);
    }
  }
}
