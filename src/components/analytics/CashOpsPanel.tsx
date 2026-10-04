import { AlertTriangle, Clock, PackageX, Wallet, Target, TrendingUp, Zap } from "lucide-react";

const alerts = [
  { icon: Clock, text: "23 طلب NDR معلّق أكثر من 48 ساعة" },
  { icon: Wallet, text: "18,400 ر.س كاش متأخر التسوية لدى سمسا" },
  { icon: PackageX, text: "مخزون منخفض: سماعة X1 (12 قطعة) والإعلانات تعمل" },
];

const cards = [
  { icon: Wallet, title: "كاش معلّق لدى الشحن", value: "62,350", suffix: "ر.س", note: "متوسط التحويل 5 أيام" },
  { icon: Target, title: "تكلفة الطلب المسلّم", value: "31.4", suffix: "ر.س", note: "الحد المسموح 35 ر.س" },
  { icon: TrendingUp, title: "صافي الربح الحقيقي", value: "41,870", suffix: "ر.س", note: "بعد الإعلانات والشحن والمرتجع", highlight: true },
  { icon: Zap, title: "سرعة أول اتصال", value: "14", suffix: "دقيقة", note: "متوسط فريق التأكيد" },
];

export const CashOpsPanel = () => (
  <div className="space-y-4 mb-6">
    <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
      <div className="flex items-center gap-2 mb-3 font-bold text-foreground">
        <AlertTriangle className="w-5 h-5 text-accent" />
        مركز التنبيهات
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {alerts.map((a) => (
          <div key={a.text} className="flex items-center gap-2 rounded-xl bg-card border border-border p-3 text-sm text-foreground">
            <a.icon className="w-4 h-4 text-primary shrink-0" />
            {a.text}
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.title}
          className={`rounded-2xl p-5 border ${c.highlight ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
        >
          <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
            <c.icon className="w-4 h-4" />
            {c.title}
          </div>
          <div className="text-2xl font-bold">
            {c.value} <span className="text-sm font-medium opacity-70">{c.suffix}</span>
          </div>
          <div className={`text-xs mt-1 ${c.highlight ? "opacity-80" : "text-muted-foreground"}`}>{c.note}</div>
        </div>
      ))}
    </div>
  </div>
);
