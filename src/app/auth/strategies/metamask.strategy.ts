/* //////// This package has some serious type issues @see ambient.d.ts /////// */
import { BadRequestError, UnauthorizedError } from 'routing-controllers';
import * as Accounts from 'web3-eth-accounts';
import { SIGNING_MESSAGE_PREFIX } from '../../shared/constants';
import { UserRepository } from '../../shared/entities/user/user.repository';
/* /////////////////////////////////////////////////////////////////////////// */

/* ////// Setup the Web3 Accounts Utility /////// */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const web3Account = new Accounts();
/* ////// Setup the Web3 Accounts Utility /////// */

export async function validate(publicAddress: string, signature: string) {
  try {
    const user = await UserRepository.getUserByPublicAddress(publicAddress);

    /**
     * @dev If we dont have this user account in collection,
     * how the heck did they get a nonce and message?
     */
    if (!user) throw new BadRequestError('We are not expecting you');

    const message = `${SIGNING_MESSAGE_PREFIX}${user.nonce}`;
    const address = web3Account.recover(message, signature) as string;

    if (address.toLowerCase() !== user.publicAddress.toLowerCase()) throw new UnauthorizedError('Invalid signature');

    /* Get Investor Profile */
    // const investor = await this._investor.Model.findOne({ owner: user._id }).exec();

    // /* remove the user password from entry */
    // user.password = undefined;
    // return { user, account: investor, validated: true };
    return user;
  } catch (error) {
    throw new UnauthorizedError(error as string);
  }
}
