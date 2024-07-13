import { Voucher } from "@/types/structs";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { getVoucher } from "@/firebase/firestore";

type MutationInput = { code: string };

export const useGetVoucher = (
  useMutationOptions: Omit<
    UseMutationOptions<Voucher, unknown, MutationInput>,
    "mutationFn"
  > = {}
) => {
  return useMutation<Voucher, unknown, MutationInput>({
    mutationFn: ({ code }) => getVoucher(code),
    retry: false,
    ...useMutationOptions,
  });
};
