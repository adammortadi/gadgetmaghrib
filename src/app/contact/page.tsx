"use client";
import React from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم إرسال رسالتك بنجاح! غادي نجاوبوك فدقيقة.");
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl" dir="rtl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">تواصل معانا</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          عندك شي سؤال أو محتاج مساعدة؟ فريق الدعم ديالنا هنا باش يجاوبك على كاع الاستفسارات ديالك بخصوص المنتجات أو الطلبيات.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 flex items-start gap-6 jumia-shadow">
            <div className="h-14 w-14 bg-[#f68b1e]/10 rounded-sm flex items-center justify-center shrink-0">
              <MapPin className="h-6 w-6 text-[#f68b1e]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">المقر ديالنا</h3>
              <p className="text-gray-400 leading-relaxed">
                حي المعاريف، شارع التكنولوجيا<br />
                الدار البيضاء، المغرب<br />
                20000
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 flex items-start gap-6 jumia-shadow">
            <div className="h-14 w-14 bg-[#f68b1e]/10 rounded-sm flex items-center justify-center shrink-0">
              <Phone className="h-6 w-6 text-[#f68b1e]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">الهاتف والبريد</h3>
              <p className="text-gray-400 leading-relaxed mb-1">+212 635-734244</p>
              <p className="text-[#f68b1e]">support@gadgetmghrib.com</p>
            </div>
          </div>

          <div className="bg-[#f68b1e] rounded-sm p-8 flex items-center justify-between text-[#0a192f] jumia-shadow group cursor-pointer">
             <div className="space-y-1">
                <h3 className="text-xl font-black">دعم فوري عبر الواتساب</h3>
                <p className="text-sm font-bold opacity-80">نجاوبوك فقل من 5 دقائق ⚡</p>
             </div>
             <a href="https://wa.me/212635734244" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-10 w-10 fill-[#0a192f] group-hover:scale-110 transition-transform" />
             </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-sm p-8 md:p-12 jumia-shadow">
          <h2 className="text-2xl font-bold text-[#282828] mb-8">صيفط لينا رسالة</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-right">
                <label className="text-sm font-bold text-gray-400">الاسم الشخصي</label>
                <Input required placeholder="مثال: يوسف" className="h-12 border-gray-100 text-[#282828] focus-visible:ring-[#f68b1e] text-right" />
              </div>
              <div className="space-y-2 text-right">
                <label className="text-sm font-bold text-gray-400">الاسم العائلي</label>
                <Input required placeholder="مثال: العلوي" className="h-12 border-gray-100 text-[#282828] focus-visible:ring-[#f68b1e] text-right" />
              </div>
            </div>
            
            <div className="space-y-2 text-right">
              <label className="text-sm font-bold text-gray-400">البريد الإلكتروني</label>
              <Input required type="email" placeholder="youssef@example.com" className="h-12 border-gray-100 text-[#282828] focus-visible:ring-[#f68b1e] text-right" />
            </div>

            <div className="space-y-2 text-right">
              <label className="text-sm font-bold text-gray-400">الموضوع</label>
              <Input required placeholder="شنو بغيتي تعرف؟" className="h-12 border-gray-100 text-[#282828] focus-visible:ring-[#f68b1e] text-right" />
            </div>

            <div className="space-y-2 text-right">
              <label className="text-sm font-bold text-gray-400">الرسالة</label>
              <textarea 
                required 
                rows={5} 
                placeholder="كتب الرسالة ديالك هنا..." 
                className="w-full p-4 border border-gray-100 text-[#282828] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f68b1e] rounded-sm resize-none text-right"
              ></textarea>
            </div>

            <Button type="submit" className="w-full h-14 bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-black text-lg rounded-sm transition-all shadow-lg">
              صيفط الرسالة دابا
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}