const fs = require('fs');
const path = require('path');

const dirs = [
  'src/components/layout',
  'src/components/home',
  'src/components/product',
  'src/components/checkout',
  'src/components/shared',
  'src/app/products',
  'src/app/products/[id]',
  'src/app/cart',
  'src/app/checkout',
  'src/app/login',
  'src/app/categories',
  'src/app/track',
  'src/app/contact'
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

const files = {
  'src/app/layout.tsx': `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GADGET M GHRIB - Modern Tech Store",
  description: "Premium gadgets and tech accessories in Morocco.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`\${inter.className} bg-black text-white antialiased min-h-screen flex flex-col\`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}`,
  'src/components/layout/theme-provider.tsx': `"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}`,
  'src/app/page.tsx': `import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FlashDeals from "@/components/home/FlashDeals";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <FeaturedProducts />
      <FlashDeals />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}`,
  'src/app/products/page.tsx': `export default function ProductsPage() {
  return <div className="container mx-auto py-16">Products List</div>;
}`,
  'src/app/products/[id]/page.tsx': `export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  return <div className="container mx-auto py-16">Product Details {params.id}</div>;
}`,
  'src/app/cart/page.tsx': `export default function CartPage() {
  return <div className="container mx-auto py-16">Cart</div>;
}`,
  'src/app/checkout/page.tsx': `export default function CheckoutPage() {
  return <div className="container mx-auto py-16">Checkout</div>;
}`,
  'src/app/login/page.tsx': `export default function LoginPage() {
  return <div className="container mx-auto py-16">Login / Register</div>;
}`,
  'src/app/categories/page.tsx': `export default function CategoriesPage() {
  return <div className="container mx-auto py-16">Categories</div>;
}`,
  'src/app/track/page.tsx': `export default function TrackOrderPage() {
  return <div className="container mx-auto py-16">Track Order</div>;
}`,
  'src/app/contact/page.tsx': `export default function ContactPage() {
  return <div className="container mx-auto py-16">Contact Us</div>;
}`,
};

Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(path.join(__dirname, filepath), content);
});

console.log("Scaffolding complete.");
