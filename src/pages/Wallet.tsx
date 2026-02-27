import { useState } from "react";
import {
  Wallet,
  FileText,
  ArrowUpCircle,
  ArrowDownCircle,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CheckCircle2,
  Truck,
  PackageCheck,
  BarChart3,
  Package,
  Megaphone,
  Camera,
  Receipt,
  CreditCard,
  ArrowLeftRight,
  Download,
  Upload,
  Clock,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ── Types ── */
interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'transfer' | 'ads_tiktok' | 'ads_snapchat' | 'import_goods';
  description: string;
  amount: number;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  period: string;
  periodType: 'weekly' | 'monthly';
  issueDate: string;
  totalAmount: number;
  status: 'paid' | 'unpaid' | 'partial';
  services: {
    name: string;
    details: string;
    amount: number;
  }[];
}

/* ── Data ── */
const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2026-008',
    period: '20 - 27 فبراير 2026',
    periodType: 'weekly',
    issueDate: '2026/02/27',
    totalAmount: 4850,
    status: 'unpaid',
    services: [
      { name: 'تأكيد الطلبات', details: '320 طلب × 5 ر.س', amount: 1600 },
      { name: 'خدمات الشحن', details: '285 شحنة × 8 ر.س', amount: 2280 },
      { name: 'رسوم COD', details: '5% من 12,400 ر.س', amount: 620 },
      { name: 'رسوم المنصة', details: 'اشتراك أسبوعي', amount: 350 },
    ],
  },
  {
    id: '2',
    invoiceNumber: 'INV-2026-007',
    period: '13 - 19 فبراير 2026',
    periodType: 'weekly',
    issueDate: '2026/02/19',
    totalAmount: 5230,
    status: 'paid',
    services: [
      { name: 'تأكيد الطلبات', details: '380 طلب × 5 ر.س', amount: 1900 },
      { name: 'خدمات الشحن', details: '310 شحنة × 8 ر.س', amount: 2480 },
      { name: 'رسوم COD', details: '5% من 10,000 ر.س', amount: 500 },
      { name: 'رسوم المنصة', details: 'اشتراك أسبوعي', amount: 350 },
    ],
  },
  {
    id: '3',
    invoiceNumber: 'INV-2026-006',
    period: 'يناير 2026',
    periodType: 'monthly',
    issueDate: '2026/02/01',
    totalAmount: 18750,
    status: 'paid',
    services: [
      { name: 'تأكيد الطلبات', details: '1,450 طلب × 5 ر.س', amount: 7250 },
      { name: 'خدمات الشحن', details: '1,180 شحنة × 8 ر.س', amount: 9440 },
      { name: 'رسوم COD', details: '5% من 22,200 ر.س', amount: 1110 },
      { name: 'رسوم المنصة', details: 'اشتراك شهري', amount: 950 },
    ],
  },
];

const transactions: Transaction[] = [
  { id: '1', type: 'deposit', description: 'شحن رصيد عبر تحويل بنكي', amount: 5000, date: '2026/02/27', time: '10:30 ص', status: 'completed', reference: 'DEP-8821' },
  { id: '2', type: 'purchase', description: 'شراء بضاعة - سماعة بلوتوث ×50 من هلا', amount: -2400, date: '2026/02/26', time: '3:15 م', status: 'completed', reference: 'PUR-4412' },
  { id: '3', type: 'ads_tiktok', description: 'سحب إعلانات تيك توك - حملة فبراير', amount: -1200, date: '2026/02/25', time: '9:00 ص', status: 'completed', reference: 'AD-TT-091' },
  { id: '4', type: 'ads_snapchat', description: 'سحب إعلانات سناب شات - حملة الساعات', amount: -800, date: '2026/02/24', time: '2:00 م', status: 'completed', reference: 'AD-SN-055' },
  { id: '5', type: 'withdrawal', description: 'سحب أرباح إلى الحساب البنكي', amount: -1500, date: '2026/02/23', time: '11:45 ص', status: 'completed', reference: 'WD-3301' },
  { id: '6', type: 'import_goods', description: 'فاند استيراد بضاعة من الصين - دفعة مقدمة', amount: -3500, date: '2026/02/22', time: '5:30 م', status: 'completed', reference: 'IMP-CN-012' },
  { id: '7', type: 'transfer', description: 'تحويل رصيد من محفظة أخرى', amount: 2000, date: '2026/02/21', time: '1:00 م', status: 'completed', reference: 'TRF-7744' },
  { id: '8', type: 'deposit', description: 'شحن رصيد عبر Apple Pay', amount: 3000, date: '2026/02/20', time: '4:15 م', status: 'pending', reference: 'DEP-8820' },
  { id: '9', type: 'purchase', description: 'شراء بضاعة - ساعة ذكية ×30 من هلا', amount: -1800, date: '2026/02/19', time: '10:00 ص', status: 'completed', reference: 'PUR-4411' },
  { id: '10', type: 'withdrawal', description: 'سحب أرباح', amount: -800, date: '2026/02/18', time: '3:30 م', status: 'failed', reference: 'WD-3300' },
];

/* ── Reports Data ── */
const reportData = {
  totalSales: 245890,
  deliveredSales: 189650,
  totalExpenses: 197570,
  netProfit: 48320,
  services: [
    {
      name: 'تأكيد الطلبات',
      items: [
        { label: 'طلب جديد', count: 3456, unitCost: 2, total: 6912 },
        { label: 'طلب مؤكد', count: 3024, unitCost: 3, total: 9072 },
        { label: 'طلب مسلم', count: 2654, unitCost: 5, total: 13270 },
      ],
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      accentBg: 'bg-emerald-500',
    },
    {
      name: 'خدمات الشحن',
      items: [
        { label: 'طلب موصل', count: 2654, unitCost: 8, total: 21232 },
        { label: 'طلب مسترجع', count: 156, unitCost: 12, total: 1872 },
        { label: 'نسبة COD 5%', count: null, unitCost: null, total: 9450 },
      ],
      icon: Truck,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      accentBg: 'bg-blue-500',
    },
  ],
  adBalance: {
    tiktok: 12500,
    snapchat: 8200,
    total: 20700,
  },
  goodsBalance: {
    halaBalance: -4200,
    importBalance: -3500,
    total: -7700,
  },
};

/* ── Config ── */
const typeConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
  deposit: { label: 'إيداع', icon: Download, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  withdrawal: { label: 'سحب', icon: Upload, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  purchase: { label: 'شراء بضاعة', icon: ShoppingCart, color: 'text-primary', bg: 'bg-primary/10' },
  transfer: { label: 'تحويل', icon: ArrowLeftRight, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ads_tiktok: { label: 'إعلانات تيك توك', icon: Megaphone, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  ads_snapchat: { label: 'إعلانات سناب شات', icon: Camera, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  import_goods: { label: 'استيراد بضاعة', icon: Package, color: 'text-violet-500', bg: 'bg-violet-500/10' },
};

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  completed: { label: 'مكتمل', variant: 'default' },
  pending: { label: 'معلّق', variant: 'secondary' },
  failed: { label: 'فشل', variant: 'destructive' },
  paid: { label: 'مدفوعة', variant: 'default' },
  unpaid: { label: 'غير مدفوعة', variant: 'destructive' },
  partial: { label: 'مدفوعة جزئياً', variant: 'secondary' },
};

/* ── Stat Card (matches analytics) ── */
function StatCard({ item }: { item: { label: string; value: string | number; icon: any; color: string; bgColor: string; suffix?: string; highlight?: boolean } }) {
  const Icon = item.icon;
  return (
    <div className={`flex flex-row-reverse items-center gap-3 p-3.5 rounded-xl border transition-all hover:shadow-sm ${
      item.highlight
        ? "bg-primary/5 border-primary/20 hover:border-primary/40"
        : "bg-card border-border hover:border-primary/20"
    }`}>
      <div className={`p-2 rounded-lg ${item.bgColor} shrink-0`}>
        <Icon className={`w-4 h-4 ${item.color}`} />
      </div>
      <div className="min-w-0 text-right flex-1">
        <p className={`text-lg font-bold text-foreground leading-tight ${item.highlight ? "text-xl" : ""}`}>
          {typeof item.value === "number" ? item.value.toLocaleString("ar-SA") : item.value}
          {item.suffix && <span className="text-xs font-medium text-muted-foreground mr-1">{item.suffix}</span>}
        </p>
        <p className="text-[11px] text-muted-foreground truncate leading-tight mt-0.5">{item.label}</p>
      </div>
    </div>
  );
}

/* ── Section Header (matches analytics) ── */
function SectionHeader({ title, icon: Icon, accentColor, badge }: { title: string; icon: any; accentColor: string; badge?: string }) {
  return (
    <div className="flex flex-row-reverse items-center gap-2 mb-4">
      <div className={`p-1.5 rounded-lg ${accentColor}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      {badge && (
        <span className="text-[10px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{badge}</span>
      )}
    </div>
  );
}

/* ── Transaction Filter ── */
const transactionTypes = [
  { value: 'all', label: 'الكل' },
  { value: 'deposit', label: 'إيداع' },
  { value: 'withdrawal', label: 'سحب' },
  { value: 'purchase', label: 'شراء بضاعة' },
  { value: 'transfer', label: 'تحويل' },
  { value: 'ads_tiktok', label: 'تيك توك' },
  { value: 'ads_snapchat', label: 'سناب شات' },
  { value: 'import_goods', label: 'استيراد' },
];

/* ── Main ── */
export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("invoices");
  const [txFilter, setTxFilter] = useState("all");

  const balance = 3500;
  const totalDeposits = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalWithdrawals = Math.abs(transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0));

  const filteredTransactions = txFilter === 'all'
    ? transactions
    : transactions.filter(t => t.type === txFilter);

  // Group transactions by type for summary
  const txSummary = transactions.reduce((acc, t) => {
    const key = t.type;
    if (!acc[key]) acc[key] = { count: 0, total: 0 };
    acc[key].count++;
    acc[key].total += t.amount;
    return acc;
  }, {} as Record<string, { count: number; total: number }>);

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-[1280px] mx-auto px-6 py-8" dir="rtl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-row-reverse items-center gap-3 mb-1">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-foreground">المحفظة</h1>
              <p className="text-sm text-muted-foreground">إدارة الفواتير والمعاملات والتقارير المالية</p>
            </div>
          </div>
        </div>

        {/* Balance Banner (matches Flow Banner style) */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-6">
          <div className="flex flex-row-reverse items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">ملخص الأرصدة</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex flex-row-reverse items-center gap-3 p-4 rounded-xl bg-gradient-to-bl from-primary/10 to-accent/10 border border-primary/20">
              <div className="p-2.5 rounded-lg bg-primary shrink-0">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{balance.toLocaleString()}</p>
                <p className="text-[11px] text-muted-foreground">الرصيد الحالي (ر.س)</p>
              </div>
            </div>
            <StatCard item={{ label: "إجمالي الإيداعات", value: totalDeposits.toLocaleString(), suffix: "ر.س", icon: Download, color: "text-emerald-500", bgColor: "bg-emerald-500/10" }} />
            <StatCard item={{ label: "إجمالي المسحوبات", value: totalWithdrawals.toLocaleString(), suffix: "ر.س", icon: Upload, color: "text-orange-500", bgColor: "bg-orange-500/10" }} />
            <StatCard item={{ label: "إجمالي المعاملات", value: transactions.length.toString(), icon: ArrowLeftRight, color: "text-blue-500", bgColor: "bg-blue-500/10" }} />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="flex w-full justify-start bg-card border border-border p-1 h-14 mb-6 rounded-2xl">
            <TabsTrigger
              value="invoices"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-10 px-6 rounded-xl"
            >
              <FileText className="w-4 h-4" />
              الفواتير
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-10 px-6 rounded-xl"
            >
              <ArrowLeftRight className="w-4 h-4" />
              المعاملات
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-10 px-6 rounded-xl"
            >
              <BarChart3 className="w-4 h-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          {/* ════════ INVOICES TAB ════════ */}
          <TabsContent value="invoices" className="animate-fade-in space-y-4">
            {invoices.map((inv) => {
              const st = statusConfig[inv.status];
              return (
                <div key={inv.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all">
                  <div className="flex flex-row-reverse items-center justify-between p-5 border-b border-border">
                    <div className="flex flex-row-reverse items-center gap-4 text-right">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <Receipt className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-foreground">{inv.invoiceNumber}</p>
                        <p className="text-xs text-muted-foreground">{inv.period}</p>
                      </div>
                    </div>
                    <Badge variant={st.variant} className="text-xs px-3 py-1">{st.label}</Badge>
                  </div>
                  <div className="p-5">
                    <div className="space-y-2">
                      {inv.services.map((svc, i) => (
                        <div key={i} className="flex flex-row-reverse items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                          <div className="text-right">
                            <span className="text-sm font-medium text-foreground">{svc.name}</span>
                            <span className="text-xs text-muted-foreground mr-2">({svc.details})</span>
                          </div>
                          <span className="text-sm font-bold text-foreground">{svc.amount.toLocaleString()} ر.س</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-row-reverse items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-sm font-bold text-foreground">الإجمالي</span>
                      <span className="text-lg font-bold text-primary">{inv.totalAmount.toLocaleString()} ر.س</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          {/* ════════ TRANSACTIONS TAB ════════ */}
          <TabsContent value="transactions" className="animate-fade-in space-y-6">
            {/* Transaction type summary */}
            <div className="bg-primary/[0.02] rounded-2xl p-5 border border-primary/10">
              <SectionHeader title="إجمالي المعاملات حسب النوع" icon={BarChart3} accentColor="bg-primary" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(txSummary).map(([type, data]) => {
                  const cfg = typeConfig[type];
                  if (!cfg) return null;
                  return (
                    <StatCard
                      key={type}
                      item={{
                        label: `${cfg.label} (${data.count})`,
                        value: Math.abs(data.total).toLocaleString(),
                        suffix: "ر.س",
                        icon: cfg.icon,
                        color: cfg.color,
                        bgColor: cfg.bg,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3 justify-start flex-row-reverse">
              <Select value={txFilter} onValueChange={setTxFilter}>
                <SelectTrigger className="w-[200px] h-11 bg-card border-border rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypes.map(t => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">تصفية حسب</span>
              </div>
            </div>

            {/* Transaction List */}
            <Card className="border-border rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filteredTransactions.map((tx) => {
                    const config = typeConfig[tx.type];
                    const status = statusConfig[tx.status];
                    const Icon = config.icon;
                    return (
                      <div key={tx.id} className="flex flex-row-reverse items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors">
                        <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground">{tx.date} • {tx.time}</span>
                            {tx.reference && (
                              <span className="text-[10px] text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">{tx.reference}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-1 shrink-0">
                          <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-500' : 'text-foreground'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ر.س
                          </span>
                          <Badge variant={status.variant} className="text-[10px] px-2 py-0">{status.label}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ════════ REPORTS TAB ════════ */}
          <TabsContent value="reports" className="animate-fade-in space-y-6">
            {/* KPI Overview */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <SectionHeader title="الملخص المالي" icon={DollarSign} accentColor="bg-primary" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard item={{ label: "إجمالي المبيعات", value: reportData.totalSales.toLocaleString(), suffix: "ر.س", icon: DollarSign, color: "text-primary", bgColor: "bg-primary/10", highlight: true }} />
                <StatCard item={{ label: "إجمالي المبيعات المسلمة", value: reportData.deliveredSales.toLocaleString(), suffix: "ر.س", icon: PackageCheck, color: "text-green-600", bgColor: "bg-green-600/10" }} />
                <StatCard item={{ label: "إجمالي المصروفات", value: reportData.totalExpenses.toLocaleString(), suffix: "ر.س", icon: TrendingDown, color: "text-red-500", bgColor: "bg-red-500/10" }} />
                <StatCard item={{ label: "صافي الربح", value: reportData.netProfit.toLocaleString(), suffix: "ر.س", icon: TrendingUp, color: "text-emerald-500", bgColor: "bg-emerald-500/10", highlight: true }} />
              </div>
            </div>

            {/* Services Cost Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reportData.services.map((svc, idx) => {
                const Icon = svc.icon;
                const svcTotal = svc.items.reduce((s, i) => s + i.total, 0);
                return (
                  <div key={idx} className={`rounded-2xl p-5 border ${
                    idx === 0 ? 'bg-emerald-500/[0.02] border-emerald-500/10' : 'bg-blue-500/[0.02] border-blue-500/10'
                  }`}>
                    <SectionHeader title={svc.name} icon={Icon} accentColor={svc.accentBg} badge={`${svc.items.length} عناصر`} />

                    <div className="space-y-2 mb-4">
                      {svc.items.map((item, i) => (
                        <div key={i} className="flex flex-row-reverse items-center justify-between bg-card rounded-xl border border-border p-3.5">
                          <div className="flex flex-row-reverse items-center gap-3 text-right">
                            <div className={`p-2 rounded-lg ${svc.bgColor}`}>
                              <Icon className={`w-4 h-4 ${svc.color}`} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.label}</p>
                              <p className="text-[11px] text-muted-foreground">
                                {item.count !== null && item.unitCost !== null
                                  ? `${item.count.toLocaleString()} طلب × ${item.unitCost} ر.س`
                                  : 'رسوم نسبية'
                                }
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-foreground">{item.total.toLocaleString()} ر.س</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-row-reverse items-center justify-between pt-3 border-t border-border">
                      <span className="text-sm font-bold text-foreground">إجمالي {svc.name}</span>
                      <span className={`text-lg font-bold ${svc.color}`}>{svcTotal.toLocaleString()} ر.س</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ad Balance & Goods Balance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ad Spend */}
              <div className="bg-orange-500/[0.02] rounded-2xl p-5 border border-orange-500/10">
                <SectionHeader title="رصيد السحب الإعلاني" icon={Megaphone} accentColor="bg-orange-500" />
                <div className="grid grid-cols-1 gap-3">
                  <StatCard item={{ label: "إعلانات تيك توك", value: reportData.adBalance.tiktok.toLocaleString(), suffix: "ر.س", icon: Megaphone, color: "text-pink-500", bgColor: "bg-pink-500/10" }} />
                  <StatCard item={{ label: "إعلانات سناب شات", value: reportData.adBalance.snapchat.toLocaleString(), suffix: "ر.س", icon: Camera, color: "text-yellow-500", bgColor: "bg-yellow-500/10" }} />
                  <div className="flex flex-row-reverse items-center justify-between pt-3 border-t border-orange-500/10">
                    <span className="text-sm font-bold text-foreground">إجمالي السحب الإعلاني</span>
                    <span className="text-lg font-bold text-orange-500">{reportData.adBalance.total.toLocaleString()} ر.س</span>
                  </div>
                </div>
              </div>

              {/* Goods Balance */}
              <div className="bg-violet-500/[0.02] rounded-2xl p-5 border border-violet-500/10">
                <SectionHeader title="رصيد شراء البضاعة" icon={Package} accentColor="bg-violet-500" />
                <div className="grid grid-cols-1 gap-3">
                  <StatCard item={{ label: "تكاليف بضاعة هلا", value: Math.abs(reportData.goodsBalance.halaBalance).toLocaleString(), suffix: "ر.س", icon: ShoppingCart, color: "text-primary", bgColor: "bg-primary/10" }} />
                  <StatCard item={{ label: "فاند استيراد بضاعة", value: Math.abs(reportData.goodsBalance.importBalance).toLocaleString(), suffix: "ر.س", icon: Package, color: "text-violet-500", bgColor: "bg-violet-500/10" }} />
                  <div className="flex flex-row-reverse items-center justify-between pt-3 border-t border-violet-500/10">
                    <span className="text-sm font-bold text-foreground">إجمالي تكاليف البضاعة</span>
                    <span className="text-lg font-bold text-violet-500">{Math.abs(reportData.goodsBalance.total).toLocaleString()} ر.س</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
