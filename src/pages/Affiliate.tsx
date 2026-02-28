import { useState } from "react";
import { Users, Copy, Check, Wallet, UserPlus, DollarSign, Package, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const affiliateLink = "https://hala-commerce.com/ref/ahmed-2026";

const affiliateAccounts = [
  { id: 1, name: "محمد علي", date: "2026-01-15", deliveredOrders: 42, commission: 1260 },
  { id: 2, name: "سارة أحمد", date: "2026-01-22", deliveredOrders: 28, commission: 840 },
  { id: 3, name: "خالد العمري", date: "2026-02-03", deliveredOrders: 15, commission: 450 },
  { id: 4, name: "نورة الحربي", date: "2026-02-10", deliveredOrders: 8, commission: 240 },
  { id: 5, name: "عبدالله السيد", date: "2026-02-20", deliveredOrders: 3, commission: 90 },
];

const totalCommission = affiliateAccounts.reduce((s, a) => s + a.commission, 0);
const withdrawableBalance = 1950;

const statsCards = [
  { label: "الرصيد القابل للسحب", value: withdrawableBalance, icon: Wallet, color: "text-emerald-500", bgColor: "bg-emerald-500/10", suffix: "ر.س" },
  { label: "عدد الحسابات المسجلة", value: affiliateAccounts.length, icon: UserPlus, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { label: "إجمالي العمولات", value: totalCommission, icon: DollarSign, color: "text-amber-500", bgColor: "bg-amber-500/10", suffix: "ر.س" },
];

export default function Affiliate() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast.success("تم نسخ الرابط بنجاح");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">الأفلييت</h1>
          <p className="text-xs text-muted-foreground">شارك رابطك واحصل على عمولة من كل طلب مسلم</p>
        </div>
      </div>

      {/* Affiliate Link */}
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm font-medium text-foreground mb-2">رابط الإحالة الخاص بك</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-muted-foreground font-mono truncate select-all" dir="ltr">
            {affiliateLink}
          </div>
          <Button size="sm" onClick={handleCopy} className="shrink-0 gap-1.5">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "تم النسخ" : "نسخ"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {statsCards.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/20 transition-all flex-row-reverse">
              <div className={`p-2.5 rounded-lg ${item.bgColor} shrink-0`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="min-w-0 text-right flex-1">
                <p className="text-xl font-bold text-foreground leading-tight">
                  {item.suffix && <span className="text-xs font-medium text-muted-foreground ml-1">{item.suffix}</span>}
                  {item.value.toLocaleString("ar-SA")}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accounts Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-border flex-row-reverse">
          <div className="p-1.5 rounded-lg bg-primary">
            <Users className="w-4 h-4 text-primary-foreground" />
          </div>
          <h3 className="text-sm font-bold text-foreground">الحسابات المسجلة</h3>
          <span className="text-[10px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
            {affiliateAccounts.length} حساب
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs">اسم الحساب</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs">تاريخ التسجيل</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs">الطلبات المسلمة</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs">العمولة</th>
              </tr>
            </thead>
            <tbody>
              {affiliateAccounts.map((acc) => (
                <tr key={acc.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 text-foreground text-xs font-medium">{acc.name}</td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{acc.date}</td>
                  <td className="py-3 px-4 text-xs">
                    <span className="inline-flex items-center gap-1 text-foreground">
                      <Package className="w-3 h-3 text-muted-foreground" />
                      {acc.deliveredOrders}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-bold text-emerald-500">{acc.commission.toLocaleString()} ر.س</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
