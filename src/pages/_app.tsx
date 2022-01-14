import { AppProps } from 'next/app';
import React from 'react';
import { MoralisProvider } from 'react-moralis';

import '@/styles/form.css';
import '@/styles/blueprint.css';
import '@/styles/blueprint-extend.css';
import '@/styles/globals.css';

import Seo from '@/components/next/Meta';
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from '@/config/constants';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
      <Seo templateTitle='NFT Badger' />
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
