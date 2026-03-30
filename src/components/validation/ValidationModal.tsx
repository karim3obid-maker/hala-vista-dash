import { useState } from "react";
import { Phone, AlertTriangle, CheckCircle2, X, Clock, ArrowDown, Save } from "lucide-react";
import {
  ValidationCase, ContactAttempt, ValStatus, ContactResult, CallOutcome, FinalAction, ProblemSource,
  valStatusLabels, contactResultLabels, contactResultColors, callOutcomeLabels,
  finalActionLabels, problemSourceLabels, problemCategories, entryReasonLabels, entryReasonColors,
} from "@/data/validationData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  caseData: ValidationCase;
  onSave: (updated: ValidationCase) => void;
}

const MAX_ATTEMPTS = 3;

const finalActionDescriptions: Record<FinalAction, string> = {
  reship: 'العميل يريد الطلب — يُعاد التوصيل',
  cancel: 'العميل رفض أو لا يريد',
  no_response: 'لا رد بعد كل المحاولات',
  followup: 'العميل طلب وقتاً محدداً',
  escalate: 'مشكلة تحتاج تدخل إدارة',
};

const ValidationModal = ({ open, onClose, caseData, onSave }: Props) => {
  const [contactResult, setContactResult] = useState<ContactResult | "">("");
  const [callOutcome, setCallOutcome] = useState<CallOutcome | "">("");
  const [attemptNotes, setAttemptNotes] = useState("");
  const [problemSource, setProblemSource] = useState<ProblemSource | "">(caseData.problemSource || "");
  const [problemCategories_selected, setProblemCategoriesSelected] = useState<string[]>(
    caseData.problemCategory ? [caseData.problemCategory] : []
  );
  const [finalAction, setFinalAction] = useState<FinalAction | "">(caseData.finalAction || "");

  const currentAttemptNumber = caseData.attempts.length + 1;
  const canAddAttempt = currentAttemptNumber <= MAX_ATTEMPTS;
  const hasAnswered = caseData.attempts.some(a => a.contactResult === 'answered') || contactResult === 'answered';
  const isClosed = caseData.valStatus === 'resolved' || caseData.valStatus === 'cancelled';

  const lastAttemptDate = caseData.attempts.length > 0
    ? `${caseData.attempts[caseData.attempts.length - 1].attemptDate} — ${caseData.attempts[caseData.attempts.length - 1].attemptTime}`
    : 'لم يتم بعد';

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
      problemCategory: problemCategories_selected[0] || undefined,
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
      problemCategory: problemCategories_selected[0] || undefined,
      finalAction: finalAction as FinalAction,
      resolvedDate: new Date().toISOString().split('T')[0],
    };
    onSave(updated);
    toast({ title: "تم إغلاق الحالة", description: `الطلب ${caseData.orderNumber} — ${finalActionLabels[finalAction as FinalAction]}` });
    onClose();
  };

  const toggleProblemCategory = (value: string) => {
    setProblemCategoriesSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  // Problem source display labels (matching screenshot - only 3 shown without customer)
  const problemSourceDisplay: { key: ProblemSource; title: string; subtitle: string }[] = [
    { key: 'product', title: 'المنتج', subtitle: 'جودة / وصف' },
    { key: 'carrier', title: 'شركة الشحن', subtitle: 'مشكلة التوصيل' },
    { key: 'confirmation', title: 'Confirmation', subtitle: 'فريق التأكيد' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto p-0 rounded-2xl" dir="rtl">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-foreground">
                Validation — {caseData.orderNumber}
              </h2>
              <span className="text-xs px-3 py-1 rounded-full font-bold"
                style={{ background: entryReasonColors[caseData.entryReason].bg, color: entryReasonColors[caseData.entryReason].text }}>
                {caseData.entryReason === 'delayed' ? 'دخل أوتو بعد 3 أيام' : entryReasonLabels[caseData.entryReason]}
              </span>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            {caseData.customerName} | {entryReasonLabels[caseData.entryReason]} | {caseData.carrierName} | موظف: {caseData.assignedAgent} | {caseData.city}، {caseData.country}
          </p>
        </div>

        {/* Quick Stats Row */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-4 gap-3">
            <div className="border border-border rounded-xl p-3">
              <p className="text-[11px] text-muted-foreground mb-1">حالة الطلب</p>
              <span className="text-sm font-bold" style={{ color: entryReasonColors[caseData.entryReason].text }}>
                {entryReasonLabels[caseData.entryReason]}
              </span>
            </div>
            <div className="border border-border rounded-xl p-3">
              <p className="text-[11px] text-muted-foreground mb-1">الحالة الفرعية</p>
              <p className="text-sm font-bold text-foreground">{caseData.lastCarrierStatus === 'returned_to_origin' ? 'رفض الاستلام' : caseData.lastCarrierStatus === 'delivery_failed' ? 'فشل التوصيل' : caseData.lastCarrierStatus}</p>
            </div>
            <div className="border border-border rounded-xl p-3">
              <p className="text-[11px] text-muted-foreground mb-1">آخر محاولة اتصال</p>
              <p className="text-sm font-bold text-foreground">{lastAttemptDate}</p>
            </div>
            <div className="border border-border rounded-xl p-3">
              <p className="text-[11px] text-muted-foreground mb-1">عدد المحاولات</p>
              <p className="text-sm font-bold" style={{ color: caseData.attempts.length === 0 ? '#534AB7' : caseData.attempts.length < MAX_ATTEMPTS ? '#B45309' : '#3B6D11' }}>
                {caseData.attempts.length} من {MAX_ATTEMPTS}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* سجل محاولات الاتصال */}
          <div className="border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-muted/20 border-b border-border">
              <h3 className="text-sm font-bold text-foreground">سجل محاولات الاتصال</h3>
              <span className="text-xs text-muted-foreground">الحد الأقصى 3-4 محاولات</span>
            </div>

            <div className="divide-y divide-border">
              {/* Previous Attempts */}
              {caseData.attempts.map((attempt) => (
                <div key={attempt.id} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-foreground">محاولة {attempt.attemptNumber}</h4>
                    <span className="text-xs text-muted-foreground">
                      {attempt.attemptTime} — {attempt.attemptDate}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <div>
                      <p className="text-[11px] text-muted-foreground">نتيجة الاتصال</p>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium inline-block mt-1"
                        style={{ background: contactResultColors[attempt.contactResult].bg, color: contactResultColors[attempt.contactResult].text }}>
                        {contactResultLabels[attempt.contactResult]}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">الموظف</p>
                      <p className="text-sm text-foreground mt-1">{attempt.agentName}</p>
                    </div>
                    {attempt.callOutcome && (
                      <>
                        <div>
                          <p className="text-[11px] text-muted-foreground">ما حدث في المكالمة</p>
                          <span className="text-xs px-2.5 py-1 rounded-full font-medium inline-block mt-1"
                            style={{ background: '#FEF3C7', color: '#B45309' }}>
                            {callOutcomeLabels[attempt.callOutcome]}
                          </span>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">Action المتخذ</p>
                          <p className="text-sm text-foreground mt-1">{attempt.attemptAction ? finalActionLabels[attempt.attemptAction as FinalAction] || attempt.attemptAction : 'متابعة لاحقاً'}</p>
                        </div>
                      </>
                    )}
                  </div>
                  {attempt.notes && (
                    <div className="mt-3 bg-muted/30 rounded-xl px-4 py-2.5 border border-border">
                      <p className="text-xs text-muted-foreground">{attempt.notes}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Current New Attempt */}
              {canAddAttempt && !isClosed && (
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-foreground">محاولة {currentAttemptNumber} — الآن</h4>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-amber-50 text-amber-700 border border-amber-200">جارية</span>
                  </div>

                  {/* نتيجة الاتصال */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-foreground mb-2">* نتيجة الإتصال</p>
                    <div className="flex gap-2 flex-wrap">
                      {(Object.entries(contactResultLabels) as [ContactResult, string][]).map(([key, label]) => (
                        <button key={key} onClick={() => { setContactResult(key); if (key !== 'answered') setCallOutcome(""); }}
                          className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                            contactResult === key
                              ? 'bg-foreground text-background border-foreground'
                              : 'bg-background text-foreground border-border hover:border-foreground/40'
                          }`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ما حدث في المكالمة */}
                  {contactResult === 'answered' && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-foreground mb-2">ما حدث في المكالمة</p>
                      <div className="flex gap-2 flex-wrap">
                        {(Object.entries(callOutcomeLabels) as [CallOutcome, string][]).map(([key, label]) => (
                          <button key={key} onClick={() => setCallOutcome(key)}
                            className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                              callOutcome === key
                                ? 'bg-foreground text-background border-foreground'
                                : 'bg-background text-foreground border-border hover:border-foreground/40'
                            }`}>
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ملاحظة تفصيلية */}
                  <div>
                    <p className="text-xs font-bold text-foreground mb-2">ملاحظة تفصيلية</p>
                    <Textarea value={attemptNotes} onChange={(e) => setAttemptNotes(e.target.value)}
                      placeholder="" className="rounded-xl min-h-[70px] border-border" />
                  </div>

                  {caseData.attempts.length >= MAX_ATTEMPTS - 1 && !hasAnswered && (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl mt-3">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <p className="text-xs text-amber-700">اقتراح: كنسل بسبب عدم الاستجابة</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* تحليل المشكلة */}
          {hasAnswered && (
            <div className="border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-muted/20 border-b border-border">
                <h3 className="text-sm font-bold text-foreground">تحليل المشكلة</h3>
                <span className="text-xs text-muted-foreground">من أين جاءت المشكلة؟</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {problemSourceDisplay.map(({ key, title, subtitle }) => (
                    <button key={key} onClick={() => { setProblemSource(key); setProblemCategoriesSelected([]); }}
                      className={`p-4 rounded-xl text-center border-2 transition-all ${
                        problemSource === key
                          ? 'border-foreground bg-muted/30'
                          : 'border-border hover:border-foreground/30'
                      }`}>
                      <p className="text-sm font-bold text-foreground">{title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
                    </button>
                  ))}
                </div>

                {problemSource && (
                  <div className="bg-muted/20 rounded-xl p-4 border border-border">
                    <p className="text-xs font-bold text-foreground mb-3">
                      {problemSourceLabels[problemSource as ProblemSource]} — تفاصيل المشكلة:
                    </p>
                    <div className="space-y-2.5">
                      {problemCategories[problemSource as ProblemSource].map(cat => (
                        <label key={cat.value} className="flex items-center gap-3 cursor-pointer">
                          <Checkbox
                            checked={problemCategories_selected.includes(cat.value)}
                            onCheckedChange={() => toggleProblemCategory(cat.value)}
                          />
                          <span className="text-sm text-foreground">{cat.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* الـ Action النهائي */}
          {!isClosed && (
            <div className="border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-muted/20 border-b border-border">
                <h3 className="text-sm font-bold text-foreground">الـ Action النهائي للطلب</h3>
                <span className="text-xs text-muted-foreground">القرار الأخير بعد كل المحاولات</span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { key: 'reship' as FinalAction, label: 'إعادة شحن' },
                    { key: 'cancel' as FinalAction, label: 'كنسل نهائي' },
                    { key: 'no_response' as FinalAction, label: 'العميل غير مهتم' },
                    { key: 'escalate' as FinalAction, label: 'تحويل للمشاكل' },
                  ]).map(({ key, label }) => (
                    <button key={key} onClick={() => setFinalAction(key)}
                      className={`p-4 rounded-xl text-right border-2 transition-all ${
                        finalAction === key
                          ? 'border-foreground bg-muted/30'
                          : 'border-border hover:border-foreground/30'
                      }`}>
                      <p className="text-sm font-bold text-foreground">{label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{finalActionDescriptions[key]}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isClosed && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-background">
            <div className="flex items-center gap-2">
              {/* Attempt dots */}
              <div className="flex gap-1.5 items-center">
                {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i < caseData.attempts.length ? 'bg-foreground' : 'bg-border'}`} />
                ))}
                <span className="text-xs text-muted-foreground mr-2">محاولة {caseData.attempts.length} من {MAX_ATTEMPTS}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-full gap-1.5 px-4 h-10" onClick={onClose}>
                <ArrowDown className="w-4 h-4" />
              </Button>
              {canAddAttempt && (
                <Button variant="outline" className="rounded-full gap-1.5 px-6 h-10 text-sm font-medium" onClick={handleSaveAttemptOnly}>
                  حفظ محاولة فقط
                </Button>
              )}
              <Button className="rounded-full gap-1.5 px-6 h-10 text-sm font-bold bg-foreground text-background hover:bg-foreground/90" onClick={handleSaveAndClose}>
                حفظ وإغلاق الحالة
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ValidationModal;
