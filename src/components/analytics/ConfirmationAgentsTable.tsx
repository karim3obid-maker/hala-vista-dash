import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Phone, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Users,
  CheckCircle2,
  XCircle,
  PackageCheck,
  RotateCcw,
  Clock
} from "lucide-react";

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
    trend: "up",
    details: {
      pending: 15,
      returned: 12,
      avgResponseTime: "5 دقائق",
      todayLeads: 28,
      todayConfirmed: 22,
      todayCancelled: 4,
    }
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
    trend: "up",
    details: {
      pending: 17,
      returned: 8,
      avgResponseTime: "4 دقائق",
      todayLeads: 35,
      todayConfirmed: 30,
      todayCancelled: 3,
    }
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
    trend: "down",
    details: {
      pending: 12,
      returned: 10,
      avgResponseTime: "7 دقائق",
      todayLeads: 18,
      todayConfirmed: 12,
      todayCancelled: 5,
    }
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
    trend: "up",
    details: {
      pending: 19,
      returned: 15,
      avgResponseTime: "5 دقائق",
      todayLeads: 32,
      todayConfirmed: 27,
      todayCancelled: 3,
    }
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
    trend: "down",
    details: {
      pending: 14,
      returned: 8,
      avgResponseTime: "8 دقائق",
      todayLeads: 15,
      todayConfirmed: 10,
      todayCancelled: 4,
    }
  },
];

const DetailItem = ({ icon: Icon, label, value, color, bgColor }: { icon: any; label: string; value: string | number; color: string; bgColor: string }) => (
  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
    <div className={`p-1.5 rounded-md ${bgColor}`}>
      <Icon className={`w-3.5 h-3.5 ${color}`} />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-foreground">{typeof value === 'number' ? value.toLocaleString("ar-SA") : value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
);

export const ConfirmationAgentsTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const filteredAgents = agentsData.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <Card className="p-6 rounded-2xl border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">أداء موظفي التأكيد</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="بحث عن موظف..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 rounded-xl bg-muted/50 border-0"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            تحميل
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-muted hover:bg-transparent">
              <TableHead className="w-8"></TableHead>
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
            {filteredAgents.map((agent, index) => {
              const isExpanded = expandedRows.includes(agent.id);
              return (
                <>
                  <TableRow 
                    key={agent.id} 
                    className={`border-0 cursor-pointer transition-colors hover:bg-muted/50 ${index % 2 === 0 ? 'bg-muted/30' : ''}`}
                    onClick={() => toggleRow(agent.id)}
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
                  {isExpanded && (
                    <TableRow key={`${agent.id}-details`} className="bg-muted/20">
                      <TableCell colSpan={10} className="p-4">
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                          <DetailItem
                            icon={Users}
                            label="ليدز اليوم"
                            value={agent.details.todayLeads}
                            color="text-primary"
                            bgColor="bg-primary/10"
                          />
                          <DetailItem
                            icon={CheckCircle2}
                            label="مؤكد اليوم"
                            value={agent.details.todayConfirmed}
                            color="text-emerald-500"
                            bgColor="bg-emerald-500/10"
                          />
                          <DetailItem
                            icon={XCircle}
                            label="ملغي اليوم"
                            value={agent.details.todayCancelled}
                            color="text-red-500"
                            bgColor="bg-red-500/10"
                          />
                          <DetailItem
                            icon={Clock}
                            label="قيد الانتظار"
                            value={agent.details.pending}
                            color="text-orange-500"
                            bgColor="bg-orange-500/10"
                          />
                          <DetailItem
                            icon={RotateCcw}
                            label="مرتجع"
                            value={agent.details.returned}
                            color="text-blue-500"
                            bgColor="bg-blue-500/10"
                          />
                          <DetailItem
                            icon={Clock}
                            label="متوسط وقت الرد"
                            value={agent.details.avgResponseTime}
                            color="text-violet-500"
                            bgColor="bg-violet-500/10"
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
    </Card>
  );
};
