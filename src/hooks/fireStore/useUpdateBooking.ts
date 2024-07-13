import { toast } from "@/components/toast/use-toast";
import { SUCCESS_MESSAGE } from "@/constants/enums";
import { Routes } from "@/core/routing";
import { wait } from "@/lib/utils";
import useShowQuotes from "@/stores/show-quotes.store";
import { Booking } from "@/types/structs";
import { useRouter } from "next/navigation";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { updateBooking } from "@/firebase/firestore";
import useBookingStore from "@/stores/booking.store";

type MutationInput = { bookingId: string; booking: Booking };

export const useUpdateBooking = (
  useMutationOptions: Omit<
    UseMutationOptions<Booking, unknown, MutationInput>,
    "mutationFn"
  > = {}
) => {
  const router = useRouter();
  const setSelectedBooking = useBookingStore.use.setSelectedBooking();
  const { reset } = useShowQuotes.getState();
  return useMutation<Booking, unknown, MutationInput>({
    mutationFn: ({ bookingId, booking }) => updateBooking(bookingId, booking),
    retry: false,
    ...useMutationOptions,
    onSuccess: (...args) => {
      useMutationOptions.onSuccess?.(...args);
      localStorage.clear();
      setSelectedBooking(null);
      reset();
      toast({
        description: SUCCESS_MESSAGE.BOOKING_UPDATED,
        variant: "success",
      });
      wait(1000).then(() => router.push(Routes.bookings));
    },
  });
};
