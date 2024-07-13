import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getChats,
  addToChatMessages,
  getChat,
  getChatMessages,
} from "@/firebase/db/messages";
import { CacheKey } from "@/constants/enums";
import { ChatMessage } from "@/types/structs";

export const useGetChats = () => {
  return useQuery({
    queryKey: [CacheKey.CHATS_STATE],
    queryFn: getChats,
    retry: false,
  });
};

export const useGetChat = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [CacheKey.CHATS_STATE, id],
    queryFn: () => getChat(id),
    retry: false,
  });
};

export const useSendMessage = () => {
  return useMutation<unknown, unknown, Omit<ChatMessage, 'timestamp'>>({
    mutationFn: (newMessage) => addToChatMessages(newMessage),
    retry: false,
  });
};

export const useGetChatMessages = ({ chatId }: { chatId: string }) => {
  return useQuery({
    queryKey: [CacheKey.CHAT_MESSAGES_STATE, chatId],
    queryFn: () => getChatMessages(chatId),
    retry: false,
  });
};
