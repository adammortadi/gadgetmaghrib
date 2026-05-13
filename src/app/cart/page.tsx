"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const subtotal = getTotal();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <ShoppingBag className="h-8 w-8 text-[#ff9800]" />
        Your Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.length > 0 ? (
            <div className="space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col sm:flex-row gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 items-center"
                  >
                    <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 bg-white/10">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-semibold text-white line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">Variant: {item.variant || "Standard"}</p>
                      <div className="font-bold text-white mt-2">{item.price} MAD</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-black rounded-full border border-white/10 px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-medium text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="h-10 w-10 rounded-full flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
              <ShoppingBag className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
              <Link href="/products">
                <Button className="bg-[#ff9800] text-black hover:bg-[#e65100]">Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8 sticky top-24">
            <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{subtotal} MAD</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mb-8">
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span>{subtotal} MAD</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Taxes included.</p>
            </div>

            <Link href={items.length > 0 ? "/checkout" : "#"} className="block w-full">
              <Button 
                disabled={items.length === 0}
                className="w-full h-14 bg-[#ff9800] hover:bg-[#e65100] text-black font-bold text-lg rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <div className="mt-6">
              <p className="text-sm text-center text-gray-400 flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Secure Checkout Guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
