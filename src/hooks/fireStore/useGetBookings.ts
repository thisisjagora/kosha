import { toast } from "@/components/toast/use-toast";
import { getBookings as getBookingsMethod } from "@/firebase/firestore";
import { getFirebaseErrorMessage } from "@/lib/helpers/getErrorMessage";
import { useState } from "react";

export const useGetBookings = () => {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const getBookings = (payload: Date) => {
            setLoading(true);
            setError(null);

            getBookingsMethod(payload)
            .then((res) => {
                  console.log(res, "form the hook")
            })
            .catch((err) => {
                  setError(err);
                  toast({
                        title:"Oops!",
                        description: getFirebaseErrorMessage(err),
                        variant:"destructive"
                  })
            })            
            .finally(() => {
                  setLoading(false);
            })
      }
      return {
            getBookings,
            loading,
            error
      }
} 