import { GetServerSideProps } from 'next';
import { useMoralis } from 'react-moralis';

import * as NextAuth from '@/lib/auth.helper';

import { AuthView } from '@/views/app/Auth';

/* -------------------------------------------------------------------------- */
/*             use moralis to handle authentication logic in view             */
/* -------------------------------------------------------------------------- */

export default function Auth() {
  const { isAuthenticated, authenticate } = useMoralis();

  return <AuthView isAuthenticated={isAuthenticated} authenticate={authenticate} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await NextAuth.redirectAuthenticated(context);
};
