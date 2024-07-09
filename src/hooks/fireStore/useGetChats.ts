import { useEffect } from "react";
import { toast } from "@/components/toast/use-toast";
import { getChats as getChatsMethod } from "@/firebase/firestore";
import { getFirebaseErrorMessage } from "@/lib/helpers/getErrorMessage";
import { useState } from "react";
import type { FirebaseError } from "firebase/app";

export const useGetChats = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState(null);

  const getChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getChatsMethod();
      console.log("data: ", data);
      setData(data as unknown as null);
    } catch (e) {
      setError(e);
      toast({
        title: "Oops!",
        description: getFirebaseErrorMessage(e as FirebaseError),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return {
    loading,
    error,
    data,
  };
};
