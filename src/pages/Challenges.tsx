import { useState } from "react";
import { Trophy, Package, DollarSign, Clock, Target, Star, Flame, Shield, Award, Download, CheckCircle, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

// Mock data
const summaryCards = [
  { title: "المُسلَّم هذا الشهر", value: "320", subtitle: "طلب مُسلَّم", icon: Package, color: "text-primary", bg: "bg-primary/10" },
  { title: "البونص المكتسب", value: "$55", subtitle: "إجمالي مكتسب", icon: DollarSign, color: "text-accent", bg: "bg-accent/10" },
  { title: "قيد المعالجة", value: "$20", subtitle: "بونص معلق", icon: Clock, color: "text-muted-foreground", bg: "bg-muted" },
  { title: "الهدف القادم", value: "500", subtitle: "متبقي 180 طلب", icon: Target, color: "text-primary", bg: "bg-primary/10" },
];

const challengesData = [
  { id: 1, title: "تحدي 500 مُسلَّم", description: "سلّم 500 طلب هذا الشهر واحصل على بونص", details: "يجب تسليم 500 طلب خلال الشهر الحالي. يتم احتساب الطلبات المُسلَّمة فقط ولا تشمل المرتجعات أو الملغية. البونص يُضاف تلقائياً بعد تحقيق الهدف.", bonus: 100, current: 320, target: 500, icon: Trophy, duration: "شهر واحد" },
  { id: 2, title: "تحدي الاستمرارية", description: "حقق 50 طلب مُسلَّم يومياً لمدة 7 أيام متتالية", details: "يجب تحقيق 50 طلب مُسلَّم على الأقل يومياً لمدة 7 أيام متتالية بدون انقطاع. إذا انقطعت سلسلة الأيام يبدأ العد من جديد.", bonus: 30, current: 5, target: 7, icon: Flame, duration: "7 أيام متتالية" },
  { id: 3, title: "تحدي التفعيل", description: "فعّل 10 حسابات جديدة هذا الشهر", details: "قم بتفعيل 10 حسابات عملاء جديدة خلال الشهر الحالي. الحساب يُعتبر مفعّلاً بعد إتمام أول طلب ناجح.", bonus: 25, current: 7, target: 10, icon: Star, duration: "شهر واحد" },
  { id: 4, title: "تحدي الجودة", description: "حافظ على نسبة تسليم أعلى من 70%", details: "يجب أن تكون نسبة التسليم الناجح أعلى من 70% طوال الشهر. يتم حساب النسبة من إجمالي الطلبات المؤكدة.", bonus: 20, current: 72, target: 70, icon: Shield, duration: "شهر واحد" },
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
  const [selectedChallenge, setSelectedChallenge] = useState<typeof challengesData[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [enrolledIds, setEnrolledIds] = useState<number[]>([]);
  const currentDelivered = 320;
  const targetDelivered = 500;
  const progressPercent = Math.round((currentDelivered / targetDelivered) * 100);

  const handleWithdraw = () => {
    toast({ title: "تم إرسال طلب السحب", description: "سيتم مراجعة طلبك خلال 24 ساعة" });
    setWithdrawOpen(false);
  };

  const handleEnroll = (id: number) => {
    setEnrolledIds((prev) => [...prev, id]);
    toast({ title: "تم الاشتراك بنجاح! 🎉", description: "أنت الآن مشترك في هذا التحدي. بالتوفيق!" });
    setDetailOpen(false);
  };

  const openChallengeDetail = (ch: typeof challengesData[0]) => {
    setSelectedChallenge(ch);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-[1280px] mx-auto px-6 py-8">
        {/* Page Title */}
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
              <Button onClick={() => setWithdrawOpen(true)}>
                <DollarSign className="w-4 h-4" />
                طلب سحب البونص
              </Button>
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

        {/* Summary Cards */}
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
              {challengesData.map((ch) => {
                const isEnrolled = enrolledIds.includes(ch.id);
                const percent = ch.id === 4 ? Math.min(100, (ch.current / ch.target) * 100) : Math.round((ch.current / ch.target) * 100);
                const isCompleted = percent >= 100;
                return (
                  <Card
                    key={ch.id}
                    className={`rounded-2xl relative overflow-hidden transition-all hover:shadow-md cursor-pointer ${
                      isEnrolled ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
                    }`}
                    onClick={() => openChallengeDetail(ch)}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 ${isEnrolled ? "bg-primary" : "bg-muted-foreground/20"}`} />
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${isEnrolled ? "bg-primary/10" : "bg-muted"}`}>
                          <ch.icon className={`w-4 h-4 ${isEnrolled ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm text-foreground">{ch.title}</p>
                            {isEnrolled && (
                              <Badge variant="default" className="text-[10px] gap-1">
                                <CheckCircle className="w-3 h-3" /> مشترك
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{ch.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">${ch.bonus}</span>
                        {isCompleted && isEnrolled && <Badge variant="default" className="text-xs">مكتمل ✅</Badge>}
                        {!isEnrolled && (
                          <Badge variant="outline" className="text-xs gap-1 text-muted-foreground">
                            <Eye className="w-3 h-3" /> اضغط للتفاصيل
                          </Badge>
                        )}
                      </div>
                      {isEnrolled ? (
                        <div className="space-y-1">
                          <Progress value={percent} className="h-2 bg-secondary" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{ch.current} / {ch.target}</span>
                            <span>{Math.min(100, Math.round(percent))}%</span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-2 bg-muted rounded-full" />
                      )}
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

        {/* Challenge Detail & Enroll Dialog */}
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="sm:max-w-md">
            {selectedChallenge && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <selectedChallenge.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <DialogTitle className="text-lg">{selectedChallenge.title}</DialogTitle>
                      <DialogDescription>{selectedChallenge.description}</DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="bg-muted rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">المكافأة</span>
                      <span className="text-xl font-bold text-primary">${selectedChallenge.bonus}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">الهدف</span>
                      <span className="font-bold text-foreground">{selectedChallenge.target} {selectedChallenge.id === 4 ? "%" : selectedChallenge.id === 2 ? "أيام" : "طلب"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">المدة</span>
                      <span className="font-bold text-foreground">{selectedChallenge.duration}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-foreground">تفاصيل التحدي</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedChallenge.details}</p>
                  </div>
                  {enrolledIds.includes(selectedChallenge.id) && (
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-foreground">تقدمك الحالي</p>
                      <Progress value={Math.min(100, (selectedChallenge.current / selectedChallenge.target) * 100)} className="h-3 bg-secondary" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{selectedChallenge.current} / {selectedChallenge.target}</span>
                        <span>{Math.min(100, Math.round((selectedChallenge.current / selectedChallenge.target) * 100))}%</span>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDetailOpen(false)}>إغلاق</Button>
                  {enrolledIds.includes(selectedChallenge.id) ? (
                    <Button disabled className="gap-2">
                      <CheckCircle className="w-4 h-4" /> أنت مشترك بالفعل
                    </Button>
                  ) : (
                    <Button onClick={() => handleEnroll(selectedChallenge.id)} className="gap-2">
                      <Trophy className="w-4 h-4" /> اشترك في التحدي
                    </Button>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Challenges;
