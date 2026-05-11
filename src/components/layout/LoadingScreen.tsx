"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Slightly longer for the cool animations to play out
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated Background Aura */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[500px] h-[500px] bg-[#ff9800]/10 rounded-full blur-[120px] -z-10"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo with Glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="relative mb-8"
            >
              <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#ff9800]/20 blur-2xl rounded-full"
              />
              <Image
                src="/logo.png"
                alt="GADGETMGHRIB"
                width={180}
                height={180}
                className="object-contain h-32 w-auto relative z-10"
                priority
              />
            </motion.div>

            {/* Progress Section */}
            <div className="w-64 space-y-4">
              <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff9800] to-[#ffb74d] shadow-[0_0_15px_rgba(255,152,0,0.5)]"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-between items-center px-1"
              >
                <span className="text-[10px] font-bold text-[#ff9800] uppercase tracking-[0.2em]">Initialising</span>
                <motion.span 
                  className="text-[10px] font-mono text-gray-500"
                >
                  GDM.2026
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Branding */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-medium">Smart Tech • Better Life</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
