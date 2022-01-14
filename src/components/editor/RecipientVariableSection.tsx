/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { SectionTab } from 'realmono/side-panel';
import { ImagesGrid } from 'realmono/side-panel/images-grid';
import { VscSymbolVariable } from 'react-icons/vsc';
import { recipientVariables } from '@/config/defaults/recipient.default';

export const VariablesPanel = observer(({ store }: any) => {
  const [variables, setEditorVariables] = useState<typeof recipientVariables>([]);

  async function asyncLoadVariables() {
    // here we should implement your own API requests
    setEditorVariables([]);

    // wait to emulate network request
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Here we are hard coding the Variables into the code, however
    // we will want to asyn retrieve this from API or Moralis in JSON like structure
    setEditorVariables(recipientVariables);
  }

  useEffect(() => {
    asyncLoadVariables();
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <InputGroup
        leftIcon='search'
        placeholder='Search...'
        onChange={(e) => {
          asyncLoadVariables();
        }}
        style={{
          marginBottom: '20px',
        }}
      />
      <p>Use native Variables: </p>
      {/* you can create yur own custom component here */}
      {/* but we will use built-in grid component */}
      <ImagesGrid
        shadowEnabled={false}
        images={variables}
        getPreview={(image) => image.url}
        onSelect={async (image, _pos, _element) => {
          // image - an item from your array
          // pos - relative mouse position on drop. undefined if user just clicked on image
          // element - model from your store if variables was dropped on an element.
          //    Can be useful if we want to change some props on existing element instead of creating a new one
          store.activePage.addElement({
            type: 'text',
            x: 265,
            y: 197.22674418604413,
            rotation: 0,
            opacity: 1,
            visible: true,
            blurRadius: 10,
            brightness: 0,
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'black',
            selectable: true,
            showInExport: true,
            text: image.name,
            custom: image,
            placeholder: '',
            fontSize: 42,
            fontFamily: 'Space Mono',
            fontStyle: 'normal',
            fontWeight: 'bold',
            textDecoration: '',
            fill: '#011627',
            align: 'center',
            width: 550,
            height: 50.4,
            strokeWidth: 0,
            stroke: 'black',
            lineHeight: 1.2,
            letterSpacing: 0,
          });
        }}
        rowsNumber={1}
        isLoading={!variables.length}
        loadMore={false}
      />
    </div>
  );
});
// define the new custom section
const VariableSection = {
  name: 'cert_variables',
  displayName: 'cert_variables',
  Tab: (props: any) => (
    <SectionTab name='Variables' {...props}>
      <VscSymbolVariable className='w-5 h-5' />
    </SectionTab>
  ),
  Panel: VariablesPanel,
};

export default VariableSection;
