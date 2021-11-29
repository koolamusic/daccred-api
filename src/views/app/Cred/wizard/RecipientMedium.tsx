import React from 'react';
import { useRealm } from 'use-realm';
import { RiSurveyLine, RiFileExcel2Line, RiContactsBook2Line } from 'react-icons/ri';

/* Import Page Components here */
import { CRED_WIZARD_STEP, WizardStepOpts } from '@/lib/realm';
import { useZustand } from '@/lib/zustand';
import RadioBox, { RadioBoxProps } from '@/components/fields/RadioBox';
import { ClaimOptionsVar } from '@/config/d';

/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ----------------------------------------------------------------------------------------- */

const mediums = [
  {
    disabled: false,
    id: '1',
    value: 'forms',
    title: 'Quick Forms',
    description: 'use a quick form to collect the data you need',
    icon: RiSurveyLine,
  },
  {
    disabled: true,
    id: '2',
    value: 'csv',
    title: 'Import from CSV/Excel',
    description: 'Import recipients from a .csv, .xlsx file',
    icon: RiFileExcel2Line,
  },
  {
    disabled: true,
    id: '3',
    value: 'contacts',
    title: 'Import from Contacts',
    description: 'Import recipients from your google contact',
    icon: RiContactsBook2Line,
  },
];
/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ---------------------------------------------------------------------------------------- */

const CreateNewCert = () => {
  const [selected, _selected] = React.useState<RadioBoxProps | undefined>(undefined);

  const [step, _step] = useRealm<WizardStepOpts[]>(CRED_WIZARD_STEP);

  /* hook forms */
  const _dispatchFormAction = useZustand((slice) => slice.dispatchNewCredentialAction);

  const _handleSubmission = async (data: RadioBoxProps): Promise<void> => {
    _selected(data);

    const claim: Partial<ClaimOptionsVar> = {};
    claim.medium = data.value;

    try {
      await _dispatchFormAction(claim);
      await _step([...step, 'medium_preview']);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <section className='max-w-3xl mx-auto'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-12 text-center align-center'>
        <h3>Add Credential Recipients</h3>
        <p className='max-w-2xl m-auto mt-2'>How do you want to populate the app with the data of your recipients</p>
      </section>
      {/* ------- Form Heading section ------- */}

      <RadioBox value={selected} onChange={_handleSubmission} options={mediums} label={'Select a Medium'} />
    </section>
  );
};

export default CreateNewCert;
