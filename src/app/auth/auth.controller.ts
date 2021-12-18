import { Body, Post, HttpCode, JsonController } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import LoginUserService from './login.service';
import {
  AuthLoginRequest,
  AuthLoginResponse,
  // AuthForgotPasswordResponse,
  // AuthResetPasswordRequest,
  // AuthSignupRequest,
  // AuthSignupResponse,
} from '../shared/contracts/auth.contracts';

@JsonController('/auth')
@OpenAPI({
  description: 'Manage Login, Signup and Password Reset',
})
export class AuthController {
  private loginService = new LoginUserService();

  // @Post('/signup')
  // @HttpCode(201)
  // @ResponseSchema(AuthSignupResponse)
  // signup(@Body({ required: true, validate: true }) user: AuthSignupRequest): Promise<void | AuthSignupResponse> {
  //   return this.signupService.signupUser(user);
  // }

  @Post('/login')
  @HttpCode(201)
  @ResponseSchema(AuthLoginResponse)
  login(@Body({ required: true, validate: true }) user: AuthLoginRequest): Promise<AuthLoginResponse> {
    return this.loginService.loginUser(user);
  }

  // @HttpCode(201)
  // @Post('/forgot-password')
  // @ResponseSchema(AuthForgotPasswordResponse)
  // @OpenAPI({ summary: 'Make a request to reset your password' })
  // requestPasswordReset(@Body() data: Omit<AuthLoginRequest, 'password'>) {
  //   return this.passwordService.requestResetPassword(data);
  // }

  // @HttpCode(201)
  // @Post('/reset-password')
  // @OpenAPI({ summary: 'Reset a users password with generated token' })
  // @ResponseSchema(AuthLoginResponse)
  // resetPassword(@Body() data: AuthResetPasswordRequest) {
  //   return this.passwordService.resetPassword(data);
  // }

  // /* Used to setup employee account */
  // @HttpCode(201)
  // @Post('/onboard-employee')
  // @OpenAPI({ summary: 'Activate a Subscribers Employee Account' })
  // @ResponseSchema(AuthOnboardEmployeeResponse)
  // activateSubscribersEmployee(@Body() data: AuthOnboardEmployeeRequest): Promise<AuthOnboardEmployeeResponse> {
  //   return this.onboardingService.onboardSubscriberEmployee(data);
  // }
}
