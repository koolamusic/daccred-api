import Loader from '@/components/display/Loader';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useMoralisQuery } from 'react-moralis';
// import * as NextAuth from '@/lib/auth.helper';

// import View from '@/views/public/Claims';
const View = dynamic(() => import('../../../views/public/Claims'), { ssr: false });

/* -------------------------------------------------------------------------- */
/*             use moralis to handle authentication logic in view             */
/* -------------------------------------------------------------------------- */

interface ClaimQueryProps {
  tokenURI?: string;
  address?: string;
}

export default function Page({ tokenURI }: ClaimQueryProps) {
  const { data, error, isLoading } = useMoralisQuery('Claims', (query) => query.equalTo('objectId', tokenURI));

  if (error) {
    return <span>🤯</span>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line no-console
  console.log(context.params, context.query);
  // return await NextAuth.handleAuthenticatedRequest(context);
  return {
    props: {
      ...context.params,
    },
  };
};
