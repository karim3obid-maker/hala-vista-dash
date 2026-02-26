import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  Hash,
  CreditCard,
  Activity,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  AlertTriangle,
  PhoneCall,
  MessageCircle,
  FileText,
} from "lucide-react";
import { Order, OrderStatus } from "@/data/ordersData";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const statusSteps: { key: OrderStatus; label: string; icon: React.ElementType }[] = [
  { key: "confirmed", label: "تم التأكيد", icon: CheckCircle2 },
  { key: "processing", label: "قيد التجهيز", icon: Clock },
  { key: "shipped", label: "تم الشحن", icon: Truck },
  { key: "delivered", label: "تم التوصيل", icon: PackageCheck },
];

const statusIndex: Record<string, number> = {
  confirmed: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
};

const activityIcons: Record<string, { icon: React.ElementType; color: string }> = {
  create: { icon: FileText, color: "bg-muted text-muted-foreground" },
  call: { icon: PhoneCall, color: "bg-primary/10 text-primary" },
  whatsapp: { icon: MessageCircle, color: "bg-emerald-500/10 text-emerald-600" },
  shipping: { icon: Truck, color: "bg-blue-500/10 text-blue-600" },
  delivered: { icon: PackageCheck, color: "bg-emerald-500/10 text-emerald-600" },
  cancelled: { icon: XCircle, color: "bg-destructive/10 text-destructive" },
};

const paymentStatusLabel: Record<string, { label: string; color: string }> = {
  paid: { label: "مدفوع", color: "bg-emerald-500/10 text-emerald-600" },
  unpaid: { label: "غير مدفوع", color: "bg-destructive/10 text-destructive" },
  refunded: { label: "مسترجع", color: "bg-amber-500/10 text-amber-600" },
};

const orderStatusLabel: Record<OrderStatus, { label: string; color: string }> = {
  confirmed: { label: "تم التأكيد", color: "bg-primary/10 text-primary" },
  processing: { label: "قيد التجهيز", color: "bg-amber-500/10 text-amber-600" },
  shipped: { label: "تم الشحن", color: "bg-blue-500/10 text-blue-600" },
  delivered: { label: "تم التوصيل", color: "bg-emerald-500/10 text-emerald-600" },
  cancelled: { label: "ملغي", color: "bg-destructive/10 text-destructive" },
  returned: { label: "مرتجع", color: "bg-orange-500/10 text-orange-600" },
};

export default function OrderDetail({ order, onBack, onNext, onPrev, hasNext, hasPrev }: OrderDetailProps) {
  const currentStep = statusIndex[order.status] ?? -1;
  const isCancelled = order.status === "cancelled";
  const payment = paymentStatusLabel[order.paymentStatus];
  const orderSt = orderStatusLabel[order.status];

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-hidden flex flex-col px-4 py-3" dir="rtl">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-foreground rotate-180" />
          </button>
          <h1 className="text-xl font-bold text-foreground font-mono">{order.orderNumber}</h1>
          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${orderSt.color}`}>
            {orderSt.label}
          </span>
          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${payment.color}`}>
            {payment.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 overflow-hidden">
        {/* Right Column - Sidebar Info */}
        <div className="lg:col-span-1 space-y-3 overflow-y-auto pr-1">
          {/* Customer */}
          <Card title="العميل" icon={User}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{order.customer.name}</p>
                <p className="text-xs text-muted-foreground">
                  {order.customer.ordersCount === 1 ? "طلب واحد" : `${order.customer.ordersCount} طلبات`}
                </p>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card title="معلومات التواصل" icon={Phone}>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{order.customer.phone}</span>
            </div>
          </Card>

          {/* Address */}
          <Card title="عنوان الشحن" icon={MapPin}>
            <div>
              <p className="font-semibold text-foreground">{order.customer.name}</p>
              <p className="text-sm text-muted-foreground">
                {order.customer.address.city}، {order.customer.address.district}، {order.customer.address.street}
              </p>
              <p className="text-sm text-muted-foreground">{order.customer.address.country}</p>
            </div>
          </Card>

          {/* Order Details */}
          <Card title="تفاصيل الطلب" icon={Calendar}>
            <div className="space-y-3">
              <Row label="رقم الطلب" value={order.orderNumber} mono />
              <Row label="التاريخ" value={order.date} />
              <Row label="الوقت" value={order.time} />
            </div>
          </Card>

          {/* Follow-up Summary */}
          <Card title="ملخص المتابعة" icon={Hash}>
            <div className="space-y-3">
              <Row label="أب سيل" value={order.upsell} tag />
              <Row label="التأكيد عبر" value={order.confirmationMethod} />
              <Row
                label="محاولات التواصل"
                value={String(order.contactAttempts)}
                highlight={order.contactAttempts >= 4}
              />
              <Row label="إجمالي الأنشطة" value={String(order.totalActivities)} />
              {order.cancellationReason && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">سبب الإلغاء</p>
                    <p className="text-sm text-destructive font-medium">{order.cancellationReason}</p>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-3 overflow-y-auto pl-1">
          {/* Products */}
          {order.products.map((product, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-3" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center shrink-0">
                  <PackageCheck className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-primary">{product.name}</p>
                  {product.variant && (
                    <p className="text-xs text-muted-foreground">{product.variant}</p>
                  )}
                </div>
                <div className="mr-auto text-left">
                  <p className="text-sm text-muted-foreground">
                    {product.price} ر.س × {product.quantity}
                  </p>
                  <p className="font-semibold text-foreground">{product.price * product.quantity} ر.س</p>
                </div>
              </div>
            </div>
          ))}

          {/* Status Stepper */}
          {!isCancelled && (
            <div className="bg-card rounded-xl border border-border p-4" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between">
                {statusSteps.map((step, i) => {
                  const isActive = i <= currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                            isActive
                              ? "bg-emerald-500/10 border-2 border-emerald-500 text-emerald-600"
                              : "bg-muted/50 border-2 border-border text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.label}
                        </span>
                      </div>
                      {i < statusSteps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-2 mt-[-1.5rem] ${
                            i < currentStep ? "bg-emerald-500" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <StatCard
              icon={Activity}
              label="إجمالي الأنشطة"
              value={String(order.totalActivities)}
              color="bg-primary/10 text-primary"
            />
            <StatCard
              icon={PhoneCall}
              label="محاولات التواصل"
              value={String(order.contactAttempts)}
              color={order.contactAttempts >= 4 ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"}
            />
            <StatCard
              icon={Phone}
              label="طريقة التأكيد"
              value={order.confirmationMethod}
              color="bg-blue-500/10 text-blue-600"
            />
            <StatCard icon={Hash} label="أب سيل" value={order.upsell} color="bg-muted text-muted-foreground" />
          </div>

          {/* Cancellation */}
          {isCancelled && order.cancellationReason && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive mb-1">سبب الإلغاء</p>
                  <p className="text-sm text-destructive">{order.cancellationReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <Card title="ملخص الدفع" icon={CreditCard}>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span className="text-foreground">{order.subtotal} ر.س</span>
              </div>
              {order.discount && (
                <div className="flex justify-between">
                  <span className="text-emerald-600">خصم ({order.discount.code})</span>
                  <span className="text-emerald-600">-{order.discount.amount} ر.س</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">الشحن</span>
                <span className="text-emerald-600">
                  {order.shipping === "free" ? "مجاني" : `${order.shipping} ر.س`}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">الإجمالي</span>
                <span className="text-lg font-bold text-foreground">{order.total} ر.س</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <CreditCard className="w-4 h-4" />
                  <span>{order.paymentMethod}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${payment.color}`}>
                  {payment.label}
                </span>
              </div>
            </div>
          </Card>

          {/* Activity Log */}
          <div className="bg-card rounded-xl border border-border p-3" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground text-xs">سجل الأنشطة</h3>
              <span className="px-2 py-0.5 rounded-lg bg-muted text-[10px] font-medium text-muted-foreground">
                {order.activityLog.length} نشاط
              </span>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute right-[19px] top-0 bottom-0 w-px bg-border" />

              <div className="space-y-3">
                {order.activityLog.map((log) => {
                  const iconData = activityIcons[log.icon] || activityIcons.create;
                  const Icon = iconData.icon;
                  return (
                    <div key={log.id} className="flex items-start gap-3 relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${iconData.color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{log.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.date} {log.time} · {log.by}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helper Components ── */

function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-3" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-semibold text-foreground text-xs">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  tag,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  tag?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      {tag ? (
        <span className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">{value}</span>
      ) : (
        <span
          className={`text-sm ${mono ? "font-mono" : ""} ${highlight ? "text-destructive font-medium" : "text-foreground"}`}
        >
          {value}
        </span>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-3 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
      <p className="font-semibold text-foreground text-xs">{value}</p>
    </div>
  );
}
