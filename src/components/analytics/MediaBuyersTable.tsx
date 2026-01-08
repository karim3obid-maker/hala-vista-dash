import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Minus, Download } from "lucide-react";
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

const mediaBuyers = [
  {
    id: 1,
    name: "أحمد محمد",
    orders: 1250,
    confirmationRate: 92.5,
    deliveryRate: 85.2,
    revenue: 125000,
    trend: "up",
  },
  {
    id: 2,
    name: "محمد علي",
    orders: 980,
    confirmationRate: 88.3,
    deliveryRate: 82.1,
    revenue: 98500,
    trend: "up",
  },
  {
    id: 3,
    name: "سارة أحمد",
    orders: 875,
    confirmationRate: 91.2,
    deliveryRate: 79.8,
    revenue: 87200,
    trend: "down",
  },
  {
    id: 4,
    name: "خالد عبدالله",
    orders: 720,
    confirmationRate: 85.6,
    deliveryRate: 77.5,
    revenue: 72800,
    trend: "stable",
  },
  {
    id: 5,
    name: "فاطمة حسن",
    orders: 650,
    confirmationRate: 89.8,
    deliveryRate: 81.3,
    revenue: 65400,
    trend: "up",
  },
  {
    id: 6,
    name: "عمر يوسف",
    orders: 580,
    confirmationRate: 87.2,
    deliveryRate: 78.9,
    revenue: 58200,
    trend: "down",
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

export const MediaBuyersTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBuyers = mediaBuyers.filter((buyer) =>
    buyer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {filteredBuyers.map((buyer, index) => (
              <TableRow
                key={buyer.id}
                className={`hover:bg-muted/40 transition-colors ${
                  index % 2 === 0 ? "bg-muted/30" : ""
                }`}
              >
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
