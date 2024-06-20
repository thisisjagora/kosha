"use client";
import { FC, HTMLAttributes, PropsWithChildren, useEffect, useState } from "react";
import { Footer, NavHeader, SideNav } from "../navigation";
import { useValidRoute } from "@/hooks/useValidRoute";
import { Routes } from "@/core/routing";
import { cn } from "@/lib/utils";
import { auth } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { isValidRoute } = useValidRoute([Routes.signIn, Routes.signUp, Routes.forgotPassword]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser && !isValidRoute) {
      router.push(Routes.signIn);
    } else {
      setIsLoading(false);
    }
  }, [isValidRoute, router]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen h-screen flex">
      {!isValidRoute && auth.currentUser && (
        <div className="flex-1 max-w-[250px]">
          <SideNav />
        </div>
      )}
      <div
        className={cn("flex-1 h-full flex items-center justify-center bg-white-200", {
          "bg-white-100": isValidRoute,
        })}
      >
        <div className={cn("max-w-[1300px] xl:max-w-[1400px] overflow-y-auto w-full h-full flex-1 flex flex-col gap-4 items-center justify-between p-6")}>
          {!isValidRoute && auth.currentUser && <NavHeader />}
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export const Row: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => <div {...rest} className={cn("flex gap-2", rest.className)} />;
export const Column: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => <div {...rest} className={cn("flex flex-col gap-2", rest.className)} />;
