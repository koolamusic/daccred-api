import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

// import * as NextAuth from '@/lib/auth.helper';

// import View from '@/views/public/Claims';
const View = dynamic(() => import('../../../views/public/Claims'), { ssr: false });

interface ClaimPageProps {
  address: string
}

/* -------------------------------------------------------------------------- */
/*             use moralis to handle authentication logic in view             */
/* -------------------------------------------------------------------------- */

export default function Auth(props: ClaimPageProps) {
  return <View contractAddress={props.address} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line no-console
  console.log(context.params, context.query);
  // return await NextAuth.handleAuthenticatedRequest(context);
  return {
    props: {
     ...context.params
    },
  };
};
