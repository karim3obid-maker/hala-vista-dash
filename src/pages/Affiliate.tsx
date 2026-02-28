import { useState } from "react";
import { Users, Copy, Check, Wallet, UserPlus, DollarSign, Package, ArrowDownToLine, Clock, CreditCard, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const affiliateLink = "https://hala-commerce.com/ref/ahmed-2026";

const affiliateAccounts = [
  { id: 1, name: "محمد علي", date: "2026-01-15", deliveredOrders: 42, commission: 1260 },
  { id: 2, name: "سارة أحمد", date: "2026-01-22", deliveredOrders: 28, commission: 840 },
  { id: 3, name: "خالد العمري", date: "2026-02-03", deliveredOrders: 15, commission: 450 },
  { id: 4, name: "نورة الحربي", date: "2026-02-10", deliveredOrders: 8, commission: 240 },
  { id: 5, name: "عبدالله السيد", date: "2026-02-20", deliveredOrders: 3, commission: 90 },
];

const totalCommission = affiliateAccounts.reduce((s, a) => s + a.commission, 0);
const totalDeliveredOrders = affiliateAccounts.reduce((s, a) => s + a.deliveredOrders, 0);
const withdrawableBalance = 1950;
const pendingBalance = 930;

export default function Affiliate() {
  const [copied, setCopied] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast.success("تم نسخ الرابط بنجاح");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdraw = () => {
    const amount = Number(withdrawAmount);
    if (!amount || amount <= 0) {
      toast.error("أدخل مبلغ صحيح");
      return;
    }
    if (amount > withdrawableBalance) {
      toast.error("المبلغ أكبر من الرصيد القابل للسحب");
      return;
    }
    if (!withdrawMethod) {
      toast.error("اختر وسيلة السحب");
      return;
    }
    toast.success(`تم طلب سحب ${amount.toLocaleString()} ر.س بنجاح`);
    setWithdrawOpen(false);
    setWithdrawAmount("");
    setWithdrawMethod("");
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

      {/* Top Row: Link + Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Affiliate Link */}
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-bold text-foreground mb-1">لينك الإحالة</p>
          <p className="text-[11px] text-muted-foreground mb-3">شارك الرابط ده مع التجار/السيلرز. أي تسجيل منه هيتسجل تحتك.</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-muted-foreground font-mono truncate select-all" dir="ltr">
              {affiliateLink}
            </div>
            <Button onClick={handleCopy} className="shrink-0 gap-1.5">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "تم النسخ" : "نسخ الرابط"}
            </Button>
          </div>
          <div className="mt-4 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-center">
            <p className="text-lg font-bold text-primary">💰 مع كل طلب مُسلَّم هتاخد <span className="text-2xl font-extrabold">0.25$</span> عمولة!</p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-bold text-foreground mb-3">الرصيد</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl border border-border p-3 text-center">
              <p className="text-[11px] text-muted-foreground mb-1">الرصيد القابل للسحب</p>
              <span className="inline-block text-[10px] font-medium bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full mb-1">متاح</span>
              <p className="text-2xl font-bold text-foreground">{withdrawableBalance.toLocaleString()} <span className="text-sm">ر.س</span></p>
            </div>
            <div className="rounded-xl border border-border p-3 text-center">
              <p className="text-[11px] text-muted-foreground mb-1">قيد المعالجة</p>
              <span className="inline-block text-[10px] font-medium bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full mb-1">معلق</span>
              <p className="text-2xl font-bold text-foreground">{pendingBalance.toLocaleString()} <span className="text-sm">ر.س</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setWithdrawOpen(true)} className="gap-1.5 flex-1">
              <ArrowDownToLine className="w-4 h-4" />
              طلب سحب
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">* التسوية بتتم بعد مدة (مثلاً ٧–١٤ يوم) لتفادي المرتجعات.</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <p className="text-sm font-bold text-foreground mb-3">إحصائيات سريعة</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-[11px] text-muted-foreground mb-1">عدد الحسابات اللي سجلت</p>
            <span className="inline-block text-[10px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full mb-1">تسجيلات</span>
            <p className="text-3xl font-bold text-foreground">{affiliateAccounts.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-[11px] text-muted-foreground mb-1">عدد الطلبات المُسلمة</p>
            <span className="inline-block text-[10px] font-medium bg-destructive/10 text-destructive px-2 py-0.5 rounded-full mb-1">مُسلمة</span>
            <p className="text-3xl font-bold text-foreground">{totalDeliveredOrders}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-[11px] text-muted-foreground mb-1">إجمالي عمولاتي</p>
            <span className="inline-block text-[10px] font-medium bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full mb-1">أرباح</span>
            <p className="text-3xl font-bold text-foreground">{totalCommission.toLocaleString()} <span className="text-sm">ر.س</span></p>
          </div>
        </div>
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

      {/* Withdraw Dialog */}
      <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">طلب سحب الرصيد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <p className="text-sm text-muted-foreground mb-1">الرصيد المتاح: <span className="font-bold text-foreground">{withdrawableBalance.toLocaleString()} ر.س</span></p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">المبلغ المطلوب سحبه</label>
              <Input
                type="number"
                placeholder="أدخل المبلغ"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="text-right"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">وسيلة السحب</label>
              <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر وسيلة السحب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">
                    <span className="flex items-center gap-2"><Banknote className="w-4 h-4" /> تحويل بنكي</span>
                  </SelectItem>
                  <SelectItem value="vodafone_cash">
                    <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> فودافون كاش</span>
                  </SelectItem>
                  <SelectItem value="instapay">
                    <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> إنستاباي</span>
                  </SelectItem>
                  <SelectItem value="wallet">
                    <span className="flex items-center gap-2"><Wallet className="w-4 h-4" /> محفظة إلكترونية</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-start">
            <Button onClick={handleWithdraw} className="gap-1.5">
              <ArrowDownToLine className="w-4 h-4" />
              تأكيد السحب
            </Button>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
