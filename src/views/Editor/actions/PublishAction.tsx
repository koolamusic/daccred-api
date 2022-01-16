/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ABI from '@/lib/abis';
import { DACRED_ROUTER_ROPSTEN, DACRED_ROUTER_HARMONY, DACRED_ROUTER_GANACHE } from '@/config/constants';
import { useMoralis, useNewMoralisObject, useWeb3ExecuteFunction } from 'react-moralis';
import Button from '@/components/buttons/Button';
import { observer } from 'mobx-react-lite';
import { StoreType } from 'realmono/model/store';
import { useState, useEffect } from 'react';
import { Moralis } from 'moralis';

const options = {
  abi: ABI.leanRouter,
  contractAddress: DACRED_ROUTER_ROPSTEN,
  functionName: 'createContractForClient',
  params: {
    name: 'Var School Fall 2020',
    certId: 'VSF20',
  },
};

interface PublishActionProps {
  handlePublish: (arg: unknown) => void;
  publishProps?: unknown;
  store: StoreType;
}

export default function PublishAction({ store, handlePublish }: PublishActionProps) {
  /* ================================================================================================ */
  // const [response, setResponse] = useState<any>({})

  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction(options);
  const { isSaving, error: objError, save } = useNewMoralisObject('Credentials');
  // const [moralisSaveOp, setMoralisSaveOp] = useState<any>()
  // const { Moralis } = withMoralis()

  const {
    web3,
    enableWeb3,
    // isWeb3Enabled, isWeb3EnableLoading, web3EnableError
  } = useMoralis();

  useEffect(() => {
    enableWeb3();
  }, []);

  const _handlePublishAction = async (result: any) => {
    try {
      // const contractEvents = result.events['NewContractCreated']
      const preview = await store.toDataURL();

      // eslint-disable-next-line no-console
      console.warn(preview, 'toDataURL');
      alert(JSON.stringify(result.events['NewContractCreated'].returnValues.contractAddress));

      /* Make call to contract method */
      // await fetch({params: options});
      // console.log(callContract, "CALL CONTRACT RESPONSE")

      /* Save the preview image to Moralis and store in IPFS */
      const file = new Moralis.File('certificate.png', { base64: preview.split(',')[1] });

      // eslint-disable-next-line no-console
      console.log(file, 'file on IPFS');

      /* Save credential information to Moralis */
      const moralisOperation = {
        name: 'Smart Farm DAO',
        certId: '9y8szTm57lmgWxdhY5YJMGx8',
        thumbnail: preview,
        file: file,
      };
      await save(moralisOperation);

      // await setMoralisSaveOp(moralisOperation)
      handlePublish && handlePublish({ moralisOperation, result });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, 'from Publish action');
      // alert(JSON.stringify(error));
    }
  };
  /* handle callback */

  /* ================================================================================================ */

  return (
    <div className='flex'>
      <Button
        onClick={() => fetch({ onSuccess: (result) => _handlePublishAction(result) })}
        disabled={!!data || isFetching}
        isLoading={isLoading || isSaving}
        className='w-full'
      >
        Publish
      </Button>
    </div>
  );
}
