"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, HeadphonesIcon, CreditCard } from "lucide-react";

const FEATURES = [
  {
    icon: <Truck className="h-6 w-6 text-[#ff9800]" />,
    title: "Fast Delivery",
    description: "Express delivery across all Moroccan cities within 24-48 hours."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-[#ff9800]" />,
    title: "Original Products",
    description: "100% genuine products with official brand warranties."
  },
  {
    icon: <HeadphonesIcon className="h-6 w-6 text-[#ff9800]" />,
    title: "24/7 Support",
    description: "Our dedicated support team is always ready to help you."
  },
  {
    icon: <CreditCard className="h-6 w-6 text-[#ff9800]" />,
    title: "Cash on Delivery",
    description: "Pay securely upon receiving your products."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose GADGETMGHRIB?</h2>
        <p className="text-gray-400">We provide the best shopping experience for tech enthusiasts in Morocco.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors"
          >
            <div className="h-12 w-12 bg-[#ff9800]/10 rounded-xl flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
