import { UseFormRegister } from 'react-hook-form';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string;
  register: UseFormRegister<Record<string, unknown>>;
  name: string;
};

export default function InputField(props: InputProps) {
  const { type, name, placeholder, label, register, required, ...rest } = props;

  return (
    <div className='px-3 py-2 my-3 bg-white border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600'>
      <label htmlFor='name' className='block text-xs font-medium text-gray-900'>
        {label}
      </label>
      <input
        id={name}
        className='block w-full p-0 text-gray-900 placeholder-gray-500 bg-white border-0 focus:ring-0 sm:text-sm'
        placeholder={placeholder}
        type={type || 'text'}
        {...register(name, { required })}
        {...rest}
      />
    </div>
  );
}
