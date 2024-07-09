import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/firebase/db/messages";
import { CacheKey } from "@/constants/enums";

export const useGetChats = () => {
  return useQuery({
    queryKey: [CacheKey.CHATS_STATE],
    queryFn: getChats,
  });
};
