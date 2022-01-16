import { GetServerSideProps } from 'next';
import * as NextAuth from '@/lib/auth.helper';
import Layout from '@/components/layout/AdminLayout';

import StatsDefault from '@/components/display/StatsDefault';
import SubSectionHeading from '@/components/headings/SubSectionHeading';
import CertificationList from '@/components/lists/CertificationList';
import { routes } from '@/config/routes';

export default function Default() {
  return (
    <Layout>
      <>
        {/* ----------------- Render React Children in this layout from here --------------- */}
        <section className='max-w-4xl mx-auto mt-12 '>
          <StatsDefault />
          <div className='py-6 pt-8 my-6'>
            <SubSectionHeading
              actionHref={routes.certs.create}
              actionName='Create New Certification'
              text='Your Certifications'
            />
            <CertificationList />
          </div>
        </section>
        {/* ----------------- Render React Children in this layout from here --------------- */}
      </>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await NextAuth.handleAuthenticatedRequest(context);
};
