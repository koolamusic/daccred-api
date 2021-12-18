// import { Publisher } from '../shared/messaging/rabbit';

import { IForgotPasswordNotification, IVerifyEmailNotification } from '../shared/contracts/auth.contracts';

/* Publish Event to send User Verification email: Yet to be implemented */
export const publishSignupVerificationNotification = (payload: IVerifyEmailNotification) => {
  console.log(payload);
  // Publisher('SIGNUP VERIFICATION NOTIFICATION', payload);
};

export const publishForgotPasswordNotification = (payload: IForgotPasswordNotification) => {
  console.log(payload);
  // Publisher('FORGOT PASSWORD NOTIFICATION', payload);
};
export const publishPasswordChangedNotification = (payload: string) => {
  console.log(payload);
  // Publisher('PASSWORD CHANGE NOTIFICATION', payload);
};
