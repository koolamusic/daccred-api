import { Body, Post, HttpCode, JsonController, OnUndefined, Authorized } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import {
  WalletAuthorizationRequest,
  WalletAuthMessageQueryResult,
  WalletAuthorizationQueryResult,
  WalletAuthMessageRequest,
} from '../shared/dals';
import { AuthService } from './auth.service';
import { CAN_CREATE_CREDENTIAL } from '../shared/constants';

@JsonController('/auth')
@OpenAPI({
  description: 'Manage Login, Signup and Password Reset',
})
export class AuthController {
  private authService = new AuthService();

  @Post('/passwordless')
  @HttpCode(201)
  @OnUndefined(204)
  @ResponseSchema(WalletAuthorizationQueryResult)
  async passwordlessAuthorization(
    @Body({ required: true, validate: true }) input: WalletAuthorizationRequest
  ): Promise<WalletAuthorizationQueryResult> {
    const result = await this.authService.validateOnMoralisAuth({
      signature: input.signature,
      public_address: input.public_address,
      object_id: input.object_id,
      session_token: input.object_id,
    });

    return {
      access_token: result.token,
    };
  }

  // authInvestorByMetamask(@Args('user') userInput: MetamaskRequestArg, @Context('req') ctx: RequestContext): Promise<AuthLoginResponse> {
  //   const user = await this.authService.handleMetamaskAuthRequest({ userInput, ctx });

  //   return {
  //     token: user.token,
  //     fingerprint: ctx.sessionID,
  //   };
  // }

  @Post('/nonce')
  @HttpCode(201)
  @OnUndefined(204)
  @Authorized([CAN_CREATE_CREDENTIAL]) // This is a stub to simply disable this action tempoarily
  @ResponseSchema(WalletAuthMessageQueryResult)
  async metamaskAuthMessage(
    @Body({ required: true, validate: true }) input: WalletAuthMessageRequest
  ): Promise<WalletAuthMessageQueryResult> {
    const message = await this.authService.validateUserAndReturnNonce(input.public_address);
    return {
      message,
    };
  }
}
