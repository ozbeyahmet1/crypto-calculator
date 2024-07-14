import { create } from 'zustand';
import type { StateStorage } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';

const hashStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? '';
    return JSON.parse(storedValue);
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    window.location.hash = searchParams.toString();
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.delete(key);
    window.location.hash = searchParams.toString();
  },
};
interface ProtocolData {
  avaxPrice: number;
  depositedAvax: number;
  totalValOfAvax: number;
  aUSDmarketCap: number;
  aUSDinCirculation: number;
  aUSDPrice: number;
  xAVAXMarketCap: number;
  xAVAXinCirculation: number;
  xAVAXPrice: number;
  leverage: number;
  collateralizationRatio: number;
}

const initialProtocolData: ProtocolData = {
  avaxPrice: 30.0,
  depositedAvax: 90000,
  totalValOfAvax: 2700000,
  aUSDmarketCap: 2000000,
  aUSDinCirculation: 2000000,
  aUSDPrice: 1,
  xAVAXMarketCap: 700000,
  xAVAXinCirculation: 575802,
  xAVAXPrice: 1.22,
  leverage: 3.86,
  collateralizationRatio: 135,
};

export const useStore = create<{
  data: ProtocolData;
  assign: (datas: ProtocolData) => void;
  reset: () => void;
}>()(
  persist(
    (set) => ({
      data: initialProtocolData,
      assign: (datas: ProtocolData) => set({ data: datas }),
      reset: () => set({ data: initialProtocolData }),
    }),
    {
      name: 'protocol-simulation',
      storage: createJSONStorage(() => hashStorage),
    },
  ),
);
