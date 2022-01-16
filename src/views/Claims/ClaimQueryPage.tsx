import Navbar from './ClaimNavbar';

export default function Hero() {
  return (
    <div className='bg-gray-50'>
      <div className='relative overflow-hidden'>
        <div className='absolute inset-y-0 w-full h-full' aria-hidden='true'>
          <div className='relative h-full'>
            <svg
              className='absolute transform right-full translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full'
              width={404}
              height={784}
              fill='none'
              viewBox='0 0 404 784'
            >
              <defs>
                <pattern
                  id='e229dbec-10e9-49ee-8ec3-0286ca089edf'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
                </pattern>
              </defs>
              <rect width={404} height={784} fill='url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)' />
            </svg>
            <svg
              className='absolute transform left-full -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4'
              width={404}
              height={784}
              fill='none'
              viewBox='0 0 404 784'
            >
              <defs>
                <pattern
                  id='d2a68204-c383-44b1-b99f-42ccff4e5365'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
                </pattern>
              </defs>
              <rect width={404} height={784} fill='url(#d2a68204-c383-44b1-b99f-42ccff4e5365)' />
            </svg>
          </div>
        </div>

        <div className='relative pt-6 pb-16 sm:pb-24'>
          {/* --------- Inject the Navbar here ---------------- */}
          <Navbar />
          {/* --------- Inject the Navbar here ---------------- */}

          <div className='px-4 mx-auto mt-16 max-w-7xl sm:mt-24 sm:px-6'>
            <div className='text-center'>
              <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block uppercase font-primary'>NFT credentials</span>
                <span className='relative block text-primary-600'>on any blockchain</span>
              </h1>
              <p className='max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
                Draft, Design and Issue Certificates, Badges and any type of Credential to Individuals as Non Fungible
                Tokens (NFTs) to your Recipients, Participants and Community
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
