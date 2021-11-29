import { JSONSchema7 } from 'json-schema';

export type RadioGroupProps<T extends unknown> = {
  name?: string;
  options: T[];
  onChange: (data: T) => void;
  value: T | undefined;
  label?: string;
};

export type TRecipientDataMedium = 'csv' | 'forms' | 'contacts' | string;
export type TNetworkProtocol = 'eth_kovan' | 'eth_mainnet' | 'bsc' | 'matic' | string;

export interface ClaimOptionsVar {
  medium: TRecipientDataMedium;
  schema: JSONSchema7;
}

export interface CredentialCreateOptions {
  claim: ClaimOptionsVar;
  template: JSON;
  certName: string;
  certDescription: string;
  protocol: TNetworkProtocol;
}
