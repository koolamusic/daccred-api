import { UiSchema } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';

export const uiSchema: UiSchema = {
  toggle: {
    'ui:widget': 'radio',
  },
  name: {
    'ui:widget': 'text',
  },
  college: {
    'ui:placeholder': 'Meltwater',
  },
};

export const schema: JSONSchema7 = {
  title: '',
  description: 'This is an example of what your recipients will see',
  type: 'object',
  properties: {
    full_name: {
      type: 'string',
      title: 'Your Full Name',
    },
    email: {
      type: 'string',
      title: 'Your email address',
    },
    wallet_address: {
      type: 'string',
      title: 'Your Wallet Address',
    },
    //   toggle: {
    //       title: 'Gender',
    //       type: 'boolean',
    //       "oneOf": [
    //           {
    //               "title": "True",
    //               "const": true
    //           },
    //           {
    //               "title": "False",
    //               "const": false
    //           }
    //       ]
    //   },
    //   dropdown: {
    //       type: 'string',
    //       title: 'Country',
    //       default: 'Country',
    //       enum: ['South Africa', 'Kenya', 'Ghana', 'Nigeria'],
    //   },
    //   age: {
    //       type: 'number',
    //       title: 'Age',
    //   },
  },
  required: ['full_name', 'email', 'wallet_address'],
};
