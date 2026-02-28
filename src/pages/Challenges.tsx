import { useState } from "react";
import { Trophy, Package, DollarSign, Clock, Target, Star, Flame, Shield, Award, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

// Mock data
const summaryCards = [
  { title: "المُسلَّم هذا الشهر", value: "320", subtitle: "طلب مُسلَّم", icon: Package, color: "text-primary", bg: "bg-primary/10" },
  { title: "البونص المكتسب", value: "$55", subtitle: "إجمالي مكتسب", icon: DollarSign, color: "text-accent", bg: "bg-accent/10" },
  { title: "قيد المعالجة", value: "$20", subtitle: "بونص معلق", icon: Clock, color: "text-muted-foreground", bg: "bg-muted" },
  { title: "الهدف القادم", value: "500", subtitle: "متبقي 180 طلب", icon: Target, color: "text-primary", bg: "bg-primary/10" },
];

const challenges = [
  { id: 1, title: "تحدي 500 مُسلَّم", description: "سلّم 500 طلب هذا الشهر واحصل على بونص", bonus: 100, current: 320, target: 500, icon: Trophy },
  { id: 2, title: "تحدي الاستمرارية", description: "حقق 50 طلب مُسلَّم يومياً لمدة 7 أيام متتالية", bonus: 30, current: 5, target: 7, icon: Flame },
  { id: 3, title: "تحدي التفعيل", description: "فعّل 10 حسابات جديدة هذا الشهر", bonus: 25, current: 7, target: 10, icon: Star },
  { id: 4, title: "تحدي الجودة", description: "حافظ على نسبة تسليم أعلى من 70%", bonus: 20, current: 72, target: 70, icon: Shield },
];

const milestones = [
  { orders: 100, bonus: 15, status: "achieved" as const, label: "برونزي" },
  { orders: 250, bonus: 40, status: "achieved" as const, label: "فضي" },
  { orders: 500, bonus: 100, status: "current" as const, label: "ذهبي" },
  { orders: 1000, bonus: 250, status: "locked" as const, label: "إيليت" },
];

const bonusLog = [
  { id: 1, date: "2026-02-15", type: "تحدي 250 مُسلَّم", amount: 40, status: "مكتمل" },
  { id: 2, date: "2026-02-10", type: "تحدي الجودة", amount: 20, status: "مكتمل" },
  { id: 3, date: "2026-01-28", type: "تحدي 100 مُسلَّم", amount: 15, status: "مكتمل" },
  { id: 4, date: "2026-01-15", type: "تحدي الاستمرارية", amount: 30, status: "مكتمل" },
];


const statusConfig = {
  achieved: { label: "تم تحقيقه ✅", cls: "bg-primary/10 text-primary border-primary/20" },
  current: { label: "الهدف الحالي 🎯", cls: "bg-accent/10 text-accent border-accent/20" },
  locked: { label: "مقفل 🔒", cls: "bg-muted text-muted-foreground border-border" },
};

const Challenges = () => {
  const [period, setPeriod] = useState("this_month");
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const currentDelivered = 320;
  const targetDelivered = 500;
  const progressPercent = Math.round((currentDelivered / targetDelivered) * 100);

  const handleWithdraw = () => {
    toast({ title: "تم إرسال طلب السحب", description: "سيتم مراجعة طلبك خلال 24 ساعة" });
    setWithdrawOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-[1280px] mx-auto px-6 py-8">
        {/* Page Title - matching analytics style */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">تحديات هلا</h1>
            <p className="text-muted-foreground mt-1">البونص & التسليم</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this_month">هذا الشهر</SelectItem>
                <SelectItem value="last_month">الشهر الماضي</SelectItem>
                <SelectItem value="last_3_months">آخر 3 أشهر</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
              <DialogTrigger asChild>
                <Button>
                  <DollarSign className="w-4 h-4" />
                  طلب سحب البونص
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>طلب سحب البونص</DialogTitle>
                  <DialogDescription>سيتم تحويل البونص المكتسب إلى رصيد محفظتك</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3">
                  <div className="flex justify-between items-center p-4 rounded-2xl bg-muted">
                    <span className="text-muted-foreground">البونص المتاح</span>
                    <span className="text-xl font-bold text-primary">$55.00</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">سيتم مراجعة الطلب خلال 24 ساعة عمل</p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setWithdrawOpen(false)}>إلغاء</Button>
                  <Button onClick={handleWithdraw}>تأكيد السحب</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards - matching analytics KPI style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {summaryCards.map((card, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="text-3xl font-bold text-foreground">{card.value}</p>
                    <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                  </div>
                  <div className={`w-11 h-11 rounded-2xl ${card.bg} flex items-center justify-center`}>
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Section */}
        <Card className="rounded-2xl border-2 border-primary/20 mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                تقدمك نحو الهدف
              </h2>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {progressPercent}%
              </Badge>
            </div>
            <div className="space-y-2">
              <Progress value={progressPercent} className="h-4 bg-secondary" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{currentDelivered} طلب مُسلَّم</span>
                <span>الهدف: {targetDelivered} طلب</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground bg-muted rounded-xl p-3 flex items-center gap-2">
              <span className="text-base">📦</span>
              يتم احتساب الطلبات المُسلَّمة فقط (لا تشمل المرتجعات أو الملغية)
            </p>
          </CardContent>
        </Card>

        {/* Two-column: Challenges + Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Right: Active Challenges */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Flame className="w-5 h-5 text-accent" />
              التحديات الحالية
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {challenges.map((ch) => {
                const percent = ch.id === 4 ? Math.min(100, (ch.current / ch.target) * 100) : Math.round((ch.current / ch.target) * 100);
                const isCompleted = percent >= 100;
                return (
                  <Card key={ch.id} className={`rounded-2xl relative overflow-hidden transition-shadow hover:shadow-md ${isCompleted ? "border-primary/40" : ""}`}>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                          <ch.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground">{ch.title}</p>
                          <p className="text-xs text-muted-foreground">{ch.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">${ch.bonus}</span>
                        {isCompleted && <Badge variant="default" className="text-xs">مكتمل ✅</Badge>}
                      </div>
                      <div className="space-y-1">
                        <Progress value={percent} className="h-2 bg-secondary" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{ch.current} / {ch.target}</span>
                          <span>{Math.min(100, Math.round(percent))}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Left: Milestones */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              سُلَّم المكافآت
            </h2>
            <Card className="rounded-2xl">
              <CardContent className="p-4 space-y-0">
                {milestones.map((m, i) => {
                  const cfg = statusConfig[m.status];
                  return (
                    <div key={m.orders} className={`flex items-center justify-between p-4 ${i < milestones.length - 1 ? "border-b border-border" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          m.status === "achieved" ? "bg-primary/10 text-primary" :
                          m.status === "current" ? "bg-accent/10 text-accent" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {m.status === "achieved" ? "✅" : m.status === "current" ? "🎯" : "🔒"}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{m.orders} طلب مُسلَّم</p>
                          <p className="text-xs text-muted-foreground">{m.label}</p>
                        </div>
                      </div>
                      <div className="text-left space-y-1">
                        <p className="text-lg font-bold text-primary">${m.bonus}</p>
                        <Badge className={`text-[10px] ${cfg.cls}`}>{cfg.label}</Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bonus Log */}
        <Card className="rounded-2xl mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">سجل البونص</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toast({ title: "جاري التصدير...", description: "يتم تحميل ملف PDF" })}>
                  <Download className="w-4 h-4" /> PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "جاري التصدير...", description: "يتم تحميل ملف CSV" })}>
                  <Download className="w-4 h-4" /> CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">النوع</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bonusLog.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-muted-foreground">{log.date}</TableCell>
                    <TableCell>{log.type}</TableCell>
                    <TableCell className="text-primary font-bold">${log.amount}</TableCell>
                    <TableCell><Badge variant="default">{log.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Challenges;
