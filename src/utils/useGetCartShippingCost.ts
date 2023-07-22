import { ProductType } from '@/constants';
import { usePricesByIDs, useProductsByIDs } from '@/data/hooks';
import { useCartStore } from '@/data/stores';
import { Price, Product } from '@/types';
import { useMemo, useState } from 'react';

// ***** SHIPPIN COST ALGORITHM *****
// Main differentiator is frame

// Case : Only Frames - sum of every frame shipping cost
// Case : Only Posters - sum of every poster shipping cost
// Case : Mixed - Same amount for both - sum of every frame shipping cost
// Case : Mixed - more posters than frames - sum of every frame cost + sum of every (poster number - frame number) shipping cost
// Case : Mixed - more frames than posters - sum of every frame shipping cost

type ShippingCost = {
  sum: number;
  currency: string;
  error: string;
};

type ProductDataPriceType = {
  [key: number]: {
    productData?: Product;
    priceData?: Price;
  };
};

export const useGetCartShippingCost = (): ShippingCost => {
  const store = useCartStore((state) => state.store);
  const productIDs = useMemo(() => store && store.map((product) => product.productId), [store]);

  const { data: products } = useProductsByIDs(
    {
      productIDs: productIDs || [],
    },
    productIDs && productIDs?.length > 0
  );

  const priceIDs = useMemo(() => store && store.map((product) => product.priceId), [store]);
  const { data: productPrices } = usePricesByIDs(priceIDs || []);

  const productDataPriceMerge = useMemo(() => {
    const list: ProductDataPriceType = {};

    productIDs &&
      productIDs.forEach((id) => {
        const product = products?.data?.find((i) => i.product_id === id);
        const price = productPrices?.find((i) => i.product_id === id);
        list[id] = {
          priceData: price,
          productData: product,
        };
      });

    return list;
  }, [productIDs, products?.data, productPrices]);

  const [sum, setSum] = useState(0);
  const [currency, setCurrency] = useState('');
  const [error, setError] = useState('');

  useMemo(() => {
    setError('');
    // Error Check
    const currencyList = productPrices?.map((product) => product.currency);
    const currencyIsSame = currencyList?.every((currency) => currency === currencyList[0]);
    if (!currencyIsSame) {
      setError('Something went wrong. Please try again later.');
      return;
    }

    // Set currency
    if (currencyList && currencyList?.length > 0) {
      setCurrency(currencyList[0]);
    }

    // Helper : filter by product types
    const frames = Object.values(productDataPriceMerge).filter(
      (item) => item.productData?.product_type_id === ProductType.FRAME
    );
    const posters = Object.values(productDataPriceMerge).filter(
      (item) => item.productData?.product_type_id === ProductType.POSTER
    );

    // Helper : case checkers
    const isOnlyFrame = products?.data?.every(
      (product) => product.product_type_id === ProductType.FRAME
    );
    const isOnlyPoster = products?.data?.every(
      (product) => product.product_type_id === ProductType.POSTER
    );
    const isMixed = !isOnlyFrame && !isOnlyPoster && frames && posters;
    const mixedBothSameAmount = isMixed && frames.length === posters.length;
    const mixedMorePosters = isMixed && frames.length < posters.length;
    const mixedMoreFrames = isMixed && frames.length > posters.length;

    // Helper : sums
    const frameSum = frames
      ? frames.reduce((acc, curr) => acc + (curr.priceData?.shipping_cost || 0), 0)
      : 0;

    const storeSum = Object.values(productDataPriceMerge).reduce(
      (acc, curr) => acc + (curr.priceData?.shipping_cost || 0),
      0
    );
    // Case : Only Frames
    if (isOnlyFrame) {
      setSum(frameSum);
    }
    // Case: Only Posters;
    if (isOnlyPoster) {
      setSum(storeSum);
    }

    // Case: Mixed - Same amount for both
    if (mixedBothSameAmount) {
      setSum(frameSum);
    }

    // Case: Mixed - more posters than frames
    if (mixedMorePosters) {
      const extraPosters = posters.length - frames.length;
      const posterSum = extraPosters * (posters[0].priceData?.shipping_cost || 0);
      setSum(frameSum + posterSum);
    }

    // Case: Mixed - more frames than posters
    if (mixedMoreFrames) {
      setSum(frameSum);
    }
  }, [productDataPriceMerge, productPrices, products?.data]);

  return {
    sum,
    currency,
    error,
  };
};
