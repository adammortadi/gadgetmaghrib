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
  LayoutDashboard,
  TrendingUp,
  AlertTriangle,
  Search,
  Edit2,
  Check,
  User,
  MapPin,
  Phone,
  Eye,
  FileCode2,
  DollarSign,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProductStore, Product } from "@/store/useProductStore";
import { useOrderStore, Order } from "@/store/useOrderStore";
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
  const { products, addProduct, removeProduct, updateProduct, fetchProducts } = useProductStore();
  const { orders, addOrder, updateOrderStatus, removeOrder } = useOrderStore();
  const { settings, updateSettings } = useSettingsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Product Form State
  const [productForm, setProductForm] = useState<{
    name: string;
    price: string;
    badge: string;
    stock: string;
    backgroundColor: string;
    image: string;
    images: string[];
    rating: string;
    reviews: string;
    customHtml: string;
    customCss: string;
  }>({
    name: "",
    price: "",
    badge: "",
    stock: "10",
    backgroundColor: "#ffffff",
    image: "",
    images: [],
    rating: "5.0",
    reviews: "0",
    customHtml: "",
    customCss: ""
  });

  // Manual Order Form State
  const [orderForm, setOrderForm] = useState<{
    customerName: string;
    phone: string;
    city: string;
    address: string;
    selectedItems: { productId: string; quantity: number }[];
  }>({
    customerName: "",
    phone: "",
    city: "",
    address: "",
    selectedItems: []
  });

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  // Search & Filter States
  const [searchProductQuery, setSearchProductQuery] = useState("");
  const [productStockFilter, setProductStockFilter] = useState<"all" | "in_stock" | "low_stock" | "out_of_stock">("all");
  const [searchOrderQuery, setSearchOrderQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<"all" | "Pending" | "Confirmed" | "Shipped" | "Delivered">("all");

  // Collapsible Advanced Settings in Form
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "adam" && password === "adamtheg0d") {
      setIsAuthenticated(true);
      toast.success("مرحبا بك، آدم! ✨");
    } else {
      toast.error("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  const openAddModal = () => {
    setEditingProductId(null);
    setProductForm({
      name: "",
      price: "",
      badge: "",
      stock: "10",
      backgroundColor: "#ffffff",
      image: "",
      images: [],
      rating: "5.0",
      reviews: "0",
      customHtml: "",
      customCss: ""
    });
    setIsAdvancedOpen(false);
    setIsAddModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      price: String(product.price),
      badge: product.badge || "",
      stock: String(product.stock ?? 10),
      backgroundColor: product.backgroundColor || "#ffffff",
      image: product.image || "",
      images: product.images || [],
      rating: String(product.rating ?? 5.0),
      reviews: String(product.reviews ?? 0),
      customHtml: product.customHtml || "",
      customCss: product.customCss || ""
    });
    setIsAdvancedOpen(!!(product.customHtml || product.customCss));
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSavingProduct) return;

    if (!productForm.name || !productForm.price || !productForm.image) {
      toast.error("يرجى إدخال اسم المنتج والثمن والصورة الرئيسية!");
      return;
    }

    setIsSavingProduct(true);

    const productPayload: Product = {
      id: editingProductId || Math.random().toString(36).substring(2, 11),
      name: productForm.name,
      price: Number(productForm.price) || 0,
      image: productForm.image,
      images: productForm.images.length > 0 ? productForm.images : [productForm.image],
      rating: Number(productForm.rating) || 5.0,
      reviews: Number(productForm.reviews) || 0,
      badge: productForm.badge || undefined,
      stock: Number(productForm.stock) || 0,
      backgroundColor: productForm.backgroundColor,
      customHtml: productForm.customHtml || undefined,
      customCss: productForm.customCss || undefined
    };

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, productPayload);
        toast.success("تم تحديث المنتج بنجاح! ⚡");
      } else {
        await addProduct(productPayload);
        toast.success("تم إضافة المنتج بنجاح! ⚡");
      }
      setIsAddModalOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "يرجى التحقق من المدخلات والمحاولة لاحقاً.";
      toast.error(`خطأ أثناء الحفظ: ${message}`);
    } finally {
      setIsSavingProduct(false);
    }
  };

  // Add Manual Order
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSavingOrder) return;

    if (!orderForm.customerName || !orderForm.phone || !orderForm.city || orderForm.selectedItems.length === 0) {
      toast.error("يرجى ملء جميع الحقول واختيار منتج واحد على الأقل!");
      return;
    }

    setIsSavingOrder(true);

    try {
      // Build order items with full details
      const itemsList = orderForm.selectedItems.map(item => {
        const prod = products.find(p => p.id === item.productId);
        return {
          id: item.productId,
          name: prod?.name || "منتج غير معروف",
          price: prod?.price || 0,
          quantity: item.quantity,
          image: prod?.image || "/logo.png"
        };
      });

      const orderTotal = itemsList.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const newManualOrder: Order = {
        id: 'ord-' + Math.random().toString(36).substring(2, 9),
        customerName: orderForm.customerName,
        phone: orderForm.phone,
        city: orderForm.city,
        address: orderForm.address,
        items: itemsList,
        total: orderTotal,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      // Add order to state
      addOrder(newManualOrder);

      // Deduct stock from products
      orderForm.selectedItems.forEach(async (item) => {
        const prod = products.find(p => p.id === item.productId);
        if (prod) {
          const currentStock = prod.stock ?? 0;
          await updateProduct(item.productId, {
            stock: Math.max(0, currentStock - item.quantity)
          });
        }
      });

      toast.success("تم تسجيل الطلب وتحديث المخزون بنجاح! ⚡");
      setIsAddOrderModalOpen(false);
      setOrderForm({
        customerName: "",
        phone: "",
        city: "",
        address: "",
        selectedItems: []
      });
    } catch (err) {
      toast.error("حدث خطأ أثناء حفظ الطلب.");
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handleUpdateSettings = async (newSettings: SiteSettingsUpdate) => {
    await updateSettings(newSettings);
    toast.success("تم تحديث الإعدادات بنجاح! ✨");
  };

  // Dashboard Stats Calculations
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const lowStockProducts = products.filter(p => (p.stock ?? 0) <= 5);

  // Filters logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchProductQuery.toLowerCase()) || 
                          (p.badge && p.badge.toLowerCase().includes(searchProductQuery.toLowerCase()));
    
    const stockVal = p.stock ?? 0;
    if (productStockFilter === "out_of_stock") return matchesSearch && stockVal === 0;
    if (productStockFilter === "low_stock") return matchesSearch && stockVal > 0 && stockVal <= 5;
    if (productStockFilter === "in_stock") return matchesSearch && stockVal > 5;
    return matchesSearch;
  });

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(searchOrderQuery.toLowerCase()) || 
                          o.phone.includes(searchOrderQuery) || 
                          o.city.toLowerCase().includes(searchOrderQuery.toLowerCase());
    
    if (orderStatusFilter !== "all") return matchesSearch && o.status === orderStatusFilter;
    return matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] z-0" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-8 relative z-10"
        >
          <div className="text-center space-y-2">
            <div className="h-16 w-16 bg-[#f68b1e] rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto shadow-lg shadow-[#f68b1e]/20">A</div>
            <h1 className="text-3xl font-black text-white pt-2">لوحة الإدارة</h1>
            <p className="text-neutral-400 text-sm">مرحباً بك آدم، أدخل معلومات المرور للولوج.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6" dir="rtl">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-300">اسم المستخدم</label>
              <Input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="h-12 bg-white/5 border-white/10 text-white placeholder-neutral-500 rounded-xl focus:border-[#f68b1e] focus:ring-[#f68b1e]/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-300">كلمة المرور</label>
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="h-12 bg-white/5 border-white/10 text-white placeholder-neutral-500 rounded-xl focus:border-[#f68b1e] focus:ring-[#f68b1e]/20" 
              />
            </div>
            <Button type="submit" className="w-full h-12 bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-extrabold text-base rounded-xl transition-all shadow-lg shadow-[#f68b1e]/20">
              دخول سريع ⚡
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-slate-900 border-l border-slate-800 p-6 flex flex-col gap-8 z-20 text-white" dir="rtl">
        <div className="flex items-center gap-3 mb-2">
           <div className="h-10 w-10 bg-[#f68b1e] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-[#f68b1e]/20">A</div>
           <div>
             <h2 className="text-lg font-black tracking-tight leading-tight">إدارة الموقع</h2>
             <span className="text-[10px] font-bold text-[#f68b1e]">لوحة آدم المفضلة ✨</span>
           </div>
        </div>

        <nav className="flex flex-col gap-1.5">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-right ${activeTab === 'dashboard' ? 'bg-[#f68b1e] text-white shadow-lg shadow-[#f68b1e]/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <LayoutDashboard className="h-4 w-4" /> لوحة التحكم
          </button>
          <button 
            onClick={() => setActiveTab("inventory")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-right ${activeTab === 'inventory' ? 'bg-[#f68b1e] text-white shadow-lg shadow-[#f68b1e]/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <Package className="h-4 w-4" /> المخزن والمنتجات
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-right ${activeTab === 'orders' ? 'bg-[#f68b1e] text-white shadow-lg shadow-[#f68b1e]/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <ShoppingCart className="h-4 w-4" /> طلبات الزبناء
            {orders.filter(o => o.status === 'Pending').length > 0 && (
              <span className="mr-auto bg-red-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center">
                {orders.filter(o => o.status === 'Pending').length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-right ${activeTab === 'settings' ? 'bg-[#f68b1e] text-white shadow-lg shadow-[#f68b1e]/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <Settings className="h-4 w-4" /> واجهة الموقع
          </button>
        </nav>

        <div className="mt-auto border-t border-slate-800 pt-6">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 font-bold transition-all text-right rounded-xl hover:bg-red-500/5">
            <ArrowRight className="h-4 w-4 animate-pulse" /> الخروج لمعاينة الموقع
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden" dir="rtl">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">لوحة التحكم والمؤشرات</h1>
                <p className="text-slate-500 mt-1">مرحباً بك آدم! نظرة سريعة على مبيعاتك وحالة المخزن.</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsAddOrderModalOpen(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 px-4 rounded-xl shadow-sm flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> تسجيل طلب يدوي ✍️
                </Button>
                <Button 
                  onClick={openAddModal}
                  className="bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-bold h-11 px-4 rounded-xl shadow-md flex items-center gap-2 border-0"
                >
                  <Plus className="h-4 w-4" /> إضافة منتج 📦
                </Button>
              </div>
            </header>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-400 uppercase">إجمالي المبيعات</span>
                  <div className="h-8 w-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><DollarSign className="h-4 w-4" /></div>
                </div>
                <div className="mt-4">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">{totalSales} DH</span>
                  <p className="text-[10px] text-slate-400 mt-1">إجمالي المبيعات المسجلة</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-400 uppercase">عدد الطلبات</span>
                  <div className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center"><ShoppingCart className="h-4 w-4" /></div>
                </div>
                <div className="mt-4">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">{totalOrders} طلب</span>
                  <p className="text-[10px] text-slate-400 mt-1">منها {orders.filter(o => o.status === 'Pending').length} قيد الانتظار</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-400 uppercase">متوسط الطلب</span>
                  <div className="h-8 w-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center"><TrendingUp className="h-4 w-4" /></div>
                </div>
                <div className="mt-4">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">{avgOrderValue} DH</span>
                  <p className="text-[10px] text-slate-400 mt-1">قيمة السلة المتوسطة</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-400 uppercase">أنواع المنتجات</span>
                  <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Package className="h-4 w-4" /></div>
                </div>
                <div className="mt-4">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">{totalProducts} منتج</span>
                  <p className="text-[10px] text-slate-400 mt-1">معروضة في المتجر الرئيسي</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between col-span-2 lg:col-span-1">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-400 uppercase">مخزون السلع</span>
                  <div className="h-8 w-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><Package className="h-4 w-4" /></div>
                </div>
                <div className="mt-4">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">{totalStock} قطعة</span>
                  <p className="text-[10px] text-slate-400 mt-1">إجمالي المنتجات في المستودع</p>
                </div>
              </div>
            </div>

            {/* Dashboard Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders feed */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <h3 className="text-lg font-black text-slate-900">آخر الطلبات المستلمة</h3>
                  <button onClick={() => setActiveTab("orders")} className="text-xs font-bold text-[#f68b1e] hover:underline">عرض كل الطلبيات ←</button>
                </div>

                {orders.length > 0 ? (
                  <div className="divide-y divide-slate-50">
                    {orders.slice(0, 4).map((order) => (
                      <div key={order.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm truncate">{order.customerName}</span>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                              order.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                              order.status === 'Confirmed' ? 'bg-blue-50 text-blue-600' :
                              order.status === 'Shipped' ? 'bg-indigo-50 text-indigo-600' :
                              'bg-emerald-50 text-emerald-600'
                            }`}>
                              {order.status === 'Pending' ? 'قيد الانتظار' :
                               order.status === 'Confirmed' ? 'مؤكد' :
                               order.status === 'Shipped' ? 'مشحون' :
                               'تم التوصيل'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 truncate">{order.phone} • {order.city}</p>
                        </div>
                        <div className="text-left font-black text-slate-900 text-sm">
                          {order.total} DH
                          <p className="text-[9px] text-slate-400 font-bold mt-0.5">{order.items.reduce((s, i) => s + i.quantity, 0)} قطع</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    لا توجد طلبات مسجلة حتى الآن.
                  </div>
                )}
              </div>

              {/* Low Stock Alerts */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    تنبيهات المخزون
                  </h3>
                  <span className="bg-red-50 text-red-600 px-2 py-0.5 text-[10px] font-black rounded-full">{lowStockProducts.length} منتجات</span>
                </div>

                {lowStockProducts.length > 0 ? (
                  <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                    {lowStockProducts.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 p-2 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="h-10 w-10 bg-neutral-100 rounded-lg overflow-hidden relative flex-shrink-0">
                          <Image src={p.image} alt={p.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">{p.name}</h4>
                          <span className={`text-[10px] font-bold mt-0.5 inline-block ${p.stock === 0 ? 'text-red-500' : 'text-amber-600'}`}>
                            {p.stock === 0 ? 'سالا من المخزن!' : `باقي فقط: ${p.stock} حبة`}
                          </span>
                        </div>
                        <button 
                          onClick={() => openEditModal(p)}
                          className="bg-[#f68b1e]/10 text-[#f68b1e] hover:bg-[#f68b1e] hover:text-white p-1.5 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    المخزون ممتاز! لا توجد منتجات تحتاج تعبئة.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY */}
        {activeTab === "inventory" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">مخزون المنتجات</h1>
                <p className="text-slate-500 mt-1">تعديل وإدارة السلع ديالك بكل سهولة وسرعة.</p>
              </div>
              <Button 
                onClick={openAddModal}
                className="bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-bold h-11 px-5 rounded-xl shadow-md flex items-center gap-2 border-0"
              >
                <Plus className="h-4 w-4" /> إضافة منتج جديد
              </Button>
            </header>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-80">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  value={searchProductQuery}
                  onChange={(e) => setSearchProductQuery(e.target.value)}
                  placeholder="ابحث باسم المنتج أو الشارة..."
                  className="h-10 pr-10 pl-4 bg-slate-50 border-0 rounded-xl w-full text-sm text-slate-800 focus-visible:ring-2 focus-visible:ring-[#f68b1e]"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                {(["all", "in_stock", "low_stock", "out_of_stock"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setProductStockFilter(filter)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      productStockFilter === filter
                        ? "bg-slate-950 text-white"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {filter === "all" && "الكل"}
                    {filter === "in_stock" && "متوفر (>5)"}
                    {filter === "low_stock" && "قريب يسالي (1-5)"}
                    {filter === "out_of_stock" && "سالا (0)"}
                  </button>
                ))}
              </div>
              <div className="mr-auto text-xs text-slate-400 font-bold">
                عرض {filteredProducts.length} من أصل {products.length} منتجات
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const stockVal = product.stock ?? 0;
                return (
                  <div key={product.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group relative">
                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 right-3 z-10 bg-slate-900 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
                        {product.badge}
                      </span>
                    )}

                    {/* Stock Alert Label */}
                    <span className={`absolute top-3 left-3 z-10 text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm text-white ${
                      stockVal === 0 ? 'bg-red-500' :
                      stockVal <= 5 ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}>
                      {stockVal === 0 ? 'نفذ المخزون' :
                       stockVal <= 5 ? `باقي ${stockVal}` :
                       `متوفر (${stockVal})`}
                    </span>

                    {/* Image Area */}
                    <div className="relative aspect-square bg-slate-50 flex items-center justify-center p-4">
                      <Image src={product.image} alt={product.name} fill className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-300" />
                      {product.customHtml && (
                        <div className="absolute bottom-2 right-2 bg-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                          <FileCode2 className="h-3 w-3" /> كود مخصص
                        </div>
                      )}
                    </div>

                    {/* Info Area */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 h-11">{product.name}</h3>
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="text-xl font-black text-[#f68b1e]">{product.price} DH</span>
                          <span className="text-[10px] text-slate-400 font-bold">• تقييم {product.rating} ({product.reviews} مراجعة)</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50">
                        <Button
                          onClick={() => openEditModal(product)}
                          className="flex-1 h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                        >
                          <Edit2 className="h-3.5 w-3.5" /> تعديل المنتج
                        </Button>
                        <button
                          onClick={() => {
                            if (confirm("هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً؟")) {
                              removeProduct(product.id);
                              toast.success("تم حذف المنتج بنجاح!");
                            }
                          }}
                          className="h-9 w-9 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-20 text-center">
                <Package className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800">لا توجد نتائج مطابقة</h3>
                <p className="text-slate-400 text-xs mt-1">جرب تغيير معايير البحث أو الفلترة لتجد سلعاً.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === "orders" && (
           <div className="space-y-8 animate-in fade-in duration-300">
             <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">طلبات الزبناء</h1>
                  <p className="text-slate-500 mt-1">تتبع وتحديث كاع الطلبيات لي وصلوك من الزبناء.</p>
                </div>
                <Button 
                  onClick={() => setIsAddOrderModalOpen(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 px-5 rounded-xl shadow-sm flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> تسجيل طلب يدوي
                </Button>
             </header>

             {/* Filters and search */}
             <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
               <div className="relative w-full md:w-80">
                 <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <Input 
                   value={searchOrderQuery}
                   onChange={(e) => setSearchOrderQuery(e.target.value)}
                   placeholder="ابحث باسم الزبون، المدينة، أو الهاتف..."
                   className="h-10 pr-10 pl-4 bg-slate-50 border-0 rounded-xl w-full text-sm text-slate-800 focus-visible:ring-2 focus-visible:ring-[#f68b1e]"
                 />
               </div>
               <div className="flex flex-wrap gap-2 w-full md:w-auto">
                 {(["all", "Pending", "Confirmed", "Shipped", "Delivered"] as const).map((status) => (
                   <button
                     key={status}
                     onClick={() => setOrderStatusFilter(status)}
                     className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                       orderStatusFilter === status
                         ? "bg-slate-950 text-white"
                         : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                     }`}
                   >
                     {status === "all" && "الكل"}
                     {status === "Pending" && "قيد الانتظار"}
                     {status === "Confirmed" && "مؤكد"}
                     {status === "Shipped" && "مشحون"}
                     {status === "Delivered" && "تم التوصيل"}
                   </button>
                 ))}
               </div>
               <div className="mr-auto text-xs text-slate-400 font-bold">
                 إجمالي الطلبات المصفاة: {filteredOrders.length}
               </div>
             </div>
             
             {filteredOrders.length > 0 ? (
               <div className="grid grid-cols-1 gap-6">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                      <div className="space-y-3 flex-1 min-w-0">
                        {/* Customer Header */}
                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-slate-900 text-lg leading-none">{order.customerName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#{order.id}</span>
                        </div>

                        {/* Customer Info details */}
                        <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-slate-500 font-bold">
                          <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5 text-slate-400" /> {order.phone}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {order.address}, {order.city}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-slate-400" /> {new Date(order.createdAt).toLocaleDateString('ar-MA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>

                        {/* Order Items */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-1.5 flex items-center gap-2 text-xs">
                              <div className="relative h-6 w-6 rounded bg-neutral-100 overflow-hidden flex-shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-contain" />
                              </div>
                              <span className="font-extrabold text-slate-800">{item.name} <span className="text-[#f68b1e]">x{item.quantity}</span></span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Control Actions */}
                      <div className="flex flex-row md:flex-col lg:flex-row items-center gap-4 w-full md:w-auto border-t md:border-t-0 md:border-r border-slate-50 pt-4 md:pt-0 md:pr-6 justify-between md:justify-start">
                        {/* Summary price details */}
                        <div className="text-right md:text-left lg:text-right pr-2">
                          <p className="text-xs text-slate-400 font-bold">المجموع الإجمالي</p>
                          <p className="text-2xl font-black text-slate-900">{order.total} DH</p>
                        </div>

                        {/* Status Select dropdown */}
                        <div className="flex items-center gap-2">
                          <select 
                            value={order.status}
                            onChange={(e) => {
                              updateOrderStatus(order.id, e.target.value as Order['status']);
                              toast.success("تم تحديث حالة الطلبية بنجاح! ✨");
                            }}
                            className={`h-10 px-3 border border-slate-200 rounded-xl text-xs font-black bg-white focus:outline-none focus:ring-2 focus:ring-[#f68b1e] ${
                              order.status === 'Pending' ? 'text-orange-500 border-orange-200' :
                              order.status === 'Confirmed' ? 'text-blue-500 border-blue-200' :
                              order.status === 'Shipped' ? 'text-indigo-500 border-indigo-200' :
                              'text-emerald-500 border-emerald-200'
                            }`}
                          >
                            <option value="Pending">قيد الانتظار</option>
                            <option value="Confirmed">مؤكد</option>
                            <option value="Shipped">مشحون</option>
                            <option value="Delivered">تم التوصيل</option>
                          </select>

                          <button 
                            onClick={() => {
                              if (confirm("هل تريد إزالة هذا الطلب نهائياً من القائمة؟")) {
                                removeOrder(order.id);
                                toast.success("تم حذف الطلب!");
                              }
                            }}
                            className="bg-red-50 hover:bg-red-100 text-red-500 p-2.5 rounded-xl transition-all"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
             ) : (
               <div className="bg-white rounded-2xl border border-slate-100 p-20 text-center shadow-sm">
                 <ShoppingCart className="h-20 w-20 text-slate-100 mx-auto mb-6" />
                 <h2 className="text-2xl font-bold text-slate-700">لا توجد طلبيات</h2>
                 <p className="text-slate-400 mt-2">الطلبات المسجلة أو التي تتم إضافتها يدوياً ستظهر هنا.</p>
               </div>
             )}
           </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-4xl space-y-10 animate-in fade-in duration-300">
            <header>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">تخصيص واجهة الموقع</h1>
               <p className="text-slate-500 mt-1">عدل الألوان والتايمر باش يبان الموقع كيفما بغيتي للزبناء.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Background Customization */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                  <Palette className="h-6 w-6 text-[#f68b1e]" />
                  <h2 className="text-xl font-bold text-slate-800">خلفية الموقع</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-55 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700 text-sm">استخدام صورة الزليج المغربي</span>
                    <button 
                      onClick={() => handleUpdateSettings({ useBackgroundImage: !settings.useBackgroundImage })}
                      className={`w-14 h-8 rounded-full transition-all relative ${settings.useBackgroundImage ? 'bg-[#f68b1e]' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.useBackgroundImage ? 'right-7' : 'right-1'}`} />
                    </button>
                  </div>

                  {!settings.useBackgroundImage && (
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase">لون الخلفية المخصص</label>
                      <div className="flex gap-4">
                        <input 
                          type="color" 
                          value={settings.backgroundColor}
                          onChange={(e) => handleUpdateSettings({ backgroundColor: e.target.value })}
                          className="h-12 w-full rounded-xl cursor-pointer border-0 p-0 overflow-hidden shadow-sm"
                        />
                        <Input 
                          value={settings.backgroundColor}
                          onChange={(e) => handleUpdateSettings({ backgroundColor: e.target.value })}
                          className="w-36 h-12 text-center font-black font-mono bg-slate-50 border-0 rounded-xl text-slate-800"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Timer Customization */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                  <Clock className="h-6 w-6 text-[#f68b1e]" />
                  <h2 className="text-xl font-bold text-slate-800">مؤقت العرض المحدود</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-55 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700 text-sm">إظهار التايمر فالموقع</span>
                    <button 
                      onClick={() => handleUpdateSettings({ showTimer: !settings.showTimer })}
                      className={`w-14 h-8 rounded-full transition-all relative ${settings.showTimer ? 'bg-[#f68b1e]' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.showTimer ? 'right-7' : 'right-1'}`} />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 text-center block">ساعات</label>
                      <Input 
                        type="number"
                        min="0"
                        value={settings.timerHours}
                        onChange={(e) => handleUpdateSettings({ timerHours: parseInt(e.target.value) || 0 })}
                        className="h-12 text-center font-black text-xl bg-slate-50 border-0 rounded-xl text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 text-center block">دقائق</label>
                      <Input 
                        type="number"
                        min="0"
                        max="59"
                        value={settings.timerMinutes}
                        onChange={(e) => handleUpdateSettings({ timerMinutes: parseInt(e.target.value) || 0 })}
                        className="h-12 text-center font-black text-xl bg-slate-50 border-0 rounded-xl text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 text-center block">ثواني</label>
                      <Input 
                        type="number"
                        min="0"
                        max="59"
                        value={settings.timerSeconds}
                        onChange={(e) => handleUpdateSettings({ timerSeconds: parseInt(e.target.value) || 0 })}
                        className="h-12 text-center font-black text-xl bg-slate-50 border-0 rounded-xl text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl text-center space-y-4 border-r-8 border-[#f68b1e] text-white shadow-sm">
              <h2 className="text-xl font-black">معاينة مؤقت التخفيضات</h2>
              <div className="flex justify-center items-center gap-6" dir="ltr">
                <div className="flex flex-col items-center">
                  <div className="text-3xl sm:text-4xl font-black text-white">{String(settings.timerHours).padStart(2, '0')}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">H</div>
                </div>
                <div className="text-3xl font-black text-[#f68b1e] mb-3">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl sm:text-4xl font-black text-white">{String(settings.timerMinutes).padStart(2, '0')}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">M</div>
                </div>
                <div className="text-3xl font-black text-[#f68b1e] mb-3">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl sm:text-4xl font-black text-white">{String(settings.timerSeconds).padStart(2, '0')}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">S</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DIALOG 1: ADD / EDIT PRODUCT MODAL */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
                dir="rtl"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 sticky top-0 bg-white z-10">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">
                      {editingProductId ? "تعديل بيانات المنتج" : "إضافة منتج جديد للمخزن"}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">املأ المعطيات بعناية لعرض منتج ممتاز في الصفحة الرئيسية.</p>
                  </div>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-xl hover:bg-slate-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-6">
                  {/* Grid fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* General Section */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-50">1. معلومات عامة</h3>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">اسم المنتج (ضروري)</label>
                        <Input 
                          required
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          placeholder="مثال: ساعة ذكية Ultra Smart" 
                          className="bg-slate-50 border-0 rounded-xl h-11 text-right text-sm text-slate-800"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <label className="text-xs font-bold text-slate-600">ثمن البيع (DH)</label>
                           <Input 
                            required
                            type="number" 
                            min="0"
                            value={productForm.price}
                            onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                            placeholder="399"
                            className="bg-slate-50 border-0 rounded-xl h-11 text-sm text-slate-800" 
                           />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-xs font-bold text-slate-600">الكمية بالمخزن</label>
                           <Input 
                            required
                            type="number" 
                            min="0"
                            value={productForm.stock}
                            onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                            placeholder="10"
                            className="bg-slate-50 border-0 rounded-xl h-11 text-sm text-slate-800" 
                           />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <label className="text-xs font-bold text-slate-600">شارة المنتج ( badge )</label>
                           <Input 
                            value={productForm.badge}
                            onChange={(e) => setProductForm({...productForm, badge: e.target.value})}
                            placeholder="مثال: الأكثر مبيعاً"
                            className="bg-slate-50 border-0 rounded-xl h-11 text-sm text-slate-800" 
                           />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-xs font-bold text-slate-600">لون الخلفية بالمتجر</label>
                           <div className="flex gap-2">
                              <input 
                                type="color" 
                                value={productForm.backgroundColor}
                                onChange={(e) => setProductForm({...productForm, backgroundColor: e.target.value})}
                                className="h-11 w-12 rounded-xl cursor-pointer border-0 overflow-hidden shadow-sm"
                              />
                              <Input 
                                value={productForm.backgroundColor}
                                onChange={(e) => setProductForm({...productForm, backgroundColor: e.target.value})}
                                className="h-11 text-center font-black font-mono bg-slate-50 border-0 rounded-xl text-xs text-slate-700 flex-1"
                              />
                           </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <label className="text-xs font-bold text-slate-600">التقييم الأصلي (1-5)</label>
                           <Input 
                            type="number" 
                            step="0.1"
                            min="1"
                            max="5"
                            value={productForm.rating}
                            onChange={(e) => setProductForm({...productForm, rating: e.target.value})}
                            className="bg-slate-50 border-0 rounded-xl h-11 text-sm text-slate-800" 
                           />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-xs font-bold text-slate-600">عدد التقييمات المكتوبة</label>
                           <Input 
                            type="number" 
                            min="0"
                            value={productForm.reviews}
                            onChange={(e) => setProductForm({...productForm, reviews: e.target.value})}
                            className="bg-slate-50 border-0 rounded-xl h-11 text-sm text-slate-800" 
                           />
                        </div>
                      </div>
                    </div>

                    {/* Media / Gallery Section */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-50">2. معرض الصور</h3>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">أضف صور للمنتج (الرئيسية والمعرض)</label>
                        <div 
                          onClick={() => document.getElementById('admin-image-loader')?.click()}
                          className="border-2 border-dashed border-slate-200 hover:border-[#f68b1e] hover:bg-orange-50/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all group"
                        >
                          <input 
                            id="admin-image-loader" 
                            type="file" 
                            accept="image/*" 
                            multiple 
                            className="hidden" 
                            onChange={async (e) => {
                              const files = Array.from(e.target.files || []);
                              if (files.length > 0) {
                                const readData = (file: File) => new Promise<string>((resolve) => {
                                  const r = new FileReader();
                                  r.onloadend = () => resolve(r.result as string);
                                  r.readAsDataURL(file);
                                });
                                const base64Arr = await Promise.all(files.map(readData));
                                setProductForm(prev => {
                                  const updatedImages = [...prev.images, ...base64Arr];
                                  return {
                                    ...prev,
                                    images: updatedImages,
                                    image: prev.image || base64Arr[0] // Set first image as primary if none exists
                                  };
                                });
                                toast.success(`تم تحميل ${files.length} صور!`);
                              }
                            }}
                          />
                          <ImageIcon className="h-10 w-10 text-slate-300 group-hover:text-[#f68b1e] transition-colors" />
                          <span className="text-xs font-bold text-slate-800">اختر صور لرفعها</span>
                          <span className="text-[10px] text-slate-400">يمكنك رفع عدة ملفات معاً</span>
                        </div>
                      </div>

                      {/* Displaying Gallery Thumbnails */}
                      {productForm.images.length > 0 && (
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600 block">اضغط على صورة لتجعلها رئيسية (إطار برتقالي):</label>
                          <div className="flex flex-wrap gap-2.5 max-h-[160px] overflow-y-auto p-2 bg-slate-50 rounded-xl">
                            {productForm.images.map((img, idx) => {
                              const isMain = img === productForm.image;
                              return (
                                <div 
                                  key={idx} 
                                  onClick={() => setProductForm(prev => ({ ...prev, image: img }))}
                                  className={`h-16 w-16 rounded-lg relative overflow-hidden border-2 cursor-pointer transition-all flex-shrink-0 bg-white ${
                                    isMain ? 'border-[#f68b1e] ring-2 ring-[#f68b1e]/15' : 'border-slate-200 hover:border-slate-400'
                                  }`}
                                >
                                  <Image src={img} alt={`gallery-${idx}`} fill className="object-contain p-1" />
                                  
                                  {/* Delete Thumbnail Button */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductForm(prev => {
                                        const filtered = prev.images.filter((_, i) => i !== idx);
                                        // If deleted the main image, point to the next available one
                                        const newMain = prev.image === img ? (filtered[0] || "") : prev.image;
                                        return { ...prev, images: filtered, image: newMain };
                                      });
                                    }}
                                    className="absolute top-1 left-1 bg-red-500/80 hover:bg-red-500 text-white rounded-md p-0.5 shadow-sm transition-colors"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* TAB: COLLAPSIBLE ADVANCED SETTINGS */}
                  <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                    <button
                      type="button"
                      onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                      className="w-full px-5 py-4 flex items-center justify-between text-right font-bold text-slate-700 hover:bg-slate-50 transition-colors text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <FileCode2 className="h-4.5 w-4.5 text-slate-400" />
                        تخصيص متقدم (كود صفحة الهبوط)
                      </span>
                      {isAdvancedOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>

                    <AnimatePresence initial={false}>
                      {isAdvancedOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 bg-white"
                        >
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">كود HTML المخصص (اختياري)</label>
                            <textarea
                              rows={5}
                              value={productForm.customHtml}
                              onChange={(e) => setProductForm({...productForm, customHtml: e.target.value})}
                              placeholder="أدخل كود HTML الخاص بصفحة الهبوط هنا..."
                              className="w-full p-3 bg-slate-50 border-0 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#f68b1e]"
                              dir="ltr"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">كود CSS المخصص (اختياري)</label>
                            <textarea
                              rows={4}
                              value={productForm.customCss}
                              onChange={(e) => setProductForm({...productForm, customCss: e.target.value})}
                              placeholder="أدخل كود CSS الخاص بصفحة الهبوط هنا..."
                              className="w-full p-3 bg-slate-50 border-0 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#f68b1e]"
                              dir="ltr"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <Button 
                      type="submit" 
                      disabled={isSavingProduct}
                      className="flex-1 h-12 bg-[#f68b1e] hover:bg-[#e67e1a] text-white font-extrabold rounded-xl shadow-md border-0"
                    >
                      {isSavingProduct ? "جاري الحفظ..." : "حفظ وحفظ التغييرات ⚡"}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold px-6 rounded-xl border-0"
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* DIALOG 2: ADD MANUAL ORDER MODAL */}
        <AnimatePresence>
          {isAddOrderModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddOrderModalOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-xl relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
                dir="rtl"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">تسجيل طلبية يدوية جديدة</h2>
                    <p className="text-xs text-slate-400 mt-1">تعبئة بيانات الزبون وسحب السلع مباشرة من المخازن.</p>
                  </div>
                  <button onClick={() => setIsAddOrderModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-xl hover:bg-slate-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateOrder} className="space-y-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-50">1. معلومات المشتري</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">الاسم الكامل للزبون</label>
                        <Input 
                          required
                          value={orderForm.customerName}
                          onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
                          placeholder="مثال: أحمد الطاهري" 
                          className="bg-slate-50 border-0 rounded-xl h-11 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">رقم الهاتف</label>
                        <Input 
                          required
                          type="tel"
                          value={orderForm.phone}
                          onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                          placeholder="06XXXXXXXX" 
                          className="bg-slate-50 border-0 rounded-xl h-11 text-sm text-right"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">المدينة</label>
                        <Input 
                          required
                          value={orderForm.city}
                          onChange={(e) => setOrderForm({...orderForm, city: e.target.value})}
                          placeholder="الدار البيضاء" 
                          className="bg-slate-50 border-0 rounded-xl h-11 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">العنوان الكامل</label>
                        <Input 
                          required
                          value={orderForm.address}
                          onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                          placeholder="رقم الدار، الحي..." 
                          className="bg-slate-50 border-0 rounded-xl h-11 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Select Products */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-50">2. اختيار السلع والكمية</h3>
                    
                    <div className="space-y-2 max-h-[220px] overflow-y-auto bg-slate-50 p-3 rounded-xl">
                      {products.map((p) => {
                        const existingSelect = orderForm.selectedItems.find(item => item.productId === p.id);
                        const isChecked = !!existingSelect;
                        return (
                          <div key={p.id} className="flex items-center justify-between gap-3 p-2 bg-white rounded-lg border border-slate-100">
                            <div className="flex items-center gap-3">
                              <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setOrderForm(prev => ({
                                      ...prev,
                                      selectedItems: [...prev.selectedItems, { productId: p.id, quantity: 1 }]
                                    }));
                                  } else {
                                    setOrderForm(prev => ({
                                      ...prev,
                                      selectedItems: prev.selectedItems.filter(item => item.productId !== p.id)
                                    }));
                                  }
                                }}
                                className="h-4 w-4 rounded border-slate-300 text-[#f68b1e] focus:ring-[#f68b1e]"
                              />
                              <div className="h-8 w-8 bg-slate-100 rounded relative overflow-hidden flex-shrink-0">
                                <Image src={p.image} alt={p.name} fill className="object-contain p-0.5" />
                              </div>
                              <span className="text-xs font-bold text-slate-800 line-clamp-1">{p.name} ({p.price} DH)</span>
                            </div>

                            {isChecked && (
                              <div className="flex items-center gap-1">
                                <label className="text-[10px] font-bold text-slate-400">الكمية:</label>
                                <input 
                                  type="number"
                                  min="1"
                                  max={p.stock}
                                  value={existingSelect.quantity}
                                  onChange={(e) => {
                                    const qty = Math.max(1, parseInt(e.target.value) || 1);
                                    setOrderForm(prev => ({
                                      ...prev,
                                      selectedItems: prev.selectedItems.map(item => 
                                        item.productId === p.id ? { ...item, quantity: qty } : item
                                      )
                                    }));
                                  }}
                                  className="h-8 w-14 rounded-lg bg-slate-50 border border-slate-100 text-center text-xs font-bold text-slate-800"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <Button 
                      type="submit" 
                      disabled={isSavingOrder}
                      className="flex-1 h-12 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl border-0 shadow-sm"
                    >
                      {isSavingOrder ? "جاري الإرسال..." : "تأكيد الطلب وحفظ البيانات ⚡"}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setIsAddOrderModalOpen(false)}
                      className="h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold px-6 rounded-xl border-0"
                    >
                      إلغاء
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
