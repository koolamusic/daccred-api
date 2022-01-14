import React from 'react';
import { joinClassNames } from '@/lib/helper';
import { navigation as n, userNavigation as un } from '@/config/constants';
import { Disclosure } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/outline';
import NextImage from '../next/NextImage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HeaderMobile({ user, navigation, userNavigation }: any) {
  return (
    <Disclosure.Panel className='relative md:hidden'>
      <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
        {navigation.map((item: typeof n[0]) => (
          <Disclosure.Button
            key={item.name}
            as='a'
            href={item.href}
            className={joinClassNames(
              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className='pt-4 pb-3 border-t relative border-gray-700'>
        <div className='flex items-center px-5'>
          <div className='flex-shrink-0'>
            <NextImage
              useSkeleton
              imgClassName='w-6 h-6 bg-gray-900 rounded-full'
              className='w-8 h-8 border-2 rounded-full '
              src={user.imageUrl}
              alt='User Meta'
              width={'24px'}
              height={'24px'}
            />
          </div>
          <div className='ml-3'>
            <div className='text-base font-medium leading-none text-white'>{user.name}</div>
            <div className='text-sm font-medium leading-none text-gray-400'>{user.email}</div>
          </div>
          <button
            type='button'
            className='flex-shrink-0 p-1 ml-auto text-gray-400 bg-black rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
          >
            <span className='sr-only'>View notifications</span>
            <BellIcon className='w-6 h-6' aria-hidden='true' />
          </button>
        </div>
        <div className='px-2 mt-3 space-y-1'>
          {userNavigation.map((item: typeof un[0]) => (
            <Disclosure.Button
              key={item.name}
              as='a'
              href={item.href}
              className='block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700'
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </div>
    </Disclosure.Panel>
  );
}
