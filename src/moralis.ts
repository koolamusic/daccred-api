/* eslint-disable @typescript-eslint/no-var-requires */
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from '@/config/constants';
import MoralisType from 'moralis';
import { DEFAULT_TESTNET } from '@/config/constants';

/**
 * @name withMoralis
 * @description manual way of injecting moralis into the app, now using @react-moralis
 * @deprecated
 * @returns MoralisType
 *
 */
export default function withMoralis() {
  /* Variables must be initialized */
  if (!MORALIS_SERVER_URL) throw new Error('Missing env.NEXT_PUBLIC_MORALIS_SERVER_URL');
  if (!MORALIS_APP_ID) throw new Error('Missing env.NEXT_PUBLIC_MORALIS_APPLICATION_ID');

  // Moralis Initialization
  let Moralis;
  if (typeof window !== `undefined`) {
    const Moralis = require('moralis') as MoralisType;
    Moralis.initialize(MORALIS_APP_ID);
    Moralis.serverURL = MORALIS_SERVER_URL;
    Moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID });

    Moralis.Web3.enableWeb3();
    Moralis.Web3.switchNetwork(DEFAULT_TESTNET);
  }

  return { Moralis };
}
