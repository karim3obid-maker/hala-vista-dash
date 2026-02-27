import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area,
} from "recharts";
import { monthlyFinancialData, expenseBreakdownData } from "./walletData";
import { SectionHeader } from "./WalletShared";
import { TrendingUp, BarChart3 } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-right" dir="rtl">
      <p className="text-xs font-bold text-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-xs text-muted-foreground">
          {p.name}: <span className="font-bold" style={{ color: p.color }}>{p.value.toLocaleString()} ر.س</span>
        </p>
      ))}
    </div>
  );
};

export function FinancialTrendChart() {
  return (
    <div className="bg-card rounded-2xl border border-border p-5">
      <SectionHeader title="اتجاه المبيعات والمصروفات" icon={TrendingUp} accentColor="bg-primary" badge="آخر 6 أشهر" />
      <div className="h-[280px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyFinancialData}>
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="sales" name="المبيعات" stroke="#3b82f6" fill="url(#salesGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="expenses" name="المصروفات" stroke="#ef4444" fill="url(#expGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="profit" name="صافي الربح" stroke="#10b981" fill="url(#profitGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ExpenseBreakdownChart() {
  return (
    <div className="bg-card rounded-2xl border border-border p-5">
      <SectionHeader title="توزيع المصروفات" icon={BarChart3} accentColor="bg-orange-500" />
      <div className="h-[280px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseBreakdownData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
            >
              {expenseBreakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `${value.toLocaleString()} ر.س`}
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                fontSize: '12px',
                textAlign: 'right',
                direction: 'rtl',
              }}
            />
            <Legend
              formatter={(value) => <span className="text-xs text-foreground">{value}</span>}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function MonthlyProfitChart() {
  return (
    <div className="bg-card rounded-2xl border border-border p-5">
      <SectionHeader title="صافي الربح الشهري" icon={TrendingUp} accentColor="bg-emerald-500" badge="آخر 6 أشهر" />
      <div className="h-[250px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyFinancialData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="profit" name="صافي الربح" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
