import { CheckCircle2, Globe, Package, Truck, Phone, Wallet, ShoppingBag, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Package, label: "استيراد / توريد" },
  { icon: ShoppingBag, label: "تخزين وفلفلمنت" },
  { icon: Phone, label: "تأكيد طلبات" },
  { icon: Truck, label: "شحن وتوصيل" },
  { icon: Wallet, label: "تحصيل COD" },
  { icon: Globe, label: "تشغيل براند & دروبشيبنج" },
];

const countries = ["السعودية", "الإمارات", "الكويت", "قطر", "البحرين", "عمان"];

const bullets = [
  "تشغيل End-to-End من أول الطلب لحد التحصيل والتسوية",
  "شبكة خدمات + متابعة واحدة (طلبات، حالات، تحصيل، مشاكل، تقارير)",
  "ابدأ بدولة واحدة وخلي التوسع لباقي الخليج يبقى نفس البروسس",
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-[1280px] mx-auto px-6 py-8">

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-bl from-primary via-primary/90 to-accent p-10 md:p-16 mb-10 text-primary-foreground">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl mr-auto text-right">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-foreground/15 text-sm font-medium backdrop-blur-sm border border-primary-foreground/20">
              شريكك للتوسع في الخليج 🚀
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Hala Kommers
              <br />
              <span className="text-accent">مش مجرد شركة شحن.</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-90 mb-4">
              هلا تشغّل معاك التجارة بالكامل:
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {services.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-foreground/10 text-sm backdrop-blur-sm border border-primary-foreground/10">
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </span>
              ))}
            </div>
            <p className="text-base opacity-80 mb-6">
              علشان تكبر بسرعة في:
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {countries.map((c) => (
                <span key={c} className="px-4 py-2 rounded-xl bg-primary-foreground/15 text-sm font-semibold backdrop-blur-sm">
                  {c}
                </span>
              ))}
            </div>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-8 h-12 text-base font-bold shadow-lg">
              ابدأ الآن
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </div>
        </div>

        {/* 3 Bullets Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {bullets.map((bullet, i) => (
            <Card key={i} className="rounded-2xl border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <p className="text-base font-medium text-foreground leading-relaxed">{bullet}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">خدماتنا المتكاملة</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((s) => (
              <Card key={s.label} className="rounded-2xl border-border group hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-5 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{s.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;
