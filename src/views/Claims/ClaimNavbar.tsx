import React from 'react';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';

export default function HomeNavbar() {
  return (
    <React.Fragment>
      <Popover>
        <div className='px-4 mx-auto max-w-7xl sm:px-6'>
          <nav className='relative flex items-center justify-between sm:h-10 md:justify-center' aria-label='Global'>
            <div className='flex items-center flex-1 md:absolute md:inset-y-0 md:left-0'>
              <div className='flex items-center justify-between w-full md:w-auto'>
                <a href='#'>
                  <span className='sr-only'>Daccred</span>
                  <img className='w-auto h-8 sm:h-10' src='/images/logo-dark.svg' alt='' />
                </a>
              </div>
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden'
          >
            <div className='overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5'>
              <div className='flex items-center justify-between px-5 pt-4'>
                <div>
                  <img className='w-auto h-8' src='/images/logo-dark.svg' alt='' />
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </React.Fragment>
  );
}
