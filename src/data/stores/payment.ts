import { FormInitializeRequest } from '@/types';
import { create } from 'zustand';

export const usePaymentStore = create<UsePaymentStore>((set) => ({
  /* ---------------------------------------------------------------------------------
   *  DATA REQUIRED FOR PAYMENT REQUEST
   * ---------------------------------------------------------------------------------
   * */
  paymentRequestData: null,

  /* ---------------------------------------------------------------------------------
   *  STORE MUTATIONS
   * ---------------------------------------------------------------------------------
   * ---------------------------------------------------------------------------------
   *  DATA SETTER
   * ---------------------------------------------------------------------------------
   * */
  setPaymentRequestData: (paymentRequestData: Partial<FormInitializeRequest>) =>
    set({ paymentRequestData }),
}));

interface UsePaymentStore {
  paymentRequestData: Partial<FormInitializeRequest> | null;
  setPaymentRequestData: (data: Partial<FormInitializeRequest>) => void;
}
