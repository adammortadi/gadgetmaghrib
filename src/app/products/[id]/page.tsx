"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Truck, Shield, Minus, Plus, ShoppingCart, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import CountdownTimer from "@/components/product/CountdownTimer";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { products } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);
  const setBackgroundOverride = useSettingsStore((state) => state.setBackgroundOverride);

  // Find the product dynamically
  const product = products.find(p => p.id === resolvedParams.id);

  // Set per-product background color
  useEffect(() => {
    if (product?.backgroundColor) {
      setBackgroundOverride(product.backgroundColor);
    }
    return () => setBackgroundOverride(null);
  }, [product, setBackgroundOverride]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#282828] bg-white px-6 py-4 rounded-sm shadow-md">المنتج غير موجود</h2>
          <Link href="/" className="text-white mt-4 inline-block font-bold">الرجوع للرئيسية</Link>
        </div>
      </div>
    );
  }

  // Combine main image and additional images for the gallery
  const allImages = product.images ? [product.image, ...product.images.filter(img => img !== product.image)] : [product.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    addItem({
      id: resolvedParams.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
    toast.success("تمت الإضافة إلى السلة!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen py-6 md:py-10" dir="rtl">
      <div className="container mx-auto px-4">
        
        <div className="bg-white rounded-sm jumia-shadow overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0 md:gap-8 p-4 md:p-8">
            
            {/* Product Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white border border-gray-100 rounded-sm overflow-hidden flex items-center justify-center group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={allImages[currentImageIndex]} 
                      alt={product.name} 
                      fill 
                      className="object-contain p-4 md:p-8" 
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Carousel Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={handleNextImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all z-10"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all z-10"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {product.badge && (
                  <span className="absolute top-4 right-4 bg-[#f68b1e] text-white text-xs font-bold px-3 py-1 rounded-sm z-20">
                    {product.badge}
                  </span>
                )}
              </div>
              
              {/* Image Gallery Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {allImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative h-20 w-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-[#f68b1e] opacity-100' : 'border-gray-100 opacity-60 hover:opacity-100'}`}
                    >
                      <Image src={img} alt={`thumbnail ${idx}`} fill className="object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col mt-6 md:mt-0">
              <div className="mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[#282828] mb-2 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-4 w-4 ${star <= Math.floor(product.rating) ? 'fill-[#f68b1e] text-[#f68b1e]' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-[#f68b1e] font-bold">({product.reviews} مراجعات)</span>
                </div>
              </div>
              
              <div className="py-4 border-y border-gray-100 mb-6">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-black text-[#282828]">{product.price} DH</span>
                  {product.badge?.includes('%') && (
                    <span className="text-lg text-gray-400 line-through mb-1">{Math.round(product.price * 1.3)} DH</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">الضريبة مشمولة • توصيل سريع</p>
              </div>

              {/* Countdown Timer */}
              <div className="mb-8">
                <p className="text-sm font-black text-red-600 mb-2 animate-pulse flex items-center gap-2">
                  <span className="h-2 w-2 bg-red-600 rounded-full"></span>
                  همزة محدودة! ينتهي العرض في:
                </p>
                <CountdownTimer />
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-[#282828] mb-4">الكمية:</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 text-[#282828] transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-[#282828]">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 text-[#282828] transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {product.stock > 0 ? (
                    <p className="text-xs text-gray-400">باقي غير {product.stock} فالمخزون!</p>
                  ) : (
                    <p className="text-xs text-red-500 font-bold">هاد المنتج سالا من المخزون!</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleAddToCart} 
                  className="h-12 bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-bold text-lg rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" /> أضف إلى السلة
                </Button>
                <Button 
                  onClick={handleBuyNow}
                  className="h-12 bg-white border-2 border-[#f68b1e] hover:bg-orange-50 text-[#f68b1e] font-bold text-lg rounded-sm transition-all"
                >
                  اشتري الآن
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-5 w-5 text-[#f68b1e]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#282828]">توصيل سريع</h4>
                    <p className="text-xs text-gray-500">من 2 إلى 3 أيام عمل فجميع المدن.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#282828]">الدفع عند الاستلام</h4>
                    <p className="text-xs text-gray-500">خلص حتى توصلك الأمانة وتفحصها.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}