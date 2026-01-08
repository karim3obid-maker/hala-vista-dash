import { useState } from "react";
import { Search, Download, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
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

const financialData = [
  {
    id: 1,
    name: "حقيبة جلد طبيعي",
    sku: "BAG-001",
    orders: 245,
    salesRevenue: 48750,
    productCost: 24375,
    confirmationCost: 490,
    shippingCost: 2450,
    codFee: 975,
    codPercentage: 2,
    grossProfit: 20460,
    netProfit: 17063,
    deliveredSales: 43780,
    deliveredOrders: 220,
  },
  {
    id: 2,
    name: "ساعة كلاسيكية",
    sku: "WTC-042",
    orders: 198,
    salesRevenue: 59400,
    productCost: 29700,
    confirmationCost: 396,
    shippingCost: 1980,
    codFee: 1188,
    codPercentage: 2,
    grossProfit: 26136,
    netProfit: 24948,
    deliveredSales: 55500,
    deliveredOrders: 185,
  },
  {
    id: 3,
    name: "عطر فاخر",
    sku: "PRF-115",
    orders: 176,
    salesRevenue: 44000,
    productCost: 17600,
    confirmationCost: 352,
    shippingCost: 1760,
    codFee: 880,
    codPercentage: 2,
    grossProfit: 23408,
    netProfit: 24200,
    deliveredSales: 38750,
    deliveredOrders: 155,
  },
  {
    id: 4,
    name: "نظارة شمسية",
    sku: "SUN-088",
    orders: 156,
    salesRevenue: 27000,
    productCost: 13500,
    confirmationCost: 312,
    shippingCost: 1560,
    codFee: 540,
    codPercentage: 2,
    grossProfit: 11088,
    netProfit: 10260,
    deliveredSales: 25085,
    deliveredOrders: 145,
  },
  {
    id: 5,
    name: "حذاء رياضي",
    sku: "SHO-203",
    orders: 142,
    salesRevenue: 31000,
    productCost: 18600,
    confirmationCost: 284,
    shippingCost: 1420,
    codFee: 620,
    codPercentage: 2,
    grossProfit: 10076,
    netProfit: 8680,
    deliveredSales: 25724,
    deliveredOrders: 118,
  },
  {
    id: 6,
    name: "جهاز إلكتروني",
    sku: "ELC-120",
    orders: 120,
    salesRevenue: 36000,
    productCost: 21600,
    confirmationCost: 240,
    shippingCost: 1200,
    codFee: 720,
    codPercentage: 2,
    grossProfit: 12240,
    netProfit: 10500,
    deliveredSales: 28500,
    deliveredOrders: 95,
  },
  {
    id: 7,
    name: "ملابس موسمية",
    sku: "CLT-095",
    orders: 95,
    salesRevenue: 19000,
    productCost: 9500,
    confirmationCost: 190,
    shippingCost: 950,
    codFee: 380,
    codPercentage: 2,
    grossProfit: 7980,
    netProfit: 6800,
    deliveredSales: 11400,
    deliveredOrders: 57,
  },
  {
    id: 8,
    name: "إكسسوارات منزلية",
    sku: "HOM-085",
    orders: 85,
    salesRevenue: 12750,
    productCost: 6375,
    confirmationCost: 170,
    shippingCost: 850,
    codFee: 255,
    codPercentage: 2,
    grossProfit: 5100,
    netProfit: 4200,
    deliveredSales: 8550,
    deliveredOrders: 57,
  },
];

export function FinancialTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows(prev => 
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

  const filteredData = financialData.filter(product => 
    product.name.includes(searchQuery) || product.sku.includes(searchQuery)
  );

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">
            التحليل المالي للمنتجات
          </h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            تحميل
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
              <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">
                <Button variant="ghost" size="sm" className="h-8 px-2 -mr-2 text-muted-foreground font-medium">
                  الطلبات
                  <ArrowUpDown className="w-3 h-3 mr-1" />
                </Button>
              </TableHead>
              <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">المبيعات</TableHead>
              <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">تكلفة المنتج</TableHead>
              <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">خدمات التأكيد</TableHead>
              <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">خدمات الشحن</TableHead>
              <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">رسوم COD</TableHead>
              <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">صافي الربح</TableHead>
              <TableHead className="text-right text-muted-foreground font-medium text-sm py-4">مبيعات فعلية</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((product, index) => {
              const isExpanded = expandedRows.includes(product.id);
              return (
                <>
                  <TableRow 
                    key={product.id} 
                    onClick={() => toggleRow(product.id)}
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
                        <div>
                          <p>{product.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 font-medium">{product.orders.toLocaleString("ar-SA")}</TableCell>
                    <TableCell className="py-4 font-medium text-primary">
                      {product.salesRevenue.toLocaleString("ar-SA")} SAR
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground">
                      {product.productCost.toLocaleString("ar-SA")} SAR
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground">
                      {product.confirmationCost.toLocaleString("ar-SA")} SAR
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground">
                      {product.shippingCost.toLocaleString("ar-SA")} SAR
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">{product.codFee.toLocaleString("ar-SA")} SAR</span>
                        <span className="text-xs text-muted-foreground">({product.codPercentage}%)</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="font-bold text-emerald-600">
                        {product.netProfit.toLocaleString("ar-SA")} SAR
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{product.deliveredSales.toLocaleString("ar-SA")} SAR</span>
                        <span className="text-xs text-muted-foreground">({product.deliveredOrders} طلب)</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow key={`${product.id}-details`} className="bg-muted/20 border-0">
                      <TableCell colSpan={10} className="p-0">
                        <div className="p-5 border-r-4 border-emerald-500">
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <div className="bg-card rounded-xl p-4 border border-border">
                              <p className="text-muted-foreground text-sm mb-1">إجمالي المبيعات</p>
                              <p className="text-xl font-bold text-primary">{product.salesRevenue.toLocaleString("ar-SA")} SAR</p>
                            </div>
                            <div className="bg-card rounded-xl p-4 border border-border">
                              <p className="text-muted-foreground text-sm mb-1">تكلفة المنتج</p>
                              <p className="text-xl font-bold text-destructive">{product.productCost.toLocaleString("ar-SA")} SAR</p>
                            </div>
                            <div className="bg-card rounded-xl p-4 border border-border">
                              <p className="text-muted-foreground text-sm mb-1">خدمات التأكيد</p>
                              <p className="text-xl font-bold text-amber-600">{product.confirmationCost.toLocaleString("ar-SA")} SAR</p>
                            </div>
                            <div className="bg-card rounded-xl p-4 border border-border">
                              <p className="text-muted-foreground text-sm mb-1">خدمات الشحن</p>
                              <p className="text-xl font-bold text-amber-600">{product.shippingCost.toLocaleString("ar-SA")} SAR</p>
                            </div>
                            <div className="bg-card rounded-xl p-4 border border-border">
                              <p className="text-muted-foreground text-sm mb-1">رسوم COD ({product.codPercentage}%)</p>
                              <p className="text-xl font-bold text-amber-600">{product.codFee.toLocaleString("ar-SA")} SAR</p>
                            </div>
                            <div className="bg-card rounded-xl p-4 border border-border">
                              <p className="text-muted-foreground text-sm mb-1">إجمالي الربح</p>
                              <p className="text-xl font-bold text-emerald-500">{product.grossProfit.toLocaleString("ar-SA")} SAR</p>
                            </div>
                            <div className="bg-card rounded-xl p-4 border border-border col-span-2">
                              <p className="text-muted-foreground text-sm mb-1">صافي الربح</p>
                              <p className="text-2xl font-bold text-emerald-600">{product.netProfit.toLocaleString("ar-SA")} SAR</p>
                            </div>
                            <div className="bg-card rounded-xl p-4 border border-border col-span-2">
                              <p className="text-muted-foreground text-sm mb-1">المبيعات الفعلية (بعد التسليم)</p>
                              <p className="text-2xl font-bold">{product.deliveredSales.toLocaleString("ar-SA")} SAR</p>
                              <p className="text-sm text-muted-foreground">{product.deliveredOrders} طلب تم تسليمه</p>
                            </div>
                            <div className="bg-card rounded-xl p-4 border border-border col-span-2">
                              <p className="text-muted-foreground text-sm mb-1">هامش الربح</p>
                              <p className="text-2xl font-bold text-emerald-600">
                                {((product.netProfit / product.salesRevenue) * 100).toFixed(1)}%
                              </p>
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
  );
}
