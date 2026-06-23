"use client";

import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  isOfficial?: boolean;
  stock?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    // TikTok Pixel - AddToCart event
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track('AddToCart', {
        content_id: product.id,
        content_name: product.name,
        content_type: 'product',
        currency: 'MAD',
        value: product.price,
        quantity: 1,
      });
    }
    toast.success("تمت الإضافة إلى السلة!");
  };

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group bg-white/70 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-premium hover:shadow-premium-hover hover:border-neutral-300/80 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden" 
      dir="rtl"
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3 right-3 z-10 bg-neutral-900/90 text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-md border border-white/10 uppercase">
          {product.badge}
        </span>
      )}


      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100/60 p-4 m-2 rounded-xl">
        {discount > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-indigo-50 text-indigo-600 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border border-indigo-100">
            -{discount}%
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500 p-3"
        />
        
        {/* Quick Add Button (Desktop) - Sleek Matte Black */}
        <div className="absolute inset-x-3 bottom-3 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
           <Button 
            onClick={handleAddToCart}
            className="w-full bg-neutral-950 hover:bg-neutral-900 text-white h-9 text-xs font-bold rounded-lg shadow-sm border border-neutral-800 active:scale-[0.97]"
           >
             <ShoppingCart className="h-3.5 w-3.5 ml-1.5" /> أضف للسلة
           </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        {product.isOfficial && (
          <span className="text-[9px] font-bold tracking-wider text-indigo-600 uppercase mb-1 block">Official Store</span>
        )}
        <h3 className="text-xs text-neutral-800 font-bold line-clamp-2 leading-snug mb-2 h-9 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black text-neutral-950">{product.price} DH</span>
            {product.originalPrice && (
              <span className="text-[10px] text-neutral-400 line-through">{product.originalPrice} DH</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-[10px] font-bold text-neutral-500">{product.rating} ({product.reviews})</span>
            </div>
            {product.stock !== undefined && product.stock < 5 && product.stock > 0 && (
              <span className="text-[9px] text-red-500 font-bold">باقي غير {product.stock}!</span>
            )}
            {product.stock === 0 && (
              <span className="text-[9px] text-neutral-500 font-bold">سالا!</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

