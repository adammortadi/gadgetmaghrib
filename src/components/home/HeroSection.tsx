"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff9800]/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-8 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#ff9800] animate-pulse"></span>
            <span className="text-sm font-medium text-white/80">جديد التكنولوجيا 2026</span>
          </div>

          <h1 className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            عيش <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9800] to-[#ffb74d]">
              تكنولوجيا المستقبل
            </span> <br/>
            دابا.
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-gray-400 leading-relaxed max-w-lg">
            اكتشف أحسن لݣادجيت والأكسيسوارات لي كتحتاج. ديزاين واعر وأداء مجهد.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-white text-black hover:bg-[#ff9800] hover:text-black rounded-full text-base font-semibold transition-all group">
                <ShoppingBag className="ml-2 h-5 w-5" />
                تقدا دابا
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border-white/20 text-white hover:bg-white/10 rounded-full text-base font-semibold transition-all group">
                شوف الأقسام
                <ArrowRight className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform rotate-180" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10 mt-4">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">+10k</p>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">كليان فرحانين</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">24h</p>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">توصيل سريع</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="relative h-56 sm:h-72 md:h-80 lg:h-[600px] w-full flex items-center justify-center mt-4 lg:mt-0"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent z-10 rounded-3xl" />
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
            alt="Premium Wireless Headphones"
            className="object-cover w-full h-full rounded-3xl opacity-80"
          />
          
          {/* Floating UI Element */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 left-4 lg:top-1/4 lg:-left-12 lg:bottom-auto z-20 bg-black/60 backdrop-blur-xl border border-white/10 p-3 lg:p-4 rounded-2xl flex items-center gap-3 lg:gap-4"
          >
            <div className="h-9 w-9 lg:h-12 lg:w-12 rounded-full bg-[#ff9800]/20 flex items-center justify-center">
              <Star className="h-4 w-4 lg:h-6 lg:w-6 text-[#ff9800] fill-current" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm lg:text-base">Top Rated</p>
              <p className="text-xs lg:text-sm text-gray-400">Premium Audio</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}


