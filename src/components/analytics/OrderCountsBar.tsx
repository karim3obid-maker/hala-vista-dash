import { 
  ShoppingCart, 
  CheckCircle2, 
  Truck, 
  PackageCheck, 
  RotateCcw, 
  XCircle,
  Clock,
  Ban,
  AlertTriangle
} from "lucide-react";

const orderCounts = [
  {
    label: "إجمالي الطلبات",
    value: 3456,
    icon: ShoppingCart,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "تم تأكيدها",
    value: 3024,
    icon: CheckCircle2,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "جاري العمل عليها",
    value: 312,
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    label: "تم شحنها",
    value: 2890,
    icon: Truck,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "تم تسليمها",
    value: 2654,
    icon: PackageCheck,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
  },
  {
    label: "مرتجعة",
    value: 156,
    icon: RotateCcw,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "ملغاة",
    value: 120,
    icon: Ban,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    label: "ملغاة من الشحن",
    value: 80,
    icon: XCircle,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
  },
  {
    label: "فيك",
    value: 64,
    icon: AlertTriangle,
    color: "text-rose-600",
    bgColor: "bg-rose-600/10",
  },
];

export function OrderCountsBar() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-9 gap-3 mb-6">
      {orderCounts.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
          >
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
              <Icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-foreground">
                {item.value.toLocaleString("ar-SA")}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {item.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
