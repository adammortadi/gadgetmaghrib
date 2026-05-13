"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const REVIEWS = [
  {
    id: 1,
    name: "Youssef T.",
    role: "Tech Reviewer",
    content: "The best tech store in Morocco! Delivery was incredibly fast to Marrakech, and the quality of the products is exactly as described.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Amina L.",
    role: "Verified Buyer",
    content: "Customer service is top-notch. I had an issue with my order and they resolved it within minutes. The AirPods I got are 100% authentic.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Karim M.",
    role: "Verified Buyer",
    content: "I love the COD option. It makes buying expensive gadgets so much more trustworthy. Highly recommend Gadget M Ghrib.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-[#0a0a0a] py-20 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Thousands</h2>
          <p className="text-gray-400">See what our customers have to say about their experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black border border-white/5 p-8 rounded-3xl relative"
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#ff9800] fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-base leading-relaxed mb-8 italic">
                "{review.content}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <Image 
                  src={review.image} 
                  alt={review.name} 
                  width={48} 
                  height={48} 
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
