"use client";
import { FC, HTMLAttributes, PropsWithChildren, useEffect, useState } from "react";
import { Footer, NavHeader, SideNav } from "../navigation";
import { useValidRoute } from "@/hooks/useValidRoute";
import { Routes } from "@/core/routing";
import { cn } from "@/lib/utils";
import { auth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { User, deleteUser } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "@/firebase/firestore";
import useUserStore from "@/stores/user.store";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { updateUser } = useUserStore((state) => state);
  const { isValidRoute } = useValidRoute([Routes.signIn, Routes.signUp, Routes.forgotPassword]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUser(user);
            updateUser({...user, ...userDoc.data()});
          } else {
            await deleteUser(user);
            router.push(Routes.signIn);
          }
        } catch (err) {
          router.push(Routes.signIn);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [updateUser, router]);

  useEffect(() => {
    if (!isLoading && !user && !isValidRoute) {
      router.push(Routes.signIn);
    }
  }, [isLoading, user, isValidRoute, router]);

  if (isLoading || (!user && !isValidRoute)) {
    return (
      <div className="min-h-screen h-screen flex items-center justify-center">
        <Loader className="animate-spin w-[40px] h-[40px] text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen flex">
      {!isValidRoute && user && (
        <div className="flex-1 max-w-[250px] hidden lg:block">
          <SideNav />
        </div>
      )}
      <div
        className={cn("flex-1 h-full flex items-center justify-center bg-white-200", {
          "bg-white-100": isValidRoute,
        })}
      >
        <div className={cn("max-w-[1300px] xl:max-w-[1400px] overflow-y-auto w-full h-full flex-1 flex flex-col gap-4 items-center justify-between p-4 sm:p-6")}>
          {!isValidRoute && user && <NavHeader />}
          <main className="w-full flex-1">{isLoading? null : children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export const Row: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => <div {...rest} className={cn("flex gap-2", rest.className)} />;
export const Column: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => <div {...rest} className={cn("flex flex-col gap-2", rest.className)} />;
