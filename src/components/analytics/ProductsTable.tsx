import { useState } from "react";
import { Search, MoreVertical, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const topProducts = [
  {
    id: 1,
    name: "حقيبة جلد طبيعي",
    sku: "BAG-001",
    orders: 245,
    quantity: 312,
    revenue: 48750,
    margin: 35,
    cancelRate: 5,
  },
  {
    id: 2,
    name: "ساعة كلاسيكية",
    sku: "WTC-042",
    orders: 198,
    quantity: 198,
    revenue: 59400,
    margin: 42,
    cancelRate: 3,
  },
  {
    id: 3,
    name: "عطر فاخر",
    sku: "PRF-115",
    orders: 176,
    quantity: 220,
    revenue: 44000,
    margin: 55,
    cancelRate: 8,
  },
  {
    id: 4,
    name: "نظارة شمسية",
    sku: "SUN-088",
    orders: 156,
    quantity: 180,
    revenue: 27000,
    margin: 38,
    cancelRate: 4,
  },
  {
    id: 5,
    name: "حذاء رياضي",
    sku: "SHO-203",
    orders: 142,
    quantity: 155,
    revenue: 31000,
    margin: 28,
    cancelRate: 12,
  },
];

const cancelledProducts = [
  {
    id: 1,
    name: "جهاز إلكتروني",
    cancellations: 45,
    totalOrders: 120,
    cancelRate: 37.5,
    note: "مشكلة في الوصف",
  },
  {
    id: 2,
    name: "ملابس موسمية",
    cancellations: 38,
    totalOrders: 95,
    cancelRate: 40,
    note: "مقاسات غير متوفرة",
  },
  {
    id: 3,
    name: "إكسسوارات منزلية",
    cancellations: 28,
    totalOrders: 85,
    cancelRate: 33,
    note: "تأخر الشحن",
  },
];

export function ProductsTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const getCancelBadge = (rate: number) => {
    if (rate >= 10) return "badge-danger";
    if (rate >= 5) return "badge-warning";
    return "badge-success";
  };

  return (
    <div className="space-y-8">
      {/* Top Selling Products */}
      <div className="data-table">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">
              أهم المنتجات مبيعًا
            </h3>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="بحث في المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-right">المنتج</TableHead>
                <TableHead className="text-right">SKU</TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 px-2 -mr-2">
                    عدد الطلبات
                    <ArrowUpDown className="w-3 h-3 mr-1" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">الكمية</TableHead>
                <TableHead className="text-right">الإيراد</TableHead>
                <TableHead className="text-right">هامش الربح</TableHead>
                <TableHead className="text-right">% إلغاء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.id} className="h-12 cursor-pointer">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {product.name.charAt(0)}
                      </div>
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">
                    {product.sku}
                  </TableCell>
                  <TableCell>{product.orders.toLocaleString("ar-SA")}</TableCell>
                  <TableCell>{product.quantity.toLocaleString("ar-SA")}</TableCell>
                  <TableCell className="font-medium">
                    {product.revenue.toLocaleString("ar-SA")} SAR
                  </TableCell>
                  <TableCell>
                    <span className="badge-success">{product.margin}%</span>
                  </TableCell>
                  <TableCell>
                    <span className={getCancelBadge(product.cancelRate)}>
                      {product.cancelRate}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Highest Cancelled Products */}
      <div className="data-table">
        <div className="p-5 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">
            المنتجات الأعلى إلغاءً
          </h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-right">المنتج</TableHead>
                <TableHead className="text-right">الإلغاءات</TableHead>
                <TableHead className="text-right">إجمالي الطلبات</TableHead>
                <TableHead className="text-right">% إلغاء</TableHead>
                <TableHead className="text-right">ملاحظة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cancelledProducts.map((product) => (
                <TableRow key={product.id} className="h-12 cursor-pointer">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-destructive font-medium">
                    {product.cancellations}
                  </TableCell>
                  <TableCell>{product.totalOrders}</TableCell>
                  <TableCell>
                    <span className="badge-danger">{product.cancelRate}%</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {product.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
