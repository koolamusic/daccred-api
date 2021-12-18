import 'reflect-metadata';
import { Param, Body, Get, Put, Delete, JsonController } from 'routing-controllers';
import ErrorHandler, { ConflictError, UnprocessableEntityError } from '../../../src/infra/errors';

@JsonController('/test-controller')
export class TestingController {
  @Get('/unprocessable-entity')
  getUnprocessableEntity() {
    try {
      throw new UnprocessableEntityError('We cant process your request');
    } catch (error) {
      throw new ErrorHandler(error);
    }
  }

  @Get('/conflict-error')
  conflictError() {
    try {
      throw new ConflictError();
    } catch (error) {
      throw new ErrorHandler(error);
    }
  }

  /* Update User Profile */
  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: string) {
    console.log(user, id);

    return 'Updating a user...';
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    console.log(id);

    return 'Removing user...';
  }
}
