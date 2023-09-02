import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SectionContainer } from '@/components';
import { PAGES } from '@/constants';
import { CallbackProps } from '@/pages/orders/callback';

export const OrderCallbackView: FC<CallbackProps> = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.token) {
      router.push(PAGES.ORDERS.path + '/' + props.token);
    } else {
      router.push('/cart');
    }
  }, [props.token, router]);

  return (
    <SectionContainer>
      <div className="min-h-[calc(100vh-255px)] ">{/* Case: Cart is Empty */}</div>
    </SectionContainer>
  );
};
