import { ProductType } from '@/constants';
import { useCartStore } from '@/data/stores';
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

export const useGetCartShippingCost = (): ShippingCost => {
  const { store } = useCartStore();
  const [sum, setSum] = useState(0);
  const [currency, setCurrency] = useState('');
  const [error, setError] = useState('');

  useMemo(() => {
    // Error Check
    const currencyList = store.map((product) => product.currency);
    const currencyIsSame = currencyList.every((currency) => currency === currencyList[0]);
    if (!currencyIsSame) {
      setError('Something went wrong. Please try again later.');
      return;
    }

    // Set currency
    setCurrency(currencyList[0]);

    // Helper : filter by product types
    const frames = store.filter((product) => product.productType === ProductType.FRAME);
    const posters = store.filter((product) => product.productType === ProductType.POSTER);

    // Helper : case checkers
    const isOnlyFrame = store.every((product) => product.productType === ProductType.FRAME);
    const isOnlyPoster = store.every((product) => product.productType === ProductType.POSTER);
    const isMixed = !isOnlyFrame && !isOnlyPoster;
    const mixedBothSameAmount = isMixed && frames.length === posters.length;
    const mixedMorePosters = isMixed && frames.length < posters.length;
    const mixedMoreFrames = isMixed && frames.length > posters.length;

    // Helper : sums
    const frameSum = frames.reduce((acc, curr) => acc + +curr.shipping_cost, 0);
    const storeSum = store.reduce((acc, curr) => acc + +curr.shipping_cost, 0);

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
      const posterSum = extraPosters * posters[0].shipping_cost;
      setSum(frameSum + posterSum);
    }

    // Case: Mixed - more frames than posters
    if (mixedMoreFrames) {
      setSum(frameSum);
    }
  }, [store]);

  return {
    sum,
    currency,
    error,
  };
};
