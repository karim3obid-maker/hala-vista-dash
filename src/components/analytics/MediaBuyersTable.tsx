import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Minus, Download, ChevronDown, ChevronUp, ShoppingCart, CheckCircle2, Truck, PackageCheck, RotateCcw, XCircle } from "lucide-react";
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

const mediaBuyers = [
  {
    id: 1,
    name: "أحمد محمد",
    orders: 1250,
    confirmationRate: 92.5,
    deliveryRate: 85.2,
    revenue: 125000,
    trend: "up",
    details: {
      totalOrders: 1250,
      confirmedOrders: 1156,
      shippedOrders: 1100,
      deliveredOrders: 1065,
      returnedOrders: 45,
      cancelledOrders: 35,
    },
  },
  {
    id: 2,
    name: "محمد علي",
    orders: 980,
    confirmationRate: 88.3,
    deliveryRate: 82.1,
    revenue: 98500,
    trend: "up",
    details: {
      totalOrders: 980,
      confirmedOrders: 865,
      shippedOrders: 820,
      deliveredOrders: 805,
      returnedOrders: 38,
      cancelledOrders: 25,
    },
  },
  {
    id: 3,
    name: "سارة أحمد",
    orders: 875,
    confirmationRate: 91.2,
    deliveryRate: 79.8,
    revenue: 87200,
    trend: "down",
    details: {
      totalOrders: 875,
      confirmedOrders: 798,
      shippedOrders: 750,
      deliveredOrders: 698,
      returnedOrders: 32,
      cancelledOrders: 20,
    },
  },
  {
    id: 4,
    name: "خالد عبدالله",
    orders: 720,
    confirmationRate: 85.6,
    deliveryRate: 77.5,
    revenue: 72800,
    trend: "stable",
    details: {
      totalOrders: 720,
      confirmedOrders: 616,
      shippedOrders: 580,
      deliveredOrders: 558,
      returnedOrders: 28,
      cancelledOrders: 22,
    },
  },
  {
    id: 5,
    name: "فاطمة حسن",
    orders: 650,
    confirmationRate: 89.8,
    deliveryRate: 81.3,
    revenue: 65400,
    trend: "up",
    details: {
      totalOrders: 650,
      confirmedOrders: 584,
      shippedOrders: 550,
      deliveredOrders: 528,
      returnedOrders: 18,
      cancelledOrders: 12,
    },
  },
  {
    id: 6,
    name: "عمر يوسف",
    orders: 580,
    confirmationRate: 87.2,
    deliveryRate: 78.9,
    revenue: 58200,
    trend: "down",
    details: {
      totalOrders: 580,
      confirmedOrders: 506,
      shippedOrders: 475,
      deliveredOrders: 458,
      returnedOrders: 22,
      cancelledOrders: 17,
    },
  },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const getInitialBgColor = (index: number) => {
  const colors = [
    "bg-primary/20 text-primary",
    "bg-orange-100 text-orange-600",
    "bg-green-100 text-green-600",
    "bg-blue-100 text-blue-600",
    "bg-pink-100 text-pink-600",
    "bg-yellow-100 text-yellow-600",
  ];
  return colors[index % colors.length];
};

const DetailItem = ({ icon: Icon, label, value, color, bgColor }: { icon: any; label: string; value: number; color: string; bgColor: string }) => (
  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
    <div className={`p-1.5 rounded-md ${bgColor}`}>
      <Icon className={`w-3.5 h-3.5 ${color}`} />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-foreground">{value.toLocaleString("ar-SA")}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
);

export const MediaBuyersTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const filteredBuyers = mediaBuyers.filter((buyer) =>
    buyer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">
          أعلى الميديا باير
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 h-9 text-sm"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            تحميل
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-right font-semibold text-foreground w-8"></TableHead>
              <TableHead className="text-right font-semibold text-foreground">
                الميديا باير
              </TableHead>
              <TableHead className="text-center font-semibold text-foreground">
                الطلبات
              </TableHead>
              <TableHead className="text-center font-semibold text-foreground">
                نسبة التأكيد
              </TableHead>
              <TableHead className="text-center font-semibold text-foreground">
                نسبة التسليم
              </TableHead>
              <TableHead className="text-center font-semibold text-foreground">
                الإيرادات
              </TableHead>
              <TableHead className="text-center font-semibold text-foreground">
                الاتجاه
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuyers.map((buyer, index) => {
              const isExpanded = expandedRows.includes(buyer.id);
              return (
                <>
                  <TableRow
                    key={buyer.id}
                    className={`hover:bg-muted/40 transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-muted/30" : ""
                    }`}
                    onClick={() => toggleRow(buyer.id)}
                  >
                    <TableCell className="w-8">
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium ${getInitialBgColor(
                            index
                          )}`}
                        >
                          {buyer.name.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground">
                          {buyer.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {buyer.orders.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          buyer.confirmationRate >= 90
                            ? "bg-green-100 text-green-700"
                            : buyer.confirmationRate >= 85
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {buyer.confirmationRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          buyer.deliveryRate >= 80
                            ? "bg-green-100 text-green-700"
                            : buyer.deliveryRate >= 75
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {buyer.deliveryRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-foreground">
                      {buyer.revenue.toLocaleString()} SAR
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <TrendIcon trend={buyer.trend} />
                      </div>
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow key={`${buyer.id}-details`} className="bg-muted/20">
                      <TableCell colSpan={7} className="p-4">
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                          <DetailItem
                            icon={ShoppingCart}
                            label="إجمالي الطلبات"
                            value={buyer.details.totalOrders}
                            color="text-primary"
                            bgColor="bg-primary/10"
                          />
                          <DetailItem
                            icon={CheckCircle2}
                            label="تم تأكيدها"
                            value={buyer.details.confirmedOrders}
                            color="text-emerald-500"
                            bgColor="bg-emerald-500/10"
                          />
                          <DetailItem
                            icon={Truck}
                            label="تم شحنها"
                            value={buyer.details.shippedOrders}
                            color="text-blue-500"
                            bgColor="bg-blue-500/10"
                          />
                          <DetailItem
                            icon={PackageCheck}
                            label="تم تسليمها"
                            value={buyer.details.deliveredOrders}
                            color="text-green-600"
                            bgColor="bg-green-600/10"
                          />
                          <DetailItem
                            icon={RotateCcw}
                            label="مرتجعة"
                            value={buyer.details.returnedOrders}
                            color="text-orange-500"
                            bgColor="bg-orange-500/10"
                          />
                          <DetailItem
                            icon={XCircle}
                            label="ملغاة"
                            value={buyer.details.cancelledOrders}
                            color="text-red-500"
                            bgColor="bg-red-500/10"
                          />
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
};
