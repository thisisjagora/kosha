import { cn } from "@/lib/utils"
import { FC, HTMLAttributes } from "react"
import { H, HeadingProps, P, Picture } from "../../atoms";
import { Column, Row } from "../../layout";
import { Stars } from "../../Icons";

const Quotes:FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => <div {...props} className={cn("flex flex-col gap-2 justify-between p-4 bg-white-100 shadow-sm rounded-xl", props.className)} />

interface QuotesImageProps {
      src: string;
      type: "Book a move" | "Hire labor" | "Book a delivery"
}
const QuotesImage:FC<QuotesImageProps> = ({ type }) => {
      return (
            <div className="w-full h-[160px] flex-1 relative">
                  <Picture 
                        container={{
                              className: "w-full h-[160px] rounded-xl"
                        }}
                        image={{
                              alt: "",
                              src: "/images/move-company.jpeg",
                              className: "object-cover rounded-xl"
                        }}
                  />
                  <Picture 
                        container={{
                              className: "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[60px] h-[55px]"
                        }}
                        image={{
                              alt: "",
                              src: type === "Book a move" ? "/images/book-move.png" : type === "Book a delivery" ? "/images/book-delivery.png" : "/images/hire-labor.png"
                        }}
                  />
            </div>
      )
}

const QuotesContent:FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => <Column {...props} className={cn("gap-6 flex-1 pt-4",props.className)} />
const QuotesTitle: FC<HeadingProps> = ({...props}) => <H {...props} className={cn("text-primary text-base",props.className)}/>
const QuotesMovers: FC<HTMLAttributes<HTMLParagraphElement>> = ({ ...props }) => <P {...props} className={cn("text-grey-300 font-dm-sans text-sm p-0 m-0 leading-[8px]", props.className)} />
const QuotesVehicle: FC<HTMLAttributes<HTMLParagraphElement>> = ({ ...props }) => <P {...props} className={cn("text-grey-600 font-dm-sans text-sm font-bold",props.className)} />
const QuotesTime: FC<HTMLAttributes<HTMLParagraphElement>> = ({ ...props }) => <P {...props} className={cn("text-black-[#4B4B4C] font-dm-sans text-sm font-medium",props.className)}></P>
const QuotesAmount = ({ amount }: {amount: string}) => <div className="p-1 min-w-[80px] max-w-max text-center bg-primary rounded-3xl"><P className="font-dm-sans text-sm text-white-100">${amount}</P></div>
const QuotesRatings = ({ rating }: {rating: string}) => {
      return (
            <Row className="items-center max-w-max">
                  <Stars className="w-[43px] h-[11px]"/>
                  <P className="text-grey-600 font-bold font-dm-sans text-sm">{rating}</P>
            </Row>
      )
}
const QuotesMoversDoodles = () => {
      return (
            <div></div>
      )
}

export { 
            Quotes, 
            QuotesImage, 
            QuotesContent, 
            QuotesTitle, 
            QuotesMovers, 
            QuotesVehicle, 
            QuotesTime, 
            QuotesAmount,
            QuotesRatings 
      }