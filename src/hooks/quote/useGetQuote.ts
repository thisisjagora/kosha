import { useMutation } from "@tanstack/react-query";
import { getQuote } from "@/core/api/quote";
import { BookMoveDto } from "@/types/dtos";

export const useGetQuote = ({ payload }: { payload?: BookMoveDto } = {}) => {
  const { mutate, ...others } = useMutation({
    mutationFn: async (payload: BookMoveDto) => {
      try {
        const quote = getQuote(payload);
        return quote;
      } catch (err) {
        throw err;
      }
    },
    retry: false,
  });
  payload && mutate(payload);
  return { mutate, ...others };
};

