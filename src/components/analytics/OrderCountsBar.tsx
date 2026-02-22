import { 
  ShoppingCart, 
  CheckCircle2, 
  Truck, 
  PackageCheck, 
  RotateCcw, 
  XCircle,
  Clock,
  Ban,
  AlertTriangle,
  Sparkles,
  DollarSign,
  Wallet,
  Package,
  ShieldAlert,
  BarChart3,
  ArrowLeft,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

/* ── Data ── */
const confirmationItems = [
  { label: "إجمالي الطلبات", value: 3456, icon: ShoppingCart, color: "text-primary", bgColor: "bg-primary/10", highlight: true },
  { label: "طلبات جديدة", value: 432, icon: Sparkles, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { label: "طلبات مؤكدة", value: 3024, icon: CheckCircle2, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { label: "جاري التأكيد", value: 312, icon: Clock, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { label: "طلب ملغي", value: 120, icon: Ban, color: "text-red-500", bgColor: "bg-red-500/10" },
  { label: "طلب فيك", value: 64, icon: AlertTriangle, color: "text-rose-600", bgColor: "bg-rose-600/10" },
];

const shippingItems = [
  { label: "إجمالي الطلبات", value: 3024, icon: Package, color: "text-blue-600", bgColor: "bg-blue-600/10", highlight: true },
  { label: "تم الشحن", value: 2890, icon: Truck, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { label: "جاري الشحن", value: 134, icon: Clock, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { label: "تم التسليم", value: 2654, icon: PackageCheck, color: "text-green-600", bgColor: "bg-green-600/10" },
  { label: "ملغي من الشحن", value: 80, icon: XCircle, color: "text-red-400", bgColor: "bg-red-400/10" },
  { label: "مرتجع", value: 156, icon: RotateCcw, color: "text-orange-500", bgColor: "bg-orange-500/10" },
];

const financialItems = [
  { label: "إجمالي المبيعات", value: "245,890", suffix: "SAR", icon: DollarSign, color: "text-primary", bgColor: "bg-primary/10", highlight: true },
  { label: "تكاليف المنتج", value: "141,250", suffix: "SAR", icon: Package, color: "text-amber-600", bgColor: "bg-amber-600/10" },
  { label: "تكاليف التأكيدات", value: "6,094", suffix: "SAR", icon: CheckCircle2, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { label: "تكاليف الشحن", value: "12,170", suffix: "SAR", icon: Truck, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { label: "صافي الربح", value: "48,320", suffix: "SAR", icon: Wallet, color: "text-emerald-600", bgColor: "bg-emerald-600/10" },
];

const rateItems = [
  { label: "نسبة التأكيد", value: 87.5, change: 3.2, icon: CheckCircle2, color: "text-emerald-500", bgColor: "bg-emerald-500/10", progressColor: "bg-emerald-500" },
  { label: "نسبة التسليم", value: 76.8, change: 2.1, icon: PackageCheck, color: "text-green-600", bgColor: "bg-green-600/10", progressColor: "bg-green-600" },
  { label: "نسبة NDR", value: 8.2, change: -1.5, icon: ShieldAlert, color: "text-red-500", bgColor: "bg-red-500/10", progressColor: "bg-red-500" },
  { label: "نسبة الفيك أوردر", value: 1.9, change: -0.3, icon: AlertTriangle, color: "text-rose-600", bgColor: "bg-rose-600/10", progressColor: "bg-rose-600" },
];

/* ── Flow Arrow ── */
function FlowArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="flex items-center gap-1 text-muted-foreground/40">
        <div className="w-8 h-[2px] bg-muted-foreground/20 rounded" />
        <ArrowLeft className="w-4 h-4" />
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ item }: { item: { label: string; value: number | string; icon: any; color: string; bgColor: string; suffix?: string; highlight?: boolean } }) {
  const Icon = item.icon;
  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all hover:shadow-sm ${
      item.highlight 
        ? "bg-primary/5 border-primary/20 hover:border-primary/40" 
        : "bg-card border-border hover:border-primary/20"
    }`}>
      <div className={`p-2 rounded-lg ${item.bgColor} shrink-0`}>
        <Icon className={`w-4 h-4 ${item.color}`} />
      </div>
      <div className="min-w-0">
        <p className={`text-lg font-bold text-foreground leading-tight ${item.highlight ? "text-xl" : ""}`}>
          {typeof item.value === "number" ? item.value.toLocaleString("ar-SA") : item.value}
          {item.suffix && <span className="text-xs font-medium text-muted-foreground mr-1">{item.suffix}</span>}
        </p>
        <p className="text-[11px] text-muted-foreground truncate leading-tight mt-0.5">{item.label}</p>
      </div>
    </div>
  );
}

/* ── Rate Card (larger) ── */
function RateCard({ item }: { item: typeof rateItems[0] }) {
  const Icon = item.icon;
  const isPositive = item.change >= 0;
  return (
    <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg ${
          isPositive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? "+" : ""}{item.change}%
        </div>
        <div className={`p-2.5 rounded-xl ${item.bgColor} group-hover:scale-110 transition-transform`}>
          <Icon className={`w-5 h-5 ${item.color}`} />
        </div>
      </div>
      <div className="text-right mb-3">
        <p className="text-4xl font-bold text-foreground leading-none">{item.value}<span className="text-xl mr-0.5">%</span></p>
        <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
      </div>
      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${item.progressColor} transition-all duration-700`}
          style={{ width: `${Math.min(item.value, 100)}%` }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground/60 mt-2">مقارنة بالفترة السابقة</p>
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({ title, icon: Icon, accentColor, badge }: { title: string; icon: any; accentColor: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
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

/* ── Flow Banner ── */
function FlowBanner() {
  const steps = [
    { label: "طلبات واردة", value: "3,456", icon: ShoppingCart, color: "bg-primary" },
    { label: "مؤكدة", value: "3,024", icon: CheckCircle2, color: "bg-emerald-500" },
    { label: "تم الشحن", value: "2,890", icon: Truck, color: "bg-blue-500" },
    { label: "تم التسليم", value: "2,654", icon: PackageCheck, color: "bg-green-600" },
  ];
  return (
    <div className="bg-card rounded-2xl border border-border p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-bold text-foreground">مسار الطلبات</h3>
      </div>
      <div className="flex items-center gap-2">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="contents">
              <div className="flex-1 relative">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border">
                  <div className={`p-2 rounded-lg ${step.color} shrink-0`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-foreground leading-tight">{step.value}</p>
                    <p className="text-[11px] text-muted-foreground">{step.label}</p>
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && <FlowArrow />}
            </div>
          );
        })}
      </div>
      {/* Funnel conversion rates */}
      <div className="flex items-center gap-2 mt-3 px-2">
        <div className="flex-1" />
        <span className="text-[10px] text-emerald-500 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">87.5% تأكيد</span>
        <div className="flex-1" />
        <span className="text-[10px] text-blue-500 font-medium bg-blue-500/10 px-2 py-0.5 rounded-full">95.6% شحن</span>
        <div className="flex-1" />
        <span className="text-[10px] text-green-600 font-medium bg-green-600/10 px-2 py-0.5 rounded-full">91.8% تسليم</span>
        <div className="flex-1" />
      </div>
    </div>
  );
}

/* ── Main Component ── */
export function OrderCountsBar() {
  return (
    <div className="space-y-6 mb-8">
      {/* Flow Banner */}
      <FlowBanner />

      {/* Grid: Confirmation + Shipping side by side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* تحليل التأكيدات */}
        <div className="bg-primary/[0.02] rounded-2xl p-5 border border-primary/10">
          <SectionHeader title="تحليل التأكيدات" icon={CheckCircle2} accentColor="bg-primary" badge={`${confirmationItems.length} عناصر`} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {confirmationItems.map((item, i) => <StatCard key={i} item={item} />)}
          </div>
        </div>

        {/* تحليل الشحن */}
        <div className="bg-blue-500/[0.02] rounded-2xl p-5 border border-blue-500/10">
          <SectionHeader title="تحليل الشحن" icon={Truck} accentColor="bg-blue-500" badge={`${shippingItems.length} عناصر`} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {shippingItems.map((item, i) => <StatCard key={i} item={item} />)}
          </div>
        </div>
      </div>

      {/* المالية */}
      <div className="bg-emerald-500/[0.02] rounded-2xl p-5 border border-emerald-500/10">
        <SectionHeader title="المالية" icon={Wallet} accentColor="bg-emerald-600" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {financialItems.map((item, i) => <StatCard key={i} item={item} />)}
        </div>
      </div>

      {/* نسب التحليل */}
      <div className="bg-amber-500/[0.02] rounded-2xl p-5 border border-amber-500/10">
        <SectionHeader title="نسب التحليل" icon={BarChart3} accentColor="bg-amber-500" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rateItems.map((item, i) => <RateCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  );
}
