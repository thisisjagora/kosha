import { Quote } from "@/types/structs";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { updateQuote } from "@/firebase/firestore";

type MutationInput = { bookingId: string; quote: Quote };

export const useUpdateQuote = (
  useMutationOptions: Omit<
    UseMutationOptions<Quote, unknown, MutationInput>,
    "mutationFn"
  > = {}
) => {
  return useMutation<Quote, unknown, MutationInput>({
    mutationFn: ({ bookingId, quote }) => updateQuote(bookingId, quote),
    retry: false,
    ...useMutationOptions,
  });
};
