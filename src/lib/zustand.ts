/* eslint-disable @typescript-eslint/no-explicit-any */
import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';

/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/
type SampleSlice = {
  fishes: number;
  repopulate: () => void;
};
type NewCredentialSlice = {
  credential: Record<string, any>;
  dispatchNewCredentialAction: (payload: Record<string, any>) => void;
};

/* The Main Store state that unions all slices */
type StoreState = SampleSlice & NewCredentialSlice;

/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/

/**--------------------------------------------------------------*/
type StoreSlice<T> = (set: SetState<StoreState>, get: GetState<StoreState>) => T;

/**-------------------------------------------------------------------------*/
/* ^^^ ABOVE WE USE THE STATES TO DERIVE [get,set] TYPINGS FOR SLICES  ^^^  */
/**-------------------------------------------------------------------------*/

const createSampleSlice: StoreSlice<SampleSlice> = (set, get) => ({
  fishes: 10,
  repopulate: () => {
    set({ fishes: get().fishes + 1 });
  },
});

const createNewCredentialSlice: StoreSlice<NewCredentialSlice> = (set) => ({
  credential: {},
  dispatchNewCredentialAction: (payload) => {
    set((state) => ({ credential: Object.assign(state.credential, payload) }));
  },
});

// const createAppUserSlice: StoreSlice<any> = (set) => ({
//   saveImgData: {},
//   dispatchSavesaveImgData: (payload) => {
//     set((state) => ({ saveImgData: Object.assign(state.saveImgData, payload) }));
//   },
// });

export const useZustand = create<StoreState>(
  persist(
    (set, get) => ({
      ...createSampleSlice(set, get),
      ...createNewCredentialSlice(set, get),
    }),
    /* ------ Persist Middleware specific configs and action ------ */
    {
      name: 'app-zustand',
    }
  )
);
