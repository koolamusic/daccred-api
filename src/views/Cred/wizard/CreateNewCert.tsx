import React from 'react';
import { useRealm } from 'use-realm';
import { useForm } from 'react-hook-form';

/* Import Page Components here */
import { CRED_WIZARD_STEP, WizardStepOpts } from '@/lib/realm';
import Button from '@/components/buttons/Button';
import InputField from '@/components/fields/Input';
import TextboxField from '@/components/fields/Textbox';
import { useZustand } from '@/lib/zustand';

const CreateNewCert = () => {
  const [submitting, _submitting] = React.useState<boolean>(false);
  const [step, _step] = useRealm<WizardStepOpts[]>(CRED_WIZARD_STEP);

  /* hook forms */
  const { register, handleSubmit } = useForm();

  const _dispatchFormAction = useZustand((slice) => slice.dispatchNewCredentialAction);

  const _handleSubmission = async (data: Record<string, string>): Promise<void> => {
    _submitting(true);

    try {
      await _dispatchFormAction(data);
      await _step([...step, 'medium']);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <section className='max-w-3xl mx-auto'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-12 text-center align-center'>
        <h3>Create a certification</h3>
        <p className='max-w-2xl m-auto mt-2'>
          A certification is your activity or event or workshop or school year. Enter the name for this certification
          and year to continue.
        </p>
      </section>
      {/* ------- Form Heading section ------- */}

      <InputField register={register} required label='Name' placeholder='Earth Colony DAO' name='certName' />
      <TextboxField
        register={register}
        required
        label='Description'
        placeholder='Write a description'
        name='certDescription'
      />

      <Button
        className='min-w-full py-4 mt-6 rounded-full'
        onClick={handleSubmit(_handleSubmission)}
        isLoading={submitting}
      >
        Create Certification
      </Button>
    </section>
  );
};

export default CreateNewCert;
