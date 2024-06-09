import { create } from 'zustand';

interface Store {
  showQuote: boolean;
  setShowQuote: (value: boolean) => void;
}

const useShowQuotes = create<Store>((set) => ({
  showQuote: false,
  setShowQuote: (value: boolean) => set((state) => ({
    showQuote: value
  }))
}));

export default useShowQuotes;
