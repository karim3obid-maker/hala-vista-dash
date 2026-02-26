import { useState } from "react";
import { ClipboardList, Search, Filter, ChevronLeft } from "lucide-react";
import { orders, Order, OrderStatus } from "@/data/ordersData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderDetail from "@/components/orders/OrderDetail";

const statusLabels: Record<OrderStatus, string> = {
  confirmed: "تم التأكيد",
  processing: "قيد التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
  returned: "مرتجع",
};

const statusColors: Record<OrderStatus, string> = {
  confirmed: "bg-primary/10 text-primary border-primary/20",
  processing: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  shipped: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  delivered: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  returned: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

const paymentColors: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-600",
  unpaid: "bg-destructive/10 text-destructive",
  refunded: "bg-amber-500/10 text-amber-600",
};

const paymentLabels: Record<string, string> = {
  paid: "مدفوع",
  unpaid: "غير مدفوع",
  refunded: "مسترجع",
};

const filterTabs: { label: string; value: OrderStatus | "all" }[] = [
  { label: "الكل", value: "all" },
  { label: "تم التأكيد", value: "confirmed" },
  { label: "قيد التجهيز", value: "processing" },
  { label: "تم الشحن", value: "shipped" },
  { label: "تم التوصيل", value: "delivered" },
  { label: "ملغي", value: "cancelled" },
];

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all");

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.includes(search) ||
      o.customer.phone.includes(search);
    const matchesFilter = activeFilter === "all" || o.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (selectedOrder) {
    return (
      <OrderDetail
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="container max-w-[1280px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 justify-end">
        <div>
          <h1 className="text-2xl font-bold text-foreground">الطلبات</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            متابعة وإدارة جميع الطلبات
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <ClipboardList className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full sm:max-w-sm order-2 sm:order-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="بحث برقم الطلب، اسم العميل، أو الهاتف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10 rounded-xl"
          />
        </div>
        <div className="flex gap-2 flex-wrap order-1 sm:order-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                activeFilter === tab.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-right font-semibold">رقم الطلب</TableHead>
              <TableHead className="text-right font-semibold">العميل</TableHead>
              <TableHead className="text-right font-semibold">المنتجات</TableHead>
              <TableHead className="text-right font-semibold">الإجمالي</TableHead>
              <TableHead className="text-right font-semibold">الحالة</TableHead>
              <TableHead className="text-right font-semibold">الدفع</TableHead>
              <TableHead className="text-right font-semibold">التاريخ</TableHead>
              <TableHead className="text-right font-semibold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  لا توجد طلبات مطابقة
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell className="font-mono font-semibold text-foreground">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {order.products.map((p) => p.name).join("، ")}
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {order.total} ر.س
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium border ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${paymentColors[order.paymentStatus]}`}>
                      {paymentLabels[order.paymentStatus]}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {order.date}
                  </TableCell>
                  <TableCell>
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        عرض {filtered.length} من {orders.length} طلب
      </p>
    </div>
  );
};

export default OrdersPage;
