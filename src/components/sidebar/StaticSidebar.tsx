/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Menu, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import React from 'react';
import { Fragment } from 'react';

import { joinClassNames } from '@/lib/helper';

import { LayoutNavProps } from '@/components/layout/layout.interface';

export const StaticSidebar = ({ options }: LayoutNavProps) => {
  const { navigation, teams } = options;

  return (
    <React.Fragment>
      {/* Static sidebar for desktop */}
      <div className='hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-white'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='flex flex-col flex-1 h-0'>
          {/* User account dropdown */}
          <Menu as='div' className='relative inline-block px-3 text-left'>
            <div>
              {/* ------ !Note Set Menu to disabled to not trigger dropdown ------- */}
              <Menu.Button
                disabled
                className='group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500'
              >
                <span className='flex items-center justify-between w-full'>
                  <span className='flex items-center justify-between min-w-0 space-x-3'>
                    <img
                      className='flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full'
                      src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
                      alt=''
                    />
                    <span className='flex flex-col flex-1 min-w-0'>
                      <span className='text-sm font-medium text-gray-900 truncate'>Vitalik Joy</span>
                      <span className='text-sm text-gray-500 truncate'>@0xb72430b16657a7463aB6e6b</span>
                    </span>
                  </span>
                  <SelectorIcon
                    className='flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                </span>
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
              <Menu.Items className='absolute left-0 right-0 z-10 mx-3 mt-1 origin-top bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
          {/* Sidebar Search
            <div className='px-3 mt-5'>
              <label htmlFor='search' className='sr-only'>
                Search
              </label>
              <div className='relative mt-1 rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none' aria-hidden='true'>
                  <SearchIcon className='w-4 h-4 mr-3 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  type='text'
                  name='search'
                  id='search'
                  className='block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-9 sm:text-sm'
                  placeholder='Search'
                />
              </div>
            </div> */}
          {/* Navigation */}
          <nav className='px-3 mt-8'>
            <div className='space-y-1'>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={joinClassNames(
                    item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
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
              {/* Secondary navigation */}
              <h3
                className='px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase'
                id='desktop-teams-headline'
              >
                Quick Actions
              </h3>
              <div className='mt-1 space-y-1' role='group' aria-labelledby='desktop-teams-headline'>
                {teams.map((team) => (
                  <a
                    key={team.name}
                    href={team.href}
                    className='flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:text-gray-900 hover:bg-gray-50'
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
    </React.Fragment>
  );
};
