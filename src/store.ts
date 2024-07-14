import { create } from 'zustand';
import type { StateStorage } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Custom storage implementation using URL hash parameters.
 */
const hashStorage: StateStorage = {
  /**
   * Retrieves an item from storage.
   * @param {string} key - The key of the item to retrieve.
   * @returns {string} - The retrieved item.
   */
  getItem: (key): string => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? '';
    return JSON.parse(storedValue);
  },
  /**
   * Sets an item in storage.
   * @param {string} key - The key of the item to set.
   * @param {any} newValue - The value of the item to set.
   */
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    window.location.hash = searchParams.toString();
  },
  /**
   * Removes an item from storage.
   * @param {string} key - The key of the item to remove.
   */
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.delete(key);
    window.location.hash = searchParams.toString();
  },
};

/**
 * Interface representing protocol data.
 */
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

/**
 * Interface representing trading data.
 */
interface TradingData {
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
  amountOfAVAXDepositedbytheUser: number;
  xAVAXMinted: number;
  valueOfthexAVAXPositionoftheUser: number;
  changeinAVAXPrice: number;
  newxAVAXPrice: number;
  newValueofthexAVAXPositionoftheUser: number;
  amountOfAVAXUserHave: number;
  increaseDecreaseinDollarValue: number;
  increaseDecreaseinAvaxValue: number;
}

/**
 * Initial data for the protocol.
 */
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

/**
 * Initial data for trading.
 */
const initialTradingData: TradingData = {
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
  amountOfAVAXDepositedbytheUser: 100,
  xAVAXMinted: 2467.722857,
  valueOfthexAVAXPositionoftheUser: 3000,
  changeinAVAXPrice: 10,
  newxAVAXPrice: 1.68,
  newValueofthexAVAXPositionoftheUser: 4157.14,
  amountOfAVAXUserHave: 125.97,
  increaseDecreaseinDollarValue: 38.57,
  increaseDecreaseinAvaxValue: 25.97,
};

/**
 * Zustand store for protocol data.
 */
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

/**
 * Zustand store for trading data.
 */
export const useTradingStore = create<{
  data: TradingData;
  assign: (datas: TradingData) => void;
  reset: () => void;
}>()(
  persist(
    (set) => ({
      data: initialTradingData,
      assign: (datas: TradingData) => set({ data: datas }),
      reset: () => set({ data: initialTradingData }),
    }),
    {
      name: 'trading-simulation',
      storage: createJSONStorage(() => hashStorage),
    },
  ),
);
