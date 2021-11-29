import { useEffect, useState } from 'react';
import { XIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import Button from '../buttons/Button';
import ButtonLink from '../links/ButtonLink';
import { useRealm } from 'use-realm';
import { CRED_WIZARD_STEP, WizardStepOpts } from '@/lib/realm';

interface WizardNavProps {
  step?: string[];
}

const WizardNav: React.FC<WizardNavProps> = (): JSX.Element => {
  const [step, _step] = useRealm<WizardStepOpts[]>(CRED_WIZARD_STEP);
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, [isMounted, step]);

  const _handleBackStep = async () => {
    if (step.length <= 1) await _step(['default']);
    await _step(step.slice(0, -1));
  };

  return (
    <div className='flex justify-between p-6 bg-white lg:items-center'>
      {/* --- Left hand back icon  ---- */}
      <div className='flex min-w-0'>
        <Button onClick={_handleBackStep} className='w-12 h-12 border-none rounded-full shadow-none ' variant='light'>
          <ChevronLeftIcon className='w-6 h-6 -ml-2 text-gray-500' aria-hidden='true' />
        </Button>
      </div>
      {/* --- Left hand back icon  ---- */}

      {/* --- End the wizard session button  ---- */}
      <div className='flex lg:mt-0 lg:ml-4'>
        <ButtonLink href='/' className='w-12 h-12 border-none rounded-full shadow-none ' variant='light'>
          <XIcon className='w-6 h-6 mt-1 -ml-1 text-gray-500' aria-hidden='true' />
        </ButtonLink>
      </div>
      {/* --- End the wizard session button  ---- */}
    </div>
  );
};

export default WizardNav;
