import { useMemo } from 'react';
import { useCartStore, usePaymentStore } from '@/data/stores';
import { CheckoutFormValues } from '@/views/CheckoutView/sections/CheckoutSection';
import { BasketItem, PaymentAddress, ItemType } from '@/types/payment';
import { ProductType, I18N } from '@/constants';
import { useCountries } from './useCountries';
import { useRouter } from 'next/router';
import { Country, LocaleEnum } from '@/types';
import { isArray } from 'lodash';
import { getUnifiedProductId } from '@/utils';

/**
 * This hook is responsible for preparing the data for the payment request.
 * It uses the form values from the checkout form and the cart store.
 * It sets the data to payment store state in order to be used in the payment request within a modal.
 */
export const usePaymentRequestData = ({ formValues }: Props) => {
  const { data: countries } = useCountries({ select: ['country_id', 'name'] });
  const router = useRouter();
  const store = useCartStore((state) => state.store);
  const setPaymentRequestData = usePaymentStore((state) => state.setPaymentRequestData);

  const countryName = useMemo(
    () => getCountryName(formValues?.country_id, countries?.data || []),
    [countries?.data, formValues?.country_id]
  );
  //console.log('countryName', countryName);

  const shippingAddress = useMemo<PaymentAddress>(() => {
    return {
      contactName: formValues?.firstName ? `${formValues?.firstName} ${formValues?.lastName}` : '',
      city: formValues?.city || '',
      country: countryName || '',
      address: `${formValues?.street} ${formValues?.city} ${formValues?.zip}`,
      zipCode: formValues?.zip,
    };
  }, [formValues, countryName]);

  const basketItems: BasketItem[] = useMemo(() => {
    return store.map((product) => ({
      id: getUnifiedProductId(product.productType, product.productId, product.productOptionId),
      name: product.productTitle,
      category1: (product.productType === ProductType.FRAME ? 'Frame' : 'Print').toUpperCase(),
      itemType: ItemType.PHYSICAL,
      price: product.price.toString(),
    }));
  }, [store]);
  const price = useMemo(() => {
    return basketItems.reduce((acc, curr) => acc + parseInt(curr.price), 0);
  }, [basketItems]);

  const paymentRequestData = useMemo(
    () => ({
      locale: router.locale,
      currency: I18N[router.locale || LocaleEnum.EN].currency,
      //conversationId: // this will setted in api/create-payment-request
      basketId: 'B67832',
      price: price.toString(),
      paidPrice: price.toString(),
      shippingAddress,
      billingAddress: shippingAddress,
      basketItems,
      buyer: {
        id: formValues?.email,
        name: formValues?.firstName,
        surname: formValues?.lastName,
        // TODO: Identity number is required for Turkish citizens
        identityNumber: '74300864791',
        email: formValues?.email,
        registrationAddress: shippingAddress.address,
        city: shippingAddress.city,
        country: shippingAddress.country,
        zipCode: shippingAddress.zipCode,
      },
    }),
    [
      basketItems,
      formValues?.email,
      formValues?.firstName,
      formValues?.lastName,
      price,
      router.locale,
      shippingAddress,
    ]
  );

  setPaymentRequestData(paymentRequestData);
};

function getCountryName(countryId?: number | string, countries: Partial<Country>[] = []) {
  console.log('getCountryName', countryId, countries);
  if (countries.length === 0 || !countryId) return '';
  if (isArray(countries) && countries.length > 0) {
    const country = countries.find(
      (country: Partial<Country>) => country?.country_id?.toString() === countryId
    );
    return country?.name || '';
  }
}

type Props = {
  formValues: CheckoutFormValues | null;
};
