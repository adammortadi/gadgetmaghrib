"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Search, User, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const cartCount = useCartStore((state) => state.getItemCount());
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Top Banner (Optional Jumia style) */}
      <div className="bg-[#f68b1e] text-white py-1.5 px-4 text-center text-[10px] md:text-xs font-medium relative">
        📦 توصيل سريع فجميع المدن • جودة مضمونة %100 📦
      </div>

      <header className="sticky top-0 z-50 w-full bg-black border-b border-white/5 shadow-xl">
        <div className="container mx-auto px-4 h-16 md:h-20 relative flex items-center justify-between">
          
          {/* Right Side (Start in RTL) - Socials & Menu Toggle */}
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
            <div className="hidden md:flex items-center gap-4">
               <a href="https://www.instagram.com/gadgetmaghrib?igsh=MWR2d3BmeWl6YWQ1cw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f68b1e] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
               </a>
               <a href="https://www.tiktok.com/@gadgetmaghrib?_r=1&_t=ZS-96G0qSDoKKi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f68b1e] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
               </a>
            </div>
          </div>

          {/* Center - Absolute Logo */}
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-10 p-1">
            <Image 
              src="/logo.png" 
              alt="GADGETMGHRIB" 
              width={140} 
              height={50} 
              className="h-10 md:h-12 w-auto object-contain mix-blend-screen" 
            />
          </Link>

          {/* Left Side (End in RTL) - Cart */}
          <div className="flex items-center justify-end flex-1">
            <Link href="/cart" className="flex items-center gap-2 text-white hover:text-[#f68b1e] transition-colors font-bold text-sm">
              <span className="hidden md:block">السلة</span>
              <div className="relative p-1 md:p-0">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-[#f68b1e] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#0a0a0a]">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar Removed */}

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-[60]"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                   <Image src="/logo.png" alt="Logo" width={100} height={30} className="h-8 w-auto" />
                   <button onClick={() => setIsMobileMenuOpen(false)} className="p-1">
                      <X className="h-6 w-6 text-gray-400" />
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <nav className="flex flex-col gap-1">
                    <Link href="/" className="py-3 px-4 hover:bg-gray-50 rounded-lg text-sm font-bold text-[#282828] flex items-center gap-3">
                       الرئيسية
                    </Link>
                    <Link href="/categories" className="py-3 px-4 hover:bg-gray-50 rounded-lg text-sm font-bold text-[#282828] flex items-center gap-3">
                       الأقسام
                    </Link>
                    <Link href="/track" className="py-3 px-4 hover:bg-gray-50 rounded-lg text-sm font-bold text-[#282828] flex items-center gap-3">
                       تتبع طلبك
                    </Link>
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
