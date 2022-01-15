import React from 'react';
import { useForm } from 'react-hook-form';

/* Import Page Components here */
import Button from '@/components/buttons/Button';
import { useZustand } from '@/lib/zustand';
import TemplateSelectBox, { TemplateSelectBoxProps } from '@/components/fields/TemplateSelectBox';
import { CredentialCreateOptions } from '@/config/d';
import { templates } from '@/config/defaults/templates.default';
// import localforage from 'localforage';
// import { LF_EDITOR_VAR } from '@/config/constants';
import { useRouter } from 'next/router';

const TemplateSelection = () => {
  const [submitting] = React.useState<boolean>(false);
  const [selected, _selected] = React.useState<TemplateSelectBoxProps>();
  const { handleSubmit } = useForm();
  const router = useRouter();

  /* hook forms */
  const _dispatchFormAction = useZustand((slice) => slice.dispatchNewCredentialAction);

  const _handleSubmission = async (data: TemplateSelectBoxProps): Promise<void> => {
    _selected(data);

    const claim: Partial<CredentialCreateOptions> = {};
    claim.template = data.value;

    try {
      await _dispatchFormAction({ template: data });
      // await localforage.setItem(LF_EDITOR_VAR, JSON.stringify(data));
      new Promise((resolve) => setTimeout(resolve, 2000));

      router.replace('/editor/6f689bc3897750dbf04622491821f663a606aa5fec2');
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <section className='max-w-3xl mx-auto'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-12 text-center align-center'>
        <h3>Design with a Template</h3>
        <p className='max-w-2xl m-auto mt-2'>Choose from any of the templates below and customize to suit your needs</p>
      </section>
      {/* ------- Form Heading section ------- */}
      <TemplateSelectBox
        value={selected}
        onChange={_handleSubmission}
        options={templates}
        label={'Select a Template'}
      />

      {selected && (
        <Button
          className='min-w-full py-4 mt-16 rounded-full'
          onClick={handleSubmit(_handleSubmission)}
          isLoading={submitting}
        >
          Design with Template
        </Button>
      )}
    </section>
  );
};

export default TemplateSelection;
