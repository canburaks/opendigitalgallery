import { create } from 'zustand';
import type { IGMedia, InstaprintProduct, ProductDetails } from '@/types';

export const UseInstaprintStore = create<UseInstaprintStore>((set, get) => ({
  page: 1,
  setPage: (page: number) => set({ page }),
  nextPage: () => set({ page: get().page + 1 }),
  prevPage: () => set({ page: get().page - 1 }),

  media: [],
  setMedia: (media: IGMedia[]) => set({ media }),

  instaprint: {},
  frames: [],
  setInstaprintProducts: ({
    instaprint,
    frames,
  }: {
    instaprint: Partial<ProductDetails>;
    frames: Partial<ProductDetails>[];
  }) => set({ instaprint, frames }),

  selections: [],
  setSelections: (selections: string[]) => set({ selections }),
  toggleSelection: (id: string) => {
    const selections = [...get().selections];
    const index = selections.indexOf(id);
    if (index > -1) {
      selections.splice(index, 1);
    } else {
      selections.push(id);
    }
    set({
      selections,
      instaprintCart: get().instaprintCart.filter((cartItem) =>
        cartItem?.instaprint?.mediaId ? selections.includes(cartItem?.instaprint?.mediaId) : false
      ),
    });
  },

  instaprintCart: [],

  getInstaprintCartProduct: (mediaId: string) =>
    get().instaprintCart.find((p) => p.instaprint?.mediaId === mediaId),
  addOrUpdateInstaprintCart: (instaprintProduct: InstaprintProduct) => {
    // console.log('input ', instaprintProduct);
    const selectedMediaId = get().selections.find(
      (p) => p === instaprintProduct?.instaprint?.mediaId
    );
    const excludedInstaProducts = get().instaprintCart.filter(
      (p) => p.instaprint?.mediaId !== selectedMediaId
    );
    return set({ instaprintCart: [...excludedInstaProducts, instaprintProduct] });
  },
}));

interface UseInstaprintStore {
  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;

  media: IGMedia[];
  setMedia: (media: IGMedia[]) => void;

  instaprint: Partial<ProductDetails>;
  frames: Partial<ProductDetails>[];
  setInstaprintProducts: ({
    instaprint,
    frames,
  }: {
    instaprint: Partial<ProductDetails>;
    frames: Partial<ProductDetails>[];
  }) => void;

  selections: string[];
  setSelections: (selections: string[]) => void;
  toggleSelection: (id: string) => void;

  instaprintCart: InstaprintProduct[];
  getInstaprintCartProduct: (mediaId: string) => InstaprintProduct | undefined;
  addOrUpdateInstaprintCart: (instaprintProduct: InstaprintProduct) => void;
}
