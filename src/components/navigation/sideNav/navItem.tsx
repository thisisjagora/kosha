import { P } from "@/components/atoms";
import { cn } from "@/lib/utils";
import Link from "next/link"
import { FC, ReactNode } from "react";

interface Props {
      data: {
            title: string;
            route: string;
            icon: ReactNode;
            isActive?: boolean;
      }
}
export const NavItem: FC<Props> = ({ data }) => {
      const {isActive = false} = data
      return (
            <Link href={data.route}>
                  <div className={cn("flex items-center gap-4 border-r-[3px] border-transparent py-2 px-6 transition duration-300 ease-in-out", {
                        "border-white": isActive
                  })}>
                        <span>
                              {data.icon}
                        </span>
                        <P className={cn("font-medium text-grey-100 hover:scale-[1.02] hover:text-white transition duration-300 ease-linear", {
                              "font-bold text-white" : isActive
                        })}>{data.title}</P>
                  </div>
            </Link>
      )
}