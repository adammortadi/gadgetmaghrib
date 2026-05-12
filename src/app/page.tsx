"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import CountdownTimer from "@/components/product/CountdownTimer";
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
        <div className="w-full rounded-sm overflow-hidden jumia-shadow mb-4">
          <Image 
            src="/banner.png" 
            alt="Gadget Maghrib Banner - أحدث الأدوات الإلكترونية بأسعار تنافسية" 
            width={1200} 
            height={400} 
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Urgent Offer Banner & Timer */}
        <div className="mb-12">
          <CountdownTimer />
          <div className="bg-[#00d2ff] text-[#0a192f] text-center py-2 font-black uppercase tracking-widest text-xs rounded-b-sm animate-pulse">
            عرض محدود جداً - سالي التايمر كيسالي العرض!
          </div>
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

        <section className="bg-white/5 backdrop-blur-md rounded-sm border border-white/10 p-6 md:p-10 text-white space-y-10 jumia-shadow overflow-hidden">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-[#00d2ff]">مرحباً بكم في Gadget Maghrib - بوابتكم الرائدة لعالم الابتكار والتقنية الرقمية في المغرب</h2>
            <p className="text-gray-200 leading-relaxed text-lg">
              في عالم يتسارع فيه التطور التكنولوجي بشكل مذهل، تبرز منصة <strong>Gadget Maghrib</strong> كشريككم الاستراتيجي والموثوق للحصول على أحدث الابتكارات التقنية في المملكة المغربية. نحن لا نكتفي بكوننا مجرد متجر يبيع أجهزة إلكترونية، بل نعتبر أنفسنا مزودي حلول ذكية تهدف في جوهرها إلى تحسين نمط حياتكم اليومي، وجعل كل تفاصيل يومكم أكثر سهولة، إنتاجية، ومتعة. من طنجة إلى الكويرة، نسعى جاهدين لنكون الواجهة الأولى التي تلبي تطلعات الشباب المغربي الشغوف بكل ما هو جديد في عالم &quot;الجادجيتس&quot;.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#00d2ff]">ساعات ذكية لكل المناسبات - الأناقة والوظيفة في معصمك</h3>
              <p className="text-gray-300 leading-loose">
                سواء كنت رياضياً محترفاً تبحث عن تتبع دقيق ومفصل لكل نشاطك البدني، أو رجل أعمال يحتاج إلى البقاء على اتصال دائم بإشعارات العمل والمكالمات المهمة دون الحاجة لإخراج الهاتف، فإن تشكيلة الساعات المتوفرة لدينا تلبي كافة احتياجاتك بدقة متناهية. نحن في <strong>جادجيت مغرب</strong> نختار منتجاتنا بناءً على معايير صارمة تشمل جودة التصنيع، دقة المستشعرات، وطول عمر البطارية. استمتع بشاشات AMOLED المبهرة التي توفر وضوحاً تاماً حتى تحت أشعة الشمس القوية، واستفد من تقنيات تتبع النوم، قياس مستوى الأكسجين في الدم (SpO2)، ومراقبة نبضات القلب على مدار الساعة. إنها ليست مجرد ساعة، بل هي مساعدك الشخصي الذي يهتم بصحتك وأناقتك في آن واحد.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#00d2ff]">تجربة صوتية غامرة - سماعات تجمع بين النقاء والراحة</h3>
              <p className="text-gray-300 leading-loose">
                الصوت هو لغة الروح والوسيلة الأهم للتواصل والاستمتاع، وفي متجرنا نأخذ هذه اللغة بجدية مطلقة. نقدم لكم تشكيلة مختارة من سماعات بلوتوث (Airpods & Earbuds) التي توفر تجربة عزل ضوضاء (ANC) احترافية، مما يسمح لك بالانغماس في عالمك الخاص حتى في أكثر الأماكن ضجيجاً. جودة الصوت لدينا تتميز بنقاء عالي وباس عميق يرضي أذواق محبي الموسيقى الأكثر تطلباً. بفضل الميكروفونات المتطورة المزودة بتقنيات إلغاء الصدى والذكاء الاصطناعي، ستصبح مكالماتك الهاتفية واجتماعاتك عبر الإنترنت أكثر وضوحاً من أي وقت مضى. تصميماتنا مريحة للأذن وتضمن ثباتاً مثالياً أثناء ممارسة الرياضة أو التنقل اليومي.
              </p>
            </div>
          </div>

          <div className="space-y-6 border-t border-white/10 pt-10">
            <h3 className="text-xl font-bold text-[#00d2ff]">لماذا تختار Gadget Maghrib للتسوق الإلكتروني في المغرب؟</h3>
            <p className="text-gray-200">
              التسوق عبر الإنترنت في السوق المغربي قد يكون مليئاً بالتحديات والمخاوف، ولكن مع <strong>منصتنا</strong>، نحن وضعنا العميل في قلب أولوياتنا لنضمن له تجربة تسوق آمنة وسلسة:
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-300 ml-4">
              <li><strong>الجودة المضمونة والقابلة للفحص:</strong> نقوم بفحص كل قطعة إلكترونية يدوياً قبل تغليفها وشحنها للتأكد من أنها تعمل بكفاءة 100%.</li>
              <li><strong>أفضل قيمة مقابل السعر:</strong> بفضل علاقاتنا المباشرة والمستمرة مع كبار الموردين العالميين، نستطيع توفير أحدث الموديلات بأثمنة تنافسية جداً تناسب القدرة الشرائية للمغاربة.</li>
              <li><strong>خدمة توصيل سريعة وموثوقة:</strong> ندرك أنكم متحمسون لتجربة أجهزتكم الجديدة، لذا نعتمد على شبكة لوجستية تغطي كافة ربوع المملكة لضمان وصول الطلبات في وقت قياسي (24-48 ساعة).</li>
              <li><strong>سياسة الدفع عند الاستلام (COD):</strong> نحن لا نطلب منكم الدفع مسبقاً؛ ثقتنا في منتجاتنا تجعلنا نمنحكم حق المعاينة والدفع فقط عند استلام المنتج بين أيديكم.</li>
              <li><strong>دعم فني متخصص:</strong> فريقنا متاح دائماً للإجابة على استفساراتكم التقنية ومساعدتكم في اختيار الجهاز الأنسب لاحتياجاتكم عبر الواتساب.</li>
            </ul>
          </div>

          {/* New Content Section: Gifting Guide */}
          <div className="grid md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#00d2ff]">أفكار هدايا تقنية - اجعل أحباءك يشعرون بالتميز</h3>
              <p className="text-gray-300 leading-relaxed">
                هل تبحث عن هدية مثالية لعيد ميلاد، ذكرى زواج، أو نجاح دراسي؟ الجادجيتس هي دائماً الخيار الأمثل. في <strong>Gadget Maghrib</strong>، نوفر لك خيارات متنوعة تناسب الرجال والنساء من جميع الأعمار. الساعة الذكية هي هدية تهتم بالصحة، والسماعات اللاسلكية هي هدية تهتم بالاستمتاع، بينما الإكسسوارات المبتكرة تعبر عن اهتمامك بالتفاصيل. نحن نساعدك في اختيار الهدية التي ستبقى مع أحبائك وتذكرهم بك في كل مرة يستخدمونها فيها. يمكنك تصفح <Link href="/categories" className="text-[#00d2ff] underline">تصنيفاتنا</Link> المختلفة للعثور على ما يناسب ميزانيتك وذوقك.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#00d2ff]">مستقبل التكنولوجيا في المغرب - توجهات 2026</h3>
              <p className="text-gray-300 leading-relaxed">
                التكنولوجيا لا تتوقف، ونحن في متجرنا نواكب هذا التطور يوماً بيوم. في عام 2026، نتوقع زيادة الاعتماد على أجهزة المنزل الذكي، الساعات المزودة بتقنيات الذكاء الاصطناعي المتقدمة، وأدوات المحتوى الرقمي. نحن ملتزمون بجلب هذه التقنيات فور صدورها عالمياً لتكون بين أيدي المغاربة. هدفنا هو جعل المواطن المغربي دائماً في طليعة المستخدمين للتقنيات الحديثة، من خلال توفير منتجات تسهل العمل عن بعد، تحسن جودة النوم، وتزيد من فعالية التدريبات الرياضية.
              </p>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-lg space-y-6 border border-white/5 shadow-2xl">
            <h3 className="text-2xl font-bold text-[#00d2ff] text-center mb-8">الأسئلة الأكثر شيوعاً عند زبنائنا (FAQ)</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white text-lg flex items-center gap-2">
                    <span className="h-6 w-6 bg-[#00d2ff] text-[#0a192f] rounded-full flex items-center justify-center text-xs">1</span>
                    كيف يمكنني تتبع حالة طلبي؟
                  </h4>
                  <p className="text-gray-400 text-sm mt-2 mr-8 leading-relaxed">
                    عملية التتبع لدينا بسيطة جداً. بمجرد تأكيد طلبك، ستحصل على رقم فريد. يمكنك الدخول إلى صفحة <Link href="/track" className="text-[#00d2ff] hover:underline">تتبع الطلب</Link> وإدخال الرقم لمعرفة مكان شحنتك بالضبط في أي لحظة.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg flex items-center gap-2">
                    <span className="h-6 w-6 bg-[#00d2ff] text-[#0a192f] rounded-full flex items-center justify-center text-xs">2</span>
                    هل جميع المنتجات أصلية ومضمونة؟
                  </h4>
                  <p className="text-gray-400 text-sm mt-2 mr-8 leading-relaxed">
                    بكل تأكيد. نحن نتعامل مباشرة مع المصنعين والوكلاء المعتمدين لضمان أصالة كل قطعة. كل منتج يأتي مع ضمان الجودة الخاص بمتجرنا، مما يضمن لك راحة البال التامة.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white text-lg flex items-center gap-2">
                    <span className="h-6 w-6 bg-[#00d2ff] text-[#0a192f] rounded-full flex items-center justify-center text-xs">3</span>
                    ما هي مدة التوصيل المتوقعة؟
                  </h4>
                  <p className="text-gray-400 text-sm mt-2 mr-8 leading-relaxed">
                    بالنسبة للمدن الكبرى مثل الدار البيضاء، الرباط، وطنجة، غالباً ما يتم التوصيل خلال 24 ساعة. بالنسبة لباقي المدن والقرى، قد تستغرق العملية من 48 إلى 72 ساعة عمل كحد أقصى.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg flex items-center gap-2">
                    <span className="h-6 w-6 bg-[#00d2ff] text-[#0a192f] rounded-full flex items-center justify-center text-xs">4</span>
                    كيف أتواصل معكم في حال وجود مشكلة؟
                  </h4>
                  <p className="text-gray-400 text-sm mt-2 mr-8 leading-relaxed">
                    نحن دائماً في خدمتكم. يمكنك زيارة صفحة <Link href="/contact" className="text-[#00d2ff] hover:underline">اتصل بنا</Link> أو مراسلتنا مباشرة عبر أيقونة الواتساب الظاهرة في الموقع للحصول على دعم فني فوري.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* New Extensive SEO Content: Choosing the right tech */}
          <div className="grid md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#00d2ff]">دليل اختيار الساعة الذكية المناسبة - كيف تقرر؟</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                مع تنوع الخيارات في سوق الساعات الذكية بالمغرب، قد يكون من الصعب اتخاذ القرار الصحيح. في <strong>Gadget Maghrib</strong>، ننصحك دائماً بالنظر في ثلاثة عوامل أساسية: التوافق، البطارية، والوظائف الصحية. إذا كنت تستخدم هاتف أندرويد أو آيفون، تأكد من أن الساعة تدعم نظامك بالكامل لتلقي الإشعارات والتحكم في الموسيقى. لمحبي المغامرات الطويلة، ابحث عن الساعات التي توفر بطارية تدوم لأكثر من أسبوع. أما إذا كان هدفك هو تتبع اللياقة، فركز على الساعات التي تحتوي على مستشعرات متطورة لقياس نبضات القلب ومستوى الأكسجين. تذكر أن الساعة الذكية هي استثمار في صحتك قبل أن تكون مجرد إكسسوار.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#00d2ff]">تأثير التكنولوجيا الصوتية على الإنتاجية والتركيز</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                هل تعلم أن السماعة المناسبة يمكن أن تزيد من إنتاجيتك بنسبة تصل إلى 20%؟ خاصة لمن يعملون في بيئات مفتوحة أو يدرسون في أماكن مزدوجة. تقنية عزل الضوضاء النشط (ANC) المتوفرة في سماعاتنا تسمح لك بخلق مساحة من الهدوء المطلق أينما كنت. من خلال تقليل المشتتات الخارجية، يمكنك التركيز بشكل أفضل على مهامك أو الاستمتاع بمحتواك التعليمي بوضوح تام. نحن نوفر خيارات تدعم تقنيات الصوت المحيطي والربط المتعدد بالأجهزة، مما يسهل الانتقال بين مكالمات الهاتف واجتماعات الحاسوب بسلاسة. الصوت النقي ليس ترفاً، بل هو أداة عمل أساسية في العصر الرقمي.
              </p>
            </div>
          </div>

          <div className="space-y-6 border-t border-white/10 pt-10">
            <h3 className="text-xl font-bold text-[#00d2ff]">مستقبل المنزل الذكي في المغرب - رفاهية أصبحت ضرورة</h3>
            <p className="text-gray-300 text-sm leading-loose">
              لم يعد مفهوم &quot;المنزل الذكي&quot; مقتصرأ على أفلام الخيال العلمي، بل أصبح واقعاً نعيشه اليوم في المغرب. في <strong>متجر جادجيت مغرب</strong>، نوفر لكم لبنات الأساس لبناء منزل ذكي يبدأ من الإضاءة المتحكم فيها عن بعد، مروراً بالكاميرات الأمنية المتصلة بالإنترنت، وصولاً إلى أجهزة الاستشعار التي تحمي منزلك. الهدف من هذه التقنيات هو توفير الطاقة، زيادة الأمان، والأهم من ذلك، منحك راحة البال. تخيل أنك تستطيع التحكم في مكيف الهواء أو التأكد من إغلاق الأبواب وأنت لا تزال في عملك عبر هاتفك الذكي. نحن هنا لنجعل هذا الانتقال نحو حياة أكثر ذكاءً سهلاً ومتاحاً لكل مغربي ومغربية يبحثون عن التطوير والتميز.
            </p>
          </div>

          <div className="space-y-6 border-t border-white/10 pt-10">
            <h3 className="text-xl font-bold text-[#00d2ff]">لماذا نركز على جودة البطارية في أجهزتنا اللاسلكية؟</h3>
            <p className="text-gray-300 text-sm leading-loose">
              في بلد ديناميكي مثل المغرب، لا أحد يملك الوقت لشحن أجهزته كل ساعتين. لهذا السبب، نضع عمر البطارية في مقدمة أولوياتنا عند اختيار المنتجات لمتجرنا. سواء كانت سماعات Airpods التي توفر أكثر من 30 ساعة من التشغيل مع علبة الشحن، أو ساعات ذكية تصمد لأسابيع، فنحن نضمن لك ألا تخذلك أجهزتك في منتصف يومك المزدحم. نستخدم في منتجاتنا أحدث تقنيات الليثيوم-أيون ورقائق إدارة الطاقة الموفرة للجهد، مما يضمن لك أداءً مستقراً وطويلاً على المدى البعيد. الجودة بالنسبة لنا تعني الاعتمادية، والاعتمادية تبدأ من بطارية قوية ترافقك في كل خطوة.
            </p>
          </div>
          <div className="space-y-6 border-t border-white/10 pt-10">
            <h3 className="text-xl font-bold text-[#00d2ff]">التزامنا الراسخ تجاه المجتمع الرقمي المغربي</h3>
            <p className="text-gray-300 text-sm leading-loose">
              نحن في <strong>Gadget Maghrib</strong> نؤمن بعمق بأن الوصول إلى التكنولوجيا المتقدمة والحلول الذكية يجب أن يكون حقاً متاحاً للجميع في المغرب، وليس مجرد رفاهية تقتصر على فئة معينة. من خلال توفير إكسسوارات الهواتف الذكية عالية الجودة، الأجهزة اللوحية للأطفال والطلاب، وأدوات المنزل الذكي بأسعار مدروسة ومعقولة، نحن نساهم بشكل فعال في سد الفجوة الرقمية وتمكين المواطن المغربي من الاستفادة القصوى من عصر المعلومات. نحن فخورون للغاية بأن نكون جزءاً من رحلتكم التقنية الشخصية، ونسعى دائماً لنكون الاسم الأول والأكثر ثقة الذي يخطر ببالكم عند الرغبة في اقتناء أي &quot;أداة ذكية&quot; جديدة تخدم غرضاً معيناً في حياتكم.
            </p>
            <p className="text-gray-300 text-sm leading-loose">
              شكراً جزيلاً لآلاف الزبناء الذين وضعوا ثقتهم فينا منذ انطلاقنا. نحن نعاهدكم على الاستمرار في البحث الدؤوب عن أكثر المنتجات ابتكاراً وإثارة في العالم وجلبها لكم مباشرة إلى عتبة داركم في المغرب. ابقوا على اتصال دائم معنا، وتابعوا تحديثات متجرنا باستمرار لتكونوا أول من يستفيد من عروضنا الحصرية وتخفيضاتنا الموسمية التي لا تنتهي. إن رحلتكم نحو حياة أكثر ذكاءً، عصريةً، وفعالية تبدأ بضغطة زر واحدة هنا في <strong>متجر جادجيت مغرب</strong>. نحن هنا لخدمتكم، ولنجعل من التكنولوجيا تجربة ممتعة وبسيطة للجميع. لا تترددوا في استكشاف <Link href="/products" className="text-[#00d2ff] font-bold">كامل تشكيلة المنتجات</Link> المتوفرة لدينا حالياً واستمتعوا بأفضل العروض في السوق.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
