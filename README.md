# Hala Analytics Vision

ولا يهمك — ده **تصميم واجهة (UI Spec + Wireframe وصفي)** لصفحة الـAnalytics لهلا كوميرس “تصميم بس” بدون كود. تقدر تديه لأي ديزاينر على طول (Figma/Sketch).

# تخطيط الصفحة (RTL)

* **Header لاصق للفلاتر** (80px):

  * المدة (اليوم/7/30/مخصص) • القناة • الدولة/المدينة • شركة الشحن • المنتج/التصنيف • طريقة الدفع • Toggle “إيراد بعد التسليم”.
* **صف KPIs (بطاقات 6)** في Grid 3×2 على الديسكتوب، 2×3 على التابلت:

  1. معدل التأكيد ٪
  2. معدل التسليم ٪
  3. معدل الإلغاء ٪
  4. معدل المرتجعات ٪
  5. المبيعات (Revenue)
  6. الربح الصافي (Net Profit)

  * كل بطاقة: عنوان صغير، رقم كبير، مؤشّر مقارنة (▲/▼)، Tooltip للتعريف.
* **شبكة الرسوم** (صفّان):

  * يسار: Line مزدوج (Confirm% / Deliver%) عبر الزمن.
  * يمين: Stacked Bar لحالات الطلب يوميًا.
  * يسار: Bar “أسباب الكنسل (Top)”.
  * يمين: Bar “أسباب المرتجعات/فشل الشحن (Top)” مع فلتر شركة الشحن مصغّر داخل الودجت.
* **جداول تحت** (Tabbed Section بثلاث تبويبات):

  * التبويب 1: “المنتجات”

    * جدول 1: أهم المنتجات مبيعًا (المنتج | SKU | عدد الطلبات | الكمية | الإيراد | هامش الربح | % إلغاء).
    * جدول 2: المنتجات الأعلى إلغاءً (المنتج | الإلغاءات | إجمالي الطلبات | % إلغاء | ملاحظة).
  * التبويب 2: “المناطق”

    * جدول: المدن الأعلى توصيلًا (المدينة | تم التسليم | إجمالي الطلبات | معدل التسليم | متوسط زمن التوصيل).
    * خريطة/Heat خفيفة على اليمين (اختياري).
  * التبويب 3: “الأسباب”

    * جدول: أسباب الكنسل (السبب | العدد | النسبة | الاتجاه).
    * جدول: أسباب المرتجعات (السبب | العدد | النسبة | شركة الشحن الأكثر تأثرًا).
* **Footer Actions**: حفظ العرض • تصدير CSV/XLSX/PDF • جدولة تقرير أسبوعي.

# أسلوب بصري (هلا)

* **خط:** Cairo (عناوين: وزن 700، نص: 400/500).
* **ألوان:**

  * Primary: #6E41FF (بنفسجي هلا)
  * Accent: #FF7A00 (برتقالي)
  * نص رئيسي: #0F172A، ثانوي: #64748B
  * خلفية البطاقات: #FFFFFF على خلفية صفحة #F7F7FB
* **بطاقات:** Radius 16–20px، ظل خفيف (0,6,18,0.06)، حواف داخلية 20–24px.
* **مسافات:** Grid 24px بين العناصر، 16px داخل الجداول.
* **أيقونات:** Lucide أو Fluent، حجم 20–24px بلون ثانوي.
* **حالات:**

  * Loading: Shimmer skeleton للبطاقات/المخططات.
  * Empty: رسالة قصيرة + زر “تغيير الفلاتر”.
  * Error: Banner علوي (أحمر باهت) مع زر “إعادة المحاولة”.

# حالات تفاعلية

* **ضغط على KPI/شريحة/صف جدول** → يفتح Drawer من اليسار بعرض 520px فيه جدول تفصيلي مع نفس الفلاتر + زر تصدير.
* **Hover على النقاط/الأعمدة** → Tooltip يظهر القيمة والفرق عن الفترة السابقة.
* **Pinned Filters** تُظهر شِيب صغير على كل ودجت عند اختلاف الفلتر المحلي عن العام.

# نصوص وعناوين مقترحة (عربي)

* KPIs:

  * “معدل التأكيد” • “معدل التسليم” • “معدل الإلغاء” • “معدل المرتجعات” • “إجمالي المبيعات” • “الربح الصافي”
* مخططات:

  * “المعدلات عبر الزمن” • “حالات الطلب اليومية” • “أهم أسباب الإلغاء” • “أهم أسباب المرتجعات”
* تبويبات:

  * “المنتجات” • “المناطق” • “الأسباب”
* أزرار:

  * “تصدير” • “حفظ العرض” • “جدولة التقرير” • “إعادة المحاولة”

# مواصفات الجداول (أعمدة + محاذاة)

* الأرقام بمحاذاة يمين، العملات بـ SAR/AED/EGP حسب الفلتر.
* أعمدة قابلة للإخفاء من قائمة ثلاث نقاط • شريط بحث أعلى كل جدول • صفوف 48px ارتفاعًا.

## جدول “أهم المنتجات مبيعًا”

* المنتج (صورة مصغّرة 32px + اسم)
* SKU
* عدد الطلبات
* الكمية المباعة
* الإيراد
* هامش الربح
* % إلغاء (Badge لون أحمر/كهرماني حسب العتبة)

## جدول “المدن الأعلى توصيلًا”

* المدينة
* تم التسليم
* إجمالي الطلبات
* معدل التسليم
* متوسط زمن التوصيل (اختياري)

# قياسات سريعة (للتطبيق البصري)

* عرض المحتوى: 1200–1280px.
* ارتفاع بطاقات KPI: 120–140px.
* ارتفاع ودجت الرسم: 320–360px.
* تبويبات الجداول: 48px، ارتفاع صف الجدول: 48px.

# نسخ شاشة (Breakpoints)

* **Desktop ≥1280px:** التخطيط الكامل.
* **Tablet 768–1279px:** KPIs صفّين 2×3، الرسوم صفّين بعرض كامل، الجداول بعرض كامل.
* **Mobile:** (اختياري لاحقًا) تظهر KPIs كقائمة ومخططات مصغّرة، الجداول بتمرير أفقي.

# حزمة التسليم للمصمم (Figma)

* Page: `Hala Commerce / Analytics`
* Sections: Filters • KPIs • Charts • Tables • Footer
* Components:

  * `KPI/Card` مع Variants (up/down/neutral)
  * `Chart/Line`, `Chart/StackedBar`, `Chart/Bar`, `Map/Heat`
  * `Table/Default` مع Header/Row/Empty/Error
  * `Filter/Chip`, `Filter/Dropdown`, `Toggle`
* Styles: Color tokens + Text styles (H1/H2/Body/Caption) + Elevations.

لو حابب أحوّل الكلام ده إلى **Wireframe مرسوم على الكانفس** أو **لوحة Figma-ready checklist** بعناوين الجروب/الفرامز، قولي وأنا أجهّزها فورًا ✨.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hala-vista-dash.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/34b458db-ab5a-476d-9c23-16a3323c4a63).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
