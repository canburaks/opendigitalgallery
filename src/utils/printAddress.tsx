import { Address } from '@/types';

export const printAddress = (address: Address, long?: boolean, countries?: any) => {
  const country =
    countries && countries.find((item: any) => item.country_id === address.country_id);

  if (long) {
    return `${address.address_detail} ${address.zip} - ${address.city} / ${
      countries && country?.name
    }`;
  }
  return `${address.city}, ${address.zip}`;
};
