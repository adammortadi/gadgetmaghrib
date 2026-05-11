"use client";

import React from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { useProductStore } from "@/store/useProductStore";

export default function Home() {
  const { products } = useProductStore();

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Banner Section */}
        <div className="w-full rounded-sm overflow-hidden jumia-shadow mb-8 md:mb-12">
          <Image 
            src="/banner.png" 
            alt="GadgetMaghrib Banner" 
            width={1200} 
            height={400} 
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Centered 3x3 Marketplace Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-sm jumia-shadow border border-gray-100">
               <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-10 w-10 text-gray-200" />
               </div>
               <h2 className="text-xl font-bold text-[#282828]">المتجر خاوي دابا</h2>
               <p className="text-gray-400 mt-2">زيد المنتجات من لوحة التحكم باش يبانو هنا.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}