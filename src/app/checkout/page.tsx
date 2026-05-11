"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, CheckCircle2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";

export default function CheckoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);

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
    const whatsappNumber = "+212635734244";
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
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">السلة ديالك خاوية</h1>
        <Button onClick={() => router.push("/")} className="bg-orange-500">رجع تقدا</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-black text-[#282828] mb-8 text-right">أكد الطلب ديالك ⚡</h1>
      
      <div className="grid lg:grid-cols-3 gap-12 text-right" dir="rtl">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white border border-gray-100 rounded-sm p-6 md:p-8 jumia-shadow">
            <h2 className="text-xl font-bold text-[#282828] mb-6 flex items-center gap-2 justify-start">
              <Truck className="h-5 w-5 text-orange-500" />
              معلومات التوصيل
            </h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-right">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">الاسم الكامل</label>
                  <Input 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="مثال: يوسف العلوي" 
                    className="bg-white border-gray-200 text-[#282828] focus-visible:ring-orange-500 text-right" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">رقم الهاتف</label>
                  <Input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="06XXXXXXXX" 
                    className="bg-white border-gray-200 text-[#282828] focus-visible:ring-orange-500 text-right" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">المدينة</label>
                <Input 
                  required 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="مثال: الدار البيضاء" 
                  className="bg-white border-gray-200 text-[#282828] focus-visible:ring-orange-500 text-right" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">العنوان الكامل</label>
                <Input 
                  required 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="رقم الدار، اسم الشارع، الحي..." 
                  className="bg-white border-gray-200 text-[#282828] focus-visible:ring-orange-500 text-right" 
                />
              </div>
            </form>
          </div>

          <div className="bg-white border border-gray-100 rounded-sm p-6 md:p-8 jumia-shadow">
            <h2 className="text-xl font-bold text-[#282828] mb-6 flex items-center gap-2 justify-start">
              <CheckCircle2 className="h-5 w-5 text-orange-500" />
              طريقة الدفع
            </h2>
            
            <div className="border border-orange-500 bg-orange-500/5 rounded-sm p-6 flex items-center gap-4 cursor-pointer relative">
              <div className="h-6 w-6 rounded-full border-4 border-orange-500 bg-transparent flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              </div>
              <div className="flex-1 mr-4">
                <h3 className="font-bold text-[#282828] text-lg">الدفع عند الاستلام (COD)</h3>
                <p className="text-sm text-gray-400 mt-1">خلص حتى توصلك السلعة وتشوفها بعينيك.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-sm p-6 md:p-8 sticky top-24 jumia-shadow">
            <h2 className="text-xl font-bold text-[#282828] mb-6 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-orange-500" />
              ملخص الطلب
            </h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative h-16 w-16 bg-gray-50 rounded-sm overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 text-right">
                    <h4 className="text-sm font-bold text-[#282828] line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.quantity} x {item.price} DH</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-4 border-y border-gray-100 mb-6">
              <div className="flex justify-between text-gray-500">
                <span className="font-bold text-[#282828]">{getTotal()} DH</span>
                <span>المجموع</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span className="text-green-600 font-bold">مجاني</span>
                <span>توصيل فابور</span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-black text-[#282828] mb-8">
              <span>{getTotal()} DH</span>
              <span>الإجمالي</span>
            </div>

            <Button 
              type="submit" 
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full h-14 bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-black text-lg rounded-sm shadow-sm transition-all"
            >
              {isSubmitting ? "جاري المعالجة..." : "أكد الطلب دابا ⚡"}
            </Button>
            
            <p className="text-[10px] text-center text-gray-400 mt-6 leading-relaxed">
              بالضغط على "أكد الطلب"، فإنك توافق على شروط الخدمة. سنتصل بك في أقل من 24 ساعة لتأكيد الطلب.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}