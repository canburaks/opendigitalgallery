import { create } from 'zustand';

export const useModalStore = create<UseModalStore>((set) => ({
  /* ---------------------------------------------------------------------------------
   *  STORE VARIABLES
   * ---------------------------------------------------------------------------------
   * */
  paymentModal: false,

  /* ---------------------------------------------------------------------------------
   *  STORE MUTATIONS
   * ---------------------------------------------------------------------------------
   * ---------------------------------------------------------------------------------
   *  OPEN & CLOSE PAYMENT MODAL
   * ---------------------------------------------------------------------------------
   * */
  openPaymentModal: () => set({ paymentModal: true }),
  closePaymentModal: () => set({ paymentModal: false }),
  togglePaymentModal: () => set((state) => ({ paymentModal: !state.paymentModal })),
}));

interface UseModalStore {
  paymentModal: boolean;
  openPaymentModal: () => void;
  closePaymentModal: () => void;
  togglePaymentModal: () => void;
}
