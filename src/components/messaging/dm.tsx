import { FC, HTMLAttributes } from "react"
import { Column, Row } from "../layout"
import { P, Picture } from "../atoms"
import { ChatListItemProps } from "."
import { cn } from "@/lib/utils"

const DM:FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => <Column {...props} className={cn("w-full h-full p-4", props.className)} />

type DMHeaderProps = Partial<ChatListItemProps>;

const DMHeader:FC<DMHeaderProps> = ({type, name}) => {
      return (
            <Row className="w-full py-[11px]">
                  <Row className="items-center flex-1">
                        <div className="max-w-[45px] h-[45px] flex-1 relative">
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
                                    <P className="font-dm-sans text-primary font-bold text-xl leading-[24px]">{name}</P>
                                    <P className="font-dm-sans text-primary-foreground text-xs">Today</P>
                        </Column>
                  </Row>
            </Row>
      )
}

const DMFooter:FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => <Row {...props} className={cn("items-center gap-1",props.className)} />

const DMContent = () => {
      return(
            <Column className="h-full"></Column>
      )
}

export {
      DM,
      DMHeader,
      DMFooter,
      DMContent
}