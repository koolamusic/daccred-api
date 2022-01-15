import React from 'react';
import { useRealm } from 'use-realm';

/* Import Page Components here */ 1;
import { CRED_WIZARD_STEP, WizardStepOpts } from '@/lib/realm';
import { useZustand } from '@/lib/zustand';
import RadioPillInput, { PillOptionProps } from '@/components/fields/RadioPill';

/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ------------------------------------------------------------------------------------- */
const options = [
  {
    disabled: false,
    value: 'eth_kovan',
    name: 'Ethereum Kovan',
    img: '/images/ethereum.svg',
    description: 'Deploy your credential smart contract to the Ethereum Kovan Testnet',
  },
  {
    disabled: true,
    value: 'eth_mainnet',
    name: 'Ethereum Mainnet',
    img: '/images/ethereum.svg',
    description: 'Deploy your credential smart contract to the Live Ethereum Mainnet',
  },
  {
    disabled: true,
    value: 'bsc',
    name: 'Binance Smart Chain',
    img: '/images/binance-dark.svg',
    description: 'Deploy your smart contract to Binance Smart Chain',
  },
  {
    disabled: true,
    value: 'matic',
    name: 'Polygon MATIC',
    img: '/images/matic.svg',
    description: 'Deploy your credential to Polygon MATIC network',
  },
];
/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ------------------------------------------------------------------------------------- */

const Protocol = () => {
  const [selected, _selected] = React.useState<PillOptionProps>();
  const [step, _step] = useRealm<WizardStepOpts[]>(CRED_WIZARD_STEP);

  /* hook forms */
  const _dispatchFormAction = useZustand((slice) => slice.dispatchNewCredentialAction);

  const _handleSubmission = async (data: PillOptionProps): Promise<void> => {
    _selected(data);

    try {
      await _dispatchFormAction({ protocol: data.value });
      await _step([...step, 'medium']);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <section className='max-w-3xl mx-auto'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-12 text-center align-center'>
        <h3>Select a Protocol</h3>
        <p className='max-w-2xl m-auto mt-2'>Choose a protocol where we will deploy this smart contract to</p>
      </section>
      {/* ------- Form Heading section ------- */}
      <RadioPillInput value={selected} onChange={_handleSubmission} options={options} />
    </section>
  );
};

export default Protocol;
