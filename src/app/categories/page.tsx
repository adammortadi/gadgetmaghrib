"use client";

import Link from "next/link";
import { Headphones, Smartphone, Watch, Laptop, Camera, Speaker, Gamepad2, Tv, ChevronLeft } from "lucide-react";

const CATEGORIES = [
  { name: "الهواتف واللوحات", icon: <Smartphone className="h-7 w-7" />, count: 86 },
  { name: "الساعات الذكية", icon: <Watch className="h-7 w-7" />, count: 54 },
  { name: "سماعات الرأس", icon: <Headphones className="h-7 w-7" />, count: 124 },
  { name: "أجهزة الكمبيوتر", icon: <Laptop className="h-7 w-7" />, count: 42 },
  { name: "كاميرات وتصوير", icon: <Camera className="h-7 w-7" />, count: 38 },
  { name: "تلفزيونات وأجهزة", icon: <Tv className="h-7 w-7" />, count: 31 },
  { name: "ألعاب الفيديو", icon: <Gamepad2 className="h-7 w-7" />, count: 29 },
  { name: "مكبرات الصوت", icon: <Speaker className="h-7 w-7" />, count: 65 },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-6 md:py-16 text-right" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 p-5 md:p-8 mb-6 sm:mb-8 shadow-premium">
          <h1 className="text-2xl md:text-3xl font-black text-neutral-950 mb-2">جميع الأقسام</h1>
          <p className="text-neutral-500 text-xs md:text-sm font-medium">اكتشف أحسن المنتجات والماركات فكل الفئات لي كتقلب عليها.</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link 
              href="/products" 
              key={idx} 
              className="bg-white/70 backdrop-blur-md rounded-2xl border border-neutral-200/50 p-4 sm:p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover hover:bg-white/90 group"
            >
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all duration-300 mb-3 sm:mb-5">
                {cat.icon}
              </div>
              <h3 className="text-base font-extrabold text-neutral-900 mb-1">{cat.name}</h3>
              <p className="text-xs text-neutral-400 font-bold mb-4">{cat.count} منتج</p>
              
              <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ChevronLeft className="h-3 w-3" />
                تصفح الآن
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 sm:mt-16 bg-neutral-900 rounded-3xl p-6 sm:p-8 md:p-12 text-center text-white relative overflow-hidden shadow-premium">
           <div className="absolute top-0 right-0 h-full w-2 bg-indigo-600" />
           <h2 className="text-xl md:text-2xl font-black mb-3 text-white">ما لقيتيش لي كتقلب عليه؟</h2>
           <p className="text-neutral-400 text-xs md:text-sm mb-6 max-w-xl mx-auto leading-relaxed">تواصل معنا دابا عبر الواتساب وغادي نساعدوك نلقاو ليك أحسن منتج بأفضل ثمن فالسوق.</p>
           <a 
            href="https://wa.me/212635734244"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-indigo-700 active:scale-[0.98] transition-all"
           >
            تواصل معنا عبر WhatsApp
           </a>
        </div>

      </div>
    </div>
  );
}