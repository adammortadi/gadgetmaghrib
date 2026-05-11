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
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/store/useProductStore";
import { useOrderStore } from "@/store/useOrderStore";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

type Tab = "dashboard" | "orders" | "inventory";

export default function AdminDashboard() {
  const { products, addProduct, removeProduct } = useProductStore();
  const { orders, updateOrderStatus, removeOrder } = useOrderStore();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [activeTab, setActiveTab] = useState<Tab>("inventory");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [newProduct, setNewProduct] = useState<{
    name: string;
    price: string;
    image: string;
    images: string[];
    badge: string;
    stock: string;
  }>({
    name: "",
    price: "",
    image: "",
    images: [],
    badge: "",
    stock: "10"
  });

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
      stock: Number(newProduct.stock)
    });

    toast.success("Product added successfully!");
    setIsAddModalOpen(false);
    setNewProduct({ name: "", price: "", image: "", images: [], badge: "", stock: "10" });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a192f] p-4" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-sm shadow-2xl w-full max-w-md border-t-4 border-[#00d2ff]"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#0a192f] mb-2">تسجيل الدخول</h1>
            <p className="text-gray-500 text-sm font-bold">لوحة التحكم الخاصة بـ GADGETMGHRIB</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">اسم المستخدم</label>
              <Input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="h-14 bg-gray-50 border-gray-200 text-left font-bold"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">كلمة المرور</label>
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="h-14 bg-gray-50 border-gray-200 text-left font-bold"
                dir="ltr"
              />
            </div>
            <Button type="submit" className="w-full h-14 bg-[#00d2ff] hover:bg-[#00b8e6] text-[#0a192f] font-black text-lg transition-colors">
              دخول
            </Button>
          </form>
          
          <div className="mt-6 text-center">
             <Link href="/" className="text-sm font-bold text-gray-400 hover:text-[#00d2ff] transition-colors">
               الرجوع للموقع
             </Link>
          </div>
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
        </nav>

        <div className="mt-auto border-t border-gray-100 pt-6">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 font-bold transition-all text-right">
            <ArrowRight className="h-5 w-5" /> الخروج للموقع
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10" dir="rtl">
        
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <header className="flex justify-between items-center">
               <h1 className="text-3xl font-black text-[#282828]">الرئيسية</h1>
               <p className="text-gray-500">مرحبا بك مرة أخرى!</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-sm jumia-shadow border-r-4 border-[#f68b1e]">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#f68b1e]">
                        <DollarSign className="h-6 w-6" />
                     </div>
                     <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">إجمالي المبيعات</p>
                        <h3 className="text-2xl font-black text-[#282828]">12,450 DH</h3>
                     </div>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-sm jumia-shadow border-r-4 border-green-500">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
                        <ShoppingCart className="h-6 w-6" />
                     </div>
                     <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">الطلبات الجديدة</p>
                        <h3 className="text-2xl font-black text-[#282828]">24 طلب</h3>
                     </div>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-sm jumia-shadow border-r-4 border-blue-500">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                        <Users className="h-6 w-6" />
                     </div>
                     <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">الزوار اليوم</p>
                        <h3 className="text-2xl font-black text-[#282828]">1,280 زائر</h3>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-sm jumia-shadow text-center">
               <TrendingUp className="h-16 w-16 text-gray-200 mx-auto mb-4" />
               <h2 className="text-xl font-bold text-[#282828]">مبيعاتك فارتفاع! 📈</h2>
               <p className="text-gray-500 mt-2">مقارنة مع البارح، المبيعات ديالك زادت ب 15%.</p>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <h1 className="text-3xl font-black text-[#282828]">إدارة المنتجات</h1>
                  <p className="text-gray-500 mt-1">تقدر تزيد أو تمسح المنتجات من الموقع.</p>
               </div>
               <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-bold h-12 px-8 rounded-sm shadow-lg"
               >
                 <Plus className="ml-2 h-5 w-5" /> إضافة منتج جديد
               </Button>
            </header>

            <div className="bg-white rounded-sm jumia-shadow overflow-hidden">
               <table className="w-full text-right">
                  <thead className="bg-gray-50 border-b border-gray-100">
                     <tr className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                        <th className="p-6">المنتج</th>
                        <th className="p-6 text-center">الثمن</th>
                        <th className="p-6 text-center">Badge</th>
                        <th className="p-6 text-left">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {products.map((product) => (
                       <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-6">
                             <div className="flex items-center gap-4">
                                <div className="h-14 w-14 bg-gray-50 rounded-lg relative overflow-hidden flex-shrink-0">
                                   <Image src={product.image} alt={product.name} fill className="object-cover" />
                                </div>
                                <span className="font-bold text-[#282828] line-clamp-1">{product.name}</span>
                             </div>
                          </td>
                          <td className="p-6 text-center font-bold text-[#282828]">{product.price} DH</td>
                          <td className="p-6 text-center">
                             {product.badge && (
                               <span className="bg-orange-50 text-[#f68b1e] px-3 py-1 rounded-full text-[10px] font-bold uppercase">{product.badge}</span>
                             )}
                          </td>
                          <td className="p-6 text-left">
                             <button 
                              onClick={() => removeProduct(product.id)}
                              className="h-10 w-10 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all mx-auto lg:ml-0"
                             >
                                <Trash2 className="h-5 w-5" />
                             </button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
           <div className="space-y-6">
              <header>
                 <h1 className="text-3xl font-black text-[#282828]">الطلبات ({orders.length})</h1>
                 <p className="text-gray-500 mt-1">هنا كاع الطلبات لي جاوك من الزبناء.</p>
              </header>

              {orders.length > 0 ? (
                <div className="bg-white rounded-sm jumia-shadow overflow-hidden">
                  <table className="w-full text-right">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                        <th className="p-6">الطلب</th>
                        <th className="p-6">الزبون</th>
                        <th className="p-6 text-center">الإجمالي</th>
                        <th className="p-6 text-center">الحالة</th>
                        <th className="p-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-6">
                             <span className="font-bold text-[#f68b1e]">{order.id}</span>
                             <p className="text-[10px] text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString('ar-MA')}</p>
                          </td>
                          <td className="p-6">
                             <p className="font-bold text-[#282828]">{order.customerName}</p>
                             <p className="text-xs text-gray-500">{order.phone} • {order.city}</p>
                          </td>
                          <td className="p-6 text-center font-bold text-[#282828]">{order.total} DH</td>
                          <td className="p-6 text-center">
                             <select 
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                              className={`text-[10px] font-bold px-2 py-1 rounded-full border-none focus:ring-0 cursor-pointer ${
                                order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                                order.status === 'Confirmed' ? 'bg-orange-50 text-orange-600' :
                                'bg-gray-50 text-gray-600'
                              }`}
                             >
                                <option value="Pending">قيد الانتظار</option>
                                <option value="Confirmed">تم التأكيد</option>
                                <option value="Shipped">تم الشحن</option>
                                <option value="Delivered">تم التوصيل</option>
                             </select>
                          </td>
                          <td className="p-6 text-left">
                             <button 
                              onClick={() => removeOrder(order.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors"
                             >
                                <Trash2 className="h-5 w-5" />
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
