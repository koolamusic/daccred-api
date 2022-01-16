import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
// import View from '@/views/Editor';
import * as NextAuth from '@/lib/auth.helper';
import Layout from '@/components/layout/Layout';

const View = dynamic(() => import('../../views/app/Editor'), { ssr: false });

export default function Default() {
  return (
    <Layout>
      <View />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line no-console
  console.log(context.params, context.query);
  return await NextAuth.handleAuthenticatedRequest(context);
};
