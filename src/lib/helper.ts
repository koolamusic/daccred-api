/* eslint-disable @typescript-eslint/no-explicit-any */
import { orderBy } from 'lodash';

type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
};
// Please clone them and self-host if your site is going to be visited by many people.
// Then change the url and the default logo.
export function openGraph({
  siteName,
  templateTitle,
  description,
  logo = 'https://dacred.io/images/logo.jpg',
}: OpenGraphType): string {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle ? encodeURIComponent(templateTitle.trim()) : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://dacred.io/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}

export function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const stringToHslColor = (str: string, s: number, l: number) => {
  if (!str || str == null) {
    str = 'default';
  }

  const table = str.slice(0, 12);
  let hash = 0;
  for (let i = 0; i < table.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

export const outerColorGen = (payload: string) => stringToHslColor(payload, 50, 40);
export const layerColorGen = (payload: string) => stringToHslColor(payload, 50, 91);

/*---------------------------------------------------------*
 * Crypto Utils for dealing with wallet and digits
 ----------------------------------------------------------*/

export function formatAddress(address = '') {
  return address.slice(0, 6).concat('...', address.slice(-6));
}

export function formatBalance(balance = '', decimals = 18, network = 'ETH'): number {
  //https://docs.binance.org/account.html
  // let bscDesc = Number(10).toExponential(decimals)
  // console.log(bscDesc)

  if (network === 'BSC') {
    return Number(balance) / 10 ** 8;
  }
  return Number(balance) / 10 ** decimals;
}

export const formatBalanceToDecimal = (balance = '', decimals = 18, network = 'ETH') => {
  return Math.round((formatBalance(balance, decimals, network) + Number.EPSILON) * 1000) / 1000;
};

export function toWei(balance = '', decimals = 18) {
  return `0x${(Number(balance) * 10 ** decimals).toString(16)}`;
}

export function zeroAddress() {
  return '0x0000000000000000000000000000000000000000';
}

export function getCurrentAddress() {
  return ((window as any).ethereum?.selectedAddress ?? '').toLowerCase();
}

export async function getCurrentAddressAsync(web3: { eth: { getAccounts: () => any } }) {
  const accounts = await web3.eth.getAccounts();
  return (accounts?.[0] ?? '').toLowerCase();
}

export function getAddressTxt(address: string) {
  return `${address.substr(0, 4)}...${address.substr(address.length - 4, address.length)}`;
}

export function toGwei(wei: number) {
  return Math.round(wei / 1e9);
}

export function formatNumberIntl(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(value);
}

export function orderLastToFirst(arr: any[], key: string) {
  return orderBy(arr, key, 'desc');
}
