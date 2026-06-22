import Image from "next/image";
import Link from "next/link";
import { Smartphone, Headphones, Watch, Wifi } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-zinc-950 text-white border-t border-white/5 relative overflow-hidden" dir="rtl">
      {/* Decorative subtle aura */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-950/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-10 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 relative z-10">
        
        {/* Left Side - Logo & Navigation */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-3 sm:gap-4 w-full md:w-auto">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="GadgetMaghrib" 
              width={220} 
              height={80} 
              className="w-40 md:w-48 h-auto object-contain mix-blend-screen brightness-110" 
            />
          </Link>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 sm:gap-x-6 gap-y-2 mt-2 sm:mt-4 text-[10px] md:text-xs text-neutral-400 font-semibold tracking-wider">
            <Link href="/" className="hover:text-indigo-400 transition-colors">Accueil</Link>
            <Link href="/products" className="hover:text-indigo-400 transition-colors">Boutique</Link>
            <Link href="/categories" className="hover:text-indigo-400 transition-colors">Catégories</Link>
            <Link href="/track" className="hover:text-indigo-400 transition-colors">Suivre ma commande</Link>
            <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
            <Link href="/terms" className="hover:text-indigo-400 transition-colors">Conditions d&apos;utilisation</Link>
            <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Politique de confidentialité</Link>
          </div>
        </div>

        {/* Right Side - Community & Categories */}
        <div className="flex-1 text-center md:text-right flex flex-col items-center md:items-end gap-6 sm:gap-8 w-full">
          
          <div className="space-y-3 sm:space-y-4 w-full text-center md:text-right">
            <h2 className="text-xl md:text-2xl font-black text-neutral-100 tracking-wide">
              انضم إلى مجتمعنا التقني
            </h2>
            
            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 md:gap-6 flex-wrap">
              <a href="https://wa.me/212635734244" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:scale-105 transition-all group">
                <div className="h-9 w-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#25D366] group-hover:text-white transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <span className="font-bold text-xs md:text-sm text-neutral-300 group-hover:text-white transition-colors">WHATSAPP</span>
              </a>

              <a href="https://www.instagram.com/gadgetmaghrib" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:scale-105 transition-all group">
                <div className="h-9 w-9 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-pink-500 group-hover:text-white transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
                <span className="font-bold text-xs md:text-sm text-neutral-300 group-hover:text-white transition-colors">INSTAGRAM</span>
              </a>
              
              <a href="https://www.tiktok.com/@gadgetmaghrib" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:scale-105 transition-all group">
                <div className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white group-hover:text-black transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                </div>
                <span className="font-bold text-xs md:text-sm text-neutral-300 group-hover:text-white transition-colors">TIKTOK</span>
              </a>
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full pt-5 sm:pt-6 border-t border-white/5 text-center">
            <Link href="/products" className="flex flex-col items-center gap-2.5 group">
              <Smartphone className="h-6 w-6 text-neutral-400 group-hover:text-indigo-400 group-hover:scale-110 transition-all" />
              <p className="text-[10px] md:text-xs font-semibold text-neutral-300 group-hover:text-indigo-400 leading-tight">Accessoires<br/>Smartphone</p>
            </Link>
            <Link href="/products" className="flex flex-col items-center gap-2.5 group">
              <Headphones className="h-6 w-6 text-neutral-400 group-hover:text-indigo-400 group-hover:scale-110 transition-all" />
              <p className="text-[10px] md:text-xs font-semibold text-neutral-300 group-hover:text-indigo-400 leading-tight">Écouteurs<br/>et Audio</p>
            </Link>
            <Link href="/products" className="flex flex-col items-center gap-2.5 group">
              <Watch className="h-6 w-6 text-neutral-400 group-hover:text-indigo-400 group-hover:scale-110 transition-all" />
              <p className="text-[10px] md:text-xs font-semibold text-neutral-300 group-hover:text-indigo-400 leading-tight">Smartwatches</p>
            </Link>
            <Link href="/products" className="flex flex-col items-center gap-2.5 group">
              <Wifi className="h-6 w-6 text-neutral-400 group-hover:text-indigo-400 group-hover:scale-110 transition-all" />
              <p className="text-[10px] md:text-xs font-semibold text-neutral-300 group-hover:text-indigo-400 leading-tight">Objets<br/>Connectés</p>
            </Link>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-zinc-950/80 text-center py-4 border-t border-white/5">
        <p className="text-neutral-500 text-[10px] md:text-xs font-semibold tracking-wider uppercase">
          © {new Date().getFullYear()} Gadget Maghrib. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
