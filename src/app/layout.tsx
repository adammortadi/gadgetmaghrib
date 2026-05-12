import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gadget Maghrib | متجرك الإلكتروني المفضل في المغرب",
  description: "اكتشف أفضل الساعات الذكية، السماعات، وإكسسوارات الهواتف في المغرب. جودة مضمونة، توصيل سريع، ودفع عند الاستلام مع Gadget Maghrib.",
  icons: {
    apple: "/logo.png",
  }
};

import DynamicBackground from "@/components/layout/DynamicBackground";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.className} text-[#282828] antialiased`}>
        <DynamicBackground>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </DynamicBackground>
        <Toaster />
      </body>
    </html>
  );
}