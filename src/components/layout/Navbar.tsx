"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
      {/* Top Banner (Premium minimalist style) */}
      <div className="bg-neutral-950 border-b border-white/10 text-neutral-400 py-2 px-4 text-center text-[10px] md:text-xs font-semibold tracking-wider uppercase">
        ⚡ توصيل سريع فجميع المدن • الدفع عند الاستلام بعد المعاينة ⚡
      </div>

      <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-glass">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Main Header Row */}
          <div className="h-16 md:h-20 relative flex items-center justify-between gap-4">
            
            {/* Left Side (Desktop: Navigation | Mobile: Menu) */}
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-1.5 hover:text-indigo-400 text-white/80 transition-colors"
                aria-label="القائمة"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <nav className="hidden md:flex items-center gap-8">
                 <Link href="/categories" className="text-sm font-semibold text-neutral-300 hover:text-indigo-400 transition-all duration-200">الأقسام</Link>
                 <Link href="/track" className="text-sm font-semibold text-neutral-300 hover:text-indigo-400 transition-all duration-200">تتبع الطلب</Link>
                 <div className="h-4 w-[1px] bg-white/10 mx-1" />
                 <div className="flex items-center gap-4">
                    <a href="https://www.instagram.com/gadgetmaghrib" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-indigo-400 transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                    <a href="https://www.tiktok.com/@gadgetmaghrib" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-indigo-400 transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
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
                className="h-8 md:h-10 w-auto object-contain mix-blend-screen brightness-110" 
                priority
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
                  className="w-60 h-10 bg-white/5 border-white/10 text-white text-xs text-right pr-10 focus-visible:ring-indigo-500 rounded-full group-hover:bg-white/10 transition-all pl-4"
                />
                <Search className="absolute right-3.5 h-4 w-4 text-neutral-400 group-hover:text-indigo-400 transition-colors" />
              </form>

              {/* Mobile Search Icon */}
              <button className="lg:hidden p-1.5 text-white/80 hover:text-indigo-400 transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
                <Search className="h-5 w-5" />
              </button>

              <Link href="/cart" className="flex items-center gap-2 text-white/80 hover:text-indigo-400 transition-colors font-bold text-sm">
                <span className="hidden md:block text-neutral-300 hover:text-indigo-400">السلة</span>
                <div className="relative p-1">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-black animate-fade-in">
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
              className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-neutral-950 border-l border-white/5 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                 <Image src="/logo.png" alt="Logo" width={110} height={35} className="h-7 w-auto mix-blend-screen brightness-110" />
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 hover:text-indigo-400 text-neutral-400 transition-colors">
                    <X className="h-5 w-5" />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 text-right" dir="rtl">
                {/* Search in Mobile Drawer */}
                <form onSubmit={handleSearch} className="mb-6 relative">
                  <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="قلب على المنتج ديالك..."
                    className="w-full h-11 bg-white/5 border-white/10 text-white text-sm text-right pr-10 focus-visible:ring-indigo-500 rounded-xl"
                  />
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                </form>

                <nav className="flex flex-col gap-2">
                  <Link 
                    href="/" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 hover:bg-white/5 hover:text-indigo-400 rounded-xl text-base font-semibold text-neutral-200 flex items-center gap-3 transition-all"
                  >
                     الرئيسية
                  </Link>
                  <Link 
                    href="/categories" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 hover:bg-white/5 hover:text-indigo-400 rounded-xl text-base font-semibold text-neutral-200 flex items-center gap-3 transition-all"
                  >
                     الأقسام
                  </Link>
                  <Link 
                    href="/track" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 hover:bg-white/5 hover:text-indigo-400 rounded-xl text-base font-semibold text-neutral-200 flex items-center gap-3 transition-all"
                  >
                     تتبع طلبك
                  </Link>
                </nav>
              </div>
              
              <div className="p-5 border-t border-white/5 text-center text-xs text-neutral-500">
                Gadget Maghrib • Smart Lifestyle
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

