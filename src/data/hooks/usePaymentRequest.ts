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
import { useProductsByIDs } from './useProductsByIDs';
import { useGetCartShippingCost } from '@/utils';
import { usePricesByIDs } from './usePricesByIDs';

/**
 * This hook is responsible for preparing the data for the payment request.
 * It uses the form values from the checkout form and the cart store.
 * It sets the data to payment store state in order to be used in the payment request within a modal.
 */
export const usePaymentRequestData = ({ formValues }: Props) => {
  const { data: countries } = useCountries({ select: ['country_id', 'name'] });
  const router = useRouter();
  const store = useCartStore((state) => state.store);
  const { sum: shippingCost, currency: shippingCurrency } = useGetCartShippingCost();

  const priceIDs = store?.map((product) => product.priceId);
  const productIDs = store?.map((product) => product.productId);
  const { data: products } = useProductsByIDs({
    productIDs: productIDs || [],
  });

  const productPrices = usePricesByIDs(priceIDs || []);
  const setPaymentRequestData = usePaymentStore((state) => state.setPaymentRequestData);

  const countryName = useMemo(
    () => getCountryName(formValues?.country_id, countries?.data || []),
    [countries?.data, formValues?.country_id]
  );

  const shippingAddress = useMemo<PaymentAddress>(() => {
    return {
      contactName: formValues?.firstName ? `${formValues?.firstName} ${formValues?.lastName}` : '',
      city: formValues?.city || '',
      country: countryName || '',
      address: `${formValues?.address_detail} ${formValues?.city} ${formValues?.zip}`,
      zipCode: formValues?.zip,
    };
  }, [formValues, countryName]);

  const basketItems: BasketItem[] | undefined = useMemo(() => {
    const productsBasketItem = store?.map((product) => {
      const productItem = products?.data?.find(
        (productI) => productI.product_id === product.productId
      );
      const productPriceOption = productPrices?.data?.find(
        (item) => item.price_id === product.priceId
      );
      return {
        id: getUnifiedProductId(
          productItem?.product_type_id || '',
          product.productId,
          productPriceOption?.product_option_id || ''
        ),
        name: productItem?.title || '',
        category1: (productItem?.product_type_id === ProductType.FRAME
          ? 'Frame'
          : 'Print'
        ).toUpperCase(),
        itemType: ItemType.PHYSICAL,
        price: productPriceOption?.price.toString() || '',
      };
    });

    const shippingItem = {
      id: 'SHIPPING',
      name: 'Shipping',
      category1: 'SHIPPING',
      itemType: ItemType.PHYSICAL,
      price: shippingCost.toString(),
    };

    return [...productsBasketItem, shippingItem];
  }, [productPrices?.data, products?.data, shippingCost, store]);

  const price = useMemo(() => {
    return basketItems?.reduce((acc, curr) => acc + parseInt(curr.price), 0);
  }, [basketItems]);

  const paymentRequestData = useMemo(
    () => ({
      locale: router.locale,
      currency: I18N[LocaleEnum.TR].currency,
      //conversationId: // this will setted in api/create-payment-request
      basketId: 'B67832',
      price: price.toString(),
      shippingCost: shippingCost,
      shippingCostCurrency: shippingCurrency,
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
      shippingCost,
      shippingCurrency,
    ]
  );

  setPaymentRequestData(paymentRequestData);
};

function getCountryName(countryId?: number | string, countries: Partial<Country>[] = []) {
  // console.log('getCountryName', countryId, countries);
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
