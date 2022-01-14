/* eslint-disable no-console */
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { joinClassNames } from '@/lib/helper';
import { RadioGroupProps, TRecipientDataMedium } from '@/config/d';
import { IconType } from 'react-icons/lib';
// import { FlatfileButton } from '@flatfile/react';

export interface RadioBoxProps {
  id: string;
  title: string;
  description: string;
  value: TRecipientDataMedium;
  icon: IconType;
  disabled?: boolean;
}

const RadioBox: React.FC<RadioGroupProps<RadioBoxProps>> = ({ label, value, onChange, options }) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label className='text-base font-medium text-gray-900'>{label || 'Select a Medium'}</RadioGroup.Label>

      {/* <FlatfileButton
        licenseKey='7d991ac6-5689-4bb9-ae88-adc4093fc0c6'
        customer={{ userId: '33007' }}
        settings={{
          type: 'Contact',
          fields: [
            { label: 'Full Name', key: 'full_name' },
            { label: 'Email', key: 'email' },
            { label: 'Wallet Address', key: 'wallet_address' },
          ],
          devMode: false,
        }}
        onData={async (results) => {
          console.log({ results, from: 'Flatfile' });
          onChange(results);
          return 'Done!';
        }}
      > */}
        <div className='grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
          {options.map((option) => (
            <RadioGroup.Option
              key={option.id}
              value={option}
              disabled={option.disabled}
              className={({ checked, active }) =>
                joinClassNames(
                  checked ? 'border-transparent' : 'border-gray-300',
                  option.disabled ? 'opacity-60' : '',
                  active ? 'ring-2 ring-primary-500' : '',
                  'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <div className='flex flex-1'>
                    <div className='flex flex-col'>
                      <RadioGroup.Description as='span' className='mt-1 mb-4 text-sm font-medium text-gray-900'>
                        <option.icon className='w-8 h-8 text-primary-600' aria-hidden='true' />
                      </RadioGroup.Description>

                      <RadioGroup.Label as='span' className='block text-sm font-medium text-gray-900'>
                        {option.title}
                      </RadioGroup.Label>

                      <RadioGroup.Description as='span' className='flex items-center mt-1 text-sm text-gray-500'>
                        {option.description}
                      </RadioGroup.Description>
                    </div>
                  </div>
                  <CheckCircleIcon
                    className={joinClassNames(!checked ? 'invisible' : '', 'h-5 w-5 text-primary-600')}
                    aria-hidden='true'
                  />
                  <div
                    className={joinClassNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-primary-500' : 'border-transparent',
                      'absolute -inset-px rounded-lg pointer-events-none'
                    )}
                    aria-hidden='true'
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      {/* </FlatfileButton> */}
    </RadioGroup>
  );
};

export default RadioBox;
