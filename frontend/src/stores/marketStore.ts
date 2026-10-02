import { create } from 'zustand';
import { MarketData, CandleData, SymbolInfo } from '../types';

type MarketState = {
  selectedSymbol: string;
  symbols: SymbolInfo[];
  marketData: Record<string, MarketData>;
  candles: Record<string, CandleData[]>;
  setSelectedSymbol: (symbol: string) => void;
  setSymbols: (symbols: SymbolInfo[]) => void;
  updateMarketData: (data: MarketData) => void;
  batchUpdateMarketData: (dataList: MarketData[]) => void;
  updateCandle: (symbol: string, candle: CandleData) => void;
  setCandles: (symbol: string, candles: CandleData[]) => void;
};

export const useMarketStore = create<MarketState>((set) => ({
  selectedSymbol: 'XAUUSD',
  symbols: [],
  marketData: {},
  candles: {},
  setSelectedSymbol: (symbol) => set({ selectedSymbol: symbol }),
  setSymbols: (symbols) => set({ symbols }),
  updateMarketData: (data) => 
    set((state) => ({ 
      marketData: { ...state.marketData, [data.symbol]: data } 
    })),
  batchUpdateMarketData: (dataList) =>
    set((state) => {
      const updated = { ...state.marketData };
      dataList.forEach(item => {
        updated[item.symbol] = item;
      });
      return { marketData: updated };
    }),
  updateCandle: (symbol, candle) => 
    set((state) => {
      const currentCandles = state.candles[symbol] || [];
      const newCandles = [...currentCandles];
      const lastIdx = newCandles.length - 1;
      
      if (lastIdx >= 0 && newCandles[lastIdx].time === candle.time) {
        newCandles[lastIdx] = candle;
      } else {
        newCandles.push(candle);
      }
      
      return { candles: { ...state.candles, [symbol]: newCandles } };
    }),
  setCandles: (symbol, candles) =>
    set((state) => ({ candles: { ...state.candles, [symbol]: candles } })),
}));
