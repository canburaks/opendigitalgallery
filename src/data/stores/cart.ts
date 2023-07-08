import { create } from 'zustand';
import type { Buyer, CartProduct } from '@/types';

export const useCartStore = create<UseCartStore>((set, get) => ({
  /* ---------------------------------------------------------------------------------
   *  STORE VARIABLES
   * ---------------------------------------------------------------------------------
   * */
  buyer: {},
  store: [],
  lastAddedProduct: null,

  /* ---------------------------------------------------------------------------------
   *  STORE MUTATIONS
   * ---------------------------------------------------------------------------------
   * ---------------------------------------------------------------------------------
   *  SET BUYER
   *
   * ---------------------------------------------------------------------------------
   * ---------------------------------------------------------------------------------
   * */

  setBuyer: (buyer: Partial<Buyer>) => set({ buyer }),

  /* ---------------------------------------------------------------------------------
   * ---------------------------------------------------------------------------------
   *  ADD TO CART
   * Add to given CartProduct object to the cart (store).
   * - If the product already exists in the cart, increase the quantity.
   * - If the product doesn't exist in the cart, add it to the cart.
   * TODO: Make it persistent through local storage
   * ---------------------------------------------------------------------------------
   * ---------------------------------------------------------------------------------
   * */
  addToCart: (product: CartProduct, openCartPopup) => {
    const existingProduct: CartProduct | undefined = get().store.find(
      (p) => p.productId === product.productId
    );
    const notExistingProducts: CartProduct[] = get().store.filter(
      (p) => p.productId !== product.productId
    );
    // if product exists in store, increase quantity
    if (existingProduct) {
      set(() => ({
        store: [
          ...notExistingProducts,
          { ...existingProduct, quantity: existingProduct.quantity + 1 },
        ],
      }));
    } else {
      set((state) => ({ store: [...state.store, product] }));
    }

    // open cart popup
    if (openCartPopup) {
      set(() => ({ lastAddedProduct: product }));
    }
  },

  /* ---------------------------------------------------------------------------------
   * ---------------------------------------------------------------------------------
   *  REMOVE FROM CART
   * Remove to given CartProduct object from the cart (store).
   * - if product has more than 1 quantity, decrease the quantity.
   * - if product has 1 quantity, remove the product from the cart.
   * TODO: Make it persistent through local storage
   *
   * ---------------------------------------------------------------------------------
   * ---------------------------------------------------------------------------------
   * */
  removeFromCart: (product: Partial<CartProduct>) => {
    // check the existence of the product in the cart
    return set((state: UseCartStore) => {
      let result: CartProduct[] = [];
      state.store.forEach((item) => {
        if (item.productId !== product.productId) {
          result.push(item);
        } else {
          if (item.quantity > 1) {
            result.push({ ...item, quantity: item.quantity - 1 });
          }
        }
      });
      return { store: result };
    });
  },

  removeCartPermanently: (product: Partial<CartProduct>) => {
    const notExistingProducts: CartProduct[] = get().store.filter(
      (p) => p.productId !== product.productId
    );
    set(() => ({ store: [...notExistingProducts] }));
  },

  removeLastAddedProduct: () => {
    set(() => ({ lastAddedProduct: null }));
  },
}));

interface UseCartStore {
  lastAddedProduct: CartProduct | null;
  buyer: Buyer | {};
  store: CartProduct[];
  setBuyer: (buyer: Partial<Buyer>) => void;
  addToCart: (product: CartProduct, openCartPopup?: boolean) => void;
  removeFromCart: (product: Partial<CartProduct>) => void;
  removeLastAddedProduct: () => void;
  removeCartPermanently: (product: Partial<CartProduct>) => void;
}
