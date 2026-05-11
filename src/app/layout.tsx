import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GADGETMGHRIB - Smart Tech, Better Life",
  description: "Premium gadgets and tech accessories in Morocco.",
};

import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body 
        className={`${inter.className} text-[#282828] antialiased min-h-screen flex flex-col bg-fixed bg-cover bg-center`}
        style={{ backgroundImage: "url('/site-bg.png')" }}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}