import { GetServerSideProps } from 'next';
import { useMoralis, useChain } from 'react-moralis';
import { AuthenticateOptions } from 'react-moralis/lib/hooks/core/useMoralis/_useMoralisAuth';
import { useEffect } from 'react';

import * as NextAuth from '@/lib/auth.helper';
import { LockClosedIcon } from '@heroicons/react/solid';
import React from 'react';
import { DEFAULT_TESTNET } from '@/config/constants';
import ErrorMessage from '@/components/ErrorMessage';
import Button from '@/components/buttons/Button';

export interface AuthProps {
  isAuthenticated: boolean;
  authenticate: (opts: AuthenticateOptions) => Promise<void>;
}

/* -------------------------------------------------------------------------- */
/*             use moralis to handle authentication logic in view             */
/* -------------------------------------------------------------------------- */

export default function Auth(): JSX.Element {
  const { isAuthenticated, web3EnableError, isWeb3EnableLoading, isWeb3Enabled, authenticate } = useMoralis();
  const { enableWeb3 } = useMoralis();
  const { switchNetwork } = useChain();

  if (!isWeb3Enabled) {
    return (
      <section className='flex justify-center w-full max-w-2xl mx-auto mt-12 text-gray-800'>
        <h3>Please use a Web3 enabled Browser</h3>
      </section>
    );
  }

  useEffect(() => {
    // Lets enable web3
    async function handleWeb3() {
      await enableWeb3();
      // Then switch chain to match our programming
      await switchNetwork(DEFAULT_TESTNET);
    }

    handleWeb3();
  }, []);

  return (
    <section className='fixed top-0 left-0 right-0 min-h-full bottom-5 bg-gray-50'>
      <div className='flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900 capitalize'>Access your account</h2>
          </div>
          <section className='mt-8 space-y-6'>
            {web3EnableError && <ErrorMessage error={web3EnableError} />}

            {/* ///////// Button to trigger Metamask Login ///////// */}
            <div>
              <Button
              isLoading={isWeb3EnableLoading}
                onClick={() =>
                  authenticate({
                    signingMessage: 'Authenticate your Account with code:',
                    onSuccess: (user) => NextAuth.login(user),
                  })
                }
                className='relative flex justify-center w-full px-4 py-4 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md group hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
              >
                <React.Fragment>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                    <LockClosedIcon className='w-5 h-5 text-gray-500 group-hover:text-gray-400' aria-hidden='true' />
                  </span>
                  {isAuthenticated ? 'You are logged in' : 'Login with Metamask'}
                </React.Fragment>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await NextAuth.redirectAuthenticated(context);
};
