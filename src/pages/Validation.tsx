import { useState } from "react";
import { ShieldCheck, Search, ChevronLeft, Pencil, Truck, Package, MapPin, Phone, User } from "lucide-react";
import { orders, Order, OrderStatus, PaymentStatus } from "@/data/ordersData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const statusLabels: Record<OrderStatus, string> = {
  confirmed: "تم التأكيد", processing: "قيد التجهيز", shipped: "تم الشحن",
  delivered: "تم التوصيل", cancelled: "ملغي", returned: "مرتجع",
};

const statusColors: Record<OrderStatus, string> = {
  confirmed: "bg-primary/10 text-primary border-primary/20",
  processing: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  shipped: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  delivered: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  returned: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

const paymentLabels: Record<string, string> = {
  paid: "مدفوع", unpaid: "غير مدفوع", refunded: "مسترجع",
};

const paymentColors: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-600",
  unpaid: "bg-destructive/10 text-destructive",
  refunded: "bg-amber-500/10 text-amber-600",
};

const filterTabs: { label: string; value: OrderStatus | "all" }[] = [
  { label: "الكل", value: "all" },
  { label: "تم التأكيد", value: "confirmed" },
  { label: "قيد التجهيز", value: "processing" },
  { label: "تم الشحن", value: "shipped" },
  { label: "تم التوصيل", value: "delivered" },
  { label: "ملغي", value: "cancelled" },
];

interface EditFormData {
  customerName: string;
  customerPhone: string;
  city: string;
  district: string;
  street: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  trackingNumber: string;
  shippingCompany: string;
  notes: string;
  products: { name: string; quantity: number; price: number }[];
}

const ValidationPage = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState<EditFormData>({
    customerName: "", customerPhone: "", city: "", district: "", street: "",
    status: "confirmed", paymentStatus: "unpaid", trackingNumber: "", shippingCompany: "", notes: "",
    products: [],
  });

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.includes(search) ||
      o.customer.phone.includes(search);
    const matchesFilter = activeFilter === "all" || o.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const openEdit = (order: Order) => {
    setSelectedOrder(order);
    setFormData({
      customerName: order.customer.name,
      customerPhone: order.customer.phone,
      city: order.customer.address.city,
      district: order.customer.address.district,
      street: order.customer.address.street,
      status: order.status,
      paymentStatus: order.paymentStatus,
      trackingNumber: "",
      shippingCompany: "",
      notes: "",
      products: order.products.map((p) => ({ name: p.name, quantity: p.quantity, price: p.price })),
    });
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    toast({ title: "تم حفظ التعديلات", description: `تم تحديث الطلب ${selectedOrder?.orderNumber} بنجاح` });
    setEditDialogOpen(false);
    setSelectedOrder(null);
  };

  const updateProduct = (index: number, field: string, value: string | number) => {
    const updated = [...formData.products];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, products: updated });
  };

  return (
    <div className="container max-w-[1280px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 justify-end">
        <div>
          <h1 className="text-2xl font-bold text-foreground">فالديشن</h1>
          <p className="text-muted-foreground mt-1 text-sm">مراجعة وتعديل الطلبات وإضافة الشحنات</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "إجمالي الطلبات", value: orders.length, color: "text-primary" },
          { label: "بانتظار المراجعة", value: orders.filter(o => o.status === "confirmed").length, color: "text-amber-600" },
          { label: "تم الشحن", value: orders.filter(o => o.status === "shipped").length, color: "text-blue-600" },
          { label: "تم التوصيل", value: orders.filter(o => o.status === "delivered").length, color: "text-emerald-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full sm:max-w-sm order-2 sm:order-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="بحث برقم الطلب، اسم العميل، أو الهاتف..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10 rounded-xl" />
        </div>
        <div className="flex gap-2 flex-wrap order-1 sm:order-2">
          {filterTabs.map((tab) => (
            <button key={tab.value} onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${activeFilter === tab.value ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/40"}`}>
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
              <TableHead className="text-right font-semibold">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">لا توجد طلبات مطابقة</TableCell>
              </TableRow>
            ) : (
              filtered.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono font-semibold text-foreground">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{order.products.map((p) => p.name).join("، ")}</TableCell>
                  <TableCell className="font-semibold text-foreground">{order.total} ر.س</TableCell>
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
                  <TableCell className="text-muted-foreground text-sm">{order.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="gap-1.5 rounded-xl" onClick={() => openEdit(order)}>
                      <Pencil className="w-3.5 h-3.5" />
                      تعديل
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">عرض {filtered.length} من {orders.length} طلب</p>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right flex items-center gap-2">
              <Pencil className="w-5 h-5 text-primary" />
              تعديل الطلب {selectedOrder?.orderNumber}
            </DialogTitle>
            <DialogDescription className="text-right">تعديل بيانات الطلب وإضافة شحنة</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Customer Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> بيانات العميل
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">اسم العميل</Label>
                  <Input value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} className="mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">رقم الهاتف</Label>
                  <Input value={formData.customerPhone} onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })} className="mt-1 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> العنوان
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">المدينة</Label>
                  <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">الحي</Label>
                  <Input value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} className="mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">الشارع</Label>
                  <Input value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} className="mt-1 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" /> المنتجات
              </h3>
              <div className="space-y-2">
                {formData.products.map((product, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-3 p-3 bg-muted/30 rounded-xl border border-border">
                    <div>
                      <Label className="text-xs text-muted-foreground">المنتج</Label>
                      <Input value={product.name} onChange={(e) => updateProduct(idx, "name", e.target.value)} className="mt-1 rounded-xl" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">الكمية</Label>
                      <Input type="number" value={product.quantity} onChange={(e) => updateProduct(idx, "quantity", Number(e.target.value))} className="mt-1 rounded-xl" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">السعر</Label>
                      <Input type="number" value={product.price} onChange={(e) => updateProduct(idx, "price", Number(e.target.value))} className="mt-1 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status & Payment */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">حالة الطلب والدفع</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">حالة الطلب</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as OrderStatus })}>
                    <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusLabels).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">حالة الدفع</Label>
                  <Select value={formData.paymentStatus} onValueChange={(v) => setFormData({ ...formData, paymentStatus: v as PaymentStatus })}>
                    <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(paymentLabels).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" /> بيانات الشحنة
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">شركة الشحن</Label>
                  <Select value={formData.shippingCompany} onValueChange={(v) => setFormData({ ...formData, shippingCompany: v })}>
                    <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="اختر شركة الشحن" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aramex">أرامكس</SelectItem>
                      <SelectItem value="smsa">SMSA</SelectItem>
                      <SelectItem value="dhl">DHL</SelectItem>
                      <SelectItem value="fastlo">فاستلو</SelectItem>
                      <SelectItem value="jt">J&T Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">رقم التتبع</Label>
                  <Input value={formData.trackingNumber} onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })} placeholder="أدخل رقم التتبع" className="mt-1 rounded-xl" />
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">ملاحظات</Label>
                <Input value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="ملاحظات إضافية..." className="mt-1 rounded-xl" />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 flex gap-2 sm:justify-start">
            <Button onClick={handleSave} className="rounded-xl gap-2">
              <ShieldCheck className="w-4 h-4" /> حفظ التعديلات
            </Button>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="rounded-xl">إلغاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ValidationPage;
