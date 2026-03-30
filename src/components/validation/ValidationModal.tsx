import { useState } from "react";
import { Phone, MessageCircle, AlertTriangle, CheckCircle2, X, Clock, ChevronDown, ChevronUp, Save } from "lucide-react";
import {
  ValidationCase, ContactAttempt, ValStatus, ContactResult, CallOutcome, FinalAction, ProblemSource,
  valStatusLabels, valStatusColors, contactResultLabels, contactResultColors, callOutcomeLabels,
  finalActionLabels, problemSourceLabels, problemSourceColors, problemCategories, entryReasonLabels, entryReasonColors,
} from "@/data/validationData";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  caseData: ValidationCase;
  onSave: (updated: ValidationCase) => void;
}

const MAX_ATTEMPTS = 3;

const ValidationModal = ({ open, onClose, caseData, onSave }: Props) => {
  const [expandedAttempts, setExpandedAttempts] = useState<number[]>([]);
  const [contactResult, setContactResult] = useState<ContactResult | "">("");
  const [callOutcome, setCallOutcome] = useState<CallOutcome | "">("");
  const [attemptNotes, setAttemptNotes] = useState("");
  const [problemSource, setProblemSource] = useState<ProblemSource | "">(caseData.problemSource || "");
  const [problemCategory, setProblemCategory] = useState(caseData.problemCategory || "");
  const [problemNotes, setProblemNotes] = useState(caseData.problemNotes || "");
  const [finalAction, setFinalAction] = useState<FinalAction | "">(caseData.finalAction || "");

  const currentAttemptNumber = caseData.attempts.length + 1;
  const canAddAttempt = currentAttemptNumber <= MAX_ATTEMPTS;
  const hasAnswered = caseData.attempts.some(a => a.contactResult === 'answered') || contactResult === 'answered';

  const toggleAttempt = (num: number) => {
    setExpandedAttempts(prev => prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]);
  };

  const getAttemptCountColor = (count: number, hasResolved: boolean) => {
    if (count === 0) return { bg: '#EEEDFE', text: '#534AB7' };
    if (count < MAX_ATTEMPTS) return { bg: '#FEF3C7', text: '#B45309' };
    return hasResolved ? { bg: '#EAF3DE', text: '#3B6D11' } : { bg: '#FCEBEB', text: '#A32D2D' };
  };

  const handleSaveAttemptOnly = () => {
    if (!contactResult) {
      toast({ title: "خطأ", description: "اختر نتيجة الاتصال أولاً", variant: "destructive" });
      return;
    }
    const newAttempt: ContactAttempt = {
      id: `a-${Date.now()}`, attemptNumber: currentAttemptNumber,
      attemptDate: new Date().toISOString().split('T')[0],
      attemptTime: new Date().toTimeString().slice(0, 5),
      agentName: caseData.assignedAgent, contactResult: contactResult as ContactResult,
      callOutcome: contactResult === 'answered' ? (callOutcome as CallOutcome) : undefined,
      notes: attemptNotes || undefined,
    };
    const newStatus: ValStatus = contactResult === 'no_answer' || contactResult === 'wrong_number' ? 'no_answer' : 'pending';
    const updated: ValidationCase = {
      ...caseData,
      valStatus: newStatus,
      attempts: [...caseData.attempts, newAttempt],
      problemSource: problemSource as ProblemSource || undefined,
      problemCategory: problemCategory || undefined,
      problemNotes: problemNotes || undefined,
    };
    onSave(updated);
    toast({ title: "تم حفظ المحاولة", description: `المحاولة ${currentAttemptNumber} تم تسجيلها` });
    setContactResult(""); setCallOutcome(""); setAttemptNotes("");
  };

  const handleSaveAndClose = () => {
    if (!finalAction) {
      toast({ title: "خطأ", description: "اختر الإجراء النهائي أولاً", variant: "destructive" });
      return;
    }
    let newAttempts = caseData.attempts;
    if (contactResult) {
      const newAttempt: ContactAttempt = {
        id: `a-${Date.now()}`, attemptNumber: currentAttemptNumber,
        attemptDate: new Date().toISOString().split('T')[0],
        attemptTime: new Date().toTimeString().slice(0, 5),
        agentName: caseData.assignedAgent, contactResult: contactResult as ContactResult,
        callOutcome: contactResult === 'answered' ? (callOutcome as CallOutcome) : undefined,
        notes: attemptNotes || undefined,
      };
      newAttempts = [...newAttempts, newAttempt];
    }
    const closedStatus: ValStatus = finalAction === 'cancel' || finalAction === 'no_response' ? 'cancelled' : 'resolved';
    const updated: ValidationCase = {
      ...caseData,
      valStatus: closedStatus,
      attempts: newAttempts,
      problemSource: problemSource as ProblemSource || undefined,
      problemCategory: problemCategory || undefined,
      problemNotes: problemNotes || undefined,
      finalAction: finalAction as FinalAction,
      resolvedDate: new Date().toISOString().split('T')[0],
    };
    onSave(updated);
    toast({ title: "تم إغلاق الحالة", description: `الطلب ${caseData.orderNumber} — ${finalActionLabels[finalAction as FinalAction]}` });
    onClose();
  };

  const attemptColors = getAttemptCountColor(caseData.attempts.length, caseData.valStatus === 'resolved');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0" dir="rtl">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              فالديشن — {caseData.orderNumber}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: attemptColors.bg, color: attemptColors.text }}>
                {caseData.attempts.length} من {MAX_ATTEMPTS} محاولات
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: valStatusColors[caseData.valStatus].bg, color: valStatusColors[caseData.valStatus].text }}>
                {valStatusLabels[caseData.valStatus]}
              </span>
            </div>
          </div>
          <DialogDescription className="text-right text-xs text-muted-foreground mt-1">
            مراجعة الطلب وتسجيل محاولات الاتصال وتحديد الإجراء النهائي
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* 1. Order Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">بيانات الطلب</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'العميل', value: caseData.customerName },
                { label: 'الهاتف', value: caseData.customerPhone },
                { label: 'الدولة', value: caseData.country },
                { label: 'المدينة', value: caseData.city },
                { label: 'المنتج', value: `${caseData.productName} (${caseData.productCount})` },
                { label: 'القيمة', value: `${caseData.orderValue} ${caseData.currency}` },
                { label: 'شركة الشحن', value: caseData.carrierName },
                { label: 'الموظف', value: caseData.assignedAgent },
              ].map((item, i) => (
                <div key={i} className="bg-muted/30 rounded-xl p-3 border border-border">
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-2">
              <div className="bg-muted/30 rounded-xl p-3 border border-border flex-1">
                <p className="text-[10px] text-muted-foreground">سبب الدخول</p>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block" style={{ background: entryReasonColors[caseData.entryReason].bg, color: entryReasonColors[caseData.entryReason].text }}>
                  {entryReasonLabels[caseData.entryReason]}
                </span>
              </div>
              <div className="bg-muted/30 rounded-xl p-3 border border-border flex-1">
                <p className="text-[10px] text-muted-foreground">آخر حالة من الشحن</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{caseData.lastCarrierStatus}</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-3 border border-border flex-1">
                <p className="text-[10px] text-muted-foreground">آخر تحديث</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{caseData.lastCarrierTimestamp}</p>
              </div>
            </div>
          </div>

          {/* 2. Previous Attempts */}
          {caseData.attempts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">سجل المحاولات السابقة</h3>
              <div className="space-y-2">
                {caseData.attempts.map((attempt) => (
                  <div key={attempt.id} className="bg-muted/20 rounded-xl border border-border overflow-hidden">
                    <button onClick={() => toggleAttempt(attempt.attemptNumber)} className="w-full flex items-center justify-between p-3 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold bg-primary/10 text-primary w-7 h-7 rounded-full flex items-center justify-center">
                          {attempt.attemptNumber}
                        </span>
                        <span className="text-sm font-medium">{attempt.attemptDate} — {attempt.attemptTime}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: contactResultColors[attempt.contactResult].bg, color: contactResultColors[attempt.contactResult].text }}>
                          {contactResultLabels[attempt.contactResult]}
                        </span>
                      </div>
                      {expandedAttempts.includes(attempt.attemptNumber) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedAttempts.includes(attempt.attemptNumber) && (
                      <div className="px-3 pb-3 pt-1 border-t border-border space-y-1">
                        <p className="text-xs text-muted-foreground">الموظف: {attempt.agentName}</p>
                        {attempt.callOutcome && <p className="text-xs text-muted-foreground">نتيجة المكالمة: {callOutcomeLabels[attempt.callOutcome]}</p>}
                        {attempt.notes && <p className="text-xs text-muted-foreground">ملاحظات: {attempt.notes}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. New Attempt */}
          {canAddAttempt && caseData.valStatus !== 'resolved' && caseData.valStatus !== 'cancelled' && (
            <div className="space-y-3 bg-primary/5 rounded-2xl p-4 border border-primary/20">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                تسجيل محاولة جديدة — المحاولة {currentAttemptNumber}
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">نتيجة الاتصال</Label>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    {(Object.entries(contactResultLabels) as [ContactResult, string][]).map(([key, label]) => (
                      <button key={key} onClick={() => { setContactResult(key); if (key !== 'answered') setCallOutcome(""); }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${contactResult === key ? 'ring-2 ring-primary/50 shadow-sm' : 'hover:border-primary/30'}`}
                        style={{ background: contactResultColors[key].bg, color: contactResultColors[key].text, borderColor: contactResult === key ? contactResultColors[key].text : 'transparent' }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {contactResult === 'answered' && (
                  <div>
                    <Label className="text-xs text-muted-foreground">ما حدث في المكالمة</Label>
                    <Select value={callOutcome} onValueChange={(v) => setCallOutcome(v as CallOutcome)}>
                      <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="اختر..." /></SelectTrigger>
                      <SelectContent>
                        {(Object.entries(callOutcomeLabels) as [CallOutcome, string][]).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label className="text-xs text-muted-foreground">ملاحظات</Label>
                  <Textarea value={attemptNotes} onChange={(e) => setAttemptNotes(e.target.value)}
                    placeholder="اكتب ملاحظات المحاولة..." className="mt-1 rounded-xl min-h-[60px]" />
                </div>
              </div>

              {caseData.attempts.length >= MAX_ATTEMPTS - 1 && !hasAnswered && (
                <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-700">اقتراح: كنسل بسبب عدم الاستجابة</p>
                </div>
              )}
            </div>
          )}

          {/* 4. Problem Analysis */}
          {hasAnswered && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">تحليل المشكلة</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.entries(problemSourceLabels) as [ProblemSource, string][]).map(([key, label]) => (
                  <button key={key} onClick={() => { setProblemSource(key); setProblemCategory(""); }}
                    className={`p-3 rounded-xl text-center text-xs font-bold border-2 transition-all ${problemSource === key ? 'ring-2 ring-offset-1 shadow-sm' : 'hover:shadow-sm'}`}
                    style={{ background: problemSourceColors[key].bg, color: problemSourceColors[key].text, borderColor: problemSource === key ? problemSourceColors[key].text : 'transparent' }}>
                    {label}
                  </button>
                ))}
              </div>
              {problemSource && (
                <div>
                  <Label className="text-xs text-muted-foreground">الفئة الفرعية</Label>
                  <Select value={problemCategory} onValueChange={setProblemCategory}>
                    <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="اختر الفئة..." /></SelectTrigger>
                    <SelectContent>
                      {problemCategories[problemSource as ProblemSource].map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label className="text-xs text-muted-foreground">تفاصيل إضافية</Label>
                <Textarea value={problemNotes} onChange={(e) => setProblemNotes(e.target.value)}
                  placeholder="اكتب تفاصيل المشكلة..." className="mt-1 rounded-xl min-h-[50px]" />
              </div>
            </div>
          )}

          {/* 5. Final Action */}
          {caseData.valStatus !== 'resolved' && caseData.valStatus !== 'cancelled' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">الإجراء النهائي</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.entries(finalActionLabels) as [FinalAction, string][]).map(([key, label]) => {
                  const icons: Record<FinalAction, React.ReactNode> = {
                    reship: <CheckCircle2 className="w-4 h-4" />,
                    cancel: <X className="w-4 h-4" />,
                    no_response: <Phone className="w-4 h-4" />,
                    followup: <Clock className="w-4 h-4" />,
                    escalate: <AlertTriangle className="w-4 h-4" />,
                  };
                  return (
                    <button key={key} onClick={() => setFinalAction(key)}
                      className={`p-3 rounded-xl text-sm font-medium border-2 transition-all flex items-center gap-2 justify-center ${finalAction === key ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-card border-border text-muted-foreground hover:border-primary/40'}`}>
                      {icons[key]} {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {caseData.valStatus !== 'resolved' && caseData.valStatus !== 'cancelled' && (
          <div className="p-4 border-t border-border flex items-center justify-between bg-muted/30">
            <div className="flex gap-2">
              {canAddAttempt && (
                <Button variant="outline" className="rounded-xl gap-1.5" onClick={handleSaveAttemptOnly}>
                  <Save className="w-4 h-4" /> حفظ محاولة فقط
                </Button>
              )}
              <Button className="rounded-xl gap-1.5" onClick={handleSaveAndClose}>
                <CheckCircle2 className="w-4 h-4" /> حفظ وإغلاق الحالة
              </Button>
            </div>
            <Button variant="ghost" className="rounded-xl" onClick={onClose}>إلغاء</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ValidationModal;
