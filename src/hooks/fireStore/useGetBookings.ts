import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/firebase/firestore";
import { CacheKey } from "@/constants/enums";
import { format } from "date-fns";

export const useGetBookingsByDate = (date: Date) => {
  return useQuery({
    queryKey: [CacheKey.BOOKINGS_STATE, format(date, "MM-dd-yyyy")],
    queryFn: () => getBookings(date),
    retry: false,
  });
};