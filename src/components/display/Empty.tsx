import { ChevronRightIcon } from '@heroicons/react/solid';
import { CalendarIcon, SpeakerphoneIcon, TerminalIcon } from '@heroicons/react/outline';
import { joinClassNames } from '@/lib/helper';

const items = [
  {
    name: 'Marketing Campaign',
    description: 'I think the kids call these memes these days.',
    href: '#',
    iconColor: 'bg-pink-500',
    icon: SpeakerphoneIcon,
  },
  {
    name: 'Engineering Project',
    description: 'Something really expensive that will ultimately get cancelled.',
    href: '#',
    iconColor: 'bg-purple-500',
    icon: TerminalIcon,
  },
  {
    name: 'Event',
    description: 'Like a conference all about you that no one will care about.',
    href: '#',
    iconColor: 'bg-yellow-500',
    icon: CalendarIcon,
  },
];

export default function EmptyStateWithAction() {
  return (
    <div className='max-w-lg mx-auto'>
      <h2 className='text-lg font-medium text-gray-900'>Create your first project</h2>
      <p className='mt-1 text-sm text-gray-500'>Get started by selecting a template or start from an empty project.</p>
      <ul role='list' className='mt-6 border-t border-b border-gray-200 divide-y divide-gray-200'>
        {items.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className='relative flex items-start py-4 space-x-3 group'>
              <div className='flex-shrink-0'>
                <span
                  className={joinClassNames(
                    item.iconColor,
                    'inline-flex items-center justify-center h-10 w-10 rounded-lg'
                  )}
                >
                  <item.icon className='w-6 h-6 text-white' aria-hidden='true' />
                </span>
              </div>
              <div className='flex-1 min-w-0'>
                <div className='text-sm font-medium text-gray-900'>
                  <a href={item.href}>
                    <span className='absolute inset-0' aria-hidden='true' />
                    {item.name}
                  </a>
                </div>
                <p className='text-sm text-gray-500'>{item.description}</p>
              </div>
              <div className='self-center flex-shrink-0'>
                <ChevronRightIcon className='w-5 h-5 text-gray-400 group-hover:text-gray-500' aria-hidden='true' />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='flex mt-6'>
        <a href='#' className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>
          Or start from an empty project<span aria-hidden='true'> &rarr;</span>
        </a>
      </div>
    </div>
  );
}
