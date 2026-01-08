import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const cancellationReasons = [
  { id: 1, reason: "السعر مرتفع", count: 45, percentage: 28, trend: "up" },
  { id: 2, reason: "تغيير الرأي", count: 38, percentage: 24, trend: "down" },
  { id: 3, reason: "وجد بديل أفضل", count: 30, percentage: 19, trend: "neutral" },
  { id: 4, reason: "تأخر التوصيل المتوقع", count: 25, percentage: 16, trend: "up" },
  { id: 5, reason: "خطأ في الطلب", count: 20, percentage: 13, trend: "down" },
];

const returnReasons = [
  {
    id: 1,
    reason: "منتج تالف عند الوصول",
    count: 32,
    percentage: 30,
    affectedCompany: "أرامكس",
  },
  {
    id: 2,
    reason: "منتج مختلف عن الوصف",
    count: 28,
    percentage: 26,
    affectedCompany: "SMSA",
  },
  {
    id: 3,
    reason: "مقاس خاطئ",
    count: 22,
    percentage: 20,
    affectedCompany: "جميع الشركات",
  },
  {
    id: 4,
    reason: "تأخر وصول طويل",
    count: 15,
    percentage: 14,
    affectedCompany: "DHL",
  },
  {
    id: 5,
    reason: "جودة ضعيفة",
    count: 11,
    percentage: 10,
    affectedCompany: "جميع الشركات",
  },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-destructive" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-success" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

export function ReasonsTable() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cancellation Reasons */}
      <div className="data-table">
        <div className="p-5 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">
            أسباب الإلغاء
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            تحليل أسباب إلغاء الطلبات
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-right">السبب</TableHead>
                <TableHead className="text-right">العدد</TableHead>
                <TableHead className="text-right">النسبة</TableHead>
                <TableHead className="text-right">الاتجاه</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cancellationReasons.map((item) => (
                <TableRow key={item.id} className="h-12 cursor-pointer">
                  <TableCell className="font-medium">{item.reason}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-destructive rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm">{item.percentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TrendIcon trend={item.trend} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Return Reasons */}
      <div className="data-table">
        <div className="p-5 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">
            أسباب المرتجعات
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            تحليل أسباب إرجاع المنتجات
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-right">السبب</TableHead>
                <TableHead className="text-right">العدد</TableHead>
                <TableHead className="text-right">النسبة</TableHead>
                <TableHead className="text-right">الشركة الأكثر تأثرًا</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returnReasons.map((item) => (
                <TableRow key={item.id} className="h-12 cursor-pointer">
                  <TableCell className="font-medium">{item.reason}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm">{item.percentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {item.affectedCompany}
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
