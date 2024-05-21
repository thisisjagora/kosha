import type { Metadata, Viewport } from "next";
import { DM_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/toast/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Footer, NavHeader, SideNav } from "@/components/navigation";
import { Layout } from "@/components/layout";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-dm-sans',
});
const sourceSans3 = Source_Sans_3({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-source-sans',
});


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
title: "KoshaMoves | Schedule a move",
description: "KoshaMoves - ",
applicationName: 'MyMedHub',
referrer: 'origin-when-cross-origin',
authors: [{ name: 'Nelson Michael', url: '' }],
creator: 'Nelson Michael',
publisher: 'Nelson Michael',
};

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.className} ${sourceSans3.className}`}>
        <Layout>
          {children}
        </Layout>
        <Toaster />
      </body>
    </html>
  );
}
