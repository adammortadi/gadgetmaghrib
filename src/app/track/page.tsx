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
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-12 text-center">
        
        <div className="h-20 w-20 bg-[#ff9800]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <PackageSearch className="h-10 w-10 text-[#ff9800]" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Track Your Order</h1>
        <p className="text-gray-400 mb-8">Enter your Order ID and Phone Number to check the delivery status.</p>
        
        <form onSubmit={handleTrack} className="space-y-4 text-left">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Order ID</label>
            <Input 
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. 12345" 
              className="h-12 bg-white/5 border-white/10 text-white focus-visible:ring-[#ff9800] rounded-xl" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Phone Number</label>
            <Input 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+212 6..." 
              className="h-12 bg-white/5 border-white/10 text-white focus-visible:ring-[#ff9800] rounded-xl" 
            />
          </div>

          <Button type="submit" className="w-full h-14 bg-[#ff9800] hover:bg-[#e65100] text-black font-bold text-lg rounded-xl mt-6 transition-colors">
            Track Package
          </Button>
        </form>

      </div>
    </div>
  );
}