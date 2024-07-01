import { toast } from "@/components/toast/use-toast";
import { Routes } from "@/core/routing";
import { deleteUserAccount } from "@/firebase/auth";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { wait } from "@/lib/utils";
import useUserStore from "@/stores/user.store";
import { IUser } from "@/types/structs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useDeleteAccount = () => {
      const { updateUser, user } = useUserStore((state) => state);
      const router = useRouter();
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
    
      const deleteAccount = () => {
        setLoading(true);
        setError(null);
    
        deleteUserAccount(user as IUser)
          .then(() => {
            updateUser(null);
            wait(1000).then(() => window.location.reload());
          })
          .catch((err) => {
            setError(err);
            toast({
              title: "Oops!",
              description: getErrorMessage(err),
              variant: "destructive",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      };
    
      return {
        deleteAccount,
        loading,
        error,
      };
    };