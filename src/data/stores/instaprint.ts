import { create } from 'zustand';
import type { IGMedia } from '@/types';

export const UseInstaprintStore = create<UseInstaprintStore>((set, get) => ({
  page: 1,
  setPage: (page: number) => set({ page }),
  nextPage: () => set({ page: get().page + 1 }),
  prevPage: () => set({ page: get().page - 1 }),

  media: [],
  setMedia: (media: IGMedia[]) => set({ media }),

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
    set({ selections });
  },
}));

interface UseInstaprintStore {
  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;

  media: IGMedia[];
  setMedia: (media: IGMedia[]) => void;

  selections: string[];
  setSelections: (selections: string[]) => void;
  toggleSelection: (id: string) => void;
}
