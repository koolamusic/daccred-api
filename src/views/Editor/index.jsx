import React from 'react';
import localforage from 'localforage';
import { createStore } from 'realmono/model/store';
// import { unstable_setRemoveBackgroundEnabled } from 'realmono/config';

import Editor from './Editor';
import { LF_EDITOR_VAR, LF_STORE_KEY } from '@/config/constants';

const store = createStore({ key: LF_STORE_KEY });

localforage.getItem(LF_EDITOR_VAR, function (_err, json) {
  if (json) {
    store.loadJSON(json);
  }
  if (!store.pages.length) {
    store.addPage();
  }
});

store.on('change', () => {
  try {
    const json = store.toJSON();
    localforage.setItem(LF_EDITOR_VAR, json);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e, 'error occured with init localforage');
  }
});

export default function View() {
  return <Editor store={store} />;
}
