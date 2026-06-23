"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, CheckCircle2, ShoppingBag, Eye, MessageSquareCode, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct WhatsApp message
    const whatsappNumber = "+212747317413";
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const productList = items.map(item => `* ${item.name} (x${item.quantity}) - ${item.price} DH`).join('\n');
    
    const message = `طلب جديد من GADGETMGHRIB ⚡\n\nالاسم: ${formData.name}\nالهاتف: ${formData.phone}\nالمدينة: ${formData.city}\nالعنوان: ${formData.address}\n\nالمنتجات:\n${productList}\n\nعدد المنتجات: ${totalQuantity}\nالإجمالي: ${getTotal()} DH`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم تأكيد الطلب! سيتم توجيهك إلى الواتساب.");
      clearCart();
      window.open(whatsappUrl, '_blank');
      router.push("/");
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md">
        <div className="h-16 w-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-300">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mb-2">السلة ديالك خاوية</h1>
        <p className="text-xs text-neutral-400 mb-6">أضف بعض المنتجات الرائعة إلى سلتك أولاً.</p>
        <Button onClick={() => router.push("/")} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-8 h-12">رجع تقدا</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-black text-neutral-900 mb-8 text-right">أكد الطلب ديالك فثواني ⚡</h1>
      
      <div className="grid lg:grid-cols-12 gap-8 text-right" dir="rtl">
        {/* Checkout Form */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white/80 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-6 md:p-8 shadow-premium">
            <h2 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2 justify-start">
              <Truck className="h-5 w-5 text-indigo-600" />
              معلومات التوصيل
            </h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Floating style label for full name */}
                <div className="space-y-1.5">
                  <label className="text-xs text-neutral-500 font-bold">الاسم الكامل</label>
                  <Input 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="مثال: يوسف العلوي" 
                    className="bg-neutral-50 border-neutral-200/80 rounded-xl h-12 text-sm text-neutral-800 text-right focus-visible:ring-indigo-500 focus-visible:bg-white transition-all pl-4" 
                  />
                </div>
                {/* Phone number */}
                <div className="space-y-1.5">
                  <label className="text-xs text-neutral-500 font-bold">رقم الهاتف</label>
                  <Input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="06XXXXXXXX" 
                    className="bg-neutral-50 border-neutral-200/80 rounded-xl h-12 text-sm text-neutral-800 text-right focus-visible:ring-indigo-500 focus-visible:bg-white transition-all pl-4" 
                  />
                </div>
              </div>
              
              {/* City */}
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-500 font-bold">المدينة</label>
                <Input 
                  required 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="مثال: الدار البيضاء" 
                  className="bg-neutral-50 border-neutral-200/80 rounded-xl h-12 text-sm text-neutral-800 text-right focus-visible:ring-indigo-500 focus-visible:bg-white transition-all pl-4" 
                />
              </div>
              
              {/* Full Address */}
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-500 font-bold">العنوان الكامل</label>
                <Input 
                  required 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="رقم الدار، اسم الشارع، الحي..." 
                  className="bg-neutral-50 border-neutral-200/80 rounded-xl h-12 text-sm text-neutral-800 text-right focus-visible:ring-indigo-500 focus-visible:bg-white transition-all pl-4" 
                />
              </div>
            </form>
          </div>

          {/* Payment Method Block */}
          <div className="bg-white/80 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-6 md:p-8 shadow-premium">
            <h2 className="text-lg font-bold text-neutral-900 mb-5 flex items-center gap-2 justify-start">
              <CheckCircle2 className="h-5 w-5 text-indigo-600" />
              طريقة الدفع
            </h2>
            
            <div className="border border-indigo-600/30 bg-indigo-50/20 rounded-xl p-5 flex items-center gap-4 cursor-pointer relative">
              <div className="h-5 w-5 rounded-full border-2 border-indigo-600 bg-transparent flex items-center justify-center flex-shrink-0">
                <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
              </div>
              <div className="flex-1 mr-3 text-right">
                <h3 className="font-extrabold text-neutral-950 text-sm md:text-base">الدفع عند الاستلام (COD)</h3>
                <p className="text-xs text-neutral-400 mt-1">خلص نقداً فاش يوصلك السلعة وتشوفها بعينيك.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-5">
          <div className="bg-white/80 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-6 md:p-8 sticky top-24 shadow-premium">
            <h2 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2 justify-start">
              <ShoppingBag className="h-5 w-5 text-indigo-600" />
              ملخص الطلب
            </h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center justify-between">
                  <div className="relative h-14 w-14 bg-neutral-100 border border-neutral-200/40 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 text-right mr-3">
                    <h4 className="text-xs font-bold text-neutral-800 line-clamp-1 leading-snug">{item.name}</h4>
                    <p className="text-[10px] text-neutral-400 mt-1 font-bold">{item.quantity} x {item.price} DH</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-4 border-y border-neutral-100 mb-6 text-xs">
              <div className="flex justify-between text-neutral-500 font-bold">
                <span className="text-neutral-900">{getTotal()} DH</span>
                <span>المجموع</span>
              </div>
              <div className="flex justify-between text-neutral-500 font-bold">
                <span className="text-emerald-600 font-black">فابور / مجاني</span>
                <span>الشحن والتوصيل</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-black text-neutral-950 mb-8">
              <span>{getTotal()} DH</span>
              <span>الإجمالي</span>
            </div>

            <Button 
              type="submit" 
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg rounded-xl shadow-lg shadow-indigo-600/10 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? "جاري إرسال الطلب..." : "تأكيد الطلب عبر WhatsApp ⚡"}
            </Button>

            {/* Local Market Trust Badges Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-neutral-100">
              
              <div className="bg-neutral-50/60 border border-neutral-200/30 rounded-xl p-3 text-center space-y-1.5">
                <ShieldCheck className="h-5 w-5 text-indigo-600 mx-auto" />
                <h4 className="text-[10px] font-extrabold text-neutral-900 leading-tight">ضمانة 100%</h4>
                <p className="text-[8px] text-neutral-400 font-bold">فحص الجودة قبل الشحن</p>
              </div>

              <div className="bg-neutral-50/60 border border-neutral-200/30 rounded-xl p-3 text-center space-y-1.5">
                <Eye className="h-5 w-5 text-indigo-600 mx-auto" />
                <h4 className="text-[10px] font-extrabold text-neutral-900 leading-tight">معاينة السلعة</h4>
                <p className="text-[8px] text-neutral-400 font-bold">فحص السلعة قبل الدفع</p>
              </div>

              <div className="bg-neutral-50/60 border border-neutral-200/30 rounded-xl p-3 text-center col-span-2 space-y-1">
                <MessageSquareCode className="h-5 w-5 text-indigo-600 mx-auto" />
                <h4 className="text-[10px] font-extrabold text-neutral-900 leading-tight">دعم فني سريع عبر الواتساب</h4>
                <p className="text-[8px] text-neutral-400 font-bold">فريقنا معك خطوة بخطوة للإجابة على أي تساؤل</p>
              </div>

            </div>
            
            <p className="text-[9px] text-center text-neutral-400 mt-5 leading-relaxed">
              بالضغط على &quot;تأكيد الطلب&quot;، سيتم توجيهك إلى تطبيق WhatsApp لتأكيد الشحن مع الموزع.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
