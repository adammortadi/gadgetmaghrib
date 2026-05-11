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
            Gadget Maghrib - أفضل متجر للإلكترونيات في المغرب
          </h1>
        </div>

        {/* Banner Section */}
        <div className="w-full rounded-sm overflow-hidden jumia-shadow mb-8 md:mb-12">
          <Image 
            src="/banner.png" 
            alt="GadgetMaghrib Banner - أحدث الأدوات الإلكترونية" 
            width={1200} 
            height={400} 
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white border-b-2 border-[#00d2ff] pb-1">أحدث المنتجات</h2>
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

        {/* SEO Content Section */}
        <section className="bg-white/5 backdrop-blur-md rounded-sm border border-white/10 p-6 md:p-10 text-white space-y-6 jumia-shadow">
          <h2 className="text-2xl md:text-3xl font-black text-[#00d2ff]">مرحباً بكم في Gadget Maghrib - عالم التكنولوجيا في متناول يديك</h2>
          
          <div className="space-y-4 text-gray-200 leading-relaxed">
            <p>
              يعتبر <strong>Gadget Maghrib</strong> الوجهة الأولى لكل عشاق التكنولوجيا والباحثين عن أحدث الأجهزة الإلكترونية في المغرب. نحن نفخر بتقديم مجموعة مختارة بعناية من أفضل المنتجات التي تجمع بين الجودة العالية والثمن المناسب، لنلبي تطلعات زبنائنا في الحصول على كل ما هو جديد ومبتكر في عالم الإلكترونيات.
            </p>
            
            <h3 className="text-xl font-bold text-[#00d2ff] mt-6">تشكيلتنا المتنوعة من الأجهزة الإلكترونية</h3>
            <p>
              سواء كنت تبحث عن أحدث الساعات الذكية لتتبع نشاطك الرياضي، أو سماعات بلوتوث بجودة صوت خرافية، فإن متجرنا يوفر لك كل ما تحتاجه. نحرص في <strong>Gadget Maghrib</strong> على توفير إكسسوارات الهواتف، الأجهزة الصوتية، والساعات المتطورة التي تناسب جميع الأذواق والاحتياجات. كل منتج في متجرنا يخضع لمعايير صارمة لضمان حصولك على الأفضل دائماً.
            </p>

            <h3 className="text-xl font-bold text-[#00d2ff] mt-6">لماذا تختار Gadget Maghrib للتسوق عبر الإنترنت؟</h3>
            <p>
              التسوق معنا ليس مجرد عملية شراء، بل هو تجربة مميزة. نحن نوفر خدمة التوصيل السريع لجميع المدن المغربية، مع ميزة الدفع عند الاستلام لضمان راحتكم وثقتكم. فريقنا مكرس لتقديم أفضل خدمة عملاء، ومستعد للإجابة على جميع استفساراتكم عبر الواتساب أو الهاتف في أي وقت. نحن نؤمن بأن التكنولوجيا يجب أن تكون متاحة للجميع، ولذلك نسعى دائماً لتقديم عروض وتخفيضات حصرية تجعل من أحلامك التكنولوجية حقيقة.
            </p>

            <p>
              في عالم يتطور بسرعة، يبقى التزامنا في <strong>Gadget Maghrib</strong> ثابتاً تجاه توفير أحدث الابتكارات التقنية بأفضل الأسعار. انضم إلى عائلتنا المتنامية من الزبناء الراضين واكتشف كيف يمكن لأدواتنا الذكية أن تجعل حياتك اليومية أسهل، أكثر تنظيماً، وأكثر متعة. نحن هنا لنرسم معك ملامح المستقبل الرقمي في المغرب.
            </p>

            <p>
              لا تتردد في تصفح مجموعتنا الواسعة واختيار ما يناسب أسلوب حياتك. من الساعات الرياضية إلى الإكسسوارات التقنية المتطورة، كل ما تحتاجه متوفر هنا بضغطة زر واحدة. شكراً لثقتكم في <strong>Gadget Maghrib</strong>، المتجر الذي يفهم احتياجاتكم التكنولوجية.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}