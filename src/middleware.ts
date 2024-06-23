import { NextRequest, NextResponse } from "next/server";
import { onAuthStateChanged } from "firebase/auth";
import { Routes } from "./core/routing";
import { auth } from "./firebase/auth";


export const middleware = async (request: NextRequest) => {
	const { root, profile, messages, bookings, license, terms, sequence } = Routes;
	const authRoutes = [root, profile, messages, bookings, license, terms, ...Object.values(sequence)];

      onAuthStateChanged(auth, (user) => {
            if (authRoutes.includes(request.nextUrl.pathname)) {
                  if (!user)
                        return NextResponse.redirect(new URL(Routes.signIn, request.url));
            }
      })
	return NextResponse.next();
};

export const config = {
	matcher: "/((?!api|static|.*\\..*|_next).*)"
};
