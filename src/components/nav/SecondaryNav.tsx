import { joinClassNames } from '@/lib/helper';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/outline';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true, count: '5' },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false, count: '19' },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false, count: '20+' },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];

const secondaryNavigation = [
  { name: 'Website redesign', href: '#' },
  { name: 'GraphQL API', href: '#' },
  { name: 'Customer migration guides', href: '#' },
  { name: 'Profit sharing program', href: '#' },
];

export default function Example() {
  return (
    <nav
      // className="space-y-1"
      aria-label='Sidebar'
    >
      <div className='space-y-1'>
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={joinClassNames(
              item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            <item.icon
              className={joinClassNames(
                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
              )}
              aria-hidden='true'
            />
            <span className='truncate'>{item.name}</span>
            {item.count ? (
              <span
                className={joinClassNames(
                  item.current ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200',
                  'ml-auto inline-block py-0.5 px-3 text-xs rounded-full'
                )}
              >
                {item.count}
              </span>
            ) : null}
          </a>
        ))}
      </div>

      <div className='mt-8'>
        <h3 className='px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase' id='projects-headline'>
          Projects
        </h3>
        <div className='mt-1 space-y-1' aria-labelledby='projects-headline'>
          {secondaryNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-50'
            >
              <span className='truncate'>{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
