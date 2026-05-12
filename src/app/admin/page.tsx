"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Settings,
  Clock,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/store/useProductStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

type Tab = "dashboard" | "orders" | "inventory" | "settings";

export default function AdminDashboard() {
  const { products, addProduct, removeProduct } = useProductStore();
  const { orders, updateOrderStatus, removeOrder } = useOrderStore();
  const { settings, updateSettings } = useSettingsStore();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newProduct, setNewProduct] = useState<{
    name: string;
    price: string;
    image: string;
    images: string[];
    badge: string;
    stock: string;
    backgroundColor: string;
    customHtml: string;
    customCss: string;
  }>({
    name: "",
    price: "",
    image: "",
    images: [],
    badge: "",
    stock: "10",
    backgroundColor: "#ffffff",
    customHtml: "",
    customCss: ""
  });

  const [activeTab, setActiveTab] = useState<Tab>("inventory");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "adam" && password === "adamtheg0d") {
      setIsAuthenticated(true);
      toast.success("مرحبا بك، آدم!");
    } else {
      toast.error("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Please fill all fields and add a photo!");
      return;
    }

    addProduct({
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      price: Number(newProduct.price),
      image: newProduct.image,
      images: newProduct.images.length > 0 ? newProduct.images : [newProduct.image],
      rating: 5.0,
      reviews: 0,
      badge: newProduct.badge || undefined,
      stock: Number(newProduct.stock),
      backgroundColor: newProduct.backgroundColor,
      customHtml: newProduct.customHtml || undefined,
      customCss: newProduct.customCss || undefined
    });

    toast.success("Product added successfully!");
    setIsAddModalOpen(false);
    setNewProduct({ name: "", price: "", image: "", images: [], badge: "", stock: "10", backgroundColor: "#ffffff", customHtml: "", customCss: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'html' | 'css') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (type === 'html') setNewProduct(prev => ({ ...prev, customHtml: content }));
        if (type === 'css') setNewProduct(prev => ({ ...prev, customCss: content }));
      };
      reader.readAsText(file);
    }
  };

  const handleUpdateSettings = async (newSettings: any) => {
    await updateSettings(newSettings);
    toast.success("تم تحديث الإعدادات بنجاح! ✨");
  };

  // ... (keeping Auth check if block)

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col lg:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-l border-gray-200 p-6 flex flex-col gap-8 jumia-shadow z-20" dir="rtl">
        <div className="flex items-center gap-2 mb-4">
           <div className="h-10 w-10 bg-[#f68b1e] rounded-xl flex items-center justify-center text-white font-black text-xl">A</div>
           <h2 className="text-xl font-black text-[#282828]">إدارة الموقع</h2>
        </div>

        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab("inventory")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all text-right ${activeTab === 'inventory' ? 'bg-[#f68b1e] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Package className="h-5 w-5" /> المنتجات
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all text-right ${activeTab === 'orders' ? 'bg-[#f68b1e] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <ShoppingCart className="h-5 w-5" /> الطلبات
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all text-right ${activeTab === 'settings' ? 'bg-[#f68b1e] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Settings className="h-5 w-5" /> الإعدادات
          </button>
        </nav>

        <div className="mt-auto border-t border-gray-100 pt-6">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 font-bold transition-all text-right">
            <ArrowRight className="h-5 w-5" /> الخروج للموقع
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10" dir="rtl">
        
        {/* ... (keeping existing Tab content for dashboard, inventory, orders) */}

        {activeTab === "settings" && (
          <div className="max-w-4xl space-y-10">
            <header>
               <h1 className="text-3xl font-black text-[#282828]">تخصيص الواجهة</h1>
               <p className="text-gray-500 mt-1">عدل الألوان والتايمر باش يبان الموقع كيفما بغيتي.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Background Customization */}
              <div className="bg-white p-8 rounded-sm jumia-shadow space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Palette className="h-6 w-6 text-[#f68b1e]" />
                  <h2 className="text-xl font-bold text-[#282828]">خلفية الموقع</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-bold text-gray-700">استخدام صورة الخلفية</span>
                    <button 
                      onClick={() => handleUpdateSettings({ useBackgroundImage: !settings.useBackgroundImage })}
                      className={`w-14 h-8 rounded-full transition-all relative ${settings.useBackgroundImage ? 'bg-[#f68b1e]' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.useBackgroundImage ? 'right-7' : 'right-1'}`} />
                    </button>
                  </div>

                  {!settings.useBackgroundImage && (
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-500">لون الخلفية</label>
                      <div className="flex gap-4">
                        <input 
                          type="color" 
                          value={settings.backgroundColor}
                          onChange={(e) => handleUpdateSettings({ backgroundColor: e.target.value })}
                          className="h-12 w-full rounded-sm cursor-pointer"
                        />
                        <Input 
                          value={settings.backgroundColor}
                          onChange={(e) => handleUpdateSettings({ backgroundColor: e.target.value })}
                          className="w-32 h-12 text-center font-bold font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Timer Customization */}
              <div className="bg-white p-8 rounded-sm jumia-shadow space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-[#f68b1e]" />
                  <h2 className="text-xl font-bold text-[#282828]">مؤقت العرض المحدود</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-bold text-gray-700">إظهار التايمر فالموقع</span>
                    <button 
                      onClick={() => handleUpdateSettings({ showTimer: !settings.showTimer })}
                      className={`w-14 h-8 rounded-full transition-all relative ${settings.showTimer ? 'bg-[#f68b1e]' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.showTimer ? 'right-7' : 'right-1'}`} />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 text-center block">ساعات</label>
                      <Input 
                        type="number"
                        min="0"
                        value={settings.timerHours}
                        onChange={(e) => handleUpdateSettings({ timerHours: parseInt(e.target.value) })}
                        className="h-12 text-center font-black text-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 text-center block">دقائق</label>
                      <Input 
                        type="number"
                        min="0"
                        max="59"
                        value={settings.timerMinutes}
                        onChange={(e) => handleUpdateSettings({ timerMinutes: parseInt(e.target.value) })}
                        className="h-12 text-center font-black text-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 text-center block">ثواني</label>
                      <Input 
                        type="number"
                        min="0"
                        max="59"
                        value={settings.timerSeconds}
                        onChange={(e) => handleUpdateSettings({ timerSeconds: parseInt(e.target.value) })}
                        className="h-12 text-center font-black text-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a192f] p-10 rounded-sm text-center space-y-4 border-r-8 border-[#00d2ff]">
              <h2 className="text-2xl font-black text-white">معاينة التايمر</h2>
              <div className="flex justify-center items-center gap-6" dir="ltr">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-black text-white">{String(settings.timerHours).padStart(2, '0')}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">H</div>
                </div>
                <div className="text-4xl font-black text-[#00d2ff] mb-4">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-black text-white">{String(settings.timerMinutes).padStart(2, '0')}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">M</div>
                </div>
                <div className="text-4xl font-black text-[#00d2ff] mb-4">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-black text-white">{String(settings.timerSeconds).padStart(2, '0')}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">S</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ... (rest of the file remains same) */}
      </main>
    </div>
  );
}</div>
              ) : (
                <div className="bg-white rounded-sm jumia-shadow p-20 text-center">
                  <ShoppingCart className="h-20 w-20 text-gray-100 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-[#282828]">ماكاين حتى طلب دابا</h2>
                  <p className="text-gray-400 mt-2">الطلبات لي غادي يوصلوك غادي يبانو هنا.</p>
                </div>
              )}
           </div>
        )}

        {/* Add Product Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-sm p-8 w-full max-w-md relative z-10 jumia-shadow"
                dir="rtl"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-[#282828]">إضافة منتج</h2>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-red-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest text-[10px]">سمية المنتج</label>
                    <Input 
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="مثال: مضرب كهربائي ذكي" 
                      className="bg-gray-50 border-gray-100 text-[#282828] h-12 text-right font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-500">الثمن (DH)</label>
                     <Input 
                      type="number" 
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="bg-gray-50 border-none focus-visible:ring-[#f68b1e]" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-500">الكمية فالمخزون</label>
                     <Input 
                      type="number" 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      className="bg-gray-50 border-none focus-visible:ring-[#f68b1e]" 
                     />
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-500">لون خلفية صفحة المنتج</label>
                     <div className="flex gap-4">
                        <input 
                          type="color" 
                          value={newProduct.backgroundColor}
                          onChange={(e) => setNewProduct({...newProduct, backgroundColor: e.target.value})}
                          className="h-12 w-full rounded-sm cursor-pointer border border-gray-100"
                        />
                        <Input 
                          value={newProduct.backgroundColor}
                          onChange={(e) => setNewProduct({...newProduct, backgroundColor: e.target.value})}
                          className="w-32 h-12 text-center font-bold font-mono border-gray-100"
                        />
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 block">Custom Landing Page (HTML)</label>
                      <div 
                        onClick={() => document.getElementById('html-upload')?.click()}
                        className={`border-2 border-dashed rounded-sm p-3 text-center cursor-pointer transition-all ${newProduct.customHtml ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-[#f68b1e]'}`}
                      >
                        <input id="html-upload" type="file" accept=".html" className="hidden" onChange={(e) => handleFileChange(e, 'html')} />
                        <span className="text-[10px] font-bold uppercase">{newProduct.customHtml ? '✅ HTML Loaded' : '📁 Upload .html'}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 block">Custom Styles (CSS)</label>
                      <div 
                        onClick={() => document.getElementById('css-upload')?.click()}
                        className={`border-2 border-dashed rounded-sm p-3 text-center cursor-pointer transition-all ${newProduct.customCss ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-[#f68b1e]'}`}
                      >
                        <input id="css-upload" type="file" accept=".css" className="hidden" onChange={(e) => handleFileChange(e, 'css')} />
                        <span className="text-[10px] font-bold uppercase">{newProduct.customCss ? '✅ CSS Loaded' : '📁 Upload .css'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest text-[10px]">تصاور المنتج (تقدر تزيد بزاف)</label>
                    <div 
                      onClick={() => document.getElementById('file-upload-admin')?.click()}
                      className="border-2 border-dashed border-gray-100 rounded-sm p-6 flex flex-col items-center justify-center gap-4 hover:border-[#f68b1e] hover:bg-orange-50/20 transition-all cursor-pointer group"
                    >
                      <input 
                        id="file-upload-admin"
                        type="file" 
                        accept="image/*" 
                        multiple
                        className="hidden" 
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length > 0) {
                            const readAsDataURL = (file: File) => new Promise<string>((resolve) => {
                              const reader = new FileReader();
                              reader.onloadend = () => resolve(reader.result as string);
                              reader.readAsDataURL(file);
                            });
                            
                            const base64Images = await Promise.all(files.map(readAsDataURL));
                            
                            setNewProduct(prev => ({ 
                              ...prev, 
                              image: prev.image || base64Images[0], 
                              images: [...prev.images, ...base64Images]
                            }));
                          }
                        }}
                      />
                      <ImageIcon className="h-10 w-10 text-gray-300 group-hover:text-[#f68b1e]" />
                      <div className="text-center">
                        <p className="text-[#282828] font-bold text-xs uppercase">إضغط هنا لإضافة التصاور</p>
                      </div>
                    </div>
                    {/* Image Previews */}
                    {newProduct.images.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto py-2">
                        {newProduct.images.map((img, idx) => (
                          <div key={idx} className={`h-16 w-16 flex-shrink-0 relative rounded-sm overflow-hidden border-2 ${img === newProduct.image ? 'border-[#f68b1e]' : 'border-gray-200'}`}>
                             <Image src={img} alt={`preview ${idx}`} fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full h-14 bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-black text-lg rounded-sm shadow-lg">
                      حفظ المنتج ⚡
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
