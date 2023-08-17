import { useTranslation } from 'next-i18next';
import { useMemo, memo } from 'react';
import { UseInstaprintStore, useCartStore } from '@/data/stores';
import { TRX } from '@/constants';
import type { CartProduct } from '@/types';
import { motion } from 'framer-motion';
import { useGenerateCartProductsFromInstaCart } from '../utils';

export const NextButton = memo(function NextButton() {
    const { t } = useTranslation('common');
    const store = useCartStore((state) => state.store);
    const addToCart = useCartStore((state) => state.addToCart);

    const selections = UseInstaprintStore(state => state.selections);

    const page = UseInstaprintStore(state => state.page);
    const nextPage = UseInstaprintStore(state => state.nextPage);

    const cartProducts = useGenerateCartProductsFromInstaCart();

    const addToCartMutation= (e: any): void => {
        e.preventDefault();
        cartProducts.forEach((cartProduct:CartProduct, ix: number) => {
          const isLatest = ix === cartProducts.length - 1;
          addToCart(cartProduct, isLatest);
        });
      };

    const isNextDisabled = useMemo(() => {
        if (page === 1) {
            return selections.length === 0;
        } else if (2) {
            return false;
            // const nonMats = store.filter((ci: InstaprintProduct) => ci?.instaprint?.mat !== null)
            // const nonFrames = store.filter((ci: InstaprintProduct) => ci?.instaprint?.frame !== null)
            // return nonMats.length !== selections.length || nonFrames.length !== selections.length
        } else if (page === 3) {
        }
    }, [page, store, selections]);

    const nextButtonLabel = useMemo(() => {
        let label = '';
        if (page === 3) {
            label = TRX.PRODUCT_DETAILS.ADD_TO_CART;
        }
        else if (page === 2) {
            label = TRX.COMMON.NEXT;
        } else {
            label = TRX.COMMON.NEXT;
        }
        return t(label);
    }, [page, isNextDisabled]);


    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ ease: 'linear', duration: 0.2 }}
            id="app-modal-button-next"
            title={t(selections.length > 0 ? TRX.INSTAPRINT.APP_MODAL_NONSELECTED : TRX.COMMON.NEXT)!}
            disabled={isNextDisabled}
            className="relative cursor-pointer flex justify-center items-center shadow-lg bg-black !w-40 !md:w-50 !h-12 md:h-12 rounded-lg"
            style={{ opacity: isNextDisabled ? 0.3 : 1 }}
            onClick={page === 3 ? addToCartMutation : nextPage}
        >
            <span style={{ width: 120, color: 'white', fontWeight: 'bold', marginLeft: -8 }} className="break-normal uppercase">{nextButtonLabel}</span>
            <ArrowRightIcon />
        </motion.button>
    );
});

const ArrowRightIcon = ({ size = 24  }: { size?: number }) => (
    <svg
      className="transition-all duration-300 ease-linear"
      viewBox="0 0 24 24" fill={'#000'}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        right: 8,
        fill: '#fff'
      }}
      xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.70716 11.1771C3.3078 11.2321 3 11.5795 3 11.9999C3 12.4585 3.36631 12.8302 3.81818 12.8302H18.1999L13.0047 18.0813L12.9253 18.1743C12.687 18.4989 12.7124 18.9602 13.0023 19.2556C13.3212 19.5805 13.8392 19.5816 14.1594 19.258L20.7477 12.5996C20.787 12.5614 20.8224 12.5194 20.8536 12.474C21.0766 12.1498 21.0452 11.6999 20.7593 11.4111L14.1593 4.74193L14.0674 4.66174C13.7466 4.42125 13.2921 4.44905 13.0023 4.74446C12.6834 5.06942 12.6845 5.59515 13.0047 5.91871L18.2012 11.1696L3.81818 11.1696L3.70716 11.1771Z"
        fill="#fff"
      />
  
    </svg>
  );