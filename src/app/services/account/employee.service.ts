/* eslint-disable @typescript-eslint/no-explicit-any */

import { EJSON } from 'bson';
import { BadRequestError, NotFoundError } from 'routing-controllers';
import ErrorHandler, { UnprocessableEntityError } from '../../../infra/errors';
import logger from '../../../infra/logger';
import { EmployeeCollection, EmployeeModel } from '../../models/employee.model';
import { UserCollection, UserModel } from '../../models/user.model';
import { generateIdentifier } from '../../shared/utils';
import {
  CreateEmployeeRequest,
  FindEmployeeParamDTO,
  UpdateEmployeeRequest,
  EmployeeProfileDTO,
  AllEmployeesResponse,
  GetAllEmployeesRequestDTO,
  EmployeeCreateResponse,
  CreateEmployeeRequestExt,
} from '../../shared/contracts/employee.contracts';
import { DocumentType } from '@typegoose/typegoose';
import { IPaginateOptions } from 'typegoose-pagination-plugin';
import { AuthSignupRequest, UserType } from '../../shared/contracts';
import { IJWTClaim } from '../../shared/definitions';

type TAutopopulateNode = DocumentType<EmployeeCollection> & {
  profile: DocumentType<UserCollection>;
};

export default class EmployeeService {
  public async createSubscriberEmployee(
    data: CreateEmployeeRequest & CreateEmployeeRequestExt
  ): Promise<EmployeeCreateResponse> {
    try {
      /* create a user  payload and append defaults */
      const createUserPayload: AuthSignupRequest = {
        name: data.name,
        email: data.email,
        password: generateIdentifier(12),
        phone: data.phone,
        type: UserType.EMPLOYEE,
      };

      // Check if Employee is at a different institution
      const employeeExist = await UserModel.findOne({ email: data.email });
      if (employeeExist) throw new BadRequestError('User already registered as an employee of an organization');

      /* Create user account */
      const user: DocumentType<UserCollection> = await UserModel.create(createUserPayload);
      if (!user) throw new UnprocessableEntityError();

      /* update employee account and create activation Token for employee Model */
      const employee: DocumentType<EmployeeCollection> = await EmployeeModel.create({
        invitedBy: data.invitedBy,
        inviteStatus: data.inviteStatus,
        user: user.id,
        subscriberId: data.subscriberId,
        activationToken: generateIdentifier(36),
      });
      if (!employee) {
        /* cleanup user and throw error */
        UserModel.deleteOne(user._id);
        throw new BadRequestError('Something went wrong while creating employee account');
      }

      /* Send response of activationToken, email to user [pub sub] */
      return {
        name: user.name,
        email: user.email,
        activationToken: employee.activationToken,
      };
    } catch (err) {
      logger.error(`[EmployeeService:createSubscriberEmployee]: ${err}`);
      throw new ErrorHandler(err);
    }
  }

  public async getEmployeeById({ subscriberId, id }: FindEmployeeParamDTO): Promise<EmployeeProfileDTO> {
    try {
      const employeeDocument = await EmployeeModel.findOne({ _id: id, subscriberId }).then((doc) => {
        if (!doc) throw new NotFoundError('Employee Does not Exist');

        const collection = (doc as unknown) as TAutopopulateNode;

        /* Build out the results array for employee based off populated user collection */
        /**@todo use the mapper.ts utility  */
        return EJSON.deserialize({
          id: collection._id,
          activationToken: collection.activationToken,
          inviteStatus: collection.inviteStatus,
          invitedBy: collection.invitedBy,
          profile: {
            name: collection.profile.name,
            phone: collection.profile.phone,
            email: collection.profile.email,
            userId: collection.profile._id,
            isVerified: collection.profile?.isVerified,
          },
        }) as EmployeeProfileDTO;
      });

      if (!employeeDocument) throw new NotFoundError('Employee Does not Exist');

      return employeeDocument;
    } catch (err) {
      logger.error(`[EmployeeService:getEmployeeById]: ${err}`);
      throw new ErrorHandler(err);
    }
  }

  public async updateEmployeeById(
    { subscriberId, id }: FindEmployeeParamDTO,
    body: UpdateEmployeeRequest,
    user: IJWTClaim
  ): Promise<DocumentType<EmployeeCollection>> {
    try {
      if (user.profile.role !== 'subscriber') throw new BadRequestError("Employees's cannot update employee accounts");

      /* Check that the document exists */
      const employeeDocument = await EmployeeModel.findOne({ _id: id, subscriberId });
      if (!employeeDocument) throw new NotFoundError('Employee Does not Exist');

      /* Manually handle update */
      employeeDocument.invitedBy = body.invitedBy;
      employeeDocument.inviteStatus = body.inviteStatus;

      /* save doc */
      employeeDocument.save();

      // const result: EmployeeProfileDTO = {
      //   id: employeeDocument.id,
      //   subscriberId: employeeDocument.subscriberId,
      //   inviteStatus: employeeDocument.inviteStatus,
      //   userId: employeeDocument.userId,
      //   invitedBy: employeeDocument.invitedBy,
      // };

      return employeeDocument.id;
    } catch (err) {
      logger.error(`[EmployeeService:updateEmployeeById]: ${err}`);
      throw new ErrorHandler(err);
    }
  }

  public async deleteEmployeeById({ subscriberId, id }: FindEmployeeParamDTO): Promise<string> {
    try {
      /* Get the employee document */
      const employeeDocument = await EmployeeModel.findOne({ _id: id, subscriberId });
      if (!employeeDocument) throw new NotFoundError('Employee Does not Exist');

      /* Perform delete operation */
      await employeeDocument.remove();

      return employeeDocument.id;
    } catch (err) {
      logger.error(`[EmployeeService:deleteEmployee]: ${err}`);
      throw new ErrorHandler(err);
    }
  }

  public async getAllEmployees(payload: GetAllEmployeesRequestDTO): Promise<Omit<AllEmployeesResponse, 'message'>> {
    const { subscriberId, queryParams } = payload;

    /* ////////////// Prepare Pagination Query and Projection ///////////////// */
    const options: IPaginateOptions = {
      previous: queryParams.previous,
      next: queryParams.next,
      limit: parseInt(queryParams.limit) ?? 10,
      sortField: queryParams.sortField,
      sortAscending: queryParams.sort === 'asc',
    };

    const projection = {};
    const query = { subscriberId: subscriberId };
    /* ////////////// Prepare Pagination Query and Projection ///////////////// */

    try {
      const employeeDocument = await EmployeeModel.findPaged(options, query, projection).then((paged) => {
        /* Destructure paged documents */
        const { docs, ...rest } = paged;

        /* Build out the results array for employee based off populated user collection */
        /**@todo use the mapper.ts utility  */
        const docMapper = (node: TAutopopulateNode) => ({
          id: node._id,
          activationToken: node.activationToken,
          inviteStatus: node.inviteStatus,
          invitedBy: node.invitedBy,
          profile: {
            name: node.profile.name,
            phone: node.profile.phone,
            email: node.profile.email,
            userId: node.profile._id,
            isVerified: node.profile.isVerified,
          },
        });
        const collection = docs.map<TAutopopulateNode[]>(docMapper as any);
        return { result: EJSON.deserialize(collection), ...rest };
      });
      if (!employeeDocument) throw new UnprocessableEntityError();

      /* Return an EJSON serialized response with paging cursor */
      /**@todo use the mapper.ts utility  */
      const responseMapper = {
        total: employeeDocument.totalDocs,
        previous: employeeDocument.previous,
        next: employeeDocument.next,
        hasPrevious: employeeDocument.hasPrevious,
        hasNext: employeeDocument.hasNext,
        result: employeeDocument.result as EmployeeProfileDTO[],
      };

      return responseMapper;
    } catch (err) {
      logger.error(`[EmployeeService:getAllEmployees]: ${err}`);
      throw new ErrorHandler(err);
    }
  }
}
