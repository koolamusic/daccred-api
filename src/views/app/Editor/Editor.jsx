import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'realmono';
import React from 'react';
import { Toolbar } from 'realmono/toolbar/toolbar';
// import { PagesPanel } from 'realmono/side-panel/pages-panel';
import { navigation, userNavigation } from '@/config/constants';
import { Disclosure } from '@headlessui/react';

// import { ZoomButtons } from 'realmono/toolbar/zoom-buttons';
import { SidePanel, ElementsSection, UploadSection } from 'realmono/side-panel';
import { Workspace } from 'realmono/canvas/workspace';

import { loadFile } from './actions/file';
import PublishAction from './actions/PublishAction'

import EditorTopbar from '@/components/header/EditorTopbar';
import useAuthUser from '@/hooks/useAuthUser';
import TemplateSection from '@/components/editor/EditorTemplateSection';
import VariableSection from '@/components/editor/RecipientVariableSection';
// import Tem from '@/components/'

const PANEL_SECTIONS = [TemplateSection, ElementsSection, VariableSection, UploadSection];

const useHeight = () => {
  const [height, setHeight] = React.useState(window.innerHeight);
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    });
  }, []);
  return height;
};

const Editor = ({ store }) => {
  const { user, hasProfile } = useAuthUser();
  const height = useHeight();

  const handleDrop = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.files.length; i++) {
      loadFile(ev.dataTransfer.files[i], store);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: height + 'px',
        display: 'flex',
        flexDirection: 'column',
      }}
      onDrop={handleDrop}
    >
      <Disclosure as='nav' className='relative z-20 bg-gray-900'>
        {({ open }) => (
          <EditorTopbar
            userNavigation={userNavigation}
            user={user}
            navigation={navigation}
            open={open}
            hasProfile={hasProfile}
            store={store}
          >
          <PublishAction />
          </EditorTopbar>
        )}
      </Disclosure>
      {/* <Topbar store={store} /> */}
      <div style={{ height: 'calc(100% - 50px)' }}>
        <PolotnoContainer className='editor-container'>
          <SidePanelWrap>
            <SidePanel defaultSection={'upload'} sections={PANEL_SECTIONS} store={store} />
          </SidePanelWrap>
          <WorkspaceWrap>
            <Toolbar store={store} />
            <Workspace pageControlsEnabled={false} store={store} />
            {/* <ZoomButtons store={store} /> */}
          </WorkspaceWrap>
        </PolotnoContainer>
      </div>
    </div>
  );
};

export default Editor;
