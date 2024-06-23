import { toast } from "@/components/toast/use-toast";
import { Routes } from "@/core/routing";
import { signIn } from "@/firebase/auth"
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import useUserStore from "@/stores/user.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignIn = () => {
      const {updateUser} =  useUserStore((state) => state);
      const router = useRouter();
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const signInWithEmail = (payload: SignInDto) => {
            setLoading(true);
            setError(null);

            signIn(payload)
            .then((res) => {
                  updateUser(res);
                  router.push(Routes.root)
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
            signInWithEmail,
            loading,
            error
      }
} 