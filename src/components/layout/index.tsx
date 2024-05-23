"use client";
import { FC, HTMLAttributes, PropsWithChildren } from "react"
import { Footer, NavHeader, SideNav } from "../navigation"
import { useValidRoute } from "@/hooks/useValidRoute"
import { Routes } from "@/core/routing";
import { cn } from "@/lib/utils";

export const Layout:FC<PropsWithChildren> = ({ children }) => {
      const { isValidRoute } = useValidRoute([Routes.signIn, Routes.signUp]);
      return (
            <div className="min-h-screen flex">
                  {
                        isValidRoute? null : (
                              <div className="flex-1 max-w-[250px]">
                                    <SideNav />
                              </div>
                        )
                  }
                  <div className="bg-white-200 flex-1 flex flex-col gap-4 items-center justify-between p-6 pt-8">
                        {
                              isValidRoute? null: (
                                    <NavHeader />
                              )
                        }
                        <main className="border w-full flex-1 p-4">
                              {children}
                        </main>
                        <Footer />
                  </div>
            </div>
      )
}

export const Row:FC<HTMLAttributes<HTMLDivElement>> = ({...rest}) => <div {...rest} className={cn("flex gap-2", rest.className)} />
export const Column:FC<HTMLAttributes<HTMLDivElement>> = ({...rest}) => <div {...rest} className={cn("flex flex-col gap-2", rest.className)} />