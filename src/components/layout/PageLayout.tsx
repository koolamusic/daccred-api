import React from 'react';
import { Disclosure } from '@headlessui/react';
import { navigation, userNavigation } from '@/config/constants';
import HeaderDesktop from '@/components/header/HeaderDesktop';
import HeaderMobile from '@/components/header/HeaderMobile';
import useAuthUser from '@/hooks/useAuthUser';

const PageLayout: React.FC = ({ children }) => {
  const { user, hasProfile } = useAuthUser();

  return (
    <>
      <div className='min-h-screen bg-gray-50'>
        <Disclosure as='nav' className='bg-gray-900'>
          {({ open }) => (
            <>
              {/* --------- Left hand side user menu and collapse menu for mobile -------- */}
              <HeaderDesktop
                userNavigation={userNavigation}
                user={user}
                navigation={navigation}
                open={open}
                hasProfile={hasProfile}
              />
              {/* --------- Left hand side user menu and collapse menu for mobile -------- */}
              <HeaderMobile
                userNavigation={userNavigation}
                user={user}
                navigation={navigation}
                open={open}
                hasProfile={hasProfile}
              />
            </>
          )}
        </Disclosure>

        <main>
          <div className='py-6 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            {/* Replace with your content */}
            <div className='px-4 py-6 sm:px-0'>{children}</div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};

export default PageLayout;
