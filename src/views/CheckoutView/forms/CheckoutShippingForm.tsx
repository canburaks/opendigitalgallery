import { Body } from '@/components';
import { useGetCartShippingCost } from '@/utils';
import React from 'react';

export const CheckoutShippingForm = () => {
  const { sum, error, currency } = useGetCartShippingCost();
  return (
    <div>
      {error && <Body className="text-black">{error}</Body>}
      {!error && (
        <Body className="text-black">
          Total shipping cost: {sum} {currency}
        </Body>
      )}
    </div>
  );
};
