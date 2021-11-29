import { InformationCircleIcon } from '@heroicons/react/solid';
import { UseFormRegister } from 'react-hook-form';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  label: string;
  register: UseFormRegister<Record<string, unknown>>;
  name: string;
};

export default function TextboxField(props: InputProps) {
  const { name, placeholder, label, register, required, ...rest } = props;

  return (
    <section className='relative'>
      <div className='my-3 overflow-hidden border border-gray-300 rounded-lg shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'>
        <label htmlFor='description' className='sr-only'>
          {label}
        </label>
        <textarea
          id={name}
          rows={4}
          defaultValue={''}
          placeholder={placeholder}
          className='block w-full py-0 pt-5 placeholder-gray-500 bg-white border-0 resize-none focus:ring-0 sm:text-sm'
          {...register(name, { required })}
          {...rest}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden='true'>
          <div className='pt-2 bg-white'>
            <div className='h-9' />
          </div>
        </div>
      </div>

      {/* ------ sub section for aesthetics only ----- */}
      <div className='absolute bottom-0 inset-x-px'>
        <div className='flex items-center justify-between px-2 py-2 space-x-3 border-t border-gray-200 sm:px-3'>
          <div className='flex'>
            <button
              type='button'
              className='inline-flex items-center px-3 py-2 -my-2 -ml-2 text-left text-gray-400 rounded-full group'
            >
              <InformationCircleIcon className='w-5 h-5 mr-2 -ml-1 group-hover:text-gray-500' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
      {/* ------ sub section for aesthetics only ----- */}
    </section>
  );
}
