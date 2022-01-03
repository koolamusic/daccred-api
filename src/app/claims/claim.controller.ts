import {
  // Body,
  Post,
  Get,
  HttpCode,
  JsonController,
  OnUndefined,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
// import { CAN_CREATE_CREDENTIAL } from '../shared/constants';

/**
 * @decription
 * This controller is supposed to be used for validation the user claim requests
 * Not heres the deal: If the claim request if from user email address, we will need
 * this API implementation
 *
 * However if the implementation is through the user wallet address we actually want to handle
 * all the claim process through the smart contract. Some options available will be:
 *
 * 1. Using a Merkle Proof, from the API to validate the request on the smart contract
 * 2. Using a Signed request in the data collection process to validate the user and go ahead
 * With minting the certificate on-chain
 *
 * That said, the only reason we need the API here, is that we are meant to perform several claim related actions
 * 1. Validate the User
 * 2. Generate the Certificate Image [polotno/node] from the document design Schema
 * 3. Send the generated parameters to the client [IPFSImgCID, certTokenURI, ]
 * We need to tokenURI and there are several ways we can go about this, either hosting on Arweave, IPFS or on our API
 *
 * This way, the CertTokenURI will just be a mapper we use to Query directly from IPFS or Arweave, depending on our strategy
 * User visit our App, /CertTokenURI ... We resolve the data based on Arweave, IPFS or internally.
 */

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
  async claimCredentialWithEmail(): // @Body({ required: true, validate: true }) input: any
  Promise<undefined> {
    return undefined;
  }

  @Post('/with-wallet')
  @HttpCode(201)
  @OnUndefined(204)
  @ResponseSchema(class FClass {})
  async claimCredentialWithWalletAddress(): // @Body({ required: true, validate: true }) input: any
  Promise<undefined> {
    return undefined;
  }

  @Post('/prepare-wallet')
  @HttpCode(201)
  @OnUndefined(204)
  @ResponseSchema(class FClass {})
  async prepareRecipientClaimWithWallet(): // @Body({ required: true, validate: true }) input: any
  Promise<undefined> {
    return undefined;
  }

  /**
   * This would be done after a user has already claimed their certificate::
   * should actually interact directly with Web3 + (IPFS or Arweave) and resolve JSON output
   * IPFS CID for image, contract Address, userWalletAddress, Recipient Metadata, Etherscan TransactionHash,
   */
  @Get('/validate/:claimURI')
  @HttpCode(200)
  @OnUndefined(204)
  @ResponseSchema(class FClass {})
  async validateAClaimBasedOnProvidedInfoExperimental(): Promise<undefined> {
    return undefined;
  }
}
