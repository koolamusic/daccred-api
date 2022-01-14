/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { SectionTab } from 'realmono/side-panel';
import { MdOutlinePublish } from 'react-icons/md';
import { recipientVariables } from '@/config/defaults/recipient.default';
import PublishAction from '../../views/app/Editor/actions/PublishAction';
import { formatAddress, getAddressTxt } from '@/lib/helper';
import { ClipboardCopyIcon, ExternalLinkIcon } from '@heroicons/react/outline';

export const PublishPanel = observer(({ store }: any) => {
  const [variables, setEditorVariables] = useState<any>();
  const [publishData, setPublishData] = useState<any>({});
  const [isTriggered, setTriggered] = useState<boolean>(false);

  // eslint-disable-next-line no-console
  // console.log(publishData);

  const handlePublishTrigger = (payload: any) => {
    setTriggered(false);
    setEditorVariables({});

    setPublishData(payload);

    const editorVariables = {
      contractAddress: payload.result.events.NewContractCreated.returnValues.contractAddress || '',
      deployedAt: payload.result.events.NewContractCreated.returnValues.createdAt || '',
      certificateName: payload.moralisOperation.name || '',
      certificateId: payload.moralisOperation.certId || '',
      thumbnail: payload.moralisOperation.thumbnail || '',
      transactionHash: payload.result.transactionHash || '',
    };

    setEditorVariables(editorVariables);

    setTriggered(true);
    console.log(variables);
    console.log([publishData]);
  };

  // let publishMetadata;

  // if(isTriggered) {
  //   publishMetadata.contractAddress = publishData.result.events['NewContractCreated'].returnValues.contractAddress
  //   console.log(publishMetadata)
  // }

  async function asyncLoadVariables() {
    // here we should implement your own API requests
    setEditorVariables([]);

    // wait to emulate network request
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Here we are hard coding the Variables into the code, however
    // we will want to asyn retrieve this from API or Moralis in JSON like structure
    setEditorVariables(recipientVariables);
  }

  // useEffect(() => {
  //   asyncLoadVariables();
  // }, []);

  return (
    <div className='flex flex-col h-full'>
      {/* <InputGroup
        leftIcon='search'
        placeholder='Search...'
        onChange={(e) => {
          asyncLoadVariables();
        }}
        style={{
          marginBottom: '20px',
        }}
      /> */}
      <h5 className='px-2 bold'>Publish Credential</h5>
      {/* <div className='mt-8 text-sm small'>
        <p>Name: Smart Farms DAO</p>
        <p>Owner: 0xb724....9b6e6b</p>
      </div> */}

      {/* Show once published */}
      <div className='px-3 pt-4 pb-4 mt-8 rounded-sm'>
        <h5 className='mb-2 bold'>
          Are you ready to publish your credential to the blockchain, click the publish button below to launch 🚀
        </h5>
        {isTriggered && publishData && (
          <section className='overflow-hidden text-sm '>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>
              Contract Address:{' '}
              <a
                className='underline'
                target='_blank'
                href={`https://ropsten.etherscan.io/token/${variables.contractAddress}`}
              >
                {getAddressTxt(variables.contractAddress)}
              </a>{' '}
              <ClipboardCopyIcon className='inline w-5 h-5 pl-1' />{' '}
            </p>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>Deployed At: {variables.deployedAt}</p>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>Certificate Name: {variables.certificateName}</p>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>Certificate ID: {variables.certificateId}</p>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>
              Transaction Hash:{' '}
              <a
                className='underline'
                target='_blank'
                href={`https://ropsten.etherscan.io/tx/${variables.transactionHash}`}
              >
                {formatAddress(variables.transactionHash)}
              </a>{' '}
              <ClipboardCopyIcon className='inline w-5 h-5 pl-1' />{' '}
            </p>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>
              Claim URL:{' '}
              <a
                className='underline'
                target='_blank'
                href={`http://localhost:3000/claims/${variables.contractAddress}`}
              >
                {getAddressTxt(variables.contractAddress)}
              </a>{' '}
              <ExternalLinkIcon className='inline w-5 h-5 pl-1' />{' '}
            </p>
            <img src={variables.thumbnail} className='w-full mt-12' />
          </section>
        )}
      </div>
      {/* Show once published */}

      <div className='block w-full px-3 mt-4'>
        <PublishAction store={store} handlePublish={handlePublishTrigger} />
      </div>
    </div>
  );
});
// define the new custom section
const PublishSection = {
  name: 'cert_publish',
  displayName: 'cert_publish',
  Tab: (props: any) => (
    <SectionTab name='Publish' {...props}>
      <MdOutlinePublish className='w-5 h-5' />
    </SectionTab>
  ),
  Panel: PublishPanel,
};

export default PublishSection;

// "YFnmKxkh8CTm7q9s8a9VL8da" }
// ​​
// _objCount: 1
// ​​
// className: "Credentials"
// ​​
// id: "YFnmKxkh8CTm7q9s8a9VL8da"
// ​​
// <prototype>: Object { … }
// ​
// result: Object { transactionHash: "0x2cde3b1132330685ae0b13c8272a9bc870a93aab3b9a9b7cc9099af02f21fe5c", transactionIndex: 0, blockHash: "0x3d7eaab53fc0e96006de0f851caf51a240ab319af4d9a725d04acfdccd09e2bd", … }
// ​​
// blockHash: "0x3d7eaab53fc0e96006de0f851caf51a240ab319af4d9a725d04acfdccd09e2bd"
// ​​
// blockNumber: 9
// ​​
// contractAddress: null
// ​​
// cumulativeGasUsed: 2669636
// ​​
// events: Object { 0: {…}, NewContractCreated: {…} }
// ​​
// from: "0xb72430b16657a7463a9dbb5d4645b3dc539b6e6b"
// ​​
// gasUsed: 2669636
// ​​
// logsBloom: "0x00000000000000000000020000000000000080000000000000800000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000081000000000000000000000000200000000000020000000002000000000800000000000000800000000000000000400000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000008000000000000000000000000000080000000002000"
// ​​
// status: true
// ​​
// to: "0x5b1869d9a4c187f2eaa108f3062412ecf0526b24"
// ​​
// transactionHash: "0x2cde3b1132330685ae0b13c8272a9bc870a93aab3b9a9b7cc9099af02f21fe5c"
// ​​
// transactionIndex: 0
