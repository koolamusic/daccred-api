import { UnauthorizedError } from 'routing-controllers';
import { generateRandomNonce } from '../../utils';
import { UserDocument, User, UserModel } from './user.model';

export interface ValidateUserAccessOptions {
  public_address: string;
  signature: string;
  id?: string;
}

export class UserRepository extends UserModel {
  /**
   * @dev
   * Find a user by their email address: `email` is unique in this model
   */
  static async getUserByEmail(email: string): Promise<UserDocument | null> {
    return await UserModel.findOne({ email });
  }

  /**
   * @dev
   * Find a user by their bip-spec public Address, used with metamask logins
   */
  static async getUserByPublicAddress(address: string): Promise<UserDocument | null> {
    return await UserModel.findOne({ publicAddress: address });
  }

  /**
   * @dev
   * Create a valid mongo document model based off the requirement that
   * user intends to create account using their metamask wallet
   *
   */
  static async createNewAccountByAddress(arg: Partial<User>): Promise<UserDocument> {
    try {
      /* Build user account payload */
      const userAccountData: Partial<User> = {};
      userAccountData['email'] = `${arg.publicAddress}@daccred.co`;
      userAccountData['publicAddress'] = arg.publicAddress;
      userAccountData['locked'] = false;
      userAccountData['nonce'] = generateRandomNonce();

      /* return model document */
      return await UserModel.create(userAccountData);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  /**
   * @dev
   * Validate a users access to an account based on their public_address and
   * signature combination
   *
   * @returns boolean
   * @param ValidateUserAccessOptions
   *
   * @example
   * await this.validateUserAccess({ public_address, signature })
   *
   */
  static async validateUserAccess({ public_address, signature }: ValidateUserAccessOptions): Promise<User> {
    /* check that the user exists */
    const userDocument = await UserModel.findOne({ publicAddress: public_address, nonce: signature });
    if (!userDocument) throw new UnauthorizedError('authorization failed');

    return userDocument;
  }
}
