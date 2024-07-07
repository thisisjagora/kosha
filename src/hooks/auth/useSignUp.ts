import { signUp } from "@/firebase/auth"
import { useState } from "react";
import { toast } from "@/components/toast/use-toast";
import { getFirebaseErrorMessage } from "@/lib/helpers/getErrorMessage";
import { wait } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Routes } from "@/core/routing";
import { SignUpDto } from "@/types/dtos";
import { SUCCESS_MESSAGE } from "@/constants/enums";

export const useSignUp = () => {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const router = useRouter();

      const signUpWithEmail = (payload: SignUpDto) => {
            setLoading(true);
            setError(null);

            signUp(payload)
            .then(() => {
                  toast({description: SUCCESS_MESSAGE.USER_SIGNUP, variant: "success"})
                  wait(2000).then(() => router.push(Routes.root))
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
            signUpWithEmail,
            loading,
            error
      }
}