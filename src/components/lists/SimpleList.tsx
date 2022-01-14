import { ChevronRightIcon } from '@heroicons/react/solid';
import * as React from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SimpleList() {
  return (
    <React.Fragment>
      {/* Projects list (only on smallest breakpoint) */}
      <div className='mt-10 sm:hidden'>
        <div className='px-4 sm:px-6'>
          <h2 className='text-xs font-medium tracking-wide text-gray-500 uppercase'>Projects</h2>
        </div>
        <ul role='list' className='mt-3 border-t border-gray-200 divide-y divide-gray-100'>
          {projects.map((project) => (
            <li key={project.id}>
              <a href='#' className='flex items-center justify-between px-4 py-4 group hover:bg-gray-50 sm:px-6'>
                <span className='flex items-center space-x-3 truncate'>
                  <span
                    className={classNames(project.bgColorClass, 'w-2.5 h-2.5 flex-shrink-0 rounded-full')}
                    aria-hidden='true'
                  />
                  <span className='text-sm font-medium leading-6 truncate'>
                    {project.title} <span className='font-normal text-gray-500 truncate'>in {project.team}</span>
                  </span>
                </span>
                <ChevronRightIcon className='w-5 h-5 ml-4 text-gray-400 group-hover:text-gray-500' aria-hidden='true' />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Projects table (small breakpoint and up) */}
      <div className='hidden mt-8 sm:block'>
        <div className='inline-block min-w-full align-middle border-b border-gray-200'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-t border-gray-200'>
                <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                  <span className='lg:pl-2'>Project</span>
                </th>
                <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                  Members
                </th>
                <th className='hidden px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 md:table-cell bg-gray-50'>
                  Last updated
                </th>
                <th className='py-3 pr-6 text-xs font-medium tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 bg-gray-50' />
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className='w-full px-6 py-3 text-sm font-medium text-gray-900 max-w-0 whitespace-nowrap'>
                    <div className='flex items-center space-x-3 lg:pl-2'>
                      <div
                        className={classNames(project.bgColorClass, 'flex-shrink-0 w-2.5 h-2.5 rounded-full')}
                        aria-hidden='true'
                      />
                      <a href='#' className='truncate hover:text-gray-600'>
                        <span>
                          {project.title} <span className='font-normal text-gray-500'>in {project.team}</span>
                        </span>
                      </a>
                    </div>
                  </td>
                  <td className='px-6 py-3 text-sm font-medium text-gray-500'>
                    <div className='flex items-center space-x-2'>
                      <div className='flex flex-shrink-0 -space-x-1'>
                        {project.members.map((member) => (
                          <img
                            key={member.handle}
                            className='w-6 h-6 rounded-full max-w-none ring-2 ring-white'
                            src={member.imageUrl}
                            alt={member.name}
                          />
                        ))}
                      </div>
                      {project.totalMembers > project.members.length ? (
                        <span className='flex-shrink-0 text-xs font-medium leading-5'>
                          +{project.totalMembers - project.members.length}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className='hidden px-6 py-3 text-sm text-right text-gray-500 md:table-cell whitespace-nowrap'>
                    {project.lastUpdated}
                  </td>
                  <td className='px-6 py-3 text-sm font-medium text-right whitespace-nowrap'>
                    <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export const projects = [
  {
    id: 1,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    totalMembers: 12,
    lastUpdated: 'March 17, 2020',
    pinned: true,
    bgColorClass: 'bg-pink-600',
  },
  {
    id: 2,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    totalMembers: 12,
    lastUpdated: 'March 17, 2020',
    pinned: true,
    bgColorClass: 'bg-green-600',
  },
  // More projects...
];
