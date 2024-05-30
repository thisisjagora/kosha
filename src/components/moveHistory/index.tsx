import Link from "next/link"
import { H, P, Picture } from "../atoms"
import { Column, Row } from "../layout"
import { FC } from "react"
import { cn } from "@/lib/utils"

interface Props{
      status: "Completed" | "Cancelled" | "Pending"
      type: "Book a move" | "Hire labor" | "Book a delivery"
}
export const MoveHistory:FC<Props> = ({status="Pending", type="Book a move"}) => {
      return(
            <Row className="items-center justify-between p-4 shadow-md rounded-xl">
                  <Row className="items-center flex-1">
                        <div className="max-w-[80px] h-[80px] flex-1 relative">
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
                                          className: "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[45px] h-[35px]"
                                    }}
                                    image={{
                                          alt: "",
                                          src: type === "Book a move" ? "/images/book-move.png" : type === "Book a delivery" ? "/images/book-delivery.png" : "/images/hire-labor.png"
                                    }}
                              />
                        </div>
                        <Column className="flex-1 gap-0">
                              <P className="font-dm-sans text-primary font-bold">Tiyende Movers</P>
                              <P className="font-dm-sans text-primary-foreground text-sm">22nd April, 2024</P>
                              <Link href="" className="text-underline text-orange-100 text-sm mt-2">See details</Link>
                        </Column>
                  </Row>
                  <P className={cn("font-dm-sans text-sm", {
                        "text-orange-400" : status === "Pending",
                        "text-red-500" : status === "Cancelled",
                        "text-green-100" : status === "Completed"
                  })}>Pending</P>
            </Row>
      )
}