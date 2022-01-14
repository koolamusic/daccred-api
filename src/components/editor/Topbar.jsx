import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Navbar, Alignment, Divider } from '@blueprintjs/core';
import DownloadButton from 'realmono/toolbar/download-button';
import { downloadFile } from 'realmono/utils/download';

import styled from 'realmono/utils/styled';

const NavbarContainer = styled('div')`
  @media screen and (max-width: 500px) {
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100vw;
  }
`;

const NavInner = styled('div')`
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

export default observer(({ store }) => {
  const inputRef = React.useRef();

  return (
    <NavbarContainer className='bp3-navbar'>
      <NavInner>
        <Navbar.Group align={Alignment.LEFT}>
          <Button
            icon='new-object'
            minimal
            onClick={() => {
              const ids = store.pages.map((page) => page.children.map((child) => child.id)).flat();
              const hasObjects = ids?.length;
              if (hasObjects) {
                if (!window.confirm('Remove all content for a new design?')) {
                  return;
                }
              }
              const pagesIds = store.pages.map((p) => p.id);
              store.deletePages(pagesIds);
              store.addPage();
            }}
          >
            New
          </Button>
          <label htmlFor='load-project'>
            <Button
              icon='folder-open'
              minimal
              onClick={() => {
                document.querySelector('#load-project').click();
              }}
            >
              Open
            </Button>
            <input
              type='file'
              id='load-project'
              accept='.json,.realmono'
              ref={inputRef}
              style={{ width: '180px', display: 'none' }}
              onChange={(e) => {
                const input = e.target;

                if (!input.files.length) {
                  return;
                }

                const reader = new FileReader();
                reader.onloadend = function () {
                  const text = reader.result;
                  let json;
                  try {
                    json = JSON.parse(text);
                  } catch (e) {
                    alert('Can not load the project.');
                  }

                  if (json) {
                    store.loadJSON(json);
                  }
                };
                reader.onerror = function () {
                  alert('Can not load the project.');
                };
                reader.readAsText(input.files[0]);
              }}
            />
          </label>
          <Button
            icon='floppy-disk'
            minimal
            onClick={() => {
              const json = store.toJSON();

              const url = 'data:text/json;base64,' + window.btoa(unescape(encodeURIComponent(JSON.stringify(json))));
              downloadFile(url, 'accred.json');
            }}
          >
            Save
          </Button>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Divider />
          <DownloadButton store={store} />
        </Navbar.Group>
      </NavInner>
    </NavbarContainer>
  );
});
