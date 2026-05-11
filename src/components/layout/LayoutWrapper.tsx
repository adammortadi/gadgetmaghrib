"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Footer from "@/components/layout/Footer";
import * as React from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      <LoadingScreen />
      {!isAdmin && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
