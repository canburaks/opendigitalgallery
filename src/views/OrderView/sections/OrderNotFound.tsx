import { HeadlineS, Body } from '@/components';

export const OrderNotFound = () => {
  return (
    <div>
      <HeadlineS>Order Not Found</HeadlineS>
      <Body>Sorry, we couldn&apos;t find your order. Maybe it was never existed. Who knows.</Body>
    </div>
  );
};
