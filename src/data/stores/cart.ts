import { create } from 'zustand';
import { CART_STATUSES, type Buyer, type Cart, type CartDetail, type CartProduct } from '@/types';
import { getSupabaseBrowserClient } from '../clients/supabaseClient';
const client = getSupabaseBrowserClient();

export const useCartStore = create<CartStoreTypes>()((set, get) => ({
  buyer: {},
  store: [],
  lastAddedProduct: null,
  cartID: undefined,

  setBuyer: (buyer: Partial<Buyer>) => set({ buyer }),
  setStore: (store: CartProduct[]) => set({ store }),
  addToCart: async (product: CartProduct, openCartPopup) => {
    const existingProduct: CartProduct | undefined = get().store.find(
      (p) => p.priceId === product.priceId
    );
    const notExistingProducts: CartProduct[] = get().store.filter(
      (p) => p.priceId !== product.priceId
    );
    // if product exists in store, increase quantity
    if (existingProduct) {
      set(() => ({
        store: [
          ...notExistingProducts,
          { ...existingProduct, quantity: existingProduct.quantity + 1 },
        ],
      }));
      localStorage.setItem(
        'cart',
        JSON.stringify([
          ...notExistingProducts,
          { ...existingProduct, quantity: existingProduct.quantity + 1 },
        ])
      );

      if (get().cartID) {
        await client
          .from('cart_details')
          .update({ quantity: existingProduct.quantity + 1 })
          .eq('cart_id', get().cartID)
          .eq('price_id', product.priceId);
      }
    } else {
      if (get().cartID) {
        await client
          .from('cart_details')
          .insert([{ cart_id: get().cartID || -1, price_id: product.priceId, quantity: 1 }]);
      }

      localStorage.setItem('cart', JSON.stringify([...get().store, product]));
      set((state) => ({ store: [...state.store, product] }));
    }

    // open cart popup
    if (openCartPopup) {
      set(() => ({ lastAddedProduct: product }));
    }
  },

  removeFromCart: async (product: Partial<CartProduct>) => {
    // check the existence of the product in the cart

    const existProduct: CartProduct | undefined = get().store.find(
      (p) => p.priceId === product.priceId
    );

    if (existProduct) {
      if (existProduct.quantity === 1) {
        const newList = get().store.filter((p) => p.priceId !== product.priceId);
        set(() => ({ store: [...newList] }));
        if (get().cartID) {
          await client
            .from('cart_details')
            .delete()
            .eq('cart_id', get().cartID)
            .eq('price_id', product.priceId);
        }
      } else {
        const newList = get().store.map((p) => {
          if (p.priceId === product.priceId) {
            return { ...p, quantity: p.quantity - 1 };
          }
          return p;
        });
        set(() => ({ store: [...newList] }));
        if (get().cartID) {
          await client
            .from('cart_details')
            .update({ quantity: existProduct.quantity - 1 })
            .eq('cart_id', get().cartID)
            .eq('price_id', product.priceId);
        }
      }
    }
    localStorage.setItem('cart', JSON.stringify(get().store));
  },

  removeCartPermanently: async (product: Partial<CartProduct>) => {
    console.log('cartID remove permamnently', get().cartID);
    const notExistingProducts: CartProduct[] = get().store.filter(
      (p) => p.priceId !== product.priceId
    );
    set(() => ({ store: [...notExistingProducts] }));
    if (get().cartID) {
      await client
        .from('cart_details')
        .delete()
        .eq('cart_id', get().cartID || -1)
        .eq('price_id', product.priceId);
    }

    localStorage.setItem('cart', JSON.stringify(get().store));
  },

  removeLastAddedProduct: () => {
    set(() => ({ lastAddedProduct: null }));
  },
}));

export interface CartStoreTypes {
  cartID: number | undefined;
  lastAddedProduct: CartProduct | null;
  buyer: Buyer | {};
  store: CartProduct[];
  setBuyer: (buyer: Partial<Buyer>) => void;
  addToCart: (product: CartProduct, openCartPopup?: boolean) => void;
  removeFromCart: (product: Partial<CartProduct>) => void;
  removeLastAddedProduct: () => void;
  removeCartPermanently: (product: Partial<CartProduct>) => void;
  setStore: (store: CartProduct[]) => void;
}

export const getInitialCartProducts = async () => {
  // ATTENTION:  This function is not IDEMPOTENT (it has side effects) and too much request, so be careful for race conditions

  const resAuth = await client.auth.getSession().catch((err) => console.log('err', err));
  const user = resAuth?.data.session?.user;
  let products: CartProduct[] = [];
  let dbCart: Cart | null = null;
  let dbProducts: CartDetail[] = [];
  const isCSR = typeof window !== 'undefined';
  const localStorageCart = isCSR && localStorage.getItem('cart');
  let cartID: number | undefined = undefined;

  // Case:  User Logged
  if (user) {
    const res = await client
      .from('carts')
      .select('*')
      .eq('uid', user?.id)
      .eq('cart_status_id', CART_STATUSES.ACTIVE);
    dbCart = res && res.data && res.data[0];
    cartID = dbCart?.cart_id;
  }

  // Get Products from DB Cart
  if (dbCart) {
    const res = await client
      .from('cart_details')
      .select('*, prices(product_id)')
      .eq('cart_id', dbCart.cart_id);
    dbProducts = (res && res.data) || [];
  }

  // If no Cart, create it.
  if (user && !dbCart) {
    const res = await client
      .from('carts')
      .insert([{ uid: user.id, cart_status_id: 1 }])
      .select();
    dbCart = res && res.data && res.data[0];
    cartID = dbCart?.cart_id;
  }

  // Update state with products from DB
  if (user && dbProducts && dbProducts.length > 0 && products.length === 0) {
    products = dbProducts.map((product) => ({
      priceId: product.price_id,
      quantity: product.quantity,
      productId: (product as any).prices.product_id,
    }));
  }

  if (
    user &&
    dbProducts &&
    dbProducts.length > 0 &&
    (!localStorageCart || localStorageCart.length === 0)
  ) {
    localStorage.setItem(
      'cart',
      JSON.stringify(
        dbProducts.map((product) => ({
          priceId: product.price_id,
          quantity: product.quantity,
          productId: (product as any).prices.product_id,
        }))
      )
    );
  }

  // If no DB products, check local storage and update DB and state with local storage products
  if (
    user &&
    dbProducts &&
    dbProducts.length === 0 &&
    localStorageCart &&
    localStorageCart.length > 0
  ) {
    products = JSON.parse(localStorageCart);
    await client.from('cart_details').insert(
      JSON.parse(localStorageCart).map((product: any) => ({
        cart_id: dbCart?.cart_id,
        price_id: product.priceId,
        quantity: product.quantity,
      }))
    );
  }

  // if there are DB products and local storage, need merge logic

  if (
    user &&
    dbProducts &&
    dbProducts.length > 0 &&
    localStorageCart &&
    localStorageCart.length > 0
  ) {
    if (localStorageCart) {
      const localStorageProducts = JSON.parse(localStorageCart);

      // merge two objects
      const mergeProducts = localStorageProducts;
      dbProducts.forEach((dbProduct) => {
        const existingProduct = mergeProducts.find((p: any) => p.priceId === dbProduct.price_id);
        if (!existingProduct) {
          mergeProducts.push({
            priceId: dbProduct.price_id,
            quantity: dbProduct.quantity,
            productId: (dbProduct as any).prices.product_id,
          });
        }
      });

      const newLocalProducts = mergeProducts.filter((p: any) => {
        const existingProduct = dbProducts.find((dbP: any) => dbP.price_id === p.priceId);
        return !existingProduct;
      });

      // Insert merged products
      await client.from('cart_details').insert(
        newLocalProducts.map((product: any) => ({
          cart_id: dbCart?.cart_id,
          price_id: product.priceId,
          quantity: product.quantity,
        }))
      );

      // update local
      isCSR && localStorage.setItem('cart', JSON.stringify(mergeProducts));

      // update state
      products = mergeProducts;
    }
  }
  // Case: User Not Logged
  if (!user) {
    const localStorageCart = isCSR && localStorage.getItem('cart');
    if (localStorageCart) {
      products = JSON.parse(localStorageCart);
    }
    cartID = undefined;
  }

  return { products, cartID };
};

// This is triggered at first mount
getInitialCartProducts()
  .then((data) => useCartStore.setState({ store: data.products, cartID: data.cartID }))
  .catch((err) => {
    console.log('couldnt initial cart ', err);
  });

// This will be triggered on auth change listener
export const authChangeTriggerCartState = async () => {
  return getInitialCartProducts()
    .then((data) => useCartStore.setState({ store: data.products, cartID: data.cartID }))
    .catch((err) => {
      console.log('couldnt initial cart ', err);
    });
};
