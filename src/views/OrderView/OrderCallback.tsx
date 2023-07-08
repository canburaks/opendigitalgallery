import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SectionContainer } from '@/components';
import { PAGES } from '@/constants';

export function OrderCallbackView(props: any) {
  const { asPath } = useRouter();
  const urlToken = asPath.replace(`${PAGES.ORDERS.path}/`, '');

  useEffect(() => {
    if (props.token && !window.location.href.includes(props.token)) {
      window.location.href = `${PAGES.ORDERS.path}/${btoa(props.token)}`;
    } else if (urlToken.length > 0) {
      window.location.href = `${PAGES.ORDERS.path}/${btoa(urlToken)}`;
    }
  }),
    [props.token];

  return (
    <SectionContainer>
      <div className="min-h-[calc(100vh-255px)] ">{/* Case: Cart is Empty */}</div>
    </SectionContainer>
  );
}
