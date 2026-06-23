"use client";

import React from "react";
import Link from "next/link";
import { Package, ShieldCheck, Award } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import CountdownTimer from "@/components/product/CountdownTimer";
import HeroSection from "@/components/home/HeroSection";
import { useProductStore } from "@/store/useProductStore";

export default function Home() {
  const { products, isLoading } = useProductStore();

  return (
    <div className="min-h-screen pb-12 sm:pb-16">
      {/* Premium Hero Section */}
      <HeroSection />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl mt-6 sm:mt-8">
        
        {/* Urgent Offer Banner & Timer (Minimalist & Premium) */}
        <div className="mb-10 sm:mb-16 bg-white/70 backdrop-blur-md rounded-2xl border border-neutral-200/50 p-5 md:p-8 shadow-premium text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4 animate-pulse">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
            <span className="text-xs font-extrabold text-indigo-700">تخفيضات حصرية محدودة</span>
          </div>
          
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-neutral-950 mb-4 sm:mb-6">
            سالي التايمر كيسالي العرض! استفد من الشحن المجاني اليوم
          </h2>
          
          <CountdownTimer />
        </div>

        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-neutral-950">أحدث المنتجات المتوفرة</h2>
            <p className="text-xs text-neutral-500 font-medium">اكتشف أحدث الإلكترونيات بأفضل الأسعار فالمغرب</p>
          </div>
          <Link href="/products" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            عرض الكل ←
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-16 sm:mb-20">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-premium">
               <div className="h-16 w-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-300">
                  <Package className="h-8 w-8" />
               </div>
               <h3 className="text-lg font-bold text-neutral-800">المتجر خاوي دابا</h3>
               <p className="text-sm text-neutral-400 mt-1">زيد المنتجات من لوحة التحكم باش يبانو هنا.</p>
            </div>
          )}
        </div>

        {/* Brand Editorial & SEO Section (Apple/Nothing Tech Style) */}
        <section className="space-y-8">
          
          {/* Main welcome block */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-neutral-200/50 p-8 md:p-12 shadow-premium text-right space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-neutral-950 leading-tight">
              مرحباً بكم في <span className="text-indigo-600">Gadget Maghrib</span> — بوابتكم الرائدة لعالم الابتكار والتقنية الرقمية في المغرب
            </h2>
            <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
              في عالم يتسارع فيه التطور التكنولوجي بشكل مذهل، تبرز منصة <strong>Gadget Maghrib</strong> كشريككم الاستراتيجي والموثوق للحصول على أحدث الابتكارات التقنية في المملكة المغربية. نحن لا نكتفي بكوننا مجرد متجر يبيع أجهزة إلكترونية، بل نعتبر أنفسنا مزودي حلول ذكية تهدف في جوهرها إلى تحسين نمط حياتكم اليومي، وجعل كل تفاصيل يومكم أكثر سهولة، إنتاجية، ومتعة. من طنجة إلى الكويرة، نسعى جاهدين لنكون الواجهة الأولى التي تلبي تطلعات الشباب المغربي الشغوف بكل ما هو جديد في عالم &quot;الجادجيتس&quot;.
            </p>
          </div>

          {/* Grid Cards for Details */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Audio detail */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-neutral-200/50 p-8 shadow-premium text-right space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-2">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-950">ساعات ذكية لكل المناسبات - الأناقة والوظيفة في معصمك</h3>
              <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                سواء كنت رياضياً محترفاً تبحث عن تتبع دقيق ومفصل لكل نشاطك البدني، أو رجل أعمال يحتاج إلى البقاء على اتصال دائم بإشعارات العمل والمكالمات المهمة دون الحاجة لإخراج الهاتف، فإن تشكيلة الساعات المتوفرة لدينا تلبي كافة احتياجاتك بدقة متناهية. استمتع بشاشات AMOLED المبهرة التي توفر وضوحاً تاماً حتى تحت أشعة الشمس القوية، واستفد من تقنيات تتبع النوم، قياس مستوى الأكسجين في الدم (SpO2)، ومراقبة نبضات القلب على مدار الساعة.
              </p>
            </div>

            {/* Smartwatch detail */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-neutral-200/50 p-8 shadow-premium text-right space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-2">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-950">تجربة صوتية غامرة - سماعات تجمع بين النقاء والراحة</h3>
              <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                الصوت هو لغة الروح والوسيلة الأهم للتواصل والاستمتاع، وفي متجرنا نأخذ هذه اللغة بجدية مطلقة. نقدم لكم تشكيلة مختارة من سماعات بلوتوث (Airpods & Earbuds) التي توفر تجربة عزل ضوضاء (ANC) احترافية، مما يسمح لك بالانغماس في عالمك الخاص حتى في أكثر الأماكن ضجيجاً. تصميماتنا مريحة للأذن وتضمن ثباتاً مثالياً أثناء ممارسة الرياضة أو التنقل اليومي.
              </p>
            </div>

          </div>

          {/* Key Advantages Bento Block */}
          <div className="bg-neutral-900 text-white rounded-3xl p-8 md:p-12 shadow-premium text-right space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-extrabold text-white">لماذا تختار Gadget Maghrib للتسوق الإلكتروني في المغرب؟</h3>
              <p className="text-neutral-400 text-xs md:text-sm">وضعنا العميل في قلب أولوياتنا لنضمن له تجربة تسوق آمنة وسلسة:</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-4">
              
              <div className="space-y-2 border-r border-white/10 pr-4 sm:pr-4">
                <h4 className="font-bold text-indigo-400 text-sm">الجودة المضمونة والقابلة للفحص</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">نقوم بفحص كل قطعة إلكترونية يدوياً قبل تغليفها وشحنها للتأكد من أنها تعمل بكفاءة 100%.</p>
              </div>

              <div className="space-y-2 border-r border-white/10 pr-4">
                <h4 className="font-bold text-indigo-400 text-sm">أفضل قيمة مقابل السعر</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">بفضل علاقاتنا المباشرة مع كبار المصنعين، نستطيع توفير أحدث الموديلات بأثمنة تنافسية جداً فالمملكة.</p>
              </div>

              <div className="space-y-2 border-r border-white/10 pr-4">
                <h4 className="font-bold text-indigo-400 text-sm">توصيل سريع وسياسة الدفع عند الاستلام</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">التوصيل فابور في 24-48 ساعة، ولا تدفع حتى تفحص المنتج بنفسك وتتأكد من الجودة ديالو.</p>
              </div>

            </div>
          </div>

          {/* Gifting Guide & Future Tech */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            
            <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-neutral-200/50 p-8 shadow-premium text-right space-y-3">
              <h3 className="text-lg font-bold text-neutral-950">أفكار هدايا تقنية - اجعل أحباءك يشعرون بالتميز</h3>
              <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                هل تبحث عن هدية مثالية لعيد ميلاد، ذكرى زواج، أو نجاح دراسي؟ الجادجيتس هي دائماً الخيار الأمثل. في <strong>Gadget Maghrib</strong>، نوفر لك خيارات متنوعة تناسب الرجال والنساء من جميع الأعمار، مما يعبر عن اهتمامك بأدق التفاصيل.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-neutral-200/50 p-8 shadow-premium text-right space-y-3">
              <h3 className="text-lg font-bold text-neutral-950">مستقبل التكنولوجيا في المغرب - توجهات عامة</h3>
              <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                التكنولوجيا لا تتوقف، ونحن في متجرنا نواكب هذا التطور يوماً بيوم. نحن ملتزمون بجلب أحدث التقنيات العالمية فور صدورها لتكون بين أيدي المغاربة وتسهل العمل عن بعد، وتزيد الفعالية الرياضية واليومية.
              </p>
            </div>

          </div>

          {/* Premium FAQ Accordion Layout */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-neutral-200/50 p-5 sm:p-8 md:p-12 shadow-premium text-right space-y-6 sm:space-y-8">
            <h3 className="text-xl md:text-2xl font-black text-neutral-950 text-center mb-4">الأسئلة الأكثر شيوعاً عند زبنائنا (FAQ)</h3>
            
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-right">
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-neutral-900 text-sm md:text-base flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-xs">1</span>
                    كيف يمكنني تتبع حالة طلبي؟
                  </h4>
                  <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mr-8">
                    عملية التتبع لدينا بسيطة جداً. بمجرد تأكيد طلبك، ستحصل على رقم فريد. يمكنك الدخول إلى صفحة <Link href="/track" className="text-indigo-600 hover:underline">تتبع الطلب</Link> وإدخال الرقم لمعرفة مكان شحنتك بالضبط في أي لحظة.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-bold text-neutral-900 text-sm md:text-base flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-xs">2</span>
                    هل جميع المنتجات أصلية ومضمونة؟
                  </h4>
                  <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mr-8">
                    بكل تأكيد. نحن نتعامل مباشرة مع المصنعين والوكلاء المعتمدين لضمان أصالة كل قطعة. كل منتج يأتي مع ضمان الجودة الخاص بمتجرنا، مما يضمن لك راحة البال التامة.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-neutral-900 text-sm md:text-base flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-xs">3</span>
                    ما هي مدة التوصيل المتوقعة؟
                  </h4>
                  <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mr-8">
                    بالنسبة للمدن الكبرى مثل الدار البيضاء، الرباط، وطنجة، غالباً ما يتم التوصيل خلال 24 ساعة. بالنسبة لباقي المدن والقرى، قد تستغرق العملية من 48 إلى 72 ساعة عمل كحد أقصى.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-neutral-900 text-sm md:text-base flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-xs">4</span>
                    كيف أتواصل معكم في حال وجود مشكلة؟
                  </h4>
                  <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mr-8">
                    نحن دائماً في خدمتكم. يمكنك زيارة صفحة <Link href="/contact" className="text-indigo-600 hover:underline">اتصل بنا</Link> أو مراسلتنا مباشرة عبر أيقونة الواتساب الظاهرة في الموقع للحصول على دعم فني فوري.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
