import { GetServerSideProps } from 'next';

import * as NextAuth from '@/lib/auth.helper';

import Layout from '@/components/layout/PageLayout';

import View from '@/views/app/Admin';

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
