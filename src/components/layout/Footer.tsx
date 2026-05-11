import Image from "next/image";
import Link from "next/link";
import { Smartphone, Headphones, Watch, Wifi } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#0a192f] text-white py-12 border-t-4 border-[#00d2ff]">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side - Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="GadgetMaghrib" 
              width={250} 
              height={100} 
              className="w-48 md:w-64 h-auto object-contain mix-blend-screen" 
            />
          </Link>
        </div>

        {/* Right Side - Community & Categories */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start gap-8">
          
          <div className="space-y-4 w-full text-center">
            <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider">
              Rejoignez Notre Communauté Gadget
            </h2>
            
            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap">
              <a href="https://wa.me/212635734244" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:scale-105 transition-transform">
                <div className="h-10 w-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <span className="font-bold text-sm md:text-base text-white">WHATSAPP</span>
              </a>

              <a href="https://www.instagram.com/gadgetmaghrib?igsh=MWR2d3BmeWl6YWQ1cw==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:scale-105 transition-transform">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
                <span className="font-bold text-sm md:text-base text-white">INSTAGRAM</span>
              </a>
              
              <a href="https://www.tiktok.com/@gadgetmaghrib?_r=1&_t=ZS-96G0qSDoKKi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:scale-105 transition-transform">
                <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center border border-white/20 shadow-lg shadow-black/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                </div>
                <span className="font-bold text-sm md:text-base text-white">TIKTOK</span>
              </a>
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-6 border-t border-white/10 text-center">
            <Link href="/" className="flex flex-col items-center gap-3 group">
              <Smartphone className="h-10 w-10 text-[#00d2ff] group-hover:scale-110 transition-transform" />
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300">Accessoires<br/>Smartphone</p>
            </Link>
            <Link href="/" className="flex flex-col items-center gap-3 group">
              <Headphones className="h-10 w-10 text-[#00d2ff] group-hover:scale-110 transition-transform" />
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300">Écouteurs<br/>et Audio</p>
            </Link>
            <Link href="/" className="flex flex-col items-center gap-3 group">
              <Watch className="h-10 w-10 text-[#00d2ff] group-hover:scale-110 transition-transform" />
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300">Smartwatches</p>
            </Link>
            <Link href="/" className="flex flex-col items-center gap-3 group">
              <Wifi className="h-10 w-10 text-[#00d2ff] group-hover:scale-110 transition-transform" />
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-300">Objets<br/>Connectés</p>
            </Link>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 bg-black/40 text-center py-4 border-t border-white/5">
        <p className="text-white/50 text-xs font-medium tracking-widest uppercase">
          © {new Date().getFullYear()} Gadget Maghrib. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
