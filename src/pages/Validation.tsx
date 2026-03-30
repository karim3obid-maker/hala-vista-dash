import { useState, useMemo } from "react";
import { ShieldCheck, Search, Eye, Pencil, Download, Copy, Phone, RotateCcw, BarChart3 } from "lucide-react";
import {
  validationCases as initialCases, ValidationCase, ValStatus, EntryReason,
  valStatusLabels, valStatusColors, entryReasonLabels, entryReasonColors,
  problemSourceLabels, problemSourceColors, finalActionLabels,
} from "@/data/validationData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import ValidationModal from "@/components/validation/ValidationModal";
import ValidationReports from "@/components/validation/ValidationReports";

const filterTabs: { label: string; value: ValStatus | EntryReason | "all" }[] = [
  { label: "الكل", value: "all" },
  { label: "في الانتظار", value: "pending" },
  { label: "لم يرد", value: "no_answer" },
  { label: "تم التصرف", value: "resolved" },
  { label: "كنسل", value: "cancelled" },
  { label: "مرتجع", value: "returned" },
  { label: "فاشل", value: "failed" },
  { label: "متأخر", value: "delayed" },
];

const MAX_ATTEMPTS = 3;

const ValidationPage = () => {
  const [cases, setCases] = useState<ValidationCase[]>(initialCases);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<ValidationCase | null>(null);
  const [activeTab, setActiveTab] = useState<"cases" | "reports">("cases");

  const filtered = useMemo(() => cases.filter((c) => {
    const matchesSearch =
      c.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.customerName.includes(search) ||
      c.customerPhone.includes(search);
    const matchesFilter = activeFilter === "all" ||
      c.valStatus === activeFilter ||
      c.entryReason === activeFilter;
    return matchesSearch && matchesFilter;
  }), [cases, search, activeFilter]);

  const stats = useMemo(() => ({
    total: cases.length,
    pending: cases.filter(c => c.valStatus === 'pending').length,
    noAnswer: cases.filter(c => c.valStatus === 'no_answer').length,
    resolved: cases.filter(c => c.valStatus === 'resolved').length,
    cancelled: cases.filter(c => c.valStatus === 'cancelled').length,
    returned: cases.filter(c => c.entryReason === 'returned').length,
    failed: cases.filter(c => c.entryReason === 'failed').length,
    delayed: cases.filter(c => c.entryReason === 'delayed').length,
  }), [cases]);

  const openModal = (c: ValidationCase) => {
    setSelectedCase(c);
    setModalOpen(true);
  };

  const handleSave = (updated: ValidationCase) => {
    setCases(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelectedCase(updated);
  };

  const getAttemptCountColor = (count: number, status: ValStatus) => {
    if (count === 0) return { bg: '#EEEDFE', text: '#534AB7' };
    if (count < MAX_ATTEMPTS) return { bg: '#FEF3C7', text: '#B45309' };
    return status === 'resolved' ? { bg: '#EAF3DE', text: '#3B6D11' } : { bg: '#FCEBEB', text: '#A32D2D' };
  };

  const statCards = [
    { label: 'إجمالي الحالات', value: stats.total, icon: ShieldCheck, color: 'text-primary', iconBg: 'bg-primary/10' },
    { label: 'في الانتظار', value: stats.pending, icon: Phone, color: 'text-amber-600', iconBg: 'bg-amber-500/10' },
    { label: 'لم يرد', value: stats.noAnswer, icon: Phone, color: 'text-blue-600', iconBg: 'bg-blue-500/10' },
    { label: 'تم التصرف', value: stats.resolved, icon: ShieldCheck, color: 'text-emerald-600', iconBg: 'bg-emerald-500/10' },
    { label: 'كنسل', value: stats.cancelled, icon: RotateCcw, color: 'text-destructive', iconBg: 'bg-destructive/10' },
    { label: 'مرتجع', value: stats.returned, icon: RotateCcw, color: 'text-destructive', iconBg: 'bg-destructive/10' },
    { label: 'فاشل', value: stats.failed, icon: ShieldCheck, color: 'text-amber-600', iconBg: 'bg-amber-500/10' },
  ];

  return (
    <div className="container max-w-[1400px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" /> تحميل التقرير
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-foreground">إدارة الفالديشن</h1>
            <p className="text-muted-foreground text-sm">إدارة ومتابعة جميع حالات الفالديشن وتأكيد الطلبات</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3 min-w-[150px] flex-1">
            <div>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[11px] text-muted-foreground whitespace-nowrap">{stat.label}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs: Cases / Reports */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setActiveTab("cases")}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${activeTab === "cases" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/40"}`}>
          <ShieldCheck className="w-4 h-4 inline-block ml-1.5" />
          الحالات
        </button>
        <button onClick={() => setActiveTab("reports")}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${activeTab === "reports" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/40"}`}>
          <BarChart3 className="w-4 h-4 inline-block ml-1.5" />
          التقارير
        </button>
      </div>

      {activeTab === "reports" ? (
        <ValidationReports cases={cases} />
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 w-full sm:max-w-sm order-2 sm:order-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="البحث برقم الطلب أو اسم العميل..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10 rounded-xl" />
            </div>
            <div className="flex gap-2 flex-wrap order-1 sm:order-2">
              {filterTabs.map((tab) => {
                const count = tab.value === 'all' ? cases.length :
                  cases.filter(c => c.valStatus === tab.value || c.entryReason === tab.value).length;
                return (
                  <button key={tab.value} onClick={() => setActiveFilter(tab.value)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${activeFilter === tab.value ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/40"}`}>
                    {tab.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-right font-semibold text-xs">العمليات</TableHead>
                    <TableHead className="text-right font-semibold text-xs">حالة الشحنة</TableHead>
                    <TableHead className="text-right font-semibold text-xs">رقم الطلب</TableHead>
                    <TableHead className="text-right font-semibold text-xs">حالة الفالديشن</TableHead>
                    <TableHead className="text-right font-semibold text-xs">المحاولات</TableHead>
                    <TableHead className="text-right font-semibold text-xs">الموظف المسؤول</TableHead>
                    <TableHead className="text-right font-semibold text-xs">اسم العميل</TableHead>
                    <TableHead className="text-right font-semibold text-xs">هاتف العميل</TableHead>
                    <TableHead className="text-right font-semibold text-xs">الدولة</TableHead>
                    <TableHead className="text-right font-semibold text-xs">المدينة</TableHead>
                    <TableHead className="text-right font-semibold text-xs">اسم المنتج</TableHead>
                    <TableHead className="text-right font-semibold text-xs">قيمة التحصيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-12 text-muted-foreground">لا توجد حالات مطابقة</TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((c) => {
                      const attemptColors = getAttemptCountColor(c.attempts.length, c.valStatus);
                      return (
                        <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => openModal(c)}>
                                <Pencil className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => openModal(c)}>
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-[11px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
                              style={{ background: entryReasonColors[c.entryReason].bg, color: entryReasonColors[c.entryReason].text }}>
                              {entryReasonLabels[c.entryReason]}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="font-mono font-semibold text-sm text-foreground">{c.orderNumber}</span>
                              <button onClick={() => { navigator.clipboard.writeText(c.orderNumber); }} className="opacity-50 hover:opacity-100">
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-[11px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
                              style={{ background: valStatusColors[c.valStatus].bg, color: valStatusColors[c.valStatus].text }}>
                              {valStatusLabels[c.valStatus]}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-[11px] px-2 py-1 rounded-full font-bold"
                              style={{ background: attemptColors.bg, color: attemptColors.text }}>
                              {c.attempts.length} من {MAX_ATTEMPTS}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-foreground">{c.assignedAgent}</TableCell>
                          <TableCell className="text-sm font-medium text-foreground">{c.customerName}</TableCell>
                          <TableCell>
                            <a href={`tel:${c.customerPhone}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {c.customerPhone}
                            </a>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{c.country}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{c.city}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{c.productName}</TableCell>
                          <TableCell className="text-sm font-semibold text-foreground">{c.orderValue} {c.currency}</TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            عرض {filtered.length} من {cases.length} حالة
          </p>
        </>
      )}

      {/* Modal */}
      {selectedCase && (
        <ValidationModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setSelectedCase(null); }}
          caseData={selectedCase}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ValidationPage;
