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
        <div className="container mx-auto px-4">
          {/* Main Header Row */}
          <div className="h-16 md:h-20 relative flex items-center justify-between gap-4">
            
            {/* Left Side (Desktop: Navigation | Mobile: Menu) */}
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-1 hover:text-[#f68b1e] transition-colors"
              >
                <Menu className="h-6 w-6 text-white" />
              </button>
              
              <nav className="hidden md:flex items-center gap-6">
                 <Link href="/categories" className="text-sm font-bold text-gray-300 hover:text-[#f68b1e] transition-colors">الأقسام</Link>
                 <Link href="/track" className="text-sm font-bold text-gray-300 hover:text-[#f68b1e] transition-colors">تتبع الطلب</Link>
                 <div className="h-4 w-[1px] bg-white/10 mx-1" />
                 <div className="flex items-center gap-4">
                    <a href="https://www.instagram.com/gadgetmaghrib" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f68b1e] transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                    <a href="https://www.tiktok.com/@gadgetmaghrib" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f68b1e] transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                    </a>
                 </div>
              </nav>
            </div>

            {/* Center - Logo */}
            <Link href="/" className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center z-10 p-1">
              <Image 
                src="/logo.png" 
                alt="GADGETMGHRIB" 
                width={140} 
                height={50} 
                className="h-9 md:h-12 w-auto object-contain mix-blend-screen" 
              />
            </Link>

            {/* Right Side (Search & Cart) */}
            <div className="flex items-center justify-end gap-3 md:gap-6 flex-1">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="hidden lg:flex items-center relative group">
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="قلب على المنتج ديالك..."
                  className="w-64 h-10 bg-white/5 border-white/10 text-white text-xs text-right pr-10 focus-visible:ring-[#f68b1e] rounded-full group-hover:bg-white/10 transition-all"
                />
                <Search className="absolute right-3 h-4 w-4 text-gray-400 group-hover:text-[#f68b1e] transition-colors" />
              </form>

              {/* Mobile Search Icon */}
              <button className="lg:hidden p-1 text-white hover:text-[#f68b1e]" onClick={() => setIsMobileMenuOpen(true)}>
                <Search className="h-6 w-6" />
              </button>

              <Link href="/cart" className="flex items-center gap-2 text-white hover:text-[#f68b1e] transition-colors font-bold text-sm">
                <span className="hidden md:block">السلة</span>
                <div className="relative p-1">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#f68b1e] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-black">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

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
