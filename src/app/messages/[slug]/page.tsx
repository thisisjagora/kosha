"use client";
import { Send, Smiley } from "@/components/Icons";
import { Button, Picture } from "@/components/atoms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import { Row, Column } from "@/components/layout";
import { DM, DMFooter, DMHeader } from "@/components/messaging";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Textarea } from "@/components/textarea";
import { Tooltip } from "@/components/tooltip";
import { Paperclip } from "lucide-react";
import { useState, useEffect, type FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import EmojiPicker from "emoji-picker-react";
import { z } from "zod";
import { sendMessageSchema } from "@/core/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { useGetChat, useSendMessage } from "@/hooks/messages";
import { Loader } from "lucide-react";
import { formatDistance } from "date-fns";
import { notFound } from "next/navigation";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { FIREBASE_COLLECTIONS } from "@/constants/enums";
import { db } from "@/firebase/db";
import { ChatMessage } from "@/types/structs";
import { ChatBoxTail } from "@/components/Icons";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { safeParseDate } from "@/lib/utils";

export default function MessagePage({ params }: { params: { slug: string } }) {
  const {
    data: chat,
    isLoading: isLoadingChat,
    error: chatError,
  } = useGetChat({
    id: params.slug,
  });
  const chatId = params.slug;
  const [loadingMessages, setLoadingMessages] = useState(true);

  const messagesLoaded = useCallback(() => setLoadingMessages(false), []);

  if (isLoadingChat)
    return (
      <div className="flex justify-center pt-10 scale-125">
        <Loader className="animate-spin inline-block" />
      </div>
    );

  if (!isLoadingChat && chatError) {
    if (chatError.cause === 404) notFound();
    return (
      <p className="p-3 py-12 text-center text-red-400">
        {chatError?.cause
          ? chatError.message
          : "Could not fetch chat. Kindly reload or try again later."}
      </p>
    );
  }

  if (!isLoadingChat && chat)
    return (
      <DM>
        <DMHeader
          name={chat.quote?.companyName ?? ""}
          time={
            chat.bookingDate
              ? formatDistance(
                  safeParseDate(chat.bookingDate) as Date,
                  new Date()
                )
              : ""
          }
        />
        <Messages
          loadingMessages={loadingMessages}
          messagesLoaded={messagesLoaded}
          chatId={chatId}
          companyName={chat.quote?.companyName ?? ""}
        />
        {!loadingMessages && (
          <DMFooter>
            <MessageInput chatId={chatId} />
          </DMFooter>
        )}
      </DM>
    );
}

const Messages: FC<{
  chatId: string;
  companyName: string;
  loadingMessages: boolean;
  messagesLoaded: () => void;
}> = ({ chatId, companyName, loadingMessages, messagesLoaded }) => {
  const [messages, setMessages] = useState<
    Partial<ChatMessage & { id: string }>[]
  >([]);

  const scrollMessagesToBottom = useCallback(() => {
    setTimeout(() => {
      // ! Slightly delay the below
      const messagesElem = document.querySelector<HTMLDivElement>("#messages");
      if (messagesElem) messagesElem.scrollTop = messagesElem.scrollHeight;
    }, 50);
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, FIREBASE_COLLECTIONS.CHAT_MESSAGES),
      where("chatId", "==", chatId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      messagesLoaded();
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setMessages((prev) => [
            ...prev,
            {
              id: change.doc.id,
              ...change.doc.data(),
              timestamp: change.doc.data().timestamp ?? new Date().getTime(),
            } as unknown as ChatMessage & { id: string },
          ]);
          scrollMessagesToBottom();
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [chatId, scrollMessagesToBottom, messagesLoaded]);

  if (loadingMessages)
    return (
      <div className="flex justify-center pt-10 scale-125">
        <Loader className="animate-spin inline-block" />
      </div>
    );

  return (
    <Column
      id="messages"
      className="h-[calc(100dvh-25rem)] overflow-y-auto overflow-x-hidden"
    >
      {messages.map((message, idx) => {
        if (message.fromClient) {
          const isNextMessageClient = messages[idx + 1]?.fromClient,
            isPreviousMessageClient = messages[idx - 1]?.fromClient;
          return (
            <div className="mt-2.5 grid" key={message.id}>
              <div className="w-max justify-self-end max-w-[75%]">
                <div className="whitespace-nowrap flex justify-between items-center gap-4 text-sm pr-[72px] pl-4 text-[#8A898E]">
                  <span>{!isPreviousMessageClient ? "Me" : ""}</span>{" "}
                  <span>
                    {message.timestamp &&
                      format(safeParseDate(message.timestamp) as Date, "HH:mm")}
                  </span>
                </div>
                <div
                  className={twMerge(
                    "flex items-end gap-4",
                    !isNextMessageClient && "pb-[2rem]"
                  )}
                >
                  <div className="w-full rounded-2xl bg-[#27446E] px-4 py-3 text-sm leading-[145%] text-white-500 relative justify-self-end self-end">
                    {message.text}
                    {!isNextMessageClient && (
                      <ChatBoxTail className="absolute bottom-[0.15rem] right-[-0.28rem] scale-125" />
                    )}
                  </div>
                  <div className="mb-[-2rem]">
                    {!isNextMessageClient ? (
                      <Picture
                        container={{
                          className:
                            "w-[55px] h-[55px] rounded-full overflow-hidden",
                        }}
                        image={{ src: "/images/orange-doodle.png", alt: "" }}
                      />
                    ) : (
                      <div className="w-[55px] h-[55px] rounded-full overflow-hidden" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        const isNextMessageCompany = !messages[idx + 1]?.fromClient,
          isPreviousMessageCompany = !messages[idx - 1]?.fromClient;
        return (
          <div className="mt-2.5 grid" key={message.id}>
            <div className="w-max max-w-[75%]">
              <div className="whitespace-nowrap flex justify-between items-center gap-4 text-sm pl-[72px] pr-4 text-[#8A898E]">
                <span>{!isPreviousMessageCompany ? companyName : ""}</span>{" "}
                <span>
                  {message.timestamp &&
                    format(safeParseDate(message.timestamp) as Date, "HH:mm")}
                </span>
              </div>
              <div
                className={twMerge(
                  "flex items-end flex-row-reverse gap-4",
                  !isNextMessageCompany && "pb-[2rem]"
                )}
              >
                <div className="w-full rounded-2xl bg-[#E9E9EB] px-4 py-3 text-sm leading-[145%] text-black-500 relative">
                  {message.text}
                  {!isNextMessageCompany && (
                    <ChatBoxTail
                      fill="#E9E9EB"
                      className="absolute bottom-[0.15rem] left-[-0.28rem] scale-125 -scale-x-100"
                    />
                  )}
                </div>
                <div className="mb-[-2rem]">
                  {!isNextMessageCompany ? (
                    <Picture
                      container={{
                        className:
                          "w-[55px] h-[55px] rounded-full overflow-hidden",
                      }}
                      image={{ src: "/images/orange-doodle.png", alt: "" }}
                    />
                  ) : (
                    <div className="w-[55px] h-[55px] rounded-full overflow-hidden" />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Column>
  );
};

const MessageInput: FC<{ chatId: string }> = ({ chatId }) => {
  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
  });
  const [messageContent, setMessageContent] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { mutate: sendMessage, isPending } = useSendMessage();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleSendMessage = () => {
    sendMessage({
      text: messageContent.trim(),
      fromClient: true,
      chatId,
    });
    setMessageContent("");
  };
  return (
    <Form {...form}>
      <form
        className="w-full relative overflow-hidden flex flex-row items-center gap-2"
        onSubmit={form.handleSubmit(handleSendMessage)}
      >
        {isMounted && (
          <Popover>
            <PopoverTrigger>
              <Button
                type="button"
                className="p-0 bg-transparent hover:bg-transparent max-w-max"
              >
                <Smiley className="w-[25px] h-[25px]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="absolute bottom-20 z-10 w-full p-0 border-0 bg-transparent rounded shadow-lg">
              <EmojiPicker
                width={350}
                height={400}
                onEmojiClick={(emojiObject) => {
                  setMessageContent((prev) => prev + emojiObject.emoji);
                  form.setValue("message", messageContent + emojiObject.emoji);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
        <Row className="flex-1 w-full h-14 items-center px-2 bg-grey-700 rounded-md">
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Textarea
                  {...field}
                  value={messageContent}
                  onChange={(e) => {
                    setMessageContent(e.target.value);
                    field.onChange(e);
                  }}
                  id="message"
                  placeholder="Type your message here..."
                  rows={1}
                  className="text-base bg-transparent border-0 outline-none min-h-full resize-none p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
              </FormItem>
            )}
          />
          <FormField
            name="file"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="file">
                  <Tooltip
                    trigger={
                      <span>
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </span>
                    }
                    content="Attach File"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    id="file"
                    className="hidden"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Row>
        <Button
          type="submit"
          variant="ghost"
          className="p-0 bg-transparent hover:bg-transparent max-w-max"
        >
          {isPending ? (
            <div className="inline-flex justify-center items-center bg-[#26446E] rounded-full w-[40px] h-[40px]">
              <Loader className="animate-spin text-white-500" />
            </div>
          ) : (
            <Send className="w-[40px] h-[40px]" />
          )}
        </Button>
      </form>
    </Form>
  );
};
