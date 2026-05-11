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
    toast.success("تمت الإضافة إلى السلة!");
  };

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group bg-white rounded-sm jumia-shadow hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden" 
      dir="rtl"
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-2 right-2 z-10 bg-[#f68b1e] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
          {product.badge}
        </span>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-white p-3">
        {discount > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-[#f68b1e]/10 text-[#f68b1e] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
            -{discount}%
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
        />
        
        {/* Quick Add Button (Desktop) */}
        <div className="absolute inset-x-2 bottom-2 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
           <Button 
            onClick={handleAddToCart}
            className="w-full bg-[#f68b1e] hover:bg-[#e67e1a] text-white h-9 text-xs font-bold rounded-sm shadow-lg"
           >
             <ShoppingCart className="h-4 w-4 ml-2" /> أضف للسلة
           </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow border-t border-gray-50">
        {product.isOfficial && (
          <span className="text-[10px] font-bold text-blue-600 mb-1 block">Official Store</span>
        )}
        <h3 className="text-[13px] text-[#282828] font-medium line-clamp-2 leading-tight mb-2 h-8 group-hover:text-[#f68b1e] transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black text-[#282828]">{product.price} DH</span>
            {product.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through">{product.originalPrice} DH</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-[#f68b1e] text-[#f68b1e]" />
              <span className="text-[10px] font-bold text-gray-400">{product.rating} ({product.reviews})</span>
            </div>
            {product.stock !== undefined && product.stock < 5 && product.stock > 0 && (
              <span className="text-[9px] text-red-500 font-bold">باقي غير {product.stock}!</span>
            )}
            {product.stock === 0 && (
              <span className="text-[9px] text-red-500 font-bold">سالا!</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
