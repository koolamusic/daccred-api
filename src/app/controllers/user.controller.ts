import { JsonController, CurrentUser, Authorized, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CAN_READ_ONE_USER, CAN_CREATE_USER } from '../shared/constants';
import { UserAccountResponseDTO } from '../shared/contracts/user.contracts';

/**
 * @name UserController
 * @description Get user profile and edit profile. User Profile is created on signup
 * @todo 1. define how delete for users will be. 2. Define how updating password for user will be handled
 * */

@OpenAPI({
  securitySchemes: {
    Bearer: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
})
@JsonController('/users')
export class UserController {
  /* Admins only */
  @Authorized([CAN_READ_ONE_USER, CAN_CREATE_USER])
  @Post('/')
  @ResponseSchema(UserAccountResponseDTO)
  requestUserProfile(@CurrentUser() user: Record<string, string>) {
    return user;
  }

  // @Get('/:id')
  // getOne(@Param('id') id: number) {
  //   return 'This action returns user #' + id;
  // }

  // /* Update User Profile */
  // @Patch('/users/:id')
  // put(@Param('id') id: number, @Body() user: string) {
  //   console.log(user, id);

  //   return 'Updating a user...';
  // }
}
