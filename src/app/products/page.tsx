"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import { ChevronRight, Filter, Star, Search } from "lucide-react";

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory ? product.badge === selectedCategory : true; // Simulating category with badge
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-4 md:py-6">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-[#282828] mb-4 overflow-x-auto whitespace-nowrap">
          <span className="hover:underline cursor-pointer">الرئيسية</span>
          <ChevronRight className="h-3 w-3 rotate-180" />
          <span className="font-bold">نتائج البحث</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar Filters (Jumia Style) */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-4">
            <div className="bg-white rounded-sm jumia-shadow p-4">
              <h3 className="text-sm font-bold text-[#282828] border-b border-gray-100 pb-2 mb-3 uppercase tracking-tight">الفئات</h3>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`text-sm cursor-pointer hover:text-[#f68b1e] transition-colors ${selectedCategory === cat ? 'text-[#f68b1e] font-bold' : 'text-[#282828]'}`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-sm jumia-shadow p-4">
              <h3 className="text-sm font-bold text-[#282828] border-b border-gray-100 pb-2 mb-3 uppercase tracking-tight">الماركة</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm text-[#282828] cursor-pointer hover:text-[#f68b1e]">
                    <input type="checkbox" className="accent-[#f68b1e]" />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-sm jumia-shadow p-4">
              <h3 className="text-sm font-bold text-[#282828] border-b border-gray-100 pb-2 mb-3 uppercase tracking-tight">الثمن (درهم)</h3>
              <div className="flex items-center gap-2 mt-4">
                <input type="number" placeholder="أقل" className="w-1/2 border border-gray-200 rounded-sm p-2 text-sm outline-none focus:border-[#f68b1e]" />
                <span className="text-gray-300">-</span>
                <input type="number" placeholder="أكثر" className="w-1/2 border border-gray-200 rounded-sm p-2 text-sm outline-none focus:border-[#f68b1e]" />
              </div>
            </div>

            <div className="bg-white rounded-sm jumia-shadow p-4">
              <h3 className="text-sm font-bold text-[#282828] border-b border-gray-100 pb-2 mb-3 uppercase tracking-tight">تقييم العملاء</h3>
              <ul className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <li key={rating} className="flex items-center gap-2 text-sm text-[#282828] hover:text-[#f68b1e] cursor-pointer">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-[#f68b1e] text-[#f68b1e]" : "text-gray-200 fill-gray-200"}`} />
                      ))}
                    </div>
                    <span>أو أكثر</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            
            {/* Sort Bar */}
            <div className="bg-white rounded-sm jumia-shadow p-3 md:p-4 flex items-center justify-between">
              <div>
                <h1 className="text-sm md:text-lg font-bold text-[#282828]">
                  {searchQuery ? `نتائج البحث عن "${searchQuery}"` : "جميع المنتجات"}
                </h1>
                <p className="text-[10px] md:text-xs text-gray-500 mt-1">{filteredProducts.length} منتج وجدناه</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">رتب حسب:</span>
                  <select className="border border-gray-200 rounded-sm p-1 text-xs outline-none focus:border-[#f68b1e] bg-white">
                    <option>الأكثر شعبية</option>
                    <option>وصلنا حديثا</option>
                    <option>السعر: من الأقل إلى الأكثر</option>
                    <option>السعر: من الأكثر إلى الأقل</option>
                  </select>
                </div>
                <button className="lg:hidden flex items-center gap-1 text-[#f68b1e] font-bold text-xs">
                  <Filter className="h-4 w-4" />
                  فلترة
                </button>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-sm jumia-shadow p-20 text-center">
                <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Search className="h-10 w-10 text-gray-300" />
                </div>
                <h2 className="text-xl font-bold text-[#282828] mb-2">مالقينا تا شي نتيجة</h2>
                <p className="text-gray-500">حاول تقلب بشي كلمة أخرى أو نقص من الفلترات.</p>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>}>
      <ProductsContent />
    </Suspense>
  );
}