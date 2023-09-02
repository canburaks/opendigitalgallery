import React from 'react';
import { useRouter } from 'next/router';
import { SectionContainer, Loading } from '@/components';
import { OrderResponseStatusEnum } from '@/types';
import { OrderFail, OrderSuccess, OrderNotFound } from './sections';
import { AnimatePresence, motion } from 'framer-motion';
import { useOrderService } from '@/data/hooks/useOrderService';

export function OrderView() {
  const router = useRouter();
  const urlToken = router.query.token as string;
  const { data: orderData, isLoading } = useOrderService(urlToken, Boolean(urlToken));

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
          {isLoading === false && orderData?.data.status === OrderResponseStatusEnum.SUCCESS && (
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 200 }}
            >
              <OrderSuccess orderData={orderData.data} />
            </motion.div>
          )}
          {/* PAYMENT FAILURE CASE */}
          {isLoading === false && orderData?.data?.status === OrderResponseStatusEnum.FAILURE && (
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 200 }}
            >
              <OrderFail />
            </motion.div>
          )}

          {/* ORDER NOT FOUND CASE */}
          {isLoading === false && orderData?.data.status === null && (
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
