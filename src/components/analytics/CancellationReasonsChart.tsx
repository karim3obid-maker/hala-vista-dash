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

const data = [
  { reason: "السعر مرتفع", count: 45, percentage: 28 },
  { reason: "تغيير الرأي", count: 38, percentage: 24 },
  { reason: "وجد بديل", count: 30, percentage: 19 },
  { reason: "تأخر التوصيل", count: 25, percentage: 16 },
  { reason: "خطأ في الطلب", count: 20, percentage: 13 },
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

export function CancellationReasonsChart() {
  return (
    <div className="chart-container h-[320px]">
      <h3 className="text-lg font-bold text-foreground mb-4">
        أهم أسباب الإلغاء
      </h3>
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
                fill={`hsl(var(--destructive) / ${1 - index * 0.15})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
