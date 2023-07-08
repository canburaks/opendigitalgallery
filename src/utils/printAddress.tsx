import { Address } from '@/types';

export const printAddress = (address: Address) => {
  return `${address.city}, ${address.zip}`;
};
