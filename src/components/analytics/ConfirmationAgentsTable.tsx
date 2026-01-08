import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown, Phone } from "lucide-react";

const agentsData = [
  { 
    id: 1, 
    name: "أحمد محمد", 
    totalLeads: 245, 
    confirmed: 198,
    cancelled: 32,
    delivered: 175,
    confirmationRate: 80.8, 
    cancellationRate: 13.1,
    deliveryRate: 88.4,
    trend: "up" 
  },
  { 
    id: 2, 
    name: "سارة أحمد", 
    totalLeads: 312, 
    confirmed: 267,
    cancelled: 28,
    delivered: 245,
    confirmationRate: 85.6, 
    cancellationRate: 9.0,
    deliveryRate: 91.8,
    trend: "up" 
  },
  { 
    id: 3, 
    name: "محمد علي", 
    totalLeads: 189, 
    confirmed: 142,
    cancelled: 35,
    delivered: 128,
    confirmationRate: 75.1, 
    cancellationRate: 18.5,
    deliveryRate: 90.1,
    trend: "down" 
  },
  { 
    id: 4, 
    name: "فاطمة حسن", 
    totalLeads: 278, 
    confirmed: 234,
    cancelled: 25,
    delivered: 210,
    confirmationRate: 84.2, 
    cancellationRate: 9.0,
    deliveryRate: 89.7,
    trend: "up" 
  },
  { 
    id: 5, 
    name: "عمر خالد", 
    totalLeads: 156, 
    confirmed: 112,
    cancelled: 30,
    delivered: 98,
    confirmationRate: 71.8, 
    cancellationRate: 19.2,
    deliveryRate: 87.5,
    trend: "down" 
  },
];

export const ConfirmationAgentsTable = () => {
  return (
    <Card className="p-6 rounded-2xl border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">أداء موظفي التأكيد</h3>
        </div>
        <div className="relative w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="بحث عن موظف..." 
            className="pr-10 rounded-xl bg-muted/50 border-0"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-muted hover:bg-transparent">
              <TableHead className="text-right font-semibold text-foreground">الموظف</TableHead>
              <TableHead className="text-center font-semibold text-foreground">إجمالي الليدز</TableHead>
              <TableHead className="text-center font-semibold text-foreground">مؤكد</TableHead>
              <TableHead className="text-center font-semibold text-foreground">ملغي</TableHead>
              <TableHead className="text-center font-semibold text-foreground">مُسلّم</TableHead>
              <TableHead className="text-center font-semibold text-foreground">نسبة التأكيد</TableHead>
              <TableHead className="text-center font-semibold text-foreground">نسبة الإلغاء</TableHead>
              <TableHead className="text-center font-semibold text-foreground">نسبة التسليم</TableHead>
              <TableHead className="text-center font-semibold text-foreground">الاتجاه</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agentsData.map((agent, index) => (
              <TableRow 
                key={agent.id} 
                className={`border-0 cursor-pointer transition-colors hover:bg-muted/50 ${index % 2 === 0 ? 'bg-muted/30' : ''}`}
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium">{agent.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center font-semibold">{agent.totalLeads}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                    {agent.confirmed}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-100">
                    {agent.cancelled}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    {agent.delivered}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant="secondary" 
                    className={`${agent.confirmationRate >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} hover:bg-opacity-100`}
                  >
                    {agent.confirmationRate}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant="secondary" 
                    className={`${agent.cancellationRate <= 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} hover:bg-opacity-100`}
                  >
                    {agent.cancellationRate}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant="secondary" 
                    className={`${agent.deliveryRate >= 90 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'} hover:bg-opacity-100`}
                  >
                    {agent.deliveryRate}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {agent.trend === "up" ? (
                    <div className="flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
