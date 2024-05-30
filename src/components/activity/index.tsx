import { FC, HTMLAttributes } from "react";
import { Column, Row } from "../layout";
import { cn } from "@/lib/utils";

const Activity:FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => <Row {...props} className={cn("bg-orange-100 text-white-100 rounded-xl justify-between items-center", props.className)}  />
const LeftColumn:FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => <Column {...props} className={cn("flex-1 p-6 xl:p-8 gap-6 max-w-[400px]", props.className)} />
const RightColumn:FC<HTMLAttributes<HTMLDivElement>> = ({...props}) => <Column {...props} className={cn("flex-1 px-8 py-2 gap-6 h-full", props.className)} />
export {Activity, LeftColumn, RightColumn};