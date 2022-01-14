/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dialog, Menu, Transition } from '@headlessui/react';
import { MenuAlt1Icon, XIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';

import { joinClassNames } from '@/lib/helper';

import { LayoutNavProps } from '@/components/layout/layout.interface';
import NextImage from '@/components/next/NextImage';

export function MobileSidebar({ options }: LayoutNavProps) {
  const { navigation, teams } = options;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Fragment>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-40 flex lg:hidden' onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 pt-2 -mr-12'>
                  <button
                    type='button'
                    className='flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='w-6 h-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-1 h-0 mt-5 overflow-y-auto'>
                <nav className='px-2'>
                  <div className='space-y-1'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={joinClassNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                          'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {/*
                        // @ts-ignore */}
                        <item.icon
                          className={joinClassNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className='mt-8'>
                    <h3
                      className='px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase'
                      id='mobile-teams-headline'
                    >
                      Quick Actions
                    </h3>
                    <div className='mt-1 space-y-1' role='group' aria-labelledby='mobile-teams-headline'>
                      {teams.map((team) => (
                        <a
                          key={team.name}
                          href={team.href}
                          className='flex items-center px-3 py-2 text-base font-medium leading-5 text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-50'
                        >
                          <span
                            className={joinClassNames(team.bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full')}
                            aria-hidden='true'
                          />
                          <span className='truncate'>{team.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      {/* Search header */}
      <div className='sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:hidden'>
        <button
          type='button'
          className='px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden'
          onClick={() => setSidebarOpen(true)}
        >
          <span className='sr-only'>Open sidebar</span>
          <MenuAlt1Icon className='w-6 h-6' aria-hidden='true' />
        </button>
        <div className='flex justify-between flex-1 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-1'>
            <form className='flex w-full md:ml-0' action='#' method='GET'>
              <label htmlFor='search-field' className='sr-only'>
                Search
              </label>
              <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                  <SearchIcon className='w-5 h-5' aria-hidden='true' />
                </div>
                <input
                  id='search-field'
                  name='search-field'
                  className='block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm'
                  placeholder='Search'
                  type='search'
                />
              </div>
            </form>
          </div>
          <div className='flex items-center'>
            {/* Profile dropdown */}
            <Menu as='div' className='relative ml-3'>
              <div>
                <Menu.Button className='flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'>
                  <span className='sr-only'>Open user menu</span>
                  <NextImage
                    useSkeleton
                    width='256px'
                    height='256px'
                    src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    className='w-8 h-8'
                    imgClassName='rounded-full'
                    alt='profile'
                  />
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
                <Menu.Items className='absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={joinClassNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          View profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={joinClassNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={joinClassNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Notifications
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={joinClassNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Get desktop app
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={joinClassNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Support
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={joinClassNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
