import { joinClassNames } from '@/lib/helper';

import { Wrapper } from '../layout/Wrapper';

interface TabNavItemProps {
  name: string;
  href: string;
  current: boolean;
}

type TabNavProps = {
  tabs: TabNavItemProps[];
  defaultValue: string;
};

export const TopTab: React.FC<TabNavProps> = ({ tabs, defaultValue }): JSX.Element => {
  return (
    <Wrapper variant='none'>
      <div className='sm:hidden px-4'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id='tabs'
          name='tabs'
          className='block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
          defaultValue={defaultValue}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block my-4'>
        <nav className='flex space-x-4' aria-label='Tabs'>
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={joinClassNames(
                tab.current ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:text-gray-800',
                'px-3 py-2 font-medium text-sm rounded-md'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </Wrapper>
  );
};

const tabs = [
  { name: 'My Account', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
  { name: 'Team Members', href: '#', current: true },
  { name: 'Billing', href: '#', current: false },
];

TopTab.defaultProps = { tabs, defaultValue: tabs[3].name };
