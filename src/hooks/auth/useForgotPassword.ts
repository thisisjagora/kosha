import { toast } from "@/components/toast/use-toast";
import { Routes } from "@/core/routing";
import { forgotPassword as _forgotPassword } from "@/firebase/auth"
import { getFirebaseErrorMessage } from "@/lib/helpers/getErrorMessage";
import { wait } from "@/lib/utils";
import { ForgotPasswordDto } from "@/types/dtos";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useForgotPassword = () => {
      const router = useRouter();
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const forgotPassword = (payload: ForgotPasswordDto) => {
            setLoading(true);
            setError(null);

            _forgotPassword(payload)
            .then(() => {
                  wait(1000).then(() => router.push(Routes.signIn))
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
            forgotPassword,
            loading,
            error
      }
} 