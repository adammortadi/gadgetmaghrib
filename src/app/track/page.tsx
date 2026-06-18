"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PackageSearch } from "lucide-react";
import { toast } from "sonner";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if(orderId && phone) {
      toast.success("Order #GM-" + orderId + " is currently in transit to your city.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:py-16 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 sm:p-8 md:p-12 text-center">
        
        <div className="h-16 w-16 sm:h-20 sm:w-20 bg-[#ff9800]/10 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <PackageSearch className="h-8 w-8 sm:h-10 sm:w-10 text-[#ff9800]" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">تتبع طلبك</h1>
        <p className="text-gray-400 mb-6 sm:mb-8 text-sm">أدخل رقم الطلب ورقم الهاتف لمعرفة حالة التوصيل.</p>
        
        <form onSubmit={handleTrack} className="space-y-4 text-right" dir="rtl">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">رقم الطلب</label>
            <Input 
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="مثال: 12345" 
              className="h-11 sm:h-12 bg-white/5 border-white/10 text-white focus-visible:ring-[#ff9800] rounded-xl text-right" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">رقم الهاتف</label>
            <Input 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="06XXXXXXXX" 
              className="h-11 sm:h-12 bg-white/5 border-white/10 text-white focus-visible:ring-[#ff9800] rounded-xl text-right" 
            />
          </div>

          <Button type="submit" className="w-full h-12 sm:h-14 bg-[#ff9800] hover:bg-[#e65100] text-black font-bold text-base sm:text-lg rounded-xl mt-4 sm:mt-6 transition-colors active:scale-[0.98]">
            تتبع الطلب
          </Button>
        </form>

      </div>
    </div>
  );
}