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
  BarChart3
} from "lucide-react";

const confirmationItems = [
  { label: "إجمالي الطلبات", value: 3456, icon: ShoppingCart, color: "text-primary", bgColor: "bg-primary/10" },
  { label: "طلبات جديدة", value: 432, icon: Sparkles, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { label: "طلبات مؤكدة", value: 3024, icon: CheckCircle2, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { label: "جاري التأكيد", value: 312, icon: Clock, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { label: "طلب ملغي", value: 120, icon: Ban, color: "text-red-500", bgColor: "bg-red-500/10" },
  { label: "طلب فيك", value: 64, icon: AlertTriangle, color: "text-rose-600", bgColor: "bg-rose-600/10" },
];

const shippingItems = [
  { label: "إجمالي الطلبات", value: 3024, icon: Package, color: "text-blue-600", bgColor: "bg-blue-600/10" },
  { label: "تم الشحن", value: 2890, icon: Truck, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { label: "جاري الشحن", value: 134, icon: Clock, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { label: "ملغي من الشحن", value: 80, icon: XCircle, color: "text-red-400", bgColor: "bg-red-400/10" },
  { label: "مرتجع", value: 156, icon: RotateCcw, color: "text-orange-500", bgColor: "bg-orange-500/10" },
];

const financialItems = [
  { label: "إجمالي المبيعات", value: "245,890", suffix: "SAR", icon: DollarSign, color: "text-emerald-600", bgColor: "bg-emerald-600/10" },
  { label: "تكاليف المنتج", value: "141,250", suffix: "SAR", icon: Package, color: "text-amber-600", bgColor: "bg-amber-600/10" },
  { label: "تكاليف التأكيدات", value: "6,094", suffix: "SAR", icon: CheckCircle2, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { label: "تكاليف الشحن", value: "12,170", suffix: "SAR", icon: Truck, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { label: "صافي الربح", value: "48,320", suffix: "SAR", icon: Wallet, color: "text-emerald-600", bgColor: "bg-emerald-600/10" },
];

const rateItems = [
  { label: "نسبة التأكيد", value: "87.5", suffix: "%", change: 3.2, icon: CheckCircle2, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  { label: "نسبة التسليم", value: "76.8", suffix: "%", change: 2.1, icon: PackageCheck, color: "text-green-600", bgColor: "bg-green-600/10" },
  { label: "نسبة NDR", value: "8.2", suffix: "%", change: -1.5, icon: ShieldAlert, color: "text-red-500", bgColor: "bg-red-500/10" },
  { label: "نسبة الفيك أوردر", value: "1.9", suffix: "%", change: -0.3, icon: AlertTriangle, color: "text-rose-600", bgColor: "bg-rose-600/10" },
];

function StatCard({ item }: { item: { label: string; value: number | string; icon: any; color: string; bgColor: string; suffix?: string; change?: number } }) {
  const Icon = item.icon;
  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
      <div className={`p-2 rounded-lg ${item.bgColor}`}>
        <Icon className={`w-4 h-4 ${item.color}`} />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold text-foreground">
          {typeof item.value === "number" ? item.value.toLocaleString("ar-SA") : item.value}
          {item.suffix && <span className="text-sm font-medium text-muted-foreground mr-1">{item.suffix}</span>}
        </p>
        <p className="text-xs text-muted-foreground truncate">{item.label}</p>
      </div>
    </div>
  );
}

function RateCard({ item }: { item: { label: string; value: string; suffix: string; change: number; icon: any; color: string; bgColor: string } }) {
  const Icon = item.icon;
  return (
    <div className="flex items-center justify-between p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
      <div className={`text-xs font-medium ${item.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
        {item.change >= 0 ? "+" : ""}{item.change}%
        <p className="text-muted-foreground mt-0.5">مقارنة بالفترة السابقة</p>
      </div>
      <div className="flex items-center gap-3 text-right">
        <div>
          <p className="text-3xl font-bold text-foreground">
            {item.value}<span className="text-lg mr-1">{item.suffix}</span>
          </p>
          <p className="text-sm text-muted-foreground">{item.label}</p>
        </div>
        <div className={`p-2.5 rounded-xl ${item.bgColor}`}>
          <Icon className={`w-5 h-5 ${item.color}`} />
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, icon: Icon, accentColor }: { title: string; icon: any; accentColor: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className={`w-5 h-5 ${accentColor}`} />
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
    </div>
  );
}

export function OrderCountsBar() {
  return (
    <div className="space-y-8 mb-8">
      {/* تحليل التأكيدات */}
      <div className="bg-primary/[0.03] rounded-2xl p-5 border border-primary/10">
        <SectionTitle title="تحليل التأكيدات" icon={CheckCircle2} accentColor="text-primary" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {confirmationItems.map((item, i) => <StatCard key={i} item={item} />)}
        </div>
      </div>

      {/* تحليل الشحن */}
      <div className="bg-blue-500/[0.03] rounded-2xl p-5 border border-blue-500/10">
        <SectionTitle title="تحليل الشحن" icon={Truck} accentColor="text-blue-500" />
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {shippingItems.map((item, i) => <StatCard key={i} item={item} />)}
        </div>
      </div>

      {/* المالية */}
      <div className="bg-emerald-500/[0.03] rounded-2xl p-5 border border-emerald-500/10">
        <SectionTitle title="المالية" icon={Wallet} accentColor="text-emerald-600" />
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {financialItems.map((item, i) => <StatCard key={i} item={item} />)}
        </div>
      </div>

      {/* نسب التحليل */}
      <div className="bg-amber-500/[0.03] rounded-2xl p-5 border border-amber-500/10">
        <SectionTitle title="نسب التحليل" icon={BarChart3} accentColor="text-amber-600" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rateItems.map((item, i) => <RateCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  );
}
