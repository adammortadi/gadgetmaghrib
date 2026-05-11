"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-16 flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff9800]/10 rounded-full blur-[100px] -z-10" />
        
        <div className="h-16 w-16 bg-[#ff9800]/20 rounded-full flex items-center justify-center mb-6">
          <Mail className="h-8 w-8 text-[#ff9800]" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Get 10% Off Your First Order</h2>
        <p className="text-gray-400 max-w-lg mb-8 text-lg">
          Join our newsletter for exclusive tech deals, new arrivals, and special discounts.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-3">
          <Input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 bg-black/50 border-white/20 text-white rounded-xl focus-visible:ring-[#ff9800]"
            required
          />
          <Button type="submit" className="h-12 px-8 bg-[#ff9800] text-black hover:bg-[#e65100] rounded-xl font-semibold">
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-4">We respect your privacy. No spam, ever.</p>
      </motion.div>
    </section>
  );
}
