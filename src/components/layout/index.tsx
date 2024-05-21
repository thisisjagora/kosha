"use client";
import { FC, PropsWithChildren } from "react"
import { Footer, NavHeader, SideNav } from "../navigation"
import { useValidRoute } from "@/hooks/useValidRoute"
import { Routes } from "@/core/routing";

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
                  <div className="border flex-1 flex flex-col gap-4 items-center justify-between p-6 pt-8">
                        {
                              isValidRoute? null: (
                                    <NavHeader />
                              )
                        }
                        <main className="border w-full flex-1 flex flex-col items-center justify-between p-24">
                              {children}
                        </main>
                        <Footer />
                  </div>
            </div>
      )
}