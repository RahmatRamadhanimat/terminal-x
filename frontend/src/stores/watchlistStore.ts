import { create } from 'zustand';

type WatchlistState = {
  symbols: string[];
  favorites: string[];
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  addSymbol: (symbol: string) => void;
  removeSymbol: (symbol: string) => void;
  toggleFavorite: (symbol: string) => void;
  setSorting: (sortBy: string) => void;
};

export const useWatchlistStore = create<WatchlistState>((set) => ({
  symbols: ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 'BTCUSD', 'ETHUSD', 'AAPL', 'TSLA'],
  favorites: ['XAUUSD', 'EURUSD'],
  sortBy: 'symbol',
  sortDirection: 'asc',
  addSymbol: (symbol) => set((state) => ({ 
    symbols: state.symbols.includes(symbol) ? state.symbols : [...state.symbols, symbol] 
  })),
  removeSymbol: (symbol) => set((state) => ({ 
    symbols: state.symbols.filter(s => s !== symbol) 
  })),
  toggleFavorite: (symbol) => set((state) => ({
    favorites: state.favorites.includes(symbol) 
      ? state.favorites.filter(s => s !== symbol)
      : [...state.favorites, symbol]
  })),
  setSorting: (sortBy) => set((state) => ({
    sortBy,
    sortDirection: state.sortBy === sortBy && state.sortDirection === 'asc' ? 'desc' : 'asc'
  }))
}));
