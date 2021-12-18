import {
  Get,
  Param,
  QueryParams,
  Body,
  Post,
  HttpCode,
  JsonController,
  Authorized,
  Delete,
  Patch,
  CurrentUser,
  UnauthorizedError,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import EmployeeService from '../services/account/employee.service';
import {
  CreateEmployeeRequest,
  EmployeeDeleteResponse,
  EmployeeCreateResponseDTO,
  EmployeeProfileResponse,
  UpdateEmployeeRequest,
  AllEmployeesResponse,
  EmployeeInviteStatus,
} from '../shared/contracts/employee.contracts';
import { IJWTClaim } from '../shared/definitions';
import {
  CAN_CREATE_EMPLOYEE,
  CAN_DELETE_EMPLOYEE,
  CAN_READ_ALL_EMPLOYEES,
  CAN_READ_EMPLOYEE,
  CAN_UPDATE_EMPLOYEE,
} from '../shared/constants';
import { BaseQueryParamsDTO } from '../shared/contracts';

@JsonController('/subscriber-employees')
@OpenAPI({
  description: 'Create , Update , Read and Delete Employee Profile',
})
export class SubscriberEmployeeController {
  private employeeService = new EmployeeService();

  @Post('/')
  @Authorized([CAN_CREATE_EMPLOYEE])
  @HttpCode(201)
  @ResponseSchema(EmployeeCreateResponseDTO)
  async createSubscriberEmployee(
    @Body({ required: true, validate: true }) body: CreateEmployeeRequest,
    @CurrentUser() user: IJWTClaim
  ): Promise<EmployeeCreateResponseDTO> {
    if (!user.profile.subscriber_id) throw new UnauthorizedError();
    const result = await this.employeeService.createSubscriberEmployee({
      ...body,
      invitedBy: user.sub,
      inviteStatus: EmployeeInviteStatus.PENDING,
      subscriberId: user.profile.subscriber_id,
    });
    return { message: 'Successfully Created Employee', result };
  }

  @Get('/:subscriberId')
  @Authorized([CAN_READ_ALL_EMPLOYEES])
  @ResponseSchema(AllEmployeesResponse)
  async getAllSubscriberEmployees(
    @Param('subscriberId') subscriberId: string,
    @QueryParams({ required: true }) queryParams: BaseQueryParamsDTO
  ): Promise<AllEmployeesResponse> {
    const result = await this.employeeService.getAllEmployees({ subscriberId, queryParams });
    return { message: 'Successfully returned all Employees', ...result };
  }

  /* /////////////////////////////////////////////////////////// */
  /* /////////////// Get Employee by id /////////////////// */
  /* /////////////////////////////////////////////////////////// */
  @Get('/:subscriberId/:id')
  @Authorized([CAN_READ_EMPLOYEE])
  @HttpCode(200)
  @ResponseSchema(EmployeeProfileResponse)
  async findSubscriberEmployee(
    @Param('subscriberId') subscriberId: string,
    @Param('id') id: string
  ): Promise<EmployeeProfileResponse> {
    const result = await this.employeeService.getEmployeeById({ subscriberId, id });
    return { message: 'Successfully returned Employee', result: result };
  }

  /* ////////////////////////////////////////////////////////////// */
  /* /////////////// Update Subscriber Employee /////////////////// */
  /* ////////////////////////////////////////////////////////////// */
  @Patch('/:subscriberId/:id')
  @Authorized([CAN_UPDATE_EMPLOYEE])
  @HttpCode(200)
  @ResponseSchema(EmployeeDeleteResponse)
  async updateSubscriberEmployee(
    @Param('subscriberId') subscriberId: string,
    @Param('id') id: string,
    @Body() body: UpdateEmployeeRequest,
    @CurrentUser() user: IJWTClaim
  ): Promise<EmployeeDeleteResponse> {
    const result = await this.employeeService.updateEmployeeById({ subscriberId, id }, body, user);
    return { message: 'Successfully Updated Employee', result };
  }

  /* ///////////////////////////////////////////////////////////////// */
  /* ///////////// Delete Subscriber Employee by ID /////////////// */
  /* ///////////////////////////////////////////////////////////////// */

  @Delete('/:subscriberId/:id')
  @Authorized([CAN_DELETE_EMPLOYEE])
  @HttpCode(200)
  @ResponseSchema(EmployeeDeleteResponse)
  async deleteSubscriberEmployee(
    @Param('subscriberId') subscriberId: string,
    @Param('id') id: string
  ): Promise<EmployeeDeleteResponse> {
    const result = await this.employeeService.deleteEmployeeById({ subscriberId, id });

    return {
      message: 'Successfully Deleted Employee',
      result,
    };
  }
}
