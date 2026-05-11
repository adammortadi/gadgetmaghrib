"use client";

import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useProductStore } from "@/store/useProductStore";

export default function FeaturedProducts() {
  const products = useProductStore((state) => state.products);
  const featuredProducts = products.slice(0, 6); // Jumia usually shows more items

  if (products.length === 0) return null;

  return (
    <section className="bg-white rounded-sm jumia-shadow mb-8 overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-100 px-4 md:px-6 py-3 flex items-center justify-between">
        <h2 className="text-sm md:text-lg font-bold text-[#282828] uppercase tracking-tight">منتجات مختارة ليك</h2>
        <Link href="/products">
          <Button variant="ghost" className="text-[#f68b1e] hover:text-[#e67e1a] hover:bg-transparent p-0 h-auto font-bold text-xs md:text-sm gap-1 group">
            شوف كولشي
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-x-reverse divide-gray-100">
        {featuredProducts.map((product) => (
          <div key={product.id} className="border-b md:border-b-0 border-gray-50">
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
