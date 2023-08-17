import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useCartStore, useModalStore, usePaymentStore } from '@/data/stores';
import { FormInitializeRequest, FormInitializeResponse } from '@/types';
import { useTranslation } from 'next-i18next';
import { TRX, IYZICO_LOCAL_STORAGE_TOKEN, IYZICO_CREATE_REQUEST_ENDPOINT } from '@/constants';
import IconButton from '@mui/material/IconButton';
import { ErrorText } from '@/components';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: '50vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function PaymentModal() {
  const { t } = useTranslation('common');
  const paymentModal = useModalStore((state) => state.paymentModal);
  const closeModal = useModalStore((state) => state.closePaymentModal);
  const paymentRequestData = usePaymentStore((state) => state.paymentRequestData);
  const [loading, setLoading] = React.useState(false);
  const hiddenAuthUser = usePaymentStore((state) => state.hiddenAuthUser);
  const [error, setError] = React.useState('');
  const [payload, setPayload] = React.useState({
    response: {} as FormInitializeResponse,
    success: false,
  });
  const cartProducts = useCartStore((state) => state.store);

  const submitHandler = useCallback(
    (requestData: Partial<FormInitializeRequest> | null) => {
      if (loading === false && !error) {
        setLoading(true);
        fetch(IYZICO_CREATE_REQUEST_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify({
            requestData,
            hiddenAuthUser,
            cartProducts,
          }),
        })
          .then((res: Response) => res.json())
          .then((res: FormInitializeResponse) => {
            if (res && res.status && res.status === 'success') {
              setPayload((prev) => ({ ...prev, response: res, success: true }));
            } else {
              setPayload((prev) => ({ ...prev, response: res, success: false }));
              if (res && res.message) {
                setError(res.message);
              }
            }
          })
          .catch((e) => {
            console.log('e', e);
            console.error('Payment modal error:', e);
            setPayload((prev) => ({ ...prev, response: e, success: false }));
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [cartProducts, error, hiddenAuthUser, loading]
  );

  /*
  #########################################################################################
   # STEP 1                                                                               #
   # If paymentModal is opened, run submit handler.                                       #
   # It calls /api/payment endpoint and then post request to Iyzico with the proper data  #
   # It returns a FormInitializeResponse.                                                 #
   ########################################################################################
   */
  useEffect(() => {
    if (paymentModal && paymentRequestData) {
      submitHandler(paymentRequestData);
    }
  }, [paymentModal, paymentRequestData, submitHandler]);

  /*
  #########################################################################################
   # STEP 2                                                                               #
   # If the response is success full,
   # 1) save the token locally. (It will be needed when a user returns after step 2       #                                      #
   # 2) Navigate user to Iyzico payment page.                                             # 
   ########################################################################################
   */
  useEffect(() => {
    if (canUseDOM()) {
      if (payload.success && payload.response?.paymentPageUrl && !error) {
        // 1) save the token locally
        localStorage.setItem(IYZICO_LOCAL_STORAGE_TOKEN, payload.response.token);
        // 2) Navigate user to Iyzico payment page.
        window.location.href = payload.response.paymentPageUrl;
      }
    }
  });

  return (
    <div>
      <Modal
        open={paymentModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ErrorText error={error} />
          {loading ? (
            <div className="bg-indigo-500 ...">
              <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
              Processing...
            </div>
          ) : payload.response.errorCode &&
            Object.keys(TRX.PAYMENT_ERRORS).includes(payload.response.errorCode) ? (
            <PaymentErrorView
              title={t(TRX.CART.error)}
              description={''} // description={t(TRX.PAYMENT_ERRORS[payload.response.errorCode])}
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: payload.response?.checkoutFormContent }} />
          )}
        </Box>
      </Modal>
    </div>
  );
}

const PaymentErrorView = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <IconButton className="h-6 w-6 text-red-600" aria-label="exclamation" />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <div className="text-lg font-medium leading-6 text-gray-900">{title}</div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"></div>
    </div>
  );
};

const canUseDOM = () => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};
