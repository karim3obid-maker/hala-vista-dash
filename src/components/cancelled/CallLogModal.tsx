import { useState } from "react";
import { X, Phone, User, MapPin, Package, Calendar, Mail, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CancelledOrder, CallLog, CallStatus, CallResult, CancelReason,
  callStatusLabels, callResultLabels, cancelReasonLabels,
  stageLabels, stageColors, agents,
} from "@/data/cancelledOrdersData";

interface Props {
  open: boolean;
  order: CancelledOrder | null;
  onClose: () => void;
  onSave: (order: CancelledOrder) => void;
}

const CallLogModal = ({ open, order, onClose, onSave }: Props) => {
  const [callStatus, setCallStatus] = useState<CallStatus | null>(null);
  const [callResult, setCallResult] = useState<CallResult | null>(null);
  const [cancelReason, setCancelReason] = useState<CancelReason | null>(null);
  const [notes, setNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [agent, setAgent] = useState(agents[0]);

  if (!open || !order) return null;

  const reset = () => {
    setCallStatus(null); setCallResult(null); setCancelReason(null);
    setNotes(""); setFollowUp("");
  };

  const handleSave = () => {
    if (!callStatus) return;
    const nextAttempt = (Math.min(order.attemptCount + 1, 3)) as 1 | 2 | 3;
    const newLog: CallLog = {
      id: `${order.id}-${Date.now()}`,
      date: new Date().toLocaleDateString('ar-SA'),
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      attemptNumber: nextAttempt,
      agentName: agent,
      callStatus,
      callResult: callResult ?? undefined,
      cancelReason: cancelReason ?? undefined,
      notes,
      followUpDate: followUp || undefined,
    };
    const newAttemptCount = Math.min(order.attemptCount + 1, 3);
    let newStage = order.stage;
    if (callResult === 'confirmed') newStage = 'recovered';
    else if (newAttemptCount >= 3) newStage = 'lost';
    else if (newAttemptCount === 1) newStage = 'attempt1';
    else if (newAttemptCount === 2) newStage = 'attempt2';
    else if (newAttemptCount === 3) newStage = 'attempt3';

    onSave({
      ...order,
      callLogs: [...order.callLogs, newLog],
      attemptCount: newAttemptCount,
      lastCallDate: `${newLog.date} ${newLog.time}`,
      stage: newStage,
    });
    reset();
    onClose();
  };

  const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
        active ? 'bg-foreground text-background border-foreground' : 'bg-background text-foreground border-border hover:border-foreground/40'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
      <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{order.orderNumber}</h2>
              <p className="text-xs text-muted-foreground">{order.customerName} — {order.storeName}</p>
            </div>
            <span
              className="px-2.5 py-1 rounded-md text-[11px] font-semibold mr-2"
              style={{ background: stageColors[order.stage].bg, color: stageColors[order.stage].text }}
            >
              {stageLabels[order.stage]}
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer panel */}
          <div className="rounded-xl border border-border p-4 bg-muted/30">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><User className="w-4 h-4" /> بيانات العميل</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
              <Field label="الاسم الكامل" value={order.customerName} />
              <Field label="رقم الهاتف" value={<a href={`tel:${order.customerPhone}`} className="text-primary">{order.customerPhone}</a>} icon={<Phone className="w-3 h-3" />} />
              <Field label="البريد" value={order.customerEmail || '-'} icon={<Mail className="w-3 h-3" />} />
              <Field label="المدينة" value={order.city} icon={<MapPin className="w-3 h-3" />} />
              <Field label="المنتج" value={order.productName} icon={<Package className="w-3 h-3" />} />
              <Field label="قيمة الطلب" value={`${order.amount} ر.س`} />
              <Field label="طلبات سابقة" value={`${order.previousOrders}`} icon={<ShoppingBag className="w-3 h-3" />} />
              <Field label="إجمالي الإنفاق" value={`${order.totalSpent} ر.س`} />
              <Field label="سبب الإلغاء" value={cancelReasonLabels[order.cancelReason]} />
              <Field label="تاريخ الإلغاء" value={order.cancelledDate} icon={<Calendar className="w-3 h-3" />} />
              <Field label="الموظف المسؤول" value={order.assignedAgent} />
              <Field label="عدد المحاولات" value={`${order.attemptCount} من 3`} />
            </div>
          </div>

          {/* Previous calls */}
          {order.callLogs.length > 0 && (
            <div>
              <h3 className="text-sm font-bold mb-3">سجل المكالمات السابقة</h3>
              <div className="space-y-2">
                {order.callLogs.map((log) => (
                  <div key={log.id} className="rounded-lg border border-border p-3 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">المحاولة {log.attemptNumber} — {log.agentName}</span>
                      <span className="text-muted-foreground">{log.date} • {log.time}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded bg-muted">{callStatusLabels[log.callStatus]}</span>
                      {log.callResult && <span className="px-2 py-0.5 rounded bg-muted">{callResultLabels[log.callResult]}</span>}
                    </div>
                    {log.notes && <p className="text-muted-foreground mt-2">{log.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call script */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <h3 className="text-sm font-bold mb-2 text-primary">📞 نص المكالمة المقترح</h3>
            <p className="text-xs text-foreground leading-relaxed">
              السلام عليكم {order.customerName}، معك {agent} من {order.storeName}. لاحظنا إنك ألغيت طلب {order.productName} بقيمة {order.amount} ر.س، حابين نتأكد إذا في طريقة نقدر نساعدك فيها لإتمام الطلب.
            </p>
          </div>

          {/* New call form */}
          <div className="rounded-xl border-2 border-primary/30 p-4">
            <h3 className="text-sm font-bold mb-4 text-primary">تسجيل المحاولة الجديدة (#{Math.min(order.attemptCount + 1, 3)})</h3>

            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-2 block">الموظف</Label>
                <select
                  value={agent}
                  onChange={(e) => setAgent(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {agents.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <Label className="text-xs mb-2 block">حالة المكالمة *</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(callStatusLabels) as [CallStatus, string][]).map(([k, v]) => (
                    <Chip key={k} active={callStatus === k} onClick={() => setCallStatus(k)}>{v}</Chip>
                  ))}
                </div>
              </div>

              {callStatus === 'answered' && (
                <>
                  <div>
                    <Label className="text-xs mb-2 block">نتيجة المكالمة</Label>
                    <div className="flex flex-wrap gap-2">
                      {(Object.entries(callResultLabels) as [CallResult, string][]).map(([k, v]) => (
                        <Chip key={k} active={callResult === k} onClick={() => setCallResult(k)}>{v}</Chip>
                      ))}
                    </div>
                  </div>

                  {(callResult === 'rejected') && (
                    <div>
                      <Label className="text-xs mb-2 block">سبب الإلغاء</Label>
                      <div className="flex flex-wrap gap-2">
                        {(Object.entries(cancelReasonLabels) as [CancelReason, string][]).map(([k, v]) => (
                          <Chip key={k} active={cancelReason === k} onClick={() => setCancelReason(k)}>{v}</Chip>
                        ))}
                      </div>
                    </div>
                  )}

                  {(callResult === 'interested' || callResult === 'later') && (
                    <div>
                      <Label className="text-xs mb-2 block">موعد المتابعة</Label>
                      <Input type="datetime-local" value={followUp} onChange={(e) => setFollowUp(e.target.value)} />
                    </div>
                  )}
                </>
              )}

              <div>
                <Label className="text-xs mb-2 block">ملاحظات</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="تفاصيل المكالمة..." rows={3} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            المحاولة {Math.min(order.attemptCount + 1, 3)} من 3
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>إلغاء</Button>
            <Button onClick={handleSave} disabled={!callStatus}>حفظ المكالمة</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) => (
  <div>
    <p className="text-[11px] text-muted-foreground mb-1 flex items-center gap-1">{icon}{label}</p>
    <p className="text-sm font-semibold text-foreground">{value}</p>
  </div>
);

export default CallLogModal;
