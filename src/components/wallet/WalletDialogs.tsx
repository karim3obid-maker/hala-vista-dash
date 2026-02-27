import { useState } from "react";
import {
  Plus, Upload, Landmark, CreditCard, DollarSign, Smartphone,
  AlertCircle, Info, Copy,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface WalletDialogsProps {
  showDeposit: boolean;
  setShowDeposit: (v: boolean) => void;
  showWithdraw: boolean;
  setShowWithdraw: (v: boolean) => void;
  showBankAccounts: boolean;
  setShowBankAccounts: (v: boolean) => void;
  balance: number;
}

export default function WalletDialogs({
  showDeposit, setShowDeposit,
  showWithdraw, setShowWithdraw,
  showBankAccounts, setShowBankAccounts,
  balance,
}: WalletDialogsProps) {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("تم النسخ بنجاح");
    });
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح أكبر من صفر");
      return;
    }
    toast.success("تم إرسال طلب الإيداع بنجاح");
    setDepositAmount("");
    setShowDeposit(false);
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح أكبر من صفر");
      return;
    }
    if (amount > balance) {
      toast.error(`المبلغ يتجاوز الرصيد المتاح (${balance.toLocaleString()} ر.س)`);
      return;
    }
    toast.success("تم إرسال طلب السحب بنجاح");
    setWithdrawAmount("");
    setShowWithdraw(false);
  };

  const bankAccounts = [
    { name: "بايونير", sub1: "finance@halacommerce.ae", sub2: "HALA COMMERCE LLC", icon: CreditCard, bg: "bg-green-50 dark:bg-green-500/10", border: "border-green-200 dark:border-green-500/20", iconColor: "text-orange-500" },
    { name: "انستا باي", sub1: "+201012345678", sub2: "هلا كومرس للتجارة", icon: DollarSign, bg: "bg-yellow-50 dark:bg-yellow-500/10", border: "border-yellow-200 dark:border-yellow-500/20", iconColor: "text-yellow-600" },
    { name: "حساب بنكي مصري", sub1: "البنك الأهلي المصري", sub2: "EG12 0001 0042 0300 0000 1234", icon: Landmark, bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/20", iconColor: "text-emerald-600" },
    { name: "حساب بنكي سعودي", sub1: "البنك الأهلي السعودي", sub2: "SA12 3456 7890 1234 5678", icon: Landmark, bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-200 dark:border-blue-500/20", iconColor: "text-blue-600" },
    { name: "فودافون كاش", sub1: "+201098765432", sub2: "هلا كومرس", icon: Smartphone, bg: "bg-pink-50 dark:bg-pink-500/10", border: "border-pink-200 dark:border-pink-500/20", iconColor: "text-red-500" },
    { name: "حساب بنكي إماراتي", sub1: "Emirates NBD", sub2: "AE47 0260 0010 1589 2734 560", icon: Landmark, bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-500/20", iconColor: "text-indigo-600" },
  ];

  return (
    <>
      {/* Deposit Dialog */}
      <Dialog open={showDeposit} onOpenChange={setShowDeposit}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-right">
              <div className="p-2 rounded-xl bg-emerald-500/10">
                <Plus className="w-5 h-5 text-emerald-500" />
              </div>
              إيداع رصيد
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="text-right space-y-2">
              <label className="text-sm font-medium text-foreground">المبلغ (ر.س)</label>
              <Input type="number" min="0" placeholder="أدخل المبلغ" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="rounded-xl text-right h-12 text-lg" />
            </div>
            <div className="text-right space-y-2">
              <label className="text-sm font-medium text-foreground">طريقة الإيداع</label>
              <Select defaultValue="bank">
                <SelectTrigger className="rounded-xl h-12 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">تحويل بنكي</SelectItem>
                  <SelectItem value="apple">Apple Pay</SelectItem>
                  <SelectItem value="mada">مدى</SelectItem>
                  <SelectItem value="stcpay">STC Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-right">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-amber-600">ملاحظة</span>
              </div>
              <p className="text-xs text-muted-foreground">سيتم تفعيل الرصيد خلال 24 ساعة بعد مراجعة البيانات</p>
            </div>
            <Button onClick={handleDeposit} className="w-full rounded-xl h-12 bg-emerald-500 hover:bg-emerald-600 text-white">
              <Plus className="w-4 h-4 ml-2" />
              إرسال طلب الإيداع
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdraw} onOpenChange={setShowWithdraw}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-right">
              <div className="p-2 rounded-xl bg-orange-500/10">
                <Upload className="w-5 h-5 text-orange-500" />
              </div>
              طلب سحب
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="text-right space-y-2">
              <label className="text-sm font-medium text-foreground">المبلغ (ر.س)</label>
              <Input type="number" min="0" placeholder="أدخل المبلغ" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="rounded-xl text-right h-12 text-lg" />
              <p className="text-xs text-muted-foreground">الرصيد المتاح: {balance.toLocaleString()} ر.س</p>
            </div>
            <div className="text-right space-y-2">
              <label className="text-sm font-medium text-foreground">التحويل إلى</label>
              <Select defaultValue="bank_sa">
                <SelectTrigger className="rounded-xl h-12 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_sa">حساب بنكي سعودي</SelectItem>
                  <SelectItem value="bank_ae">حساب بنكي إماراتي</SelectItem>
                  <SelectItem value="payoneer">بايونير</SelectItem>
                  <SelectItem value="instapay">انستا باي</SelectItem>
                  <SelectItem value="vodafone">فودافون كاش</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleWithdraw} className="w-full rounded-xl h-12 bg-orange-500 hover:bg-orange-600 text-white">
              <Upload className="w-4 h-4 ml-2" />
              إرسال طلب السحب
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bank Accounts Dialog */}
      <Dialog open={showBankAccounts} onOpenChange={setShowBankAccounts}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right text-lg font-bold text-destructive">حسابات التحويل</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {bankAccounts.map((acc, i) => (
                <div key={i} className={`${acc.bg} ${acc.border} border rounded-2xl p-5 text-right space-y-2 hover:shadow-md transition-shadow flex flex-col`}>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm font-bold text-foreground">{acc.name}</span>
                    <acc.icon className={`w-7 h-7 ${acc.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => copyToClipboard(acc.sub1)} className="p-1 rounded-md hover:bg-muted/50 transition-colors shrink-0">
                      <Copy className="w-3 h-3 text-muted-foreground" />
                    </button>
                    <p className="text-[11px] text-muted-foreground break-all">{acc.sub1}</p>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => copyToClipboard(acc.sub2)} className="p-1 rounded-md hover:bg-muted/50 transition-colors shrink-0">
                      <Copy className="w-3 h-3 text-muted-foreground" />
                    </button>
                    <p className="text-[11px] text-muted-foreground break-all font-mono">{acc.sub2}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-destructive" />
                <h4 className="text-sm font-bold text-destructive">تعليمات مهمة للإيداع</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/60 dark:bg-card/60 rounded-xl p-3 text-right">
                  <p className="text-xs font-bold text-destructive mb-1">⚠️ ضروري جداً</p>
                  <p className="text-xs text-muted-foreground">يجب التأكد من صحة جميع البيانات قبل إرسال الطلب</p>
                </div>
                <div className="bg-white/60 dark:bg-card/60 rounded-xl p-3 text-right">
                  <p className="text-xs font-bold text-foreground mb-1">📋 خطوات الإيداع</p>
                  <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>املأ البيانات بدقة</li>
                    <li>ارفق صورة الإيصال</li>
                    <li>اضغط "إرسال الطلب"</li>
                    <li>ستجد طلبك في "طلبات الإيداع"</li>
                  </ol>
                </div>
                <div className="bg-white/60 dark:bg-card/60 rounded-xl p-3 text-right">
                  <p className="text-xs font-bold text-emerald-600 mb-1">✅ موعد التفعيل</p>
                  <p className="text-xs text-muted-foreground">خلال 24 ساعة سيتم تفعيل الرصيد في حسابك بعد مراجعة البيانات</p>
                </div>
              </div>
            </div>

            <Button onClick={() => setShowBankAccounts(false)} className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
              إغلاق
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
