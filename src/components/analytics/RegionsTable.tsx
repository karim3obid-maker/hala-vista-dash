import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const cities = [
  {
    id: 1,
    city: "الرياض",
    delivered: 1250,
    totalOrders: 1420,
    deliveryRate: 88,
    avgTime: "2.3 يوم",
  },
  {
    id: 2,
    city: "جدة",
    delivered: 980,
    totalOrders: 1150,
    deliveryRate: 85,
    avgTime: "2.8 يوم",
  },
  {
    id: 3,
    city: "الدمام",
    delivered: 620,
    totalOrders: 750,
    deliveryRate: 83,
    avgTime: "3.1 يوم",
  },
  {
    id: 4,
    city: "مكة المكرمة",
    delivered: 450,
    totalOrders: 540,
    deliveryRate: 83,
    avgTime: "2.5 يوم",
  },
  {
    id: 5,
    city: "المدينة المنورة",
    delivered: 380,
    totalOrders: 470,
    deliveryRate: 81,
    avgTime: "3.0 يوم",
  },
  {
    id: 6,
    city: "الخبر",
    delivered: 290,
    totalOrders: 350,
    deliveryRate: 83,
    avgTime: "2.9 يوم",
  },
];

const getDeliveryBadge = (rate: number) => {
  if (rate >= 85) return "badge-success";
  if (rate >= 75) return "badge-warning";
  return "badge-danger";
};

export function RegionsTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = cities.filter((city) =>
    city.city.includes(searchQuery)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cities Table */}
      <div className="lg:col-span-2 data-table">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">
              المدن الأعلى توصيلًا
            </h3>
          </div>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="بحث في المدن..."
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
                <TableHead className="text-right">المدينة</TableHead>
                <TableHead className="text-right">تم التسليم</TableHead>
                <TableHead className="text-right">إجمالي الطلبات</TableHead>
                <TableHead className="text-right">معدل التسليم</TableHead>
                <TableHead className="text-right">متوسط الزمن</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCities.map((city) => (
                <TableRow key={city.id} className="h-12 cursor-pointer">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {city.city}
                    </div>
                  </TableCell>
                  <TableCell className="text-success font-medium">
                    {city.delivered.toLocaleString("ar-SA")}
                  </TableCell>
                  <TableCell>
                    {city.totalOrders.toLocaleString("ar-SA")}
                  </TableCell>
                  <TableCell>
                    <span className={getDeliveryBadge(city.deliveryRate)}>
                      {city.deliveryRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {city.avgTime}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Heat Map Placeholder */}
      <div className="data-table p-5">
        <h3 className="text-lg font-bold text-foreground mb-4">
          خريطة التوزيع
        </h3>
        <div className="h-[300px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl flex items-center justify-center border-2 border-dashed border-border">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              خريطة حرارية للتوزيع
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              (قريبًا)
            </p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
            <span className="text-sm text-muted-foreground">أعلى معدل توصيل</span>
            <span className="font-bold text-success">الرياض - 88%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
            <span className="text-sm text-muted-foreground">أكثر المدن طلبات</span>
            <span className="font-bold text-primary">الرياض - 1,420</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
            <span className="text-sm text-muted-foreground">أسرع توصيل</span>
            <span className="font-bold text-accent">الرياض - 2.3 يوم</span>
          </div>
        </div>
      </div>
    </div>
  );
}
