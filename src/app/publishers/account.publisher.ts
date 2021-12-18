import { IAccountSetupObject } from '../shared/contracts/auth.contracts';
// import { Publisher } from '../shared/messaging/rabbit';

export const publishAccountSetupEvent = (payload: IAccountSetupObject) => {
  console.log(payload);
  // Publisher('ACCOUNT SETUP EVENT', payload)
};
