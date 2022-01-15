import { GetServerSideProps } from 'next';
import * as NextAuth from '@/lib/auth.helper';
import Layout from '@/components/layout/WizardLayout';
// import View from '@/views/app/Cred';

import dynamic from 'next/dynamic';
const View = dynamic(() => import('../../views/app/Cred'), { ssr: false });

export default function Default() {
  return (
    <Layout>
      <View />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await NextAuth.handleAuthenticatedRequest(context);
};
