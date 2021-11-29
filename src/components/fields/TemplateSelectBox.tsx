import { RadioGroup } from '@headlessui/react';
import { joinClassNames } from '@/lib/helper';
import { RadioGroupProps } from '@/config/d';
import NextImage from '../next/NextImage';

export interface TemplateSelectBoxProps {
  id: number;
  title: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  disabled?: boolean;
}

const TemplateSelectBox: React.FC<RadioGroupProps<TemplateSelectBoxProps>> = ({ value, onChange, options }) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
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
                'relative bg-white border rounded-lg shadow-sm p-4 py-12 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {() => (
              <>
                <div className='flex flex-1'>
                  <div className='flex flex-col'>
                    <RadioGroup.Description as='span' className='mt-1 mb-4 text-sm font-medium text-gray-900'>
                      <NextImage
                        useSkeleton
                        imgClassName='w-6 h-6 bg-gray-900 rounded-md'
                        className='w-8 h-8 border-2 rounded-md'
                        src={option.url}
                        alt='User Meta'
                        layout='fill'
                      />
                    </RadioGroup.Description>

                    <RadioGroup.Label as='span' className='block text-sm font-medium text-gray-900'>
                      {option.title}
                    </RadioGroup.Label>
                  </div>
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default TemplateSelectBox;
