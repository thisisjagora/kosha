import { MoveQuote, Quote } from '@/types/structs';
import { create } from 'zustand';

interface Store {
  showQuote: boolean;
  quotesResult: Array<Quote>;
  setShowQuote: (value: boolean) => void;
  setQuotesResult: (quotes: Array<Quote> | undefined) => void;
}

const useShowQuotes = create<Store>((set) => ({
  showQuote: false,
  quotesResult: [],
  setShowQuote: (value: boolean) => set((state) => ({
    showQuote: value
  })),
  setQuotesResult: (quotes: Array<Quote> | undefined) => set((state) => ({
    quotesResult: quotes
  }))
}));

export default useShowQuotes;
