import { useMemo } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { CancelledOrder, cancelReasonLabels, agents } from "@/data/cancelledOrdersData";

interface Props {
  orders: CancelledOrder[];
}

const COLORS = ['hsl(var(--primary))', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6'];

const CancelledReports = ({ orders }: Props) => {
  const data = useMemo(() => {
    const recovered = orders.filter(o => o.stage === 'recovered').length;
    const lost = orders.filter(o => o.stage === 'lost').length;
    const inProgress = orders.filter(o => ['attempt1', 'attempt2', 'attempt3'].includes(o.stage)).length;
    const totalCalls = orders.reduce((s, o) => s + o.callLogs.length, 0);
    const answered = orders.reduce((s, o) => s + o.callLogs.filter(l => l.callStatus === 'answered').length, 0);
    const recoveryRate = orders.length ? Math.round((recovered / orders.length) * 100) : 0;
    const responseRate = totalCalls ? Math.round((answered / totalCalls) * 100) : 0;
    const conversionRate = answered ? Math.round((recovered / answered) * 100) : 0;
    const avgAttempts = recovered ? (orders.filter(o => o.stage === 'recovered').reduce((s, o) => s + o.attemptCount, 0) / recovered).toFixed(1) : '0';
    const revenue = orders.filter(o => o.stage === 'recovered').reduce((s, o) => s + o.amount, 0);

    const reasons = Object.keys(cancelReasonLabels).map(k => ({
      name: cancelReasonLabels[k as keyof typeof cancelReasonLabels],
      value: orders.filter(o => o.cancelReason === k).length,
    })).filter(r => r.value > 0);

    const agentPerf = agents.map(a => ({
      name: a.split(' ')[0],
      مسترد: orders.filter(o => o.assignedAgent === a && o.stage === 'recovered').length,
      مفقود: orders.filter(o => o.assignedAgent === a && o.stage === 'lost').length,
    }));

    const trend = Array.from({ length: 7 }, (_, i) => ({
      day: `يوم ${i + 1}`,
      مسترد: Math.floor(Math.random() * 15) + 5,
      اتصال: Math.floor(Math.random() * 50) + 30,
    }));

    return { recovered, lost, inProgress, totalCalls, answered, recoveryRate, responseRate, conversionRate, avgAttempts, revenue, reasons, agentPerf, trend };
  }, [orders]);

  const kpis = [
    { label: 'معدل الاسترداد', value: `${data.recoveryRate}%`, target: 'الهدف 25%' },
    { label: 'معدل الاستجابة', value: `${data.responseRate}%`, target: 'الهدف 60%' },
    { label: 'معدل التحويل', value: `${data.conversionRate}%`, target: 'الهدف 40%' },
    { label: 'متوسط المحاولات', value: data.avgAttempts, target: 'الهدف 2.5' },
    { label: 'الإيرادات المستردة', value: `${data.revenue.toLocaleString()} ر.س`, target: 'هذا الشهر' },
    { label: 'إجمالي المكالمات', value: data.totalCalls, target: `${data.answered} رد` },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map(k => (
          <div key={k.label} className="rounded-xl border border-border p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-1">{k.label}</p>
            <p className="text-xl font-bold text-foreground">{k.value}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{k.target}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border p-4 bg-card">
          <h3 className="text-sm font-bold mb-3">اتجاه الاسترداد (7 أيام)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="مسترد" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line type="monotone" dataKey="اتصال" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border p-4 bg-card">
          <h3 className="text-sm font-bold mb-3">أسباب الإلغاء</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data.reasons} dataKey="value" nameKey="name" outerRadius={90} label={(e: any) => `${e.value}`}>
                {data.reasons.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border p-4 bg-card">
        <h3 className="text-sm font-bold mb-3">أداء الفريق</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data.agentPerf}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="مسترد" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            <Bar dataKey="مفقود" fill="#EF4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CancelledReports;
