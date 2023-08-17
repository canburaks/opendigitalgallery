import { Address } from '@/types';

export const printAddress = (
  address: Address,
  long?: boolean,
  countries?: Record<string, { name: string }> | null
) => {
  if (long) {
    return `${address.address_detail} ${address.zip} - ${address.city} / ${
      countries && countries[address.country_id].name
    }`;
  }
  return `${address.city}, ${address.zip}`;
};
