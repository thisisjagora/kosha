import { StorageKeys } from '@/constants/enums';
import { Quote } from '@/types/structs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Store {
  showQuote: boolean;
  quotesResult: Array<Quote>;
  setShowQuote: (value: boolean) => void;
  setQuotesResult: (quotes: Array<Quote> | undefined) => void;
  reset: () => void;
}

const useShowQuotes = create<Store>()(
  persist(
    (set) => ({
      showQuote: false,
      quotesResult: [],
      setShowQuote: (value: boolean) => set({ showQuote: value }),
      setQuotesResult: (quotes: Array<Quote> | undefined) => set({ quotesResult: quotes || [] }),
      reset: () => set({ quotesResult: [] })
    }),
    {
      name: StorageKeys.QUOTES_RESULT,
      partialize: (state) => ({ quotesResult: state.quotesResult })
    }
  )
);

const clearQuotesStorage = () => {
  localStorage.removeItem(StorageKeys.QUOTES_RESULT);
};

export default useShowQuotes;
export { clearQuotesStorage }
