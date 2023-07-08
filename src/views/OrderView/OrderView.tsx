import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { PAGES } from '@/constants';
import { SectionContainer, Loading } from '@/components';
import { OrderResponseStatusEnum } from '@/types';
import { useOrders } from '@/data/hooks';
import { OrderFail, OrderSuccess, OrderNotFound } from './sections';
import { AnimatePresence, motion } from 'framer-motion';

export function OrderView() {
  const { asPath } = useRouter();
  const urlToken = asPath.replace(`${PAGES.ORDERS.path}/`, '');

  const { data, isLoading } = useOrders(urlToken);
  const paymentProviderData = useMemo(
    () =>
      data &&
      Array.isArray(data?.data) &&
      typeof data.data[0].payment_provider_response === 'string'
        ? JSON.parse(data?.data[0].payment_provider_response)
        : null,
    [data]
  );
  // const isOrderExist = paymentProviderData && paymentProviderData?.status === OrderResponseStatusEnum.SUCCESS;

  return (
    <SectionContainer>
      <div className="bg-gray-50 w-full flex flex-col items-center">
        <AnimatePresence>
          {/* LOADING CASE */}
          {isLoading && (
            <motion.div exit={{ opacity: 0, y: 200 }}>
              <Loading />
            </motion.div>
          )}

          {/* SUCCESS CASE  */}
          {isLoading === false &&
            paymentProviderData &&
            paymentProviderData?.status === OrderResponseStatusEnum.SUCCESS && (
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 200 }}
              >
                <OrderSuccess data={paymentProviderData} />
              </motion.div>
            )}
          {/* PAYMENT FAILURE CASE */}
          {isLoading === false &&
            paymentProviderData &&
            paymentProviderData?.status === OrderResponseStatusEnum.FAILURE && (
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 200 }}
              >
                <OrderFail />
              </motion.div>
            )}

          {/* ORDER NOT FOUND CASE */}
          {isLoading === false && paymentProviderData === null && (
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 200 }}
            >
              <OrderNotFound />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}
