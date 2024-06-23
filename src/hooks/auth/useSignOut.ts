import { toast } from "@/components/toast/use-toast";
import { Routes } from "@/core/routing";
import { signIn, signOutUser } from "@/firebase/auth"
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { wait } from "@/lib/utils";
import useUserStore from "@/stores/user.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignOut = () => {
      const {updateUser} =  useUserStore((state) => state);
      const router = useRouter();
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const signOut = () => {
            setLoading(true);
            setError(null);

            signOutUser()
            .then(() => {
                  updateUser(null);
                  router.push(Routes.signIn)
                  wait(1000).then(() =>window.location.reload())
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
            signOut,
            loading,
            error
      }
} 