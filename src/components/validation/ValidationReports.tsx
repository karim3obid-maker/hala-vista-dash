import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import {
  ValidationCase, ProblemSource, problemSourceLabels, problemSourceColors, validationAgents,
  contactResultLabels, contactResultColors,
} from "@/data/validationData";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

interface Props {
  cases: ValidationCase[];
}

const ValidationReports = ({ cases }: Props) => {
  const stats = useMemo(() => {
    const total = cases.length;
    const resolved = cases.filter(c => c.valStatus === 'resolved').length;
    const totalAttempts = cases.reduce((acc, c) => acc + c.attempts.length, 0);
    const answered = cases.reduce((acc, c) => acc + c.attempts.filter(a => a.contactResult === 'answered').length, 0);
    const closedCases = cases.filter(c => c.valStatus === 'resolved' || c.valStatus === 'cancelled').length;
    const confProblems = cases.filter(c => c.problemSource === 'confirmation').length;

    return {
      recoveryRate: total > 0 ? Math.round((resolved / total) * 100) : 0,
      answerRate: totalAttempts > 0 ? Math.round((answered / totalAttempts) * 100) : 0,
      avgAttempts: closedCases > 0 ? (totalAttempts / closedCases).toFixed(1) : '0',
      confErrorRate: total > 0 ? Math.round((confProblems / total) * 100) : 0,
      total, resolved, closedCases,
    };
  }, [cases]);

  const problemSourceData = useMemo(() => {
    const sources: Record<string, number> = { confirmation: 0, carrier: 0, customer: 0, product: 0 };
    cases.forEach(c => { if (c.problemSource) sources[c.problemSource]++; });
    return Object.entries(sources).map(([key, value]) => ({
      name: problemSourceLabels[key as ProblemSource],
      value,
      color: problemSourceColors[key as ProblemSource].text,
      bg: problemSourceColors[key as ProblemSource].bg,
    }));
  }, [cases]);

  const agentPerformance = useMemo(() => {
    return validationAgents.map(agent => {
      const agentCases = cases.filter(c => c.assignedAgent === agent);
      const closed = agentCases.filter(c => c.valStatus === 'resolved' || c.valStatus === 'cancelled').length;
      const resolved = agentCases.filter(c => c.valStatus === 'resolved').length;
      const totalAttempts = agentCases.reduce((acc, c) => acc + c.attempts.length, 0);
      return {
        name: agent,
        total: agentCases.length,
        closed,
        resolved,
        recoveryRate: closed > 0 ? Math.round((resolved / closed) * 100) : 0,
        avgAttempts: closed > 0 ? (totalAttempts / closed).toFixed(1) : '-',
      };
    });
  }, [cases]);

  const confAgentErrors = useMemo(() => {
    const map: Record<string, number> = {};
    cases.filter(c => c.problemSource === 'confirmation').forEach(c => {
      map[c.assignedAgent] = (map[c.assignedAgent] || 0) + 1;
    });
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [cases]);

  const carrierErrors = useMemo(() => {
    const map: Record<string, number> = {};
    cases.filter(c => c.problemSource === 'carrier').forEach(c => {
      map[c.carrierName] = (map[c.carrierName] || 0) + 1;
    });
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [cases]);

  const kpis = [
    { label: 'نسبة الاسترجاع', value: `${stats.recoveryRate}%`, target: '> 60%', good: stats.recoveryRate >= 60 },
    { label: 'نسبة رد العملاء', value: `${stats.answerRate}%`, target: '> 55%', good: stats.answerRate >= 55 },
    { label: 'متوسط المحاولات', value: stats.avgAttempts, target: '< 3', good: Number(stats.avgAttempts) < 3 },
    { label: 'نسبة خطأ التأكيد', value: `${stats.confErrorRate}%`, target: '< 15%', good: stats.confErrorRate < 15 },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <p className={`text-2xl font-bold ${kpi.good ? 'text-emerald-600' : 'text-destructive'}`}>{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">الهدف: {kpi.target}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Sources Chart */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold text-foreground mb-4">مصادر المشاكل</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={problemSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}`}>
                {problemSourceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Problem Sources Bar */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold text-foreground mb-4">توزيع المشاكل حسب المصدر</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={problemSourceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {problemSourceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">أداء فريق الفالديشن</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right font-semibold">الموظف</TableHead>
              <TableHead className="text-right font-semibold">إجمالي الحالات</TableHead>
              <TableHead className="text-right font-semibold">تم الإغلاق</TableHead>
              <TableHead className="text-right font-semibold">تم الاسترجاع</TableHead>
              <TableHead className="text-right font-semibold">نسبة الاسترجاع</TableHead>
              <TableHead className="text-right font-semibold">متوسط المحاولات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agentPerformance.map((agent, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium text-foreground">{agent.name}</TableCell>
                <TableCell>{agent.total}</TableCell>
                <TableCell>{agent.closed}</TableCell>
                <TableCell>{agent.resolved}</TableCell>
                <TableCell>
                  <span className={`text-xs font-bold ${agent.recoveryRate >= 60 ? 'text-emerald-600' : 'text-destructive'}`}>
                    {agent.recoveryRate}%
                  </span>
                </TableCell>
                <TableCell>{agent.avgAttempts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confirmation Errors by Agent */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-bold text-foreground">أخطاء التأكيد حسب الموظف</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right font-semibold">الموظف</TableHead>
                <TableHead className="text-right font-semibold">عدد الأخطاء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {confAgentErrors.length === 0 ? (
                <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground py-6">لا توجد بيانات</TableCell></TableRow>
              ) : confAgentErrors.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell><span className="text-xs font-bold text-amber-600">{item.count}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Carrier Errors */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-bold text-foreground">مشاكل شركات الشحن</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right font-semibold">شركة الشحن</TableHead>
                <TableHead className="text-right font-semibold">عدد المشاكل</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carrierErrors.length === 0 ? (
                <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground py-6">لا توجد بيانات</TableCell></TableRow>
              ) : carrierErrors.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell><span className="text-xs font-bold text-destructive">{item.count}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Full Contact Log */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">سجل التواصل الكامل</h3>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right font-semibold">رقم الطلب</TableHead>
                <TableHead className="text-right font-semibold">العميل</TableHead>
                <TableHead className="text-right font-semibold">المحاولة</TableHead>
                <TableHead className="text-right font-semibold">التاريخ</TableHead>
                <TableHead className="text-right font-semibold">النتيجة</TableHead>
                <TableHead className="text-right font-semibold">الموظف</TableHead>
                <TableHead className="text-right font-semibold">ملاحظات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.flatMap(c => c.attempts.map(a => ({ ...a, orderNumber: c.orderNumber, customerName: c.customerName })))
                .sort((a, b) => b.attemptDate.localeCompare(a.attemptDate))
                .map((log, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-mono text-sm">{log.orderNumber}</TableCell>
                    <TableCell className="text-sm">{log.customerName}</TableCell>
                    <TableCell className="text-sm">{log.attemptNumber}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{log.attemptDate} {log.attemptTime}</TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: (await import("@/data/validationData")).contactResultColors[log.contactResult].bg, color: (await import("@/data/validationData")).contactResultColors[log.contactResult].text }}>
                        {(await import("@/data/validationData")).contactResultLabels[log.contactResult]}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{log.agentName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{log.notes || '—'}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ValidationReports;
