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
            onClick?: () => void;
      }
}
export const NavItem: FC<Props> = ({ data }) => {
      const {isActive = false} = data
      return (
            <Link 
                  href={data.route}
                  onClick={data.onClick}
            >
                  <div className={cn("group flex items-center gap-4 border-r-[3px] border-transparent py-2 px-6 transition duration-300 ease-in-out", {
                        "border-white": isActive
                  })}>
                        <span>
                              {data.icon}
                        </span>
                        <P className={cn("font-medium text-grey-100 group-hover:scale-[1.02] group-hover:text-white-100 transition duration-300 ease-linear", {
                              "font-bold text-white-100" : isActive
                        })}>{data.title}</P>
                  </div>
            </Link>
      )
}