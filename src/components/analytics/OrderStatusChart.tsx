import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { date: "السبت", delivered: 120, pending: 30, cancelled: 15, returned: 8 },
  { date: "الأحد", delivered: 145, pending: 25, cancelled: 12, returned: 10 },
  { date: "الاثنين", delivered: 160, pending: 35, cancelled: 18, returned: 7 },
  { date: "الثلاثاء", delivered: 130, pending: 28, cancelled: 14, returned: 9 },
  { date: "الأربعاء", delivered: 155, pending: 32, cancelled: 16, returned: 11 },
  { date: "الخميس", delivered: 175, pending: 22, cancelled: 10, returned: 6 },
  { date: "الجمعة", delivered: 140, pending: 40, cancelled: 20, returned: 12 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
        <p className="font-medium text-foreground mb-2">{label}</p>
        <p className="text-xs text-muted-foreground mb-2">
          إجمالي الطلبات: {total}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function OrderStatusChart() {
  return (
    <div className="chart-container h-[320px]">
      <h3 className="text-lg font-bold text-foreground mb-4">
        حالات الطلب اليومية
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "10px" }}
            formatter={(value) => (
              <span className="text-sm text-muted-foreground">{value}</span>
            )}
          />
          <Bar
            dataKey="delivered"
            name="تم التسليم"
            stackId="a"
            fill="hsl(var(--success))"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="pending"
            name="قيد التوصيل"
            stackId="a"
            fill="hsl(var(--primary))"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="cancelled"
            name="ملغي"
            stackId="a"
            fill="hsl(var(--destructive))"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="returned"
            name="مرتجع"
            stackId="a"
            fill="hsl(var(--accent))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
