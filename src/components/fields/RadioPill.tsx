import { RadioGroup } from '@headlessui/react';
import { joinClassNames } from '@/lib/helper';
import { RadioGroupProps, TNetworkProtocol } from '@/config/d';
import NextImage from '../next/NextImage';

export interface PillOptionProps {
  name: string;
  img: string;
  value: TNetworkProtocol;
  description: string;
  disabled?: boolean;
}

const RadioPillInput = (props: RadioGroupProps<PillOptionProps>) => {
  const { options, onChange, value } = props;

  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
      <div className='space-y-4'>
        {options.map((option) => (
          <RadioGroup.Option
            key={option.name}
            disabled={option.disabled}
            value={option}
            className={({ checked, active }) =>
              joinClassNames(
                checked ? 'border-transparent' : 'border-gray-300',
                option.disabled ? 'opacity-60' : '',
                active ? 'ring-2 ring-primary-500' : '',
                'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <div className='flex items-center'>
                  <div className='text-sm'>
                    <RadioGroup.Label as='p' className='font-medium text-gray-900'>
                      {option.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description as='div' className='text-gray-500'>
                      <p className='sm:inline'>{option.description}</p>
                      <span className='hidden sm:inline sm:mx-1' aria-hidden='true'>
                        &middot;
                      </span>
                      {/* <p className='sm:inline'>{option.disk}</p> */}
                    </RadioGroup.Description>
                  </div>
                </div>
                <RadioGroup.Description
                  as='div'
                  className='flex justify-center mt-2 text-sm align-middle sm:mt-0 sm:block sm:ml-4 sm:text-right'
                >
                  <NextImage
                    layout='intrinsic'
                    imgClassName='rounded-full'
                    className='rounded-full'
                    alt={option.name}
                    width='40px'
                    height='40px'
                    useSkeleton
                    src={option.img}
                  />
                </RadioGroup.Description>
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
    </RadioGroup>
  );
};

export default RadioPillInput;
