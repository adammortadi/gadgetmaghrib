"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Truck, Minus, Plus, ShoppingCart, CheckCircle, ChevronRight, ChevronLeft, ShieldCheck } from "lucide-react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { products, isLoading } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);
  const setBackgroundOverride = useSettingsStore((state) => state.setBackgroundOverride);
  
  // Sticky bar state
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Find the product dynamically
  const product = products.find(p => p.id === resolvedParams.id);
  const allImages = product ? [product.image, ...(product.images || []).filter(img => img !== product.image)] : [];
  const selectedImageIndex = currentImageIndex < allImages.length ? currentImageIndex : 0;

  // Set per-product background color
  useEffect(() => {
    if (product?.backgroundColor) {
      setBackgroundOverride(product.backgroundColor);
    }
    return () => setBackgroundOverride(null);
  }, [product, setBackgroundOverride]);

  // Scroll handler for mobile sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 480) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-md px-8 py-6 rounded-2xl border border-neutral-200/50 shadow-premium">
          <h2 className="text-lg font-bold text-neutral-800">جاري التحميل...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-md px-8 py-6 rounded-2xl border border-neutral-200/50 shadow-premium">
          <h2 className="text-lg font-bold text-neutral-800">المنتج غير موجود</h2>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 mt-4 inline-block font-bold">الرجوع للرئيسية</Link>
        </div>
      </div>
    );
  }

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

  if (product.customHtml) {
    return (
      <div className="min-h-screen bg-white overflow-x-hidden relative" dir="rtl">
        {product.customCss && (
          <style dangerouslySetInnerHTML={{ __html: product.customCss }} />
        )}
        <div dangerouslySetInnerHTML={{ __html: product.customHtml }} />
        
        {/* Floating Cart Button for Custom Landing Pages */}
        <div className="fixed bottom-6 left-6 z-[9999] md:hidden">
           <Button 
            onClick={handleAddToCart}
            className="h-14 w-14 rounded-full bg-indigo-600 text-white shadow-2xl flex items-center justify-center p-0 hover:bg-indigo-700 active:scale-95 transition-all"
           >
             <ShoppingCart className="h-6 w-6" />
           </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-12 bg-neutral-50/50" dir="rtl">
      <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
        
        {/* Main Details Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-neutral-200/50 p-3 sm:p-4 md:p-8 shadow-premium overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            
            {/* Product Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-neutral-100/60 border border-neutral-200/30 rounded-2xl overflow-hidden flex items-center justify-center group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={allImages[selectedImageIndex]}
                      alt={product.name} 
                      fill 
                      className="object-contain p-6 md:p-10" 
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Carousel Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={handleNextImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 p-2.5 rounded-full shadow-premium transition-all z-10 hover:scale-105 active:scale-95"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 p-2.5 rounded-full shadow-premium transition-all z-10 hover:scale-105 active:scale-95"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {product.badge && (
                  <span className="absolute top-4 right-4 bg-neutral-900/90 border border-white/10 text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-md z-20 uppercase">
                    {product.badge}
                  </span>
                )}
              </div>
              
              {/* Image Gallery Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto py-2 pr-1">
                  {allImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImageIndex === idx ? 'border-indigo-600 opacity-100' : 'border-neutral-200/50 opacity-60 hover:opacity-100 hover:border-neutral-300'}`}
                    >
                      <Image src={img} alt={`thumbnail ${idx}`} fill className="object-contain p-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col mt-4 md:mt-0 text-right">
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 mb-3 leading-snug">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 justify-start">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-4 w-4 ${star <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-indigo-600 font-extrabold">({product.reviews} مراجعات زبناء)</span>
                </div>
              </div>
              
              <div className="py-5 border-y border-neutral-100 mb-6">
                <div className="flex items-end gap-3 justify-start">
                  <span className="text-2xl sm:text-3xl font-black text-neutral-950">{product.price} DH</span>
                  {product.badge?.includes('%') && (
                    <span className="text-lg text-neutral-400 line-through mb-1">{Math.round(product.price * 1.3)} DH</span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 mt-1.5 font-medium">الضريبة مشمولة • التوصيل فابور حتى لباب الدار</p>
              </div>

              {/* Countdown Timer */}
              <div className="mb-6">
                <p className="text-xs font-extrabold text-indigo-600 mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 bg-indigo-600 rounded-full animate-ping"></span>
                  همزة محدودة! ينتهي العرض في:
                </p>
                <CountdownTimer />
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-neutral-500 mb-3">الكمية:</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 flex items-center justify-center hover:bg-neutral-100 text-neutral-700 transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-neutral-900 text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                      className="h-10 w-10 flex items-center justify-center hover:bg-neutral-100 text-neutral-700 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {product.stock && product.stock > 0 ? (
                    <p className="text-xs text-neutral-400 font-medium">باقي غير {product.stock} فالمخزون!</p>
                  ) : (
                    <p className="text-xs text-neutral-400 font-medium">متوفر للتوصيل دابا ⚡</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleBuyNow}
                  className="h-12 sm:h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base sm:text-lg rounded-xl shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  اشتري الآن (الدفع عند الاستلام)
                </Button>
                <Button 
                  onClick={handleAddToCart} 
                  className="h-12 sm:h-14 bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-sm sm:text-base rounded-xl transition-all border border-neutral-800 active:scale-[0.98]"
                >
                  <ShoppingCart className="h-5 w-5 ml-2" /> أضف إلى السلة
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-neutral-100">
                <div className="flex items-center gap-3.5 text-right">
                  <div className="h-11 w-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-950">توصيل فابور</h4>
                    <p className="text-xs text-neutral-400 font-medium">من 24 إلى 48 ساعة لجميع مدن المغرب.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 text-right">
                  <div className="h-11 w-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-950">الدفع عند الاستلام</h4>
                    <p className="text-xs text-neutral-400 font-medium font-sans">خلص حتى توصلك الأمانة وتفحصها بعينيك.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Sticky Bottom CTA Mobile Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/60 px-4 py-3 z-50 md:hidden flex items-center justify-between gap-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
            style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
          >
            <div className="text-right">
              <p className="text-[10px] text-neutral-400 font-bold leading-none">السعر الإجمالي</p>
              <p className="text-lg font-black text-neutral-950 mt-1">{product.price} DH</p>
            </div>
            <Button 
              onClick={handleBuyNow} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-6 h-12 rounded-xl flex-1 active:scale-[0.98] transition-all"
            >
              اطلب الآن ⚡
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

