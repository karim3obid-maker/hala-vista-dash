import { useState } from "react";
import { Search, MoreVertical, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
    details: {
      confirmedOrders: 232,
      cancelledOrders: 13,
      deliveredOrders: 220,
      returnedOrders: 5,
      avgOrderValue: 199,
      totalCost: 31687,
      netProfit: 17063,
    }
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
    details: {
      confirmedOrders: 192,
      cancelledOrders: 6,
      deliveredOrders: 185,
      returnedOrders: 3,
      avgOrderValue: 300,
      totalCost: 34452,
      netProfit: 24948,
    }
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
    details: {
      confirmedOrders: 162,
      cancelledOrders: 14,
      deliveredOrders: 155,
      returnedOrders: 7,
      avgOrderValue: 250,
      totalCost: 19800,
      netProfit: 24200,
    }
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
    details: {
      confirmedOrders: 150,
      cancelledOrders: 6,
      deliveredOrders: 145,
      returnedOrders: 2,
      avgOrderValue: 173,
      totalCost: 16740,
      netProfit: 10260,
    }
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
    details: {
      confirmedOrders: 125,
      cancelledOrders: 17,
      deliveredOrders: 118,
      returnedOrders: 8,
      avgOrderValue: 218,
      totalCost: 22320,
      netProfit: 8680,
    }
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
    details: {
      reasonBreakdown: [
        { reason: "وصف غير دقيق", count: 20 },
        { reason: "سعر مرتفع", count: 15 },
        { reason: "تغيير رأي", count: 10 },
      ],
      lostRevenue: 13500,
    }
  },
  {
    id: 2,
    name: "ملابس موسمية",
    cancellations: 38,
    totalOrders: 95,
    cancelRate: 40,
    note: "مقاسات غير متوفرة",
    details: {
      reasonBreakdown: [
        { reason: "مقاس غير متوفر", count: 22 },
        { reason: "لون مختلف", count: 10 },
        { reason: "تأخر الشحن", count: 6 },
      ],
      lostRevenue: 7600,
    }
  },
  {
    id: 3,
    name: "إكسسوارات منزلية",
    cancellations: 28,
    totalOrders: 85,
    cancelRate: 33,
    note: "تأخر الشحن",
    details: {
      reasonBreakdown: [
        { reason: "تأخر الشحن", count: 18 },
        { reason: "غير متوفر", count: 6 },
        { reason: "تغيير رأي", count: 4 },
      ],
      lostRevenue: 4200,
    }
  },
];

export function ProductsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTopProducts, setExpandedTopProducts] = useState<number[]>([]);
  const [expandedCancelledProducts, setExpandedCancelledProducts] = useState<number[]>([]);

  const toggleTopProduct = (id: number) => {
    setExpandedTopProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleCancelledProduct = (id: number) => {
    setExpandedCancelledProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const getInitialBgColor = (index: number) => {
    const colors = [
      "bg-[hsl(var(--primary)/0.15)] text-primary",
      "bg-[hsl(var(--accent)/0.15)] text-accent",
      "bg-emerald-100 text-emerald-600",
      "bg-amber-100 text-amber-600",
      "bg-rose-100 text-rose-600",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Top Selling Products */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">
              أهم المنتجات مبيعًا
            </h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="بحث في المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-muted/50 border-0 rounded-xl h-11"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4 w-8"></TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">المنتج</TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">SKU</TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">
                  <Button variant="ghost" size="sm" className="h-8 px-2 -mr-2 text-muted-foreground font-medium">
                    عدد الطلبات
                    <ArrowUpDown className="w-3 h-3 mr-1" />
                  </Button>
                </TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">الكمية</TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">الإيراد</TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">هامش الربح</TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">% إلغاء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product, index) => {
                const isExpanded = expandedTopProducts.includes(product.id);
                return (
                  <>
                    <TableRow 
                      key={product.id} 
                      onClick={() => toggleTopProduct(product.id)}
                      className={`h-14 cursor-pointer border-0 ${index % 2 === 1 ? 'bg-muted/30' : ''} hover:bg-muted/50 transition-colors`}
                    >
                      <TableCell className="py-4">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${getInitialBgColor(index)}`}>
                            {product.name.charAt(0)}
                          </div>
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-mono text-sm py-4">
                        {product.sku}
                      </TableCell>
                      <TableCell className="py-4">{product.orders.toLocaleString("ar-SA")}</TableCell>
                      <TableCell className="py-4">{product.quantity.toLocaleString("ar-SA")}</TableCell>
                      <TableCell className="font-medium py-4">
                        {product.revenue.toLocaleString("ar-SA")} SAR
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-emerald-600 font-semibold">{product.margin}%</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`font-semibold ${product.cancelRate >= 10 ? 'text-destructive bg-destructive/10 px-2 py-1 rounded-md' : 'text-destructive'}`}>
                          {product.cancelRate}%
                        </span>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow key={`${product.id}-details`} className="bg-muted/20 border-0">
                        <TableCell colSpan={8} className="p-0">
                          <div className="p-5 border-r-4 border-primary">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="bg-card rounded-xl p-4 border border-border">
                                <p className="text-muted-foreground text-sm mb-1">الطلبات المؤكدة</p>
                                <p className="text-xl font-bold text-emerald-600">{product.details.confirmedOrders}</p>
                              </div>
                              <div className="bg-card rounded-xl p-4 border border-border">
                                <p className="text-muted-foreground text-sm mb-1">الطلبات الملغاة</p>
                                <p className="text-xl font-bold text-destructive">{product.details.cancelledOrders}</p>
                              </div>
                              <div className="bg-card rounded-xl p-4 border border-border">
                                <p className="text-muted-foreground text-sm mb-1">تم التسليم</p>
                                <p className="text-xl font-bold text-primary">{product.details.deliveredOrders}</p>
                              </div>
                              <div className="bg-card rounded-xl p-4 border border-border">
                                <p className="text-muted-foreground text-sm mb-1">المرتجعات</p>
                                <p className="text-xl font-bold text-amber-600">{product.details.returnedOrders}</p>
                              </div>
                              <div className="bg-card rounded-xl p-4 border border-border">
                                <p className="text-muted-foreground text-sm mb-1">متوسط قيمة الطلب</p>
                                <p className="text-xl font-bold">{product.details.avgOrderValue} SAR</p>
                              </div>
                              <div className="bg-card rounded-xl p-4 border border-border">
                                <p className="text-muted-foreground text-sm mb-1">إجمالي التكلفة</p>
                                <p className="text-xl font-bold">{product.details.totalCost.toLocaleString("ar-SA")} SAR</p>
                              </div>
                              <div className="bg-card rounded-xl p-4 border border-border col-span-2">
                                <p className="text-muted-foreground text-sm mb-1">صافي الربح</p>
                                <p className="text-xl font-bold text-emerald-600">{product.details.netProfit.toLocaleString("ar-SA")} SAR</p>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Highest Cancelled Products */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">
            المنتجات الأعلى إلغاءً
          </h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4 w-8"></TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">المنتج</TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">الإلغاءات</TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">إجمالي الطلبات</TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">% إلغاء</TableHead>
                <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">ملاحظة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cancelledProducts.map((product, index) => {
                const isExpanded = expandedCancelledProducts.includes(product.id);
                return (
                  <>
                    <TableRow 
                      key={product.id} 
                      onClick={() => toggleCancelledProduct(product.id)}
                      className={`h-14 cursor-pointer border-0 ${index % 2 === 1 ? 'bg-muted/30' : ''} hover:bg-muted/50 transition-colors`}
                    >
                      <TableCell className="py-4">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${getInitialBgColor(index)}`}>
                            {product.name.charAt(0)}
                          </div>
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-destructive font-semibold py-4">
                        {product.cancellations}
                      </TableCell>
                      <TableCell className="py-4">{product.totalOrders}</TableCell>
                      <TableCell className="py-4">
                        <span className="text-destructive bg-destructive/10 px-2 py-1 rounded-md font-semibold">{product.cancelRate}%</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm py-4">
                        {product.note}
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow key={`${product.id}-details`} className="bg-muted/20 border-0">
                        <TableCell colSpan={6} className="p-0">
                          <div className="p-5 border-r-4 border-destructive">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-card rounded-xl p-4 border border-border">
                                <p className="text-muted-foreground text-sm mb-3">تفاصيل أسباب الإلغاء</p>
                                <div className="space-y-2">
                                  {product.details.reasonBreakdown.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                      <span className="text-sm">{item.reason}</span>
                                      <span className="text-sm font-semibold text-destructive">{item.count}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-card rounded-xl p-4 border border-border">
                                <p className="text-muted-foreground text-sm mb-1">الإيرادات المفقودة</p>
                                <p className="text-2xl font-bold text-destructive">{product.details.lostRevenue.toLocaleString("ar-SA")} SAR</p>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
