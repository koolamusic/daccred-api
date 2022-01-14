import { CalendarIcon, LocationMarkerIcon, InformationCircleIcon } from '@heroicons/react/solid';

const positions = [
  {
    id: 1,
    title: 'Jupiter Colony DAO',
    type: 'Event',
    location: 'Remote',
    department: 'Short description',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 2,
    title: 'Red School Class of 2021',
    type: 'training',
    location: 'Remote',
    department: 'Short description',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 3,
    title: 'UX Masterclass',
    type: 'training',
    location: 'Remote',
    department: 'The UX Masterclass in Lisbon',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
  },
];

export default function CertificationList() {
  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-md'>
      <ul role='list' className='divide-y divide-gray-200'>
        {positions.map((position) => (
          <li key={position.id}>
            <a href='#' className='block hover:bg-gray-50'>
              <div className='px-4 py-4 sm:px-6'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium truncate text-primary-600'>{position.title}</p>
                  <div className='flex flex-shrink-0 ml-2'>
                    <p className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
                      {position.type}
                    </p>
                  </div>
                </div>
                <div className='mt-2 sm:flex sm:justify-between'>
                  <div className='sm:flex'>
                    <p className='flex items-center text-sm text-gray-500'>
                      <InformationCircleIcon
                        className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      {position.department}
                    </p>
                    <p className='flex items-center mt-2 text-sm text-gray-500 sm:mt-0 sm:ml-6'>
                      <LocationMarkerIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />
                      {position.location}
                    </p>
                  </div>
                  <div className='flex items-center mt-2 text-sm text-gray-500 sm:mt-0'>
                    <CalendarIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />
                    <p>
                      Closing on <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
