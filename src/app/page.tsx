"use client";

import React from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { useProductStore } from "@/store/useProductStore";

export default function Home() {
  const { products } = useProductStore();

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* H1 Heading for SEO */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-white bg-[#0a192f] p-4 rounded-sm border-r-4 border-[#00d2ff] shadow-lg inline-block">
            Gadget Maghrib | متجرك الإلكتروني المفضل في المغرب
          </h1>
        </div>

        {/* Banner Section */}
        <div className="w-full rounded-sm overflow-hidden jumia-shadow mb-8 md:mb-12">
          <Image 
            src="/banner.png" 
            alt="Gadget Maghrib Banner - أحدث الأدوات الإلكترونية بأسعار تنافسية" 
            width={1200} 
            height={400} 
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white border-b-2 border-[#00d2ff] pb-1">أحدث المنتجات المتوفرة</h2>
        </div>

        {/* Centered 3x3 Marketplace Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-sm jumia-shadow border border-gray-100">
               <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-10 w-10 text-gray-200" />
               </div>
               <h3 className="text-xl font-bold text-[#282828]">المتجر خاوي دابا</h3>
               <p className="text-gray-400 mt-2">زيد المنتجات من لوحة التحكم باش يبانو هنا.</p>
            </div>
          )}
        </div>

        {/* SEO Content Section - HEAVILY EXPANDED */}
        <section className="bg-white/5 backdrop-blur-md rounded-sm border border-white/10 p-6 md:p-10 text-white space-y-10 jumia-shadow overflow-hidden">
          
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-[#00d2ff]">مرحباً بكم في Gadget Maghrib - بوابتكم لعالم الابتكار الرقمي</h2>
            <p className="text-gray-200 leading-relaxed text-lg">
              في عالم يتسارع فيه التطور التكنولوجي، تبرز منصة <strong>Gadget Maghrib</strong> كشريككم الموثوق للحصول على أحدث الابتكارات التقنية في المملكة المغربية. نحن لا نبيع مجرد أجهزة، بل نقدم حلولاً ذكية تهدف إلى تحسين نمط حياتكم اليومي وجعله أكثر سهولة ومتعة.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#00d2ff]">ساعات ذكية لكل المناسبات</h3>
              <p className="text-gray-300">
                سواء كنت رياضياً محترفاً تبحث عن تتبع دقيق لنشاطك البدني، أو رجل أعمال يحتاج إلى البقاء على اتصال دائم، فإن تشكيلة الساعات المتوفرة لدينا تلبي كافة احتياجاتك. من شاشات AMOLED المبهرة إلى البطاريات التي تدوم لأسابيع، نختار منتجاتنا بناءً على معايير الجودة والأداء. تتبع نبضات قلبك، مستوى الأكسجين، وخطواتك بأسلوب عصري وأنيق.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#00d2ff]">تجربة صوتية لا مثيل لها</h3>
              <p className="text-gray-300">
                الصوت هو لغة الروح، وفي متجرنا نأخذ هذه اللغة بجدية. نقدم لكم سماعات بلوتوث (Airpods & Earbuds) توفر تجربة عزل ضوضاء احترافية وجودة صوت عالية النقاء. استمتع بموسيقاك المفضلة أو أجرِ مكالماتك بوضوح تام بفضل الميكروفونات المتطورة المزودة بتقنيات الذكاء الاصطناعي لتنقية الصوت.
              </p>
            </div>
          </div>

          <div className="space-y-6 border-t border-white/10 pt-10">
            <h3 className="text-xl font-bold text-[#00d2ff]">دليلك الشامل للتسوق الذكي من متجرنا</h3>
            <p className="text-gray-200 italic">
              التسوق عبر الإنترنت في المغرب قد يكون محيراً أحياناً، ولكن مع <strong>منصتنا</strong>، نحن نبسط لك كل شيء:
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-300 ml-4">
              <li><strong>الجودة المضمونة:</strong> نقوم بفحص كل منتج يدوياً قبل عرضه في المتجر للتأكد من مطابقته للمواصفات العالمية.</li>
              <li><strong>الثمن المناسب:</strong> علاقتنا المباشرة مع الموردين تسمح لنا بتقديم أثمنة لا تقبل المنافسة في السوق المغربي.</li>
              <li><strong>التوصيل لجميع المدن:</strong> من طنجة إلى الكويرة، نضمن وصول طلبك في أسرع وقت ممكن (غالباً خلال 24 إلى 48 ساعة).</li>
              <li><strong>الدفع عند الاستلام:</strong> نمنحك الأمان التام؛ لا تدفع درهماً واحداً حتى تمسك بمنتجك وتتأكد منه بنفسك.</li>
            </ul>
          </div>

          <div className="bg-white/5 p-6 rounded-lg space-y-6">
            <h3 className="text-2xl font-bold text-[#00d2ff] text-center">الأسئلة الشائعة (FAQ)</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-white">كيف يمكنني تتبع طلبي؟</h4>
                <p className="text-gray-400 text-sm mt-1">ببساطة، استخدم رقم الطلب الذي وصلك في رسالة التأكيد عبر صفحة "تتبع الطلب" المتوفرة في القائمة الرئيسية.</p>
              </div>
              <div>
                <h4 className="font-bold text-white">هل المنتجات أصلية؟</h4>
                <p className="text-gray-400 text-sm mt-1">نعم، نحن نتعامل فقط مع الماركات الموثوقة والمنتجات التي أثبتت جودتها عالمياً ولدى المستخدمين المغاربة.</p>
              </div>
              <div>
                <h4 className="font-bold text-white">ماذا لو لم يعجبني المنتج؟</h4>
                <p className="text-gray-400 text-sm mt-1">رضا الزبون هو أولويتنا. لدينا سياسة استبدال واضحة، يمكنك التواصل معنا عبر واتساب لحل أي مشكلة فوراً.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-10">
            <h3 className="text-xl font-bold text-[#00d2ff]">التزامنا تجاه المجتمع الرقمي في المغرب</h3>
            <p className="text-gray-300 text-sm">
              نحن في <strong>Gadget Maghrib</strong> نؤمن بأن الوصول إلى التكنولوجيا المتقدمة يجب أن يكون حقاً للجميع وليس رفاهية للبعض. من خلال توفير إكسسوارات الهواتف الذكية، الأجهزة اللوحية، وأدوات المنزل الذكي بأسعار معقولة، نساهم في سد الفجوة الرقمية. نحن فخورون بأن نكون جزءاً من رحلتكم التقنية، ونسعى دائماً لنكون الاسم الأول الذي يخطر ببالكم عند الرغبة في اقتناء "أداة ذكية" جديدة.
            </p>
            <p className="text-gray-300 text-sm">
              شكراً لاختياركم متجرنا. نحن نعدكم بالاستمرار في البحث عن أكثر المنتجات ابتكاراً وجلبها لكم إلى عتبة داركم. ابقوا على اتصال معنا عبر منصات التواصل الاجتماعي لتكونوا أول من يعلم عن تخفيضاتنا الموسمية والمنتجات الحصرية التي تصلنا دورياً. رحلتكم نحو حياة أكثر ذكاءً تبدأ من هنا.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}