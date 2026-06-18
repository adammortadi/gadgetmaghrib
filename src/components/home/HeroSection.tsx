"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center pt-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff9800]/10 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-[128px] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center max-w-4xl">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-8 w-full max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#ff9800] animate-pulse"></span>
            <span className="text-sm font-medium text-white/80">جديد التكنولوجيا 2026</span>
          </div>

          <h1 className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.2] text-center">
            عيش <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9800] to-[#ffb74d]">
              تكنولوجيا المستقبل
            </span> <br/>
            دابا.
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-gray-400 leading-relaxed max-w-xl text-center">
            اكتشف أحسن لݣادجيت والأكسيسوارات لي كتحتاج. ديزاين واعر وأداء مجهد.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center w-full sm:w-auto">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 bg-white text-black hover:bg-[#ff9800] hover:text-black rounded-full text-base font-semibold transition-all group">
                <ShoppingBag className="ml-2 h-5 w-5" />
                تقدا دابا
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10 mt-4 w-full max-w-md">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">+10k</p>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">كليان فرحانين</p>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">24h</p>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">توصيل سريع</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


