import { useState, useMemo } from "react";
import { XCircle, Search, Phone, TrendingUp, AlertCircle, CheckCircle2, BarChart3, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  cancelledOrders as initialOrders, CancelledOrder, RecoveryStage,
  stageLabels, stageColors, cancelReasonLabels, totalCancelledOrders,
} from "@/data/cancelledOrdersData";
import CallLogModal from "@/components/cancelled/CallLogModal";
import CancelledReports from "@/components/cancelled/CancelledReports";

const stageTabs: { label: string; value: RecoveryStage | 'all' }[] = [
  { label: 'الكل', value: 'all' },
  { label: 'جديد', value: 'new' },
  { label: 'المحاولة الأولى', value: 'attempt1' },
  { label: 'المحاولة الثانية', value: 'attempt2' },
  { label: 'المحاولة الثالثة', value: 'attempt3' },
  { label: 'تم الاسترداد', value: 'recovered' },
  { label: 'مفقود', value: 'lost' },
];

const CancelledOrdersPage = () => {
  const [orders, setOrders] = useState<CancelledOrder[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<RecoveryStage | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<CancelledOrder | null>(null);
  const [tab, setTab] = useState<'orders' | 'reports'>('orders');

  const filtered = useMemo(() => orders.filter(o => {
    const s = search.toLowerCase();
    const matchSearch = !s || o.orderNumber.toLowerCase().includes(s) || o.customerName.includes(search) || o.customerPhone.includes(search);
    const matchFilter = filter === 'all' || o.stage === filter;
    return matchSearch && matchFilter;
  }), [orders, search, filter]);

  const stats = useMemo(() => ({
    total: totalCancelledOrders,
    recovered: orders.filter(o => o.stage === 'recovered').length,
    inProgress: orders.filter(o => ['attempt1', 'attempt2', 'attempt3'].includes(o.stage)).length,
    lost: orders.filter(o => o.stage === 'lost').length,
    new: orders.filter(o => o.stage === 'new').length,
    recoveredToday: 7,
  }), [orders]);

  const recoveryRate = Math.round((stats.recovered / orders.length) * 100);

  const openModal = (order: CancelledOrder) => {
    setSelected(order);
    setModalOpen(true);
  };

  const handleSave = (updated: CancelledOrder) => {
    setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
  };

  const statCards = [
    { label: 'إجمالي الملغاة', value: stats.total.toLocaleString(), icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
    { label: 'تم الاسترداد اليوم', value: stats.recoveredToday, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
    { label: 'قيد المعالجة', value: stats.inProgress, icon: Phone, color: 'text-amber-600', bg: 'bg-amber-500/10' },
    { label: 'مفقودة', value: stats.lost, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-500/10' },
    { label: 'جديدة', value: stats.new, icon: XCircle, color: 'text-slate-600', bg: 'bg-slate-500/10' },
    { label: 'معدل الاسترداد', value: `${recoveryRate}%`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const pipelineStages: RecoveryStage[] = ['new', 'attempt1', 'attempt2', 'attempt3', 'recovered', 'lost'];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-[1280px] mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <XCircle className="w-6 h-6 text-destructive" />
              طلبات الملغاة
            </h1>
            <p className="text-sm text-muted-foreground mt-1">نظام استرداد الطلبات الملغاة عبر متابعة منظمة ومراحل اتصال</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="w-4 h-4 ml-1" /> تصدير</Button>
            <Button size="sm"><Phone className="w-4 h-4 ml-1" /> توزيع تلقائي</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setTab('orders')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${tab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            الطلبات
          </button>
          <button
            onClick={() => setTab('reports')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1 ${tab === 'reports' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            <BarChart3 className="w-4 h-4" /> التقارير والتحليلات
          </button>
        </div>

        {tab === 'orders' ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {statCards.map(s => (
                <div key={s.label} className="rounded-xl border border-border p-4 bg-card">
                  <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Pipeline kanban-style summary */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-bold mb-4">خط أنابيب الاسترداد</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {pipelineStages.map(stage => {
                  const count = orders.filter(o => o.stage === stage).length;
                  return (
                    <button
                      key={stage}
                      onClick={() => setFilter(stage)}
                      className="text-right rounded-xl border border-border p-3 hover:border-primary transition-colors"
                    >
                      <span
                        className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold mb-2"
                        style={{ background: stageColors[stage].bg, color: stageColors[stage].text }}
                      >
                        {stageLabels[stage]}
                      </span>
                      <p className="text-2xl font-bold text-foreground">{count}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">طلب</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 items-center flex-wrap">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث برقم الطلب أو اسم العميل أو الهاتف..."
                  className="pr-9"
                />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {stageTabs.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setFilter(t.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      filter === t.value ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:border-primary/40'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="text-right text-xs">رقم الطلب</TableHead>
                    <TableHead className="text-right text-xs">العميل</TableHead>
                    <TableHead className="text-right text-xs">القيمة</TableHead>
                    <TableHead className="text-right text-xs">المدينة</TableHead>
                    <TableHead className="text-right text-xs">سبب الإلغاء</TableHead>
                    <TableHead className="text-right text-xs">المحاولات</TableHead>
                    <TableHead className="text-right text-xs">آخر اتصال</TableHead>
                    <TableHead className="text-right text-xs">الحالة</TableHead>
                    <TableHead className="text-right text-xs">الموظف</TableHead>
                    <TableHead className="text-right text-xs">إجراء</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(o => (
                    <TableRow key={o.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs">{o.orderNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-semibold">{o.customerName}</p>
                          <p className="text-[11px] text-muted-foreground" dir="ltr">{o.customerPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-semibold">{o.amount} ر.س</TableCell>
                      <TableCell className="text-xs">{o.city}</TableCell>
                      <TableCell className="text-xs">{cancelReasonLabels[o.cancelReason]}</TableCell>
                      <TableCell>
                        <span className="text-xs font-bold">{o.attemptCount}/3</span>
                      </TableCell>
                      <TableCell className="text-[11px] text-muted-foreground">{o.lastCallDate || '—'}</TableCell>
                      <TableCell>
                        <span
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
                          style={{ background: stageColors[o.stage].bg, color: stageColors[o.stage].text }}
                        >
                          {stageLabels[o.stage]}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">{o.assignedAgent}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openModal(o)}
                          disabled={o.stage === 'recovered' || o.stage === 'lost'}
                          className="text-xs h-8"
                        >
                          <Phone className="w-3 h-3 ml-1" /> اتصل
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center text-sm text-muted-foreground py-12">
                        لا توجد طلبات مطابقة
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <CancelledReports orders={orders} />
        )}
      </div>

      <CallLogModal
        open={modalOpen}
        order={selected}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default CancelledOrdersPage;
