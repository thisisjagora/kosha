import { signUp } from "@/firebase/auth"
import { useState } from "react";
import { toast } from "@/components/toast/use-toast";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { SUCCESS_MESSAGE } from "@/constants/constants";
import { wait } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Routes } from "@/core/routing";

export const useSignUp = () => {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const router = useRouter();

      const signUpWithEmail = (payload: SignUpDto) => {
            setLoading(true);
            setError(null);

            signUp(payload)
            .then(() => {
                  toast({description: SUCCESS_MESSAGE.user_signup, variant: "success"})
                  wait(2000).then(() => router.push(Routes.root))
            })
            .catch((err) => {
                  setError(err);
                  toast({
                        title:"Oops!",
                        description: getErrorMessage(err),
                        variant:"destructive"
                  })
            })
            .finally(() => {
                  setLoading(false);
            })
      }
      return {
            signUpWithEmail,
            loading,
            error
      }
}