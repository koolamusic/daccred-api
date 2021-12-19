import ServerError from '../../infra/errors';
import logger from '../../infra/logger';
import { User, UserDocument } from '../shared/entities/user/user.model';
import { UserRepository } from '../shared/entities/user/user.repository';
import { generateRandomNonce } from '../shared/utils/crypto.utils';
import { WalletAuthMessageRequest, WalletAuthorizationRequest } from '../shared/cables';
import { SIGNING_MESSAGE_PREFIX } from '../shared/constants';
import { JwtStrategy } from './strategies/jwt.strategy';

export class AuthService {
  private logger = logger;
  private jwtStrategy = new JwtStrategy();

  /**
   * @dev
   * Unlike other implementations where if we find a user we throw a conflict error
   * With the Metamask signup workflow, we instead return that user account if we find one
   *
   * However when we dont find a user, we create a new one
   * @param { publicAddress } : the wallet public key
   */
  async userByWalletAuth({ public_address }: WalletAuthMessageRequest): Promise<UserDocument> {
    try {
      /* Check for existing account by address  */
      const userAccount = await UserRepository.getUserByPublicAddress(public_address);
      /* >>>>>>>>  If we find one return the user <<<<<<< */

      if (!userAccount) {
        /*  >>>>>>>> Build user account payload and return <<<<<<<  */
        return await UserRepository.createNewAccountByAddress({ publicAddress: public_address });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw new ServerError(error);
    }
  }

  /**
   * @private _handleNonceGeneration
   * Confirm that a valid Nonce exists and is not null or undefined
   */
  private async _handleNonceGeneration(user: UserDocument): Promise<string> {
    try {
      if (!user.nonce) {
        user.previousNonce = user.nonce;
        user.nonce = generateRandomNonce();
        await user.save();
        return user.nonce;
      } else {
        return user.nonce;
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * @dev validateUserAndReturnNonce
   * @description validate a user by their wallet public address and return nonce to sign
   * if they don't exist, create a new user account for by public address and return a new nonce
   *
   * @param address : user wallet public address
   * @returns nonce
   */
  async validateUserAndReturnNonce(public_address: string): Promise<string> {
    try {
      /* Handle validation of user and creating if required */
      const user = await this.userByWalletAuth({ public_address });
      const nonce = await this._handleNonceGeneration(user);

      /* //// Build out the Message to use in signature ///// */
      const message = `${SIGNING_MESSAGE_PREFIX}${nonce}`;
      return message;
    } catch (error) {
      this.logger.error(error);
      throw new ServerError(error);
    }
  }

  /**
   * @dev handleMetamaskAuthRequest
   * @description handle the metamask authentication request and return a JWT token to access the API.
   *
   * Once we get a valid user, we refresh the nonce used to validate
   * the initial signature from this Request.
   *
   * @see MetamaskAuthStrategy we already validate the signature using guards
   * Thus by the time the request gets here, we only need to create a new nonce
   * As a post hook for this request
   */
  async handleMetamaskAuthRequest(opts: WalletAuthorizationRequest) {
    const { public_address, signature, session_token } = opts;

    try {
      /**
       * @dev We are pulling in the user from db, cos the user in
       * request context is separate and we need to perform updates to the
       * user document to shuffle their nonce address and track the current one
       */
      const user = (await UserRepository.getUserByPublicAddress(public_address)) as UserDocument;

      const payload = {
        sub: user.id,
        eth: user.publicAddress,
        scope: user.scope,
        signature: signature,
        fingerprint: session_token,
      };

      /* ////// Tumble nonce for next request and save user object //////*/
      user.previousNonce = user.nonce;
      user.nonce = generateRandomNonce();
      await user.save();

      /* //// Return JWT token from payload /////// */
      return {
        token: this.jwtStrategy.sign(payload),
      };
    } catch (error) {
      throw new ServerError(error);
    }
  }

  /**
   * @dev validateOnMoralisAuth
   * @description validate and generate JWT on passworldless login when moralis connects
   *
   * What we do is that we from the API retrieve the Moralis Auth information
   * Then we update the existing user or Upsert if we don't find an existing collection
   */
  async validateOnMoralisAuth(opts: WalletAuthorizationRequest) {
    const { public_address, ...rest } = opts;

    try {
      const filter = { publicAddress: public_address };
      const update: Partial<User> = {
        nonce: rest.signature,
        email: `${public_address}@daccred.co`,
        moralisUserId: rest.object_id,
      };

      const user = await UserRepository.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      });

      const response = await this.jwtStrategy.sign({
        sub: user.id,
        eth: user.publicAddress,
        scope: user.scope,
        signature: rest.signature,
        fingerprint: rest.session_token,
      });

      /* //// Return JWT token from payload /////// */
      return {
        token: response,
      };
    } catch (error) {
      throw new ServerError(error);
    }
  }
}
