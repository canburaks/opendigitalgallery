import { FormInitializeRequest } from '@/types';
import { CheckoutFormValues } from '@/views/CheckoutView/sections/CheckoutSection';
import { create } from 'zustand';

export const usePaymentStore = create<UsePaymentStore>((set) => ({
  /* ---------------------------------------------------------------------------------
   *  DATA REQUIRED FOR PAYMENT REQUEST
   * ---------------------------------------------------------------------------------
   * */
  paymentRequestData: null,
  hiddenAuthUser: null,
  formValues: null,

  /* ---------------------------------------------------------------------------------
   *  STORE MUTATIONS
   * ---------------------------------------------------------------------------------
   * ---------------------------------------------------------------------------------
   *  DATA SETTER
   * ---------------------------------------------------------------------------------
   * */
  setPaymentRequestData: (paymentRequestData: Partial<FormInitializeRequest>) =>
    set({ paymentRequestData }),

  setHiddenAuthUser: (hiddenAuthUser: CheckoutFormValues | null) => set({ hiddenAuthUser }),
  setFormValues: (formValues: CheckoutFormValues | null) => set({ formValues }),
}));

interface UsePaymentStore {
  paymentRequestData: Partial<FormInitializeRequest> | null;
  setPaymentRequestData: (data: Partial<FormInitializeRequest>) => void;
  hiddenAuthUser: null | CheckoutFormValues;
  setHiddenAuthUser: (hiddenAuthUser: CheckoutFormValues | null) => void;
  formValues: null | CheckoutFormValues;
  setFormValues: (formValues: CheckoutFormValues | null) => void;
}
