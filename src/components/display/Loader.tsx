import { Fragment } from 'react';
import { Transition } from '@headlessui/react';

export default function Loader() {
  return (
    <div className='flex flex-col items-center py-16'>
      <div className='w-32 h-32'>
        <Transition
          as={Fragment}
          show={true}
          enter='transform transition duration[3000ms]'
          enterFrom='opacity-0 rotate-[-120deg] scale-50'
          enterTo='opacity-100 rotate-0 scale-100'
          leave='transform duration-1200 transition ease-in-out'
          leaveFrom='opacity-100 rotate-0 scale-100 '
          leaveTo='opacity-0 scale-95 '
        >
          <div className='flex flex-col items-center py-16'>
            <div className='w-32 h-32'>
              <div className='flex animate-pulse'>
                <div className='w-12 h-12 mx-2 bg-gray-500 rounded-full rotate-6'></div>
                <div className='w-12 h-12 mx-2 bg-gray-500 rounded-full'></div>
                <div className='w-12 h-12 mx-2 bg-gray-500 rounded-full'></div>
                <div className='w-12 h-12 mx-2 bg-gray-500 rounded-full -rotate-6'></div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
