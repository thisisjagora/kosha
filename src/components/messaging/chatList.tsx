"use client"
import Link from "next/link"
import { P, Picture } from "../atoms"
import { Column, Row } from "../layout"
import { cn } from "@/lib/utils"
import { FC } from "react"
import { Routes } from "@/core/routing"
import { useParams } from "next/navigation"

export const ChatList = () => {
      const chats = [
            {
              type: "Book a move" as "Book a move",
              id: "123456",
              name: "Faith Movers & Delivery"
            },
            {
              type: "Hire labor" as "Hire labor",
              id: "123457",
              name: "Declan Labor"
            }
      ];
      return (
            <Column className="gap-0">
                  { chats.map((chat, index) => <ChatListItem key={chat.id + index} type={chat.type} id={chat.id} name={chat.name}  />)}
            </Column>
      )
}

interface ChatListItemProps {
      type: "Book a move" | "Hire labor" | "Book a delivery",
      id: string,
      name: string
}
const ChatListItem:FC<ChatListItemProps> = ({type, id, name }) => {
      const params = useParams()
      return (
            <Link href={`${Routes.messages}/${id}`}>
                  <Row className={cn("items-center justify-between p-4 bg-transparent", {
                        "bg-white-100 shadow-md rounded-l-xl": params.slug === id
                  })}>
                        <Row className="items-center flex-1">
                              <div className="max-w-[50px] h-[50px] flex-1 relative">
                                    <Picture 
                                          container={{
                                                className: "w-full h-full rounded-xl"
                                          }}
                                          image={{
                                                alt: "",
                                                src: "https://images.unsplash.com/photo-1715005881129-266ccdd75e43?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                                className: "object-cover rounded-xl"
                                          }}
                                    />
                                    <Picture 
                                          container={{
                                                className: "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[35px] h-[35px]"
                                          }}
                                          image={{
                                                alt: "",
                                                src: type === "Book a move" ? "/images/book-move.png" : type === "Book a delivery" ? "/images/book-delivery.png" : "/images/hire-labor.png"
                                          }}
                                    />
                              </div>
                              <Column className="flex-1 gap-0">
                                    <P className="font-dm-sans text-primary font-bold text-sm leading-[16px]">{name}</P>
                                    <P className="font-dm-sans text-primary-foreground text-xs">22nd April, 2024</P>
                              </Column>
                        </Row>
                        <Column className="items-center">
                              <P className="text-sm text-grey-100 font-dm-sans">09:46</P>
                              <span className="bg-orange-100 min-w-[1.2rem] min-h-[1.2rem] p-[2px] rounded-full text-white-100 text-center flex items-center justify-center">
                                    <p className="text-xs text-center">3</p>
                              </span>

                        </Column>
                  </Row>
            </Link>
      )
}