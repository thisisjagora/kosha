import { FC, HTMLAttributes } from "react";
import { Column, Row } from "../layout";
import { cn } from "@/lib/utils";

const Activity:FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => <Row {...props} className={cn("bg-orange-100 text-white-100 rounded-xl justify-between items-center font-dm-sans", props.className)}  />
const LeftColumn:FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => <Column {...props} className={cn("flex-1 p-4 sm:p-6 xl:p-8 gap-6 items-center md:items-start", props.className)} />
const RightColumn:FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => <Column {...props} className={cn("flex-1 px-8 py-2 gap-6 h-full max-w-[340px] hidden md:block", props.className)} />
export {Activity, LeftColumn, RightColumn};