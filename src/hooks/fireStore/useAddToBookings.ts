import { toast } from "@/components/toast/use-toast";
import { CacheKey, SUCCESS_MESSAGE } from "@/constants/enums";
import { Routes } from "@/core/routing";
import { addToBookings as addToBookingsMethod } from "@/firebase/firestore";
import { getFirebaseErrorMessage } from "@/lib/helpers/getErrorMessage";
import { queryClient } from "@/lib/query";
import { wait } from "@/lib/utils";
import useShowQuotes from "@/stores/show-quotes.store";
import useBookMoveStore from "@/stores/book-move.store";
import useHireLabourStore from "@/stores/hire-labour.store";
import { Booking } from "@/types/structs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAddToBookings = () => {
  const { reset } = useShowQuotes.getState();
  const { reset: resetBookMove } = useBookMoveStore.getState();
  const { reset: resetHireLabour } = useHireLabourStore.getState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToBookings = (payload: Booking) => {
    setLoading(true);
    setError(null);

    addToBookingsMethod(payload)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [CacheKey.BOOKINGS_STATE] });
        localStorage.clear();
        reset();
        resetHireLabour();
        resetBookMove();
        toast({
          description: SUCCESS_MESSAGE.BOOKINGS_COMPLETE,
          variant: "success",
        });
        wait(0).then(() => router.push(Routes.bookings));
      })
      .catch((err) => {
        setError(err);
        toast({
          title: "Oops!",
          description: getFirebaseErrorMessage(err),
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    addToBookings,
    loading,
    error,
  };
};
