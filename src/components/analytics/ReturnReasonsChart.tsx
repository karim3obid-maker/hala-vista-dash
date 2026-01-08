import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  { reason: "منتج تالف", count: 32, percentage: 30 },
  { reason: "منتج مختلف", count: 28, percentage: 26 },
  { reason: "مقاس خاطئ", count: 22, percentage: 20 },
  { reason: "تأخر وصول", count: 15, percentage: 14 },
  { reason: "جودة ضعيفة", count: 11, percentage: 10 },
];

const shippingCompanies = [
  { value: "all", label: "جميع الشركات" },
  { value: "aramex", label: "أرامكس" },
  { value: "smsa", label: "SMSA" },
  { value: "dhl", label: "DHL" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
        <p className="font-medium text-foreground mb-1">{data.reason}</p>
        <p className="text-sm text-muted-foreground">
          العدد: <span className="font-medium text-foreground">{data.count}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          النسبة: <span className="font-medium text-foreground">{data.percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export function ReturnReasonsChart() {
  const [selectedCompany, setSelectedCompany] = useState("all");

  return (
    <div className="chart-container h-[320px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">
          أهم أسباب المرتجعات
        </h3>
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-[130px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {shippingCompanies.map((company) => (
              <SelectItem key={company.value} value={company.value}>
                {company.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 80, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            dataKey="reason"
            type="category"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
            width={75}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.1)" }} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={32}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`hsl(var(--accent) / ${1 - index * 0.15})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
