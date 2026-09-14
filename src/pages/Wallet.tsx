import { useState, useRef } from "react";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Wallet,
  FileText,
  ArrowLeftRight,
  Download,
  Upload,
  CalendarIcon,
  ChevronLeft,
  Plus,
  Landmark,
  BarChart3,
  DollarSign,
  PackageCheck,
  TrendingDown,
  TrendingUp,
  Receipt,
  ShoppingCart,
  Package,
  Megaphone,
  Camera,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { StatCard, SectionHeader } from "@/components/wallet/WalletShared";
import { invoices, transactions, reportData, typeConfig, statusConfig, transactionTypes, products, stores, goodsAccountSummary, goodsTransactions, halaWithdrawalReport } from "@/components/wallet/walletData";
import WalletDialogs from "@/components/wallet/WalletDialogs";
import { FinancialTrendChart, ExpenseBreakdownChart, MonthlyProfitChart } from "@/components/wallet/WalletReportsCharts";
import type { Invoice } from "@/components/wallet/WalletTypes";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("invoices");
  const [txFilter, setTxFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoiceRef = useRef<HTMLDivElement>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showBankAccounts, setShowBankAccounts] = useState(false);
  const balance = 3500;

  const filterByDate = <T extends { date: string }>(items: T[]): T[] => {
    return items.filter(item => {
      const itemDate = new Date(item.date.replace(/\//g, '-'));
      if (dateFrom && itemDate < dateFrom) return false;
      if (dateTo && itemDate > dateTo) return false;
      return true;
    });
  };

  const dateFilteredTransactions = filterByDate(transactions);
  const totalDeposits = dateFilteredTransactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalWithdrawals = Math.abs(dateFilteredTransactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0));

  const filteredTransactions = txFilter === 'all'
    ? dateFilteredTransactions
    : txFilter === 'ads'
      ? dateFilteredTransactions.filter(t => t.type === 'ads_tiktok' || t.type === 'ads_snapchat')
      : dateFilteredTransactions.filter(t => t.type === txFilter);

  const txSummary = dateFilteredTransactions.reduce((acc, t) => {
    const key = t.type;
    if (!acc[key]) acc[key] = { count: 0, total: 0 };
    acc[key].count++;
    acc[key].total += t.amount;
    return acc;
  }, {} as Record<string, { count: number; total: number }>);

  const handleResetDates = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setSelectedProduct("all");
    setSelectedStore("all");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-[1280px] mx-auto px-6 py-8" dir="rtl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Wallet className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold text-foreground">المحفظة</h1>
                <p className="text-sm text-muted-foreground">إدارة الفواتير والمعاملات والتقارير المالية</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Button onClick={() => setShowDeposit(true)} className="rounded-xl h-10 gap-2 bg-primary hover:bg-primary-deep text-primary-foreground w-full sm:w-auto">
                <Plus className="w-4 h-4" /> إيداع رصيد
              </Button>
              <Button onClick={() => setShowWithdraw(true)} variant="outline" className="rounded-xl h-10 gap-2 border-accent/40 text-accent hover:bg-accent/10 w-full sm:w-auto">
                <Upload className="w-4 h-4" /> طلب سحب
              </Button>
              <Button onClick={() => setShowBankAccounts(true)} variant="outline" className="rounded-xl h-10 gap-2 border-primary/30 text-primary hover:bg-primary/10 w-full sm:w-auto">
                <Landmark className="w-4 h-4" /> الحسابات البنكية
              </Button>
            </div>
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-3 flex-wrap bg-card rounded-2xl border border-border p-4 mb-6 flex-row-reverse">
          <div className="flex items-center gap-2 flex-row-reverse">
            <span className="text-sm font-medium text-foreground">الفترة</span>
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-[150px] h-10 rounded-xl text-sm", !dateFrom && "text-muted-foreground")}>
                {dateFrom ? format(dateFrom, "yyyy/MM/dd") : "من تاريخ"}
                <CalendarIcon className="w-4 h-4 mr-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-[150px] h-10 rounded-xl text-sm", !dateTo && "text-muted-foreground")}>
                {dateTo ? format(dateTo, "yyyy/MM/dd") : "إلى تاريخ"}
                <CalendarIcon className="w-4 h-4 mr-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-[150px] h-10 rounded-xl text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>{products.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-[150px] h-10 rounded-xl text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>{stores.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
          </Select>
          {(dateFrom || dateTo || selectedProduct !== "all" || selectedStore !== "all") && (
            <Button variant="ghost" size="sm" onClick={handleResetDates} className="text-xs text-muted-foreground hover:text-destructive rounded-lg mr-auto">مسح الكل</Button>
          )}
        </div>

        {/* Balance & Financial Summary Banner */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-row-reverse">
              <DollarSign className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">الملخص المالي</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { value: reportData.totalSales, label: "إجمالي المبيعات", icon: DollarSign, from: "from-primary-deep/10", to: "to-primary-deep/5", border: "border-primary-deep/20", iconBg: "bg-primary-deep/15", iconColor: "text-primary-deep" },
                { value: reportData.deliveredSales, label: "إجمالي المبيعات المسلمة", icon: PackageCheck, from: "from-primary/10", to: "to-primary/5", border: "border-primary/20", iconBg: "bg-primary/15", iconColor: "text-primary" },
                { value: reportData.totalExpenses, label: "إجمالي المصروفات", icon: TrendingDown, from: "from-destructive/10", to: "to-destructive/5", border: "border-destructive/20", iconBg: "bg-destructive/15", iconColor: "text-destructive" },
                { value: reportData.netProfit, label: "صافي الربح", icon: TrendingUp, from: "from-accent/10", to: "to-accent/5", border: "border-accent/20", iconBg: "bg-accent/15", iconColor: "text-accent" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-l ${item.from} ${item.to} border ${item.border} flex-row-reverse`}>
                    <div className={`p-2.5 rounded-xl ${item.iconBg} shrink-0`}><Icon className={`w-5 h-5 ${item.iconColor}`} /></div>
                    <div className="text-right flex-1">
                      <p className="text-xl font-bold text-foreground">{item.value.toLocaleString()}<span className="text-xs font-medium text-muted-foreground mr-1">ر.س</span></p>
                      <p className="text-[11px] text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-gradient-to-l from-transparent via-border to-transparent" />

          <div>
            <div className="flex items-center gap-2 mb-4 flex-row-reverse">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">ملخص الأرصدة</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-bl from-primary-deep to-primary border border-primary-deep/20 flex-row-reverse">
                <div className="p-2.5 rounded-lg bg-accent shrink-0"><Wallet className="w-5 h-5 text-accent-foreground" /></div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-foreground">{balance.toLocaleString()}</p>
                  <p className="text-[11px] text-primary-foreground/70">الرصيد الحالي (ر.س)</p>
                </div>
              </div>
              <StatCard item={{ label: "إجمالي الإيداعات", value: totalDeposits.toLocaleString(), suffix: "ر.س", icon: Download, color: "text-primary", bgColor: "bg-primary/10" }} />
              <StatCard item={{ label: "إجمالي المسحوبات", value: totalWithdrawals.toLocaleString(), suffix: "ر.س", icon: Upload, color: "text-accent", bgColor: "bg-accent/10" }} />
              <StatCard item={{ label: "إجمالي المعاملات", value: transactions.length.toString(), icon: ArrowLeftRight, color: "text-primary-deep", bgColor: "bg-primary-deep/10" }} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="flex w-full justify-end bg-card border border-border p-1 h-14 mb-6 rounded-2xl">
            <TabsTrigger value="invoices" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-10 px-6 rounded-xl">
              <FileText className="w-4 h-4" /> الفواتير
            </TabsTrigger>
            <TabsTrigger value="goods" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-10 px-6 rounded-xl">
              <Package className="w-4 h-4" /> كشف حساب البضاعة
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-10 px-6 rounded-xl">
              <ArrowLeftRight className="w-4 h-4" /> المعاملات
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-10 px-6 rounded-xl">
              <BarChart3 className="w-4 h-4" /> التقارير
            </TabsTrigger>
          </TabsList>

          {/* ════════ INVOICES TAB ════════ */}
          <TabsContent value="invoices" className="animate-fade-in space-y-3">
            {invoices.map((inv) => {
              const st = statusConfig[inv.status];
              return (
                <div key={inv.id} onClick={() => setSelectedInvoice(inv)} className="bg-card rounded-2xl border border-border p-4 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors"><Receipt className="w-5 h-5 text-primary" /></div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">{inv.invoiceNumber}</p>
                        <p className="text-[11px] text-muted-foreground">{inv.period} • {inv.periodType === 'weekly' ? 'أسبوعية' : 'شهرية'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors rotate-180" />
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">{inv.totalAmount.toLocaleString()} ر.س</p>
                        <Badge variant={st.variant} className="text-[10px] px-2 py-0">{st.label}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Invoice Detail Dialog */}
            <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
                {selectedInvoice && (() => {
                  const st = statusConfig[selectedInvoice.status];
                  const handleDownloadPdf = async () => {
                    if (!invoiceRef.current) return;
                    setDownloadingPdf(true);
                    try {
                      const canvas = await html2canvas(invoiceRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
                      const imgData = canvas.toDataURL('image/png');
                      const pdf = new jsPDF('p', 'mm', 'a4');
                      const pdfWidth = pdf.internal.pageSize.getWidth();
                      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                      pdf.save(`${selectedInvoice.invoiceNumber}.pdf`);
                    } catch (e) { console.error(e); } finally { setDownloadingPdf(false); }
                  };

                  return (
                    <>
                      <DialogHeader className="sr-only"><DialogTitle>فاتورة {selectedInvoice.invoiceNumber}</DialogTitle></DialogHeader>
                      <div ref={invoiceRef} className="bg-white text-black p-8 rounded-lg" style={{ direction: 'rtl' }}>
                        <div className="flex justify-between items-start border-b-2 border-gray-800 pb-5 mb-6">
                          <div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight">فاتورة ضريبية</h1>
                            <p className="text-sm text-gray-500 mt-1">Tax Invoice</p>
                          </div>
                          <div className="text-left">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mb-2 mr-auto">
                              <span className="text-white font-black text-lg">H</span>
                            </div>
                            <p className="text-xs text-gray-500">هلا شري</p>
                            <p className="text-xs text-gray-500">Hala Shari</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div className="space-y-3">
                            <div><p className="text-[10px] text-gray-400 uppercase tracking-wider">رقم الفاتورة</p><p className="text-sm font-bold text-gray-900">{selectedInvoice.invoiceNumber}</p></div>
                            <div><p className="text-[10px] text-gray-400 uppercase tracking-wider">تاريخ الإصدار</p><p className="text-sm font-medium text-gray-700">{selectedInvoice.issueDate}</p></div>
                            <div><p className="text-[10px] text-gray-400 uppercase tracking-wider">الفترة</p><p className="text-sm font-medium text-gray-700">{selectedInvoice.period}</p></div>
                          </div>
                          <div className="space-y-3">
                            <div><p className="text-[10px] text-gray-400 uppercase tracking-wider">العميل</p><p className="text-sm font-bold text-gray-900">متجر المسوّق</p><p className="text-xs text-gray-500">الرياض، المملكة العربية السعودية</p></div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wider">الحالة</p>
                              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${selectedInvoice.status === 'paid' ? 'bg-green-100 text-green-700' : selectedInvoice.status === 'unpaid' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{st.label}</span>
                            </div>
                            <div><p className="text-[10px] text-gray-400 uppercase tracking-wider">نوع الفاتورة</p><p className="text-sm font-medium text-gray-700">{selectedInvoice.periodType === 'weekly' ? 'أسبوعية' : 'شهرية'}</p></div>
                          </div>
                        </div>
                        <div className="mb-6">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b-2 border-gray-800">
                                <th className="text-right py-3 font-bold text-gray-900">#</th>
                                <th className="text-right py-3 font-bold text-gray-900">الخدمة</th>
                                <th className="text-right py-3 font-bold text-gray-900">التفاصيل</th>
                                <th className="text-left py-3 font-bold text-gray-900">المبلغ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedInvoice.services.map((svc, i) => (
                                <tr key={i} className="border-b border-gray-200">
                                  <td className="py-3 text-gray-500">{i + 1}</td>
                                  <td className="py-3 font-medium text-gray-800">{svc.name}</td>
                                  <td className="py-3 text-gray-500 text-xs">{svc.details}</td>
                                  <td className="py-3 text-left font-semibold text-gray-800">{svc.amount.toLocaleString()} ر.س</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="border-t-2 border-gray-800 pt-4 space-y-2">
                          <div className="flex justify-between text-sm text-gray-600"><span>المجموع الفرعي</span><span>{selectedInvoice.totalAmount.toLocaleString()} ر.س</span></div>
                          <div className="flex justify-between text-sm text-gray-600"><span>ضريبة القيمة المضافة (15%)</span><span>{(selectedInvoice.totalAmount * 0.15).toLocaleString()} ر.س</span></div>
                          <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-gray-300"><span>الإجمالي المستحق</span><span>{(selectedInvoice.totalAmount * 1.15).toLocaleString()} ر.س</span></div>
                        </div>
                        <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                          <p className="text-[10px] text-gray-400">هذه الفاتورة صادرة إلكترونياً من منصة هلا شري • الرقم الضريبي: 300012345600003</p>
                          <p className="text-[10px] text-gray-400 mt-1">شكراً لتعاملكم معنا</p>
                        </div>
                      </div>
                      <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground mt-2" onClick={handleDownloadPdf} disabled={downloadingPdf}>
                        <Download className="w-4 h-4 ml-2" /> {downloadingPdf ? 'جاري التحميل...' : 'تحميل الفاتورة PDF'}
                      </Button>
                    </>
                  );
                })()}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* ════════ GOODS ACCOUNT TAB ════════ */}
          <TabsContent value="goods" className="animate-fade-in space-y-5">
            {/* 4 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { value: goodsAccountSummary.debitBalance, label: "رصيد مدين", icon: TrendingDown, color: "text-destructive", bgColor: "bg-destructive/10" },
                { value: goodsAccountSummary.halaCosts, label: "تكاليف بضاعة هلا شير", icon: ShoppingCart, color: "text-primary", bgColor: "bg-primary/10" },
                { value: goodsAccountSummary.chinaCosts, label: "تكاليف استيراد من الصين", icon: Package, color: "text-primary-deep", bgColor: "bg-primary-deep/10" },
                { value: goodsAccountSummary.egyptCosts, label: "تكاليف استيراد من مصر", icon: Package, color: "text-accent", bgColor: "bg-accent/10" },
              ].map((item, i) => (
                <StatCard key={i} item={{ ...item, value: item.value.toLocaleString(), suffix: "ر.س" }} />
              ))}
            </div>

            {/* Goods Transactions Table */}
            <Card className="border-border rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs">إجمالي التكلفة</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs">النسبة</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs">المبلغ المدفوع</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs">المتبقي</th>
                      </tr>
                    </thead>
                    <tbody>
                      {goodsTransactions.map((gt) => (
                        <tr key={gt.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4 text-foreground text-xs font-medium">{gt.totalCost.toLocaleString()} ر.س</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">{gt.percentage}%</td>
                          <td className="py-3 px-4 font-bold text-destructive text-xs">{gt.amountPaid.toLocaleString()}- ر.س</td>
                          <td className="py-3 px-4 text-xs font-medium">{gt.remaining > 0 ? <span className="text-accent">{gt.remaining.toLocaleString()} ر.س</span> : <span className="text-success">0 ر.س</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Hala Withdrawal Report */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-2 mb-4 flex-row-reverse">
                <ShoppingCart className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-bold text-foreground">تقرير سحب منتجات هلا شير</h4>
              </div>
              <div className="space-y-2">
                {halaWithdrawalReport.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-muted/30 rounded-xl border border-border p-3 flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2 rounded-lg bg-primary/10"><ShoppingCart className="w-4 h-4 text-primary" /></div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{item.product}</p>
                        <p className="text-[11px] text-muted-foreground">سحب {item.quantity} قطعة × {item.unitCost} ر.س</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold text-foreground">{item.total.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground mr-1">ر.س</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t border-border flex-row-reverse">
                  <span className="text-sm font-bold text-foreground">إجمالي سحب منتجات هلا</span>
                  <span className="text-lg font-bold text-primary">{halaWithdrawalReport.reduce((s, i) => s + i.total, 0).toLocaleString()} ر.س</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ════════ TRANSACTIONS TAB ════════ */}
          <TabsContent value="transactions" className="animate-fade-in space-y-6">

            <div className="flex flex-wrap gap-2 flex-row-reverse">
              {transactionTypes.map(t => (
                <Button key={t.value} variant={txFilter === t.value ? "default" : "outline"} size="sm" onClick={() => setTxFilter(t.value)}
                  className={cn("rounded-xl text-xs px-4 h-9", txFilter === t.value && "bg-primary text-primary-foreground")}>
                  {t.label}
                </Button>
              ))}
            </div>

            <Card className="border-border rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filteredTransactions.map((tx) => {
                    const config = typeConfig[tx.type];
                    const status = statusConfig[tx.status];
                    const Icon = config.icon;
                    return (
                      <div key={tx.id} className="flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors flex-row-reverse">
                        <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}><Icon className={`w-5 h-5 ${config.color}`} /></div>
                        <div className="flex-1 min-w-0 text-right">
                          <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                          <div className="flex items-center gap-2 mt-0.5 justify-end">
                            <span className="text-xs text-muted-foreground">{tx.date} • {tx.time}</span>
                            {tx.reference && <span className="text-[10px] text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">{tx.reference}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-500' : 'text-foreground'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ر.س
                          </span>
                          <Badge variant={status.variant} className="text-[10px] px-2 py-0">{status.label}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ════════ REPORTS TAB ════════ */}
          <TabsContent value="reports" className="animate-fade-in space-y-6">

            {/* Services Cost Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reportData.services.map((svc, idx) => {
                const Icon = svc.icon;
                const svcTotal = svc.items.reduce((s, i) => s + i.total, 0);
                const svcOrderCount = svc.items.reduce((s, i) => s + (i.count ?? 0), 0);
                return (
                  <div className="rounded-2xl p-5 border bg-primary/[0.03] border-primary/10 shadow-card" key={idx}>
                    <SectionHeader title={svc.name} icon={Icon} accentColor={svc.accentBg} badge={`${svc.items.length} عناصر`} />
                    <div className="space-y-2 mb-4">
                      {svc.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between bg-card rounded-xl border border-border p-3.5 flex-row-reverse">
                          <div className="flex items-center gap-3 flex-row-reverse">
                            <div className={`p-2 rounded-lg ${svc.bgColor}`}><Icon className={`w-4 h-4 ${svc.color}`} /></div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-foreground">{item.label}</p>
                              <p className="text-[11px] text-muted-foreground">{item.count !== null && item.unitCost !== null ? `${item.count.toLocaleString()} طلب × ${item.unitCost} ر.س` : 'رسوم نسبية'}</p>
                            </div>
                          </div>
                          <div className="text-right"><span className="text-base font-bold text-foreground">{item.total.toLocaleString()}</span><span className="text-xs text-muted-foreground mr-1">ر.س</span></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border flex-row-reverse">
                      <div className="text-right">
                        <span className="text-sm font-bold text-foreground">إجمالي {svc.name}</span>
                        <p className="text-[11px] text-muted-foreground">{svcOrderCount.toLocaleString()} طلب</p>
                      </div>
                      <span className={`text-lg font-bold ${svc.color}`}>{svcTotal.toLocaleString()} ر.س</span>
                    </div>
                  </div>
                );
              })}
            </div>


            {/* Ad & Goods Balance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-orange-500/[0.02] rounded-2xl p-5 border border-orange-500/10">
                <SectionHeader title="رصيد السحب الإعلاني" icon={Megaphone} accentColor="bg-orange-500" />
                <div className="grid grid-cols-1 gap-3">
                  <StatCard item={{ label: "إعلانات تيك توك", value: reportData.adBalance.tiktok.toLocaleString(), suffix: "ر.س", icon: Megaphone, color: "text-pink-500", bgColor: "bg-pink-500/10" }} />
                  <StatCard item={{ label: "إعلانات سناب شات", value: reportData.adBalance.snapchat.toLocaleString(), suffix: "ر.س", icon: Camera, color: "text-yellow-500", bgColor: "bg-yellow-500/10" }} />
                  <div className="flex items-center justify-between pt-3 border-t border-orange-500/10 flex-row-reverse">
                    <div className="text-right">
                      <span className="text-sm font-bold text-foreground">إجمالي السحب الإعلاني</span>
                    </div>
                    <span className="text-lg font-bold text-orange-500">{reportData.adBalance.total.toLocaleString()} ر.س</span>
                  </div>
                </div>
              </div>
              <div className="bg-violet-500/[0.02] rounded-2xl p-5 border border-violet-500/10">
                <SectionHeader title="رصيد شراء البضاعة" icon={Package} accentColor="bg-violet-500" />
                <div className="grid grid-cols-1 gap-3">
                  <StatCard item={{ label: "تكاليف بضاعة هلا", value: Math.abs(reportData.goodsBalance.halaBalance).toLocaleString(), suffix: "ر.س", icon: ShoppingCart, color: "text-primary", bgColor: "bg-primary/10" }} />
                  <StatCard item={{ label: "فاند استيراد بضاعة", value: Math.abs(reportData.goodsBalance.importBalance).toLocaleString(), suffix: "ر.س", icon: Package, color: "text-violet-500", bgColor: "bg-violet-500/10" }} />
                  <div className="flex items-center justify-between pt-3 border-t border-violet-500/10 flex-row-reverse">
                    <div className="text-right">
                      <span className="text-sm font-bold text-foreground">إجمالي تكاليف البضاعة</span>
                    </div>
                    <span className="text-lg font-bold text-violet-500">{Math.abs(reportData.goodsBalance.total).toLocaleString()} ر.س</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FinancialTrendChart />
              <ExpenseBreakdownChart />
            </div>
            <MonthlyProfitChart />
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <WalletDialogs
          showDeposit={showDeposit} setShowDeposit={setShowDeposit}
          showWithdraw={showWithdraw} setShowWithdraw={setShowWithdraw}
          showBankAccounts={showBankAccounts} setShowBankAccounts={setShowBankAccounts}
          balance={balance}
        />
      </main>
    </div>
  );
}
