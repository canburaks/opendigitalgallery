import { Button, HeadlineS, LinkComponent, SectionContainer } from '@/components';
import { CartListSection } from './sections/CartListSection';
import { CheckoutSection } from './sections/CheckoutSection';
import { useCartStore } from '@/data/stores';

export function CheckoutView() {
  const { store } = useCartStore();
  const isCartEmpty = store.length === 0;

  return (
    <SectionContainer>
      <div className="min-h-[calc(100vh-255px)] ">
        {/* Case: Cart is Empty */}
        {isCartEmpty && (
          <div className="flex flex-col justify-center">
            <HeadlineS className="text-center py-8">Your cart is empty</HeadlineS>
            <LinkComponent className="flex justify-center" href="/">
              <Button text="Continue to shop" />
            </LinkComponent>
          </div>
        )}

        {/* Case: Cart have products */}
        {!isCartEmpty && (
          <div className="grid break800:grid-cols-2 grid-cols-1 gap-8">
            <CheckoutSection />
            <CartListSection />
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
