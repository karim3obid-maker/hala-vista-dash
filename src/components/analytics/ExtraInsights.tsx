import { TrendingUp, TrendingDown, Package, Zap, CalendarRange } from "lucide-react";

const products = [
  { name: "حقيبة جلد طبيعي", orders: 245, delivery: 89.8, ads: 7200, net: 9863 },
  { name: "ساعة كلاسيكية", orders: 198, delivery: 93.4, ads: 6100, net: 18848 },
  { name: "عطر فاخر", orders: 176, delivery: 81.2, ads: 8900, net: 4120 },
  { name: "سماعة X1", orders: 142, delivery: 72.5, ads: 9400, net: -1350 },
];

const agents = [
  { name: "أحمد محمد", minutes: 5, rate: 80.8 },
  { name: "سارة أحمد", minutes: 9, rate: 85.6 },
  { name: "محمد علي", minutes: 22, rate: 74.1 },
  { name: "نورة خالد", minutes: 13, rate: 82.3 },
];

const comparison = [
  { label: "الطلبات الواردة", current: "1,284", prev: "1,190", change: 7.9 },
  { label: "معدل التأكيد", current: "87.5%", prev: "84.3%", change: 3.2 },
  { label: "معدل التسليم", current: "76.8%", prev: "78.1%", change: -1.3 },
  { label: "صافي الربح", current: "41,870 ر.س", prev: "37,520 ر.س", change: 11.6 },
];

const fmt = (n: number) => n.toLocaleString("en-US");

const Section = ({ icon: Icon, title, children }: any) => (
  <section className="rounded-2xl bg-card border border-border p-5">
    <h2 className="flex items-center gap-2 font-bold text-foreground mb-4">
      <Icon className="w-5 h-5 text-primary" />
      {title}
    </h2>
    {children}
  </section>
);

export const ExtraInsights = () => (
  <div className="space-y-6 mb-8">
    <Section icon={CalendarRange} title="مقارنة بالفترة السابقة (آخر 7 أيام مقابل الـ 7 أيام قبلها)">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {comparison.map((c) => {
          const up = c.change >= 0;
          return (
            <div key={c.label} className="rounded-xl bg-muted/40 p-4">
              <div className="text-sm text-muted-foreground">{c.label}</div>
              <div className="text-xl font-bold text-foreground mt-1">{c.current}</div>
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className={`flex items-center gap-1 font-bold ${up ? "text-success" : "text-destructive"}`}>
                  {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(c.change)}%
                </span>
                <span className="text-muted-foreground">سابقاً {c.prev}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>

    <Section icon={Package} title="المنتجات والمالية (جدول موحد)">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="text-muted-foreground border-b border-border">
            <tr>
              <th className="py-3 font-medium">المنتج</th>
              <th className="py-3 font-medium">الطلبات</th>
              <th className="py-3 font-medium">نسبة التسليم</th>
              <th className="py-3 font-medium">الصرف الإعلاني</th>
              <th className="py-3 font-medium">صافي الربح الحقيقي</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.name} className={`border-b border-border/50 ${i % 2 ? "bg-muted/30" : ""}`}>
                <td className="py-3 font-medium text-foreground">{p.name}</td>
                <td className="py-3">{p.orders}</td>
                <td className="py-3">{p.delivery}%</td>
                <td className="py-3">{fmt(p.ads)} ر.س</td>
                <td className={`py-3 font-bold ${p.net < 0 ? "text-destructive" : "text-success"}`}>
                  {fmt(p.net)} ر.س {p.net < 0 && "· خسارة"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>

    <Section icon={Zap} title="سرعة أول اتصال لموظفي التأكيد">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((a) => {
          const fast = a.minutes <= 15;
          return (
            <div key={a.name} className="rounded-xl border border-border p-4">
              <div className="font-medium text-foreground">{a.name}</div>
              <div className="flex items-center justify-between mt-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    fast ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                  }`}
                >
                  {a.minutes} دقيقة {fast ? "· سريع" : "· متأخر"}
                </span>
                <span className="text-xs text-muted-foreground">تأكيد {a.rate}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  </div>
);
