import { Body, Post, Get, HttpCode, JsonController, OnUndefined } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
// import { CAN_CREATE_CREDENTIAL } from '../shared/constants';

@JsonController('/claims')
@OpenAPI({
  description:
    'Handle the validation, verfication and redemption of credentials and claims with IPFS and Blockchain Integration',
})
export class ClaimController {
  @Post('/with-email')
  @HttpCode(201)
  @OnUndefined(204)
  @ResponseSchema(class XClassP {})
  async claimCredentialWithEmail(@Body({ required: true, validate: true }) input: any): Promise<undefined> {
    return undefined;
  }

  @Post('/with-wallet')
  @HttpCode(201)
  @OnUndefined(204)
  @ResponseSchema(class FClass {})
  async claimCredentialWithWalletAddress(@Body({ required: true, validate: true }) input: any): Promise<undefined> {
    return undefined;
  }

  @Get('/validate/:claim')
  @HttpCode(200)
  @OnUndefined(204)
  @ResponseSchema(class FClass {})
  async validateAClaimBasedOnProvidedInfo(): Promise<undefined> {
    return undefined;
  }
}
