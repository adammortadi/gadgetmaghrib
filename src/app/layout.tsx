import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cairo } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gadget Maghrib | متجرك الإلكتروني المفضل في المغرب",
  description: "اكتشف أفضل الساعات الذكية، السماعات، وإكسسوارات الهواتف في المغرب. جودة مضمونة، توصيل سريع، ودفع عند الاستلام مع Gadget Maghrib.",
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.png",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
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
      <body className={`${plusJakartaSans.variable} ${cairo.variable} font-sans text-neutral-900 antialiased min-h-screen`}>
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