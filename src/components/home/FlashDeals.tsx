"use client";

import ProductCard from "@/components/product/ProductCard";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { Zap, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FlashDeals() {
  const products = useProductStore((state) => state.products);
  const flashProducts = products.filter(p => 
    p.badge?.toLowerCase().includes("flash") || 
    p.badge?.toLowerCase().includes("deal") ||
    p.badge?.toLowerCase().includes("off")
  ).slice(0, 6);
  
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (flashProducts.length === 0) return null;

  return (
    <section className="bg-white rounded-sm jumia-shadow mb-8 overflow-hidden">
      {/* Jumia Style Red/Orange Header for Flash Sales */}
      <div className="bg-[#e61601] px-4 md:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap justify-center">
           <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-white fill-white" />
              <h2 className="text-white font-bold text-lg uppercase tracking-tight">هميزات اليوم</h2>
           </div>
           
           {/* Timer */}
           <div className="flex items-center gap-2 ml-4">
              <span className="text-white text-xs font-medium">سالي ف:</span>
              <div className="flex items-center gap-1">
                 <span className="bg-white text-[#e61601] font-bold px-1.5 py-0.5 rounded-sm text-sm">{timeLeft.hours.toString().padStart(2, '0')}</span>
                 <span className="text-white font-bold">:</span>
                 <span className="bg-white text-[#e61601] font-bold px-1.5 py-0.5 rounded-sm text-sm">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                 <span className="text-white font-bold">:</span>
                 <span className="bg-white text-[#e61601] font-bold px-1.5 py-0.5 rounded-sm text-sm">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              </div>
           </div>
        </div>

        <Link href="/products">
          <Button variant="ghost" className="text-white hover:bg-white/10 p-0 h-auto font-bold text-xs md:text-sm gap-1 group">
            شوف كولشي
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-x-reverse divide-gray-100">
        {flashProducts.map((product) => (
          <div key={product.id} className="border-b md:border-b-0 border-gray-50">
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
