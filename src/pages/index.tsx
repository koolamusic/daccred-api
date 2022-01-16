import { GetServerSideProps } from 'next';
import { useMoralis, useChain } from 'react-moralis';
import { AuthenticateOptions } from 'react-moralis/lib/hooks/core/useMoralis/_useMoralisAuth';
import { useEffect } from 'react';

import * as NextAuth from '@/lib/auth.helper';
import { LockClosedIcon } from '@heroicons/react/solid';
import React from 'react';
import { DEFAULT_TESTNET } from '@/config/constants';
import ErrorMessage from '@/components/ErrorMessage';

export interface AuthProps {
  isAuthenticated: boolean;
  authenticate: (opts: AuthenticateOptions) => Promise<void>;
}

/* -------------------------------------------------------------------------- */
/*             use moralis to handle authentication logic in view             */
/* -------------------------------------------------------------------------- */

export default function Auth(): JSX.Element {
  const { isAuthenticated, web3EnableError, isWeb3Enabled, authenticate } = useMoralis();
  const { enableWeb3 } = useMoralis();
  const { switchNetwork } = useChain();

  useEffect(() => {
    // Lets enable web3
    async function handleWeb3() {
      await enableWeb3();
      // Then switch chain to match our programming
      await switchNetwork(DEFAULT_TESTNET);
    }

    handleWeb3();
  }, []);

  if (web3EnableError) {
    return <h3>Use a Web3 supported browser</h3>;
  }

  if (!isWeb3Enabled || !isAuthenticated) {
    return (
      <section className='flex justify-center w-full mx-auto mt-12 '>
        {web3EnableError && <ErrorMessage error={web3EnableError} />}

        <div className='bg-white'>
          <div className='px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='overflow-hidden bg-gray-700 rounded-lg shadow-xl lg:grid lg:grid-cols-2 lg:gap-4'>
              <div className='px-6 pt-10 pb-12 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20'>
                <div className='lg:self-center'>
                  <h2 className='text-3xl font-extrabold text-white sm:text-4xl'>
                    <span className='block'>Issue Badges and Certificates on-chain as NFTs</span>
                    {/* Ready to issue to most valuable credential of your life*/}

                    {/* <span className='block'>Start your free trial today.</span> */}
                  </h2>
                  {/* NFTs are full proof, of fraud, fake resumes and identification, with guarantee of the highest level of authenticity */}

                  <p className='mt-4 text-lg leading-6 text-primary-100'>
                    Web3 Smart credential are full proof, decentralized and insured from fraud, combining them with the
                    NFT implementation you are guaranteed of the highest level of authenticity
                  </p>

                  {/* ------ Trigger buttons --------- */}

                  <div>
                    <button
                      // isLoading={isWeb3EnableLoading}
                      onClick={() =>
                        authenticate({
                          signingMessage: 'Authenticate your Account with code:',
                          onSuccess: (user) => NextAuth.login(user),
                        })
                      }
                      className='relative flex justify-center w-full px-4 py-4 mt-4 text-sm font-medium text-white bg-gray-800 border rounded-md group hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                    >
                      <React.Fragment>
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                          <LockClosedIcon
                            className='w-5 h-5 text-gray-500 group-hover:text-gray-400'
                            aria-hidden='true'
                          />
                        </span>
                        {isAuthenticated ? 'You are logged in' : 'Login with Metamask'}
                      </React.Fragment>
                    </button>
                  </div>
                  {/* ------ Trigger buttons --------- */}
                </div>
              </div>
              <div className='-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1'>
                <img
                  className='object-cover object-left-top transform translate-x-6 translate-y-6 rounded-md sm:translate-x-16 lg:translate-y-20'
                  src='/screenshots/dashboard.png'
                  alt='App screenshot'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='fixed top-0 left-0 right-0 min-h-full bottom-5 bg-gray-50'>
      <div className='flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900 capitalize'>Access your account</h2>
          </div>

          {/* ------ Trigger buttons --------- */}

          <div>
            <button
              onClick={() =>
                authenticate({
                  signingMessage: 'Authenticate your Account with code:',
                  onSuccess: (user) => NextAuth.login(user),
                })
              }
              className='relative flex justify-center w-full px-4 py-4 mt-4 text-sm font-medium text-white bg-gray-800 border rounded-md group hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            >
              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <LockClosedIcon className='w-5 h-5 text-gray-500 group-hover:text-gray-400' aria-hidden='true' />
              </span>
              Access your Account
            </button>
          </div>
          {/* ------ Trigger buttons --------- */}
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await NextAuth.redirectAuthenticated(context);
};
