import { create } from 'zustand';
import { NewsItem } from '../types';

type NewsState = {
  items: NewsItem[];
  filter: string;
  setNews: (items: NewsItem[]) => void;
  addNews: (item: NewsItem) => void;
  setFilter: (filter: string) => void;
};

export const useNewsStore = create<NewsState>((set) => ({
  items: [],
  filter: 'ALL',
  setNews: (items) => set({ items }),
  addNews: (item) => set((state) => ({ items: [item, ...state.items].slice(0, 100) })),
  setFilter: (filter) => set({ filter })
}));
