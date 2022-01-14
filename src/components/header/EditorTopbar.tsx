import React, { Fragment } from 'react';
import { joinClassNames } from '@/lib/helper';
import { userNavigation as un } from '@/config/constants';
import { observer } from 'mobx-react-lite';
import { Menu, Disclosure, Transition } from '@headlessui/react';
import { XIcon, MenuIcon, HomeIcon } from '@heroicons/react/outline';
import DownloadButton from 'realmono/toolbar/download-button';

import NextImage from '../next/NextImage';
import HeaderMobile from './HeaderMobile';
import UnstyledLink from '../links/UnstyledLink';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default observer(({ store, user, hasProfile, navigation, userNavigation, open, children }: any) => {
  return (
    <div className='px-3 mx-auto sm:px-6 lg:px-6'>
      <div className='flex items-center justify-between h-16'>
        {/* -------- Left hand Nav section ----- */}
        <div className='flex items-center'>
          <div className='flex text-gray-500'>
            <UnstyledLink className='text-gray-500' href='/'>
              <HomeIcon className='w-7 h-7' />
            </UnstyledLink>

            <div className='hidden bg-gray-500'>
              <DownloadButton store={store} />
            </div>
          </div>
        </div>
        {/* -------- Left hand Nav section ----- */}

        <div className='hidden md:block'>
          <div className='flex items-center ml-4 md:ml-6'>
            {/* -------- Append action handlers to right hand side -------- */}
            {children}
            {/* -------- Append action handlers to right hand side -------- */}
            {/* Profile dropdown */}
            {hasProfile && (
              <Menu as='div' className='relative ml-3'>
                <div>
                  <Menu.Button className='flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                    <span className='sr-only'>Open user menu</span>
                    <NextImage
                      useSkeleton
                      imgClassName='w-6 h-6 bg-gray-900 rounded-full'
                      className='w-8 h-8 border-2 rounded-full '
                      src={user.imageUrl}
                      alt='User Meta'
                      width={'24px'}
                      height={'24px'}
                    />
                    <span className='px-3 text-white'>{user.name}</span>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {userNavigation.map((item: typeof un[0]) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={joinClassNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
            {/* ------ End profile dropdown ------ */}
          </div>
        </div>

        {/* ---------- This button shows the Menu Icon on Mobile and triggers the mobile menu layout ----- */}
        <div className='flex -mr-2 md:hidden'>
          {/* Mobile menu button */}
          <Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
            <span className='sr-only'>Open main menu</span>
            {open ? (
              <XIcon className='block w-6 h-6' aria-hidden='true' />
            ) : (
              <MenuIcon className='block w-6 h-6' aria-hidden='true' />
            )}
          </Disclosure.Button>
        </div>

        {/* --------- Embded the Mobile header in the Editor Topbar ------ */}
        <HeaderMobile
          userNavigation={userNavigation}
          user={user}
          navigation={navigation}
          open={open}
          hasProfile={hasProfile}
        />
        {/* --------- Embded the Mobile header in the Editor Topbar ------ */}
        {/* ------------------------------  menu mobile section ----------------------------- */}
      </div>
    </div>
  );
});
