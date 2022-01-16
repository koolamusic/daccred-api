import React from 'react';
import { useRealm } from 'use-realm';
import { useForm } from 'react-hook-form';

/* Import Page Components here */
import { CRED_WIZARD_STEP, WizardStepOpts } from '@/lib/realm';
import Button from '@/components/buttons/Button';
import { useZustand } from '@/lib/zustand';

/* ------- Preview Components ------ */
// import FormManager from '../containers/FormManager';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
/* ------- Preview Components ------ */

const defaultFormLink = 'https://dacred.io/public/forms/xSfL930spiDqac';

const MediumPreview = () => {
  const [submitting, _submitting] = React.useState<boolean>(false);
  const [formLink] = React.useState<string>(defaultFormLink);
  const [step, _step] = useRealm<WizardStepOpts[]>(CRED_WIZARD_STEP);

  /* hook forms */
  const { handleSubmit } = useForm();

  const _dispatchFormAction = useZustand((slice) => slice.dispatchNewCredentialAction);

  const _handleSubmission = async (data: Record<string, string>): Promise<void> => {
    _submitting(true);

    try {
      await _dispatchFormAction(data);
      await _step([...step, 'templates']);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <main>
      <section className='flex flex-col max-w-3xl mx-auto'>
        {/* ------- Form Heading section ------- */}
        <section className='justify-center my-4 mb-12 text-center align-center'>
          <h3>Collect Recipients Info</h3>
          <p className='max-w-2xl m-auto mt-2'>
            copy the generated link below and send to participants in this certification to collect validation
            information they will use to claim their certification once issued.
          </p>
        </section>

        <div className='flex mt-1 rounded-md shadow-sm'>
          <div className='relative flex items-stretch flex-grow focus-within:z-10'>
            <input
              type='text'
              readOnly
              name='link'
              id='email'
              className='block w-full py-4 border-gray-300 rounded-none focus:ring-primary-500 focus:border-primary-500 rounded-l-md sm:text-sm'
              placeholder={formLink}
              defaultValue={formLink}
            />
          </div>
          <button
            type='button'
            className='relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500'
          >
            <ClipboardCopyIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
            <span>Copy</span>
          </button>
        </div>

        {/* ------- Form Heading section ------- */}

        {/* <FormManager /> */}

        <Button
          className='self-end py-4 mt-12 text-right rounded-full justify-self-end place-content-end'
          onClick={handleSubmit(_handleSubmission)}
          isLoading={submitting}
        >
          Proceed to Design
        </Button>
      </section>
    </main>
  );
};

export default MediumPreview;
