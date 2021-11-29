import StatsDefault from '@/components/display/StatsDefault';
import SubSectionHeading from '@/components/headings/SubSectionHeading';
import CertificationList from '@/components/lists/CertificationList';
import { routes } from '@/config/routes';

export default function Admin() {
  return (
    <>
      {/* ----------------- Render React Children in this layout from here --------------- */}
      <section>
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
  );
}
