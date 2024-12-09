import { create } from "zustand";

const initState = {
  symbol: "",
  storeSymbol: (val: any) => {},
};

export const useLandPageStore = create<typeof initState>((set: any) => ({
    symbol: "",
    storeSymbol: (symbol: any) => set({ symbol }),
}));
