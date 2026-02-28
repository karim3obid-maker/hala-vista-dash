import { CheckCircle2, Globe, Package, Truck, Phone, Wallet, ShoppingBag, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import halaLogo from "@/assets/hala-logo.png";
import halaHero from "@/assets/hala-hero.png";

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
        <div className="relative overflow-hidden rounded-3xl mb-10" style={{ background: "linear-gradient(135deg, hsl(256 58% 20%) 0%, hsl(256 58% 30%) 40%, hsl(18 100% 55%) 100%)" }}>
          {/* Decorative blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-20" style={{ background: "hsl(18 100% 60%)" }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "hsl(256 58% 50%)" }} />
            <div className="absolute top-1/2 left-1/3 w-60 h-60 rounded-full blur-3xl opacity-15" style={{ background: "hsl(18 100% 60%)" }} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-10 md:p-16">
            {/* Text content */}
            <div className="flex-1 text-right">
              {/* Logo */}
              <div className="flex items-center gap-4 justify-end mb-8">
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-primary-foreground">Hala Kommers</span>
                  <span className="text-xs text-primary-foreground/60">halakommers.com</span>
                </div>
                <img src={halaLogo} alt="Hala Kommers Logo" className="w-14 h-14 rounded-2xl shadow-lg" />
              </div>

              <div className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-medium border" style={{ background: "hsla(0 0% 100% / 0.1)", borderColor: "hsla(0 0% 100% / 0.2)", color: "hsl(0 0% 100%)" }}>
                شريكك للتوسع في الخليج 🚀
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-primary-foreground">
                طلب ثابت
                <br />
                <span style={{ color: "hsl(18 100% 60%)" }}>مش تريند يومين.</span>
              </h1>
              
              <p className="text-lg md:text-xl leading-relaxed mb-4 text-primary-foreground/90">
                هلا تشغّل معاك التجارة بالكامل:
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {services.map((s) => (
                  <span key={s.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm border" style={{ background: "hsla(0 0% 100% / 0.08)", borderColor: "hsla(0 0% 100% / 0.12)", color: "hsl(0 0% 100%)" }}>
                    <s.icon className="w-4 h-4" />
                    {s.label}
                  </span>
                ))}
              </div>

              <p className="text-base mb-4 text-primary-foreground/70">علشان تكبر بسرعة في:</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {countries.map((c) => (
                  <span key={c} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "hsla(18 100% 60% / 0.2)", color: "hsl(18 100% 70%)", border: "1px solid hsla(18 100% 60% / 0.3)" }}>
                    {c}
                  </span>
                ))}
              </div>

              <Button size="lg" className="rounded-xl px-8 h-12 text-base font-bold shadow-xl" style={{ background: "hsl(18 100% 55%)", color: "white" }}>
                ابدأ الآن
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </div>

            {/* Hero Image */}
            <div className="hidden md:flex flex-shrink-0 items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30" style={{ background: "hsl(18 100% 60%)" }} />
                <img src={halaHero} alt="Hala Kommers" className="relative w-[320px] h-auto rounded-3xl shadow-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Bullets Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {bullets.map((bullet, i) => (
            <Card key={i} className="rounded-2xl border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ borderRight: "4px solid hsl(18 100% 60%)" }}>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1" style={{ background: "hsla(256 58% 35% / 0.1)" }}>
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
              <Card key={s.label} className="rounded-2xl border-border group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" style={{ borderBottom: "3px solid transparent" }} onMouseEnter={e => (e.currentTarget.style.borderBottomColor = "hsl(18 100% 60%)")} onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "transparent")}>
                <CardContent className="p-5 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all" style={{ background: "linear-gradient(135deg, hsla(256 58% 35% / 0.1), hsla(18 100% 60% / 0.1))" }}>
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
