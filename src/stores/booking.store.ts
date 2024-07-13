import { Booking, Quote } from "@/types/structs";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import appConfig from "../../env.config";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";

interface State {
  selectedBooking: Partial<Booking> | null;
  setSelectedBooking: (booking: Partial<Booking> | null) => void;
  newQuote: Quote | null;
  setNewQuote: (quote: Quote | null) => void;
  updateSelectedBookingQuote: (quote: Quote) => void;
}

const whiteList: (keyof State)[] = ["selectedBooking"];

const useBookingStore = createSelectorFunctions(
  create<State>()(
    persist(
      immer<State>((set) => ({
        selectedBooking: null,
        setSelectedBooking: (booking) =>
          set((state) => {
            state.selectedBooking = booking;
          }),
        newQuote: null,
        setNewQuote: (quote) => {
          set((state) => {
            state.newQuote = quote;
          });
        },
        updateSelectedBookingQuote: (quote) => {
          set((state) => {
            if (state.selectedBooking) {
              state.selectedBooking.quote = quote;
            }
          });
        },
      })),
      {
        name: "96yo_41vhxp840s9bxqv6",
        partialize: (state) => {
          const currentState = Object.fromEntries(
            Object.entries(state).filter(([key]: (keyof State)[]) =>
              whiteList.includes(key)
            )
          );
          appConfig.env === "DEV" && console.log("CURRENT STATE: ", state);
          return currentState;
        },
      }
    )
  )
);

export default useBookingStore;
