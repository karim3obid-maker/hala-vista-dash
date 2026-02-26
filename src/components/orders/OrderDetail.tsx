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
    <div className="container max-w-[1280px] mx-auto px-6 py-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${payment.color}`}>
            {payment.label}
          </span>
          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${orderSt.color}`}>
            {orderSt.label}
          </span>
          <h1 className="text-xl font-bold text-foreground font-mono">{order.orderNumber}</h1>
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" dir="rtl">
        {/* Right Column - Sidebar Info */}
        <div className="lg:col-span-1 space-y-4">
          {/* Customer */}
          <Card title="العميل" icon={User}>
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right">
                <p className="font-semibold text-foreground">{order.customer.name}</p>
                <p className="text-xs text-muted-foreground">
                  {order.customer.ordersCount === 1 ? "طلب واحد" : `${order.customer.ordersCount} طلبات`}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card title="معلومات التواصل" icon={Phone}>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-foreground font-medium">{order.customer.phone}</span>
              <Phone className="w-4 h-4 text-muted-foreground" />
            </div>
          </Card>

          {/* Address */}
          <Card title="عنوان الشحن" icon={MapPin}>
            <div className="text-right">
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
        <div className="lg:col-span-2 space-y-4">
          {/* Products */}
          {order.products.map((product, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-4 justify-end">
                <div className="text-right flex-1">
                  <p className="text-sm text-muted-foreground">
                    {product.price} ر.س × {product.quantity}
                  </p>
                  <p className="font-semibold text-foreground">{product.price * product.quantity} ر.س</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{product.name}</p>
                  {product.variant && (
                    <p className="text-xs text-muted-foreground">{product.variant}</p>
                  )}
                </div>
                <div className="w-14 h-14 rounded-xl bg-muted/30 flex items-center justify-center shrink-0">
                  <PackageCheck className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}

          {/* Status Stepper */}
          {!isCancelled && (
            <div className="bg-card rounded-2xl border border-border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between">
                {statusSteps.map((step, i) => {
                  const isActive = i <= currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-5">
              <div className="flex items-start gap-3 justify-end">
                <div className="text-right">
                  <p className="font-semibold text-destructive mb-1">سبب الإلغاء</p>
                  <p className="text-sm text-destructive">{order.cancellationReason}</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <Card title="ملخص الدفع" icon={CreditCard}>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-foreground">{order.subtotal} ر.س</span>
                <span className="text-muted-foreground">المجموع الفرعي</span>
              </div>
              {order.discount && (
                <div className="flex justify-between">
                  <span className="text-emerald-600">-{order.discount.amount} ر.س</span>
                  <span className="text-emerald-600">خصم ({order.discount.code})</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-emerald-600">
                  {order.shipping === "free" ? "مجاني" : `${order.shipping} ر.س`}
                </span>
                <span className="text-muted-foreground">الشحن</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">{order.total} ر.س</span>
                <span className="font-semibold text-foreground">الإجمالي</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${payment.color}`}>
                  {payment.label}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span>{order.paymentMethod}</span>
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Card>

          {/* Activity Log */}
          <div className="bg-card rounded-2xl border border-border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 justify-end mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                {order.activityLog.length} نشاط
              </span>
              <h3 className="font-semibold text-foreground">سجل الأنشطة</h3>
              <Activity className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute right-[19px] top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-6">
                {order.activityLog.map((log) => {
                  const iconData = activityIcons[log.icon] || activityIcons.create;
                  const Icon = iconData.icon;
                  return (
                    <div key={log.id} className="flex items-start gap-4 justify-end relative">
                      <div className="text-right flex-1">
                        <p className="text-sm font-medium text-foreground">{log.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.date} {log.time} · {log.by}
                        </p>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${iconData.color}`}
                      >
                        <Icon className="w-4 h-4" />
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
    <div className="bg-card rounded-2xl border border-border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2 justify-end mb-4">
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        <Icon className="w-4 h-4 text-muted-foreground" />
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
      {tag ? (
        <span className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">{value}</span>
      ) : (
        <span
          className={`text-sm ${mono ? "font-mono" : ""} ${highlight ? "text-destructive font-medium" : "text-foreground"}`}
        >
          {value}
        </span>
      )}
      <span className="text-sm text-muted-foreground">{label}</span>
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
    <div className="bg-card rounded-2xl border border-border p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-semibold text-foreground text-sm">{value}</p>
    </div>
  );
}
