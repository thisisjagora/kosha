import { MoveQuote } from '@/types/structs';
import { create } from 'zustand';

interface Store {
  showQuote: boolean;
  quotesResult: Array<MoveQuote>;
  setShowQuote: (value: boolean) => void;
  setQuotesResult: (quotes: Array<MoveQuote>) => void;
}

const useShowQuotes = create<Store>((set) => ({
  showQuote: false,
  quotesResult: [],
  setShowQuote: (value: boolean) => set((state) => ({
    showQuote: value
  })),
  setQuotesResult: (quotes: Array<MoveQuote>) => set((state) => ({
    quotesResult: quotes
  }))
}));

export default useShowQuotes;
