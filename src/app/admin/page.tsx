"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  ShoppingCart, 
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  ArrowRight,
  Settings,
  Clock,
  Palette,
  CheckCircle
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
type SiteSettingsUpdate = Partial<{
  backgroundColor: string;
  useBackgroundImage: boolean;
  timerHours: number;
  timerMinutes: number;
  timerSeconds: number;
  showTimer: boolean;
}>;

export default function AdminDashboard() {
  const { products, addProduct, removeProduct, fetchProducts } = useProductStore();
  const { orders, removeOrder } = useOrderStore();
  const { settings, updateSettings } = useSettingsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
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
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "adam" && password === "adamtheg0d") {
      setIsAuthenticated(true);
      toast.success("مرحبا بك، آدم!");
    } else {
      toast.error("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSavingProduct) return;

    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Please fill all fields and add a photo!");
      return;
    }

    setIsSavingProduct(true);

    try {
      await addProduct({
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
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : typeof error === "object" && error && "message" in error
          ? String((error as { message: unknown }).message)
          : "Please check the product details and try again.";
      toast.error(`Product could not be saved: ${message}`);
    } finally {
      setIsSavingProduct(false);
    }
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

  const handleUpdateSettings = async (newSettings: SiteSettingsUpdate) => {
    await updateSettings(newSettings);
    toast.success("تم تحديث الإعدادات بنجاح! ✨");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-sm jumia-shadow w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-[#282828]">دخول الإدارة</h1>
            <p className="text-gray-500">مرحبا بك آدم، دخل المعلومات باش تكمل.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6" dir="rtl">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">اسم المستخدم</label>
              <Input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 border-gray-100" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">كلمة المرور</label>
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-gray-100" 
              />
            </div>
            <Button type="submit" className="w-full h-12 bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-bold text-lg">
              دخول ⚡
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

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
        
        {activeTab === "inventory" && (
          <div className="space-y-8">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black text-[#282828]">مخزون المنتجات</h1>
                <p className="text-gray-500 mt-1">إدارة السلع ديالك بكل سهولة.</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    setIsCodeMode(false);
                    setIsAddModalOpen(true);
                  }}
                  className="bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-bold h-12 px-6 rounded-sm shadow-lg flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" /> إضافة منتج
                </Button>
                <Button 
                  onClick={() => {
                    setIsCodeMode(true);
                    setIsAddModalOpen(true);
                  }}
                  className="bg-[#0a192f] hover:bg-[#1a293f] text-white font-bold h-12 px-6 rounded-sm shadow-lg flex items-center gap-2"
                >
                  <Palette className="h-5 w-5 text-[#00d2ff]" /> Add by Code 🚀
                </Button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-sm jumia-shadow overflow-hidden group">
                  <div className="relative aspect-square">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-black text-[#282828] shadow-sm">
                      {product.price} DH
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center bg-white">
                    <div>
                      <h3 className="font-bold text-[#282828] line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">المخزون: {product.stock}</p>
                    </div>
                    <button 
                      onClick={() => removeProduct(product.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
           <div className="space-y-8">
             <header>
                <h1 className="text-3xl font-black text-[#282828]">طلبات الزبناء</h1>
                <p className="text-gray-500 mt-1">تتبع كاع الطلبيات لي وصلوك.</p>
             </header>
             
             {orders.length > 0 ? (
               <div className="grid grid-cols-1 gap-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-sm jumia-shadow border-r-4 border-[#f68b1e] flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-black text-[#282828] text-lg">{order.customerName}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                            {order.status === 'Pending' ? 'قيد الانتظار' : 'تم التوصيل'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{order.phone} • {order.address}, {order.city}</p>
                        <div className="flex gap-2 text-xs font-bold text-[#f68b1e] pt-2">
                          {order.items.map((item, i) => (
                            <span key={i} className="bg-orange-50 px-2 py-1 rounded-sm">{item.name} (x{item.quantity})</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 border-t md:border-t-0 md:border-r border-gray-100 pt-4 md:pt-0 md:pr-6">
                        <div className="text-left md:text-right">
                          <p className="text-xs text-gray-400">المجموع</p>
                          <p className="text-xl font-black text-[#282828]">{order.total} DH</p>
                        </div>
                        <button 
                          onClick={() => removeOrder(order.id)}
                          className="bg-gray-50 hover:bg-red-50 text-gray-300 hover:text-red-500 p-3 rounded-sm transition-all"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
               </div>
             ) : (
               <div className="bg-white rounded-sm jumia-shadow p-20 text-center">
                 <ShoppingCart className="h-20 w-20 text-gray-100 mx-auto mb-6" />
                 <h2 className="text-2xl font-bold text-[#282828]">ماكاين حتى طلب دابا</h2>
                 <p className="text-gray-400 mt-2">الطلبات لي غادي يوصلوك غادي يبانو هنا.</p>
               </div>
             )}
           </div>
        )}

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
                className={`bg-white rounded-sm p-8 w-full ${isCodeMode ? 'max-w-4xl' : 'max-w-md'} relative z-10 jumia-shadow max-h-[90vh] overflow-y-auto`}
                dir="rtl"
              >
                <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 pb-4 border-b border-gray-50">
                  <h2 className="text-2xl font-black text-[#282828]">
                    {isCodeMode ? 'إضافة منتج بالكود (Landing Page)' : 'إضافة منتج عادي'}
                  </h2>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-8">
                  
                  {isCodeMode && (
                    <div className="bg-[#0a192f] p-8 rounded-sm space-y-6 border-r-8 border-[#00d2ff] shadow-inner mb-8">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-[#00d2ff] rounded-full flex items-center justify-center">
                           <Palette className="h-6 w-6 text-[#0a192f]" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Custom Code Landing Page</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-[#00d2ff] uppercase">Drag HTML File Here</label>
                          <div 
                            onClick={() => document.getElementById('html-upload')?.click()}
                            className={`border-2 border-dashed rounded-sm p-10 text-center cursor-pointer transition-all flex flex-col items-center gap-3 ${newProduct.customHtml ? 'border-green-500 bg-green-500/10' : 'border-white/20 hover:border-[#00d2ff] bg-white/5'}`}
                          >
                            <input id="html-upload" type="file" accept=".html" className="hidden" onChange={(e) => handleFileChange(e, 'html')} />
                            {newProduct.customHtml ? <CheckCircle className="h-10 w-10 text-green-500" /> : <Plus className="h-10 w-10 text-white/20" />}
                            <span className="text-sm font-bold text-white/80">{newProduct.customHtml ? '✅ HTML LOADED!' : 'UPLOAD .HTML'}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-black text-[#00d2ff] uppercase">Drag CSS File Here</label>
                          <div 
                            onClick={() => document.getElementById('css-upload')?.click()}
                            className={`border-2 border-dashed rounded-sm p-10 text-center cursor-pointer transition-all flex flex-col items-center gap-3 ${newProduct.customCss ? 'border-green-500 bg-green-500/10' : 'border-white/20 hover:border-[#00d2ff] bg-white/5'}`}
                          >
                            <input id="css-upload" type="file" accept=".css" className="hidden" onChange={(e) => handleFileChange(e, 'css')} />
                            {newProduct.customCss ? <CheckCircle className="h-10 w-10 text-green-500" /> : <Plus className="h-10 w-10 text-white/20" />}
                            <span className="text-sm font-bold text-white/80">{newProduct.customCss ? '✅ CSS LOADED!' : 'UPLOAD .CSS'}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400">Gemini can generate these files for you! Just upload them and voila! ✨</p>
                    </div>
                  )}

                  <div className={`grid grid-cols-1 ${isCodeMode ? 'md:grid-cols-2' : ''} gap-8`}>
                    {/* Column 1: Details */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">سمية المنتج</label>
                        <Input 
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          placeholder="مثال: مضرب كهربائي ذكي" 
                          className="bg-gray-50 border-gray-100 text-[#282828] h-12 text-right font-medium"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">الثمن (DH)</label>
                           <Input 
                            type="number" 
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            className="bg-gray-50 border-none h-12 focus-visible:ring-[#f68b1e]" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">الكمية</label>
                           <Input 
                            type="number" 
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                            className="bg-gray-50 border-none h-12 focus-visible:ring-[#f68b1e]" 
                           />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">لون الخلفية (اختياري)</label>
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
                    </div>

                    {/* Column 2: Images */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">تصاور المنتج (ضرورية للعرض)</label>
                        <div 
                          onClick={() => document.getElementById('file-upload-admin')?.click()}
                          className="border-2 border-dashed border-gray-100 rounded-sm p-10 flex flex-col items-center justify-center gap-4 hover:border-[#f68b1e] hover:bg-orange-50/20 transition-all cursor-pointer group"
                        >
                          <input id="file-upload-admin" type="file" accept="image/*" multiple className="hidden" onChange={async (e) => {
                            const files = Array.from(e.target.files || []);
                            if (files.length > 0) {
                              const readAsDataURL = (file: File) => new Promise<string>((resolve) => {
                                const reader = new FileReader();
                                reader.onloadend = () => resolve(reader.result as string);
                                reader.readAsDataURL(file);
                              });
                              const base64Images = await Promise.all(files.map(readAsDataURL));
                              setNewProduct(prev => ({ ...prev, image: prev.image || base64Images[0], images: [...prev.images, ...base64Images] }));
                            }
                          }}/>
                          <ImageIcon className="h-12 w-12 text-gray-200 group-hover:text-[#f68b1e]" />
                          <p className="text-[#282828] font-black text-xs">إضافة التصاور</p>
                        </div>
                        {newProduct.images.length > 0 && (
                          <div className="flex gap-2 overflow-x-auto py-2">
                            {newProduct.images.map((img, idx) => (
                              <div key={idx} className={`h-14 w-14 flex-shrink-0 relative rounded-sm overflow-hidden border-2 ${img === newProduct.image ? 'border-[#f68b1e]' : 'border-gray-200'}`}>
                                 <Image src={img} alt={`preview ${idx}`} fill className="object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 sticky bottom-0 bg-white z-10 py-4 border-t border-gray-50">
                    <Button disabled={isSavingProduct} type="submit" className="w-full h-16 bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-black text-xl rounded-sm shadow-xl flex items-center justify-center gap-3">
                      {isSavingProduct ? "Saving..." : "حفظ المنتج واللانينغ باج ⚡"}
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
