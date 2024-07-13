import { toast } from "@/components/toast/use-toast";
import { CacheKey, SUCCESS_MESSAGE } from "@/constants/enums";
import { Routes } from "@/core/routing";
import { wait } from "@/lib/utils";
import useShowQuotes from "@/stores/show-quotes.store";
import { useRouter } from "next/navigation";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { deleteBooking } from "@/firebase/firestore";
import useBookingStore from "@/stores/booking.store";
import { queryClient } from "@/lib/query";

type MutationInput = { bookingId: string };

export const useDeleteBooking = (
  useMutationOptions: Omit<
    UseMutationOptions<void, unknown, MutationInput>,
    "mutationFn"
  > = {}
) => {
  const router = useRouter();
  const setSelectedBooking = useBookingStore.use.setSelectedBooking();
  const { reset } = useShowQuotes.getState();
  return useMutation<void, unknown, MutationInput>({
    mutationFn: ({ bookingId }) => deleteBooking(bookingId),
    retry: false,
    ...useMutationOptions,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [CacheKey.BOOKINGS_STATE] });
      useMutationOptions.onSuccess?.(...args);
      localStorage.clear();
      setSelectedBooking(null);
      reset();
      toast({
        description: SUCCESS_MESSAGE.BOOKING_DELETED,
        variant: "success",
      });
      wait(0).then(() => router.push(Routes.bookings));
    },
  });
};
