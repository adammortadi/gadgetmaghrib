"use client";

import Link from "next/link";
import { Headphones, Smartphone, Watch, Laptop, Camera, Speaker, Gamepad2, Tv, ChevronLeft } from "lucide-react";

const CATEGORIES = [
  { name: "الهواتف واللوحات", icon: <Smartphone className="h-8 w-8" />, count: 86 },
  { name: "الساعات الذكية", icon: <Watch className="h-8 w-8" />, count: 54 },
  { name: "سماعات الرأس", icon: <Headphones className="h-8 w-8" />, count: 124 },
  { name: "أجهزة الكمبيوتر", icon: <Laptop className="h-8 w-8" />, count: 42 },
  { name: "كاميرات وتصوير", icon: <Camera className="h-8 w-8" />, count: 38 },
  { name: "تلفزيونات وأجهزة", icon: <Tv className="h-8 w-8" />, count: 31 },
  { name: "ألعاب الفيديو", icon: <Gamepad2 className="h-8 w-8" />, count: 29 },
  { name: "مكبرات الصوت", icon: <Speaker className="h-8 w-8" />, count: 65 },
];

export default function CategoriesPage() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="bg-white rounded-sm jumia-shadow p-6 mb-8 text-right">
          <h1 className="text-2xl md:text-3xl font-black text-[#282828] mb-2">جميع الأقسام</h1>
          <p className="text-gray-500 text-sm">اكتشف أحسن المنتجات والماركات فكل الفئات لي كتحتاج.</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <Link 
              href="/products" 
              key={idx} 
              className="bg-white rounded-sm jumia-shadow p-6 flex flex-col items-center justify-center text-center transition-all hover:bg-gray-50 group border border-transparent hover:border-[#f68b1e]/20"
            >
              <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:text-[#f68b1e] group-hover:bg-[#f68b1e]/5 transition-colors mb-6">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-[#282828] mb-1">{cat.name}</h3>
              <p className="text-xs text-gray-400 mb-4">{cat.count} منتج</p>
              
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#f68b1e] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="h-3 w-3" />
                تصفح الآن
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#282828] rounded-sm p-8 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 h-full w-2 bg-[#f68b1e]" />
           <h2 className="text-xl md:text-2xl font-bold mb-4">ما لقيتيش لي كتقلب عليه؟</h2>
           <p className="text-gray-400 text-sm mb-6 max-w-xl mx-auto">تواصل معنا دابا عبر الواتساب وغادي نساعدوك نلقاو ليك أحسن منتج بأفضل ثمن فالسوق.</p>
           <a 
            href="https://wa.me/212600000000"
            className="inline-flex items-center gap-2 bg-[#f68b1e] text-white px-8 py-3 rounded-sm font-bold shadow-lg hover:bg-[#e67e1a] transition-all"
           >
            تواصل معنا عبر WhatsApp
           </a>
        </div>

      </div>
    </div>
  );
}