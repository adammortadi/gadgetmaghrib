"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import { ChevronRight, Filter, Star, Search, X } from "lucide-react";

const CATEGORIES = [
  "أكسيسوارات الكمبيوتر",
  "الهواتف واللوحات الرقمية",
  "الساعات الذكية",
  "الألعاب الإلكترونية",
  "الصوت والكاميرات"
];

const BRANDS = ["Apple", "Samsung", "Sony", "Logitech", "JBL", "Xiaomi"];

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const products = useProductStore((state) => state.products);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory ? product.badge === selectedCategory : true; // Simulating category with badge
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-5 md:py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Mobile Filter Drawer Overlay */}
        {mobileFiltersOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />
        )}

        {/* Mobile Filter Drawer */}
        <div
          className={`fixed inset-y-0 right-0 w-[85%] max-w-xs bg-white z-[90] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
            mobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          dir="rtl"
        >
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-bold text-neutral-900 text-base">تصفية المنتجات</h2>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Mobile Category Filter */}
            <div className="bg-white border border-neutral-200/50 rounded-2xl p-4">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-3 mb-3">الفئات</h3>
              <ul className="space-y-3">
                {CATEGORIES.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`text-xs cursor-pointer hover:text-indigo-600 transition-colors font-medium ${selectedCategory === cat ? 'text-indigo-600 font-extrabold' : 'text-neutral-600'}`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
            {/* Mobile Brand Filter */}
            <div className="bg-white border border-neutral-200/50 rounded-2xl p-4">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-3 mb-3">الماركة</h3>
              <div className="space-y-3">
                {BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer hover:text-indigo-600 font-medium">
                    <input type="checkbox" className="accent-indigo-600 h-3.5 w-3.5" />
                    <span className="mr-1">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Mobile Price Filter */}
            <div className="bg-white border border-neutral-200/50 rounded-2xl p-4">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-3 mb-3">الثمن (درهم)</h3>
              <div className="flex items-center gap-2 mt-2">
                <input type="number" placeholder="أقل" className="w-1/2 border border-neutral-200/80 rounded-lg p-2 text-xs outline-none focus:border-indigo-500 bg-white/50 text-neutral-800 text-center font-bold" />
                <span className="text-neutral-300">-</span>
                <input type="number" placeholder="أكثر" className="w-1/2 border border-neutral-200/80 rounded-lg p-2 text-xs outline-none focus:border-indigo-500 bg-white/50 text-neutral-800 text-center font-bold" />
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-neutral-100">
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full h-11 bg-indigo-600 text-white font-bold rounded-xl text-sm hover:bg-indigo-700 transition-colors"
            >
              تطبيق الفلتر
            </button>
          </div>
        </div>
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-neutral-500 mb-6 overflow-x-auto whitespace-nowrap" dir="rtl">
          <span className="hover:underline cursor-pointer">الرئيسية</span>
          <ChevronRight className="h-3 w-3 rotate-180 text-neutral-300" />
          <span className="font-semibold text-neutral-800">نتائج البحث</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8" dir="rtl">
          
          {/* Sidebar Filters (Premium Sleek Style) */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6 text-right">
            
            {/* Category Filter */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 p-5 shadow-premium">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-3 mb-4">الفئات</h3>
              <ul className="space-y-3">
                {CATEGORIES.map((cat) => (
                  <li 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`text-xs cursor-pointer hover:text-indigo-600 transition-colors font-medium ${selectedCategory === cat ? 'text-indigo-600 font-extrabold' : 'text-neutral-600'}`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand Filter */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 p-5 shadow-premium">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-3 mb-4">الماركة</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer hover:text-indigo-600 font-medium">
                    <input type="checkbox" className="accent-indigo-600 h-3.5 w-3.5 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="mr-1">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 p-5 shadow-premium">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-3 mb-4">الثمن (درهم)</h3>
              <div className="flex items-center gap-2 mt-2">
                <input type="number" placeholder="أقل" className="w-1/2 border border-neutral-200/80 rounded-lg p-2 text-xs outline-none focus:border-indigo-500 bg-white/50 text-neutral-800 text-center font-bold" />
                <span className="text-neutral-300">-</span>
                <input type="number" placeholder="أكثر" className="w-1/2 border border-neutral-200/80 rounded-lg p-2 text-xs outline-none focus:border-indigo-500 bg-white/50 text-neutral-800 text-center font-bold" />
              </div>
            </div>

            {/* Review Filter */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 p-5 shadow-premium">
              <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-3 mb-4">تقييم العملاء</h3>
              <ul className="space-y-3">
                {[4, 3, 2, 1].map((rating) => (
                  <li key={rating} className="flex items-center gap-2 text-xs text-neutral-600 hover:text-indigo-600 cursor-pointer font-medium">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-neutral-200 fill-neutral-200"}`} />
                      ))}
                    </div>
                    <span className="mr-1">أو أكثر</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            
            {/* Sort Bar */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 p-4 shadow-premium flex items-center justify-between">
              <div className="text-right">
                <h1 className="text-base md:text-lg font-extrabold text-neutral-900">
                  {searchQuery ? `نتائج البحث عن "${searchQuery}"` : "جميع المنتجات"}
                </h1>
                <p className="text-[10px] md:text-xs text-neutral-400 mt-0.5 font-medium">{filteredProducts.length} منتج وجدناه</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-xs text-neutral-500 font-medium">رتب حسب:</span>
                  <select className="border border-neutral-200 rounded-lg p-1.5 text-xs outline-none focus:border-indigo-500 bg-white text-neutral-700 font-semibold cursor-pointer">
                    <option>الأكثر شعبية</option>
                    <option>وصلنا حديثا</option>
                    <option>السعر: من الأقل إلى الأكثر</option>
                    <option>السعر: من الأكثر إلى الأقل</option>
                  </select>
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 text-indigo-600 font-black text-xs hover:opacity-85 px-3 py-2 border border-indigo-200 rounded-xl bg-indigo-50/50 active:scale-95 transition-all"
                >
                  <Filter className="h-4 w-4" />
                  فلترة
                </button>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 p-20 text-center shadow-premium">
                <div className="h-16 w-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-300">
                   <Search className="h-8 w-8" />
                </div>
                <h2 className="text-lg font-bold text-neutral-900 mb-1">مالقينا تا شي نتيجة</h2>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">حاول تقلب بشي كلمة أخرى أو نقص من الفلترات لي حددتي.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-neutral-800">جاري التحميل...</div>}>
      <ProductsContent />
    </Suspense>
  );
}