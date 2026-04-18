export type RecoveryStage = 'new' | 'attempt1' | 'attempt2' | 'attempt3' | 'recovered' | 'lost';
export type CallStatus = 'answered' | 'no_answer' | 'busy' | 'wrong_number';
export type CallResult = 'confirmed' | 'rejected' | 'interested' | 'later';
export type CancelReason =
  | 'high_price'
  | 'found_alternative'
  | 'shipping_delay'
  | 'changed_mind'
  | 'fake_order'
  | 'other';

export interface CallLog {
  id: string;
  date: string;
  time: string;
  attemptNumber: 1 | 2 | 3;
  agentName: string;
  callStatus: CallStatus;
  callResult?: CallResult;
  cancelReason?: CancelReason;
  notes?: string;
  followUpDate?: string;
}

export interface CancelledOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  city: string;
  address: string;
  amount: number;
  productName: string;
  cancelReason: CancelReason;
  stage: RecoveryStage;
  attemptCount: number;
  lastCallDate?: string;
  assignedAgent: string;
  storeName: string;
  cancelledDate: string;
  previousOrders: number;
  totalSpent: number;
  callLogs: CallLog[];
}

export const stageLabels: Record<RecoveryStage, string> = {
  new: 'جديد',
  attempt1: 'المحاولة الأولى',
  attempt2: 'المحاولة الثانية',
  attempt3: 'المحاولة الثالثة',
  recovered: 'تم الاسترداد',
  lost: 'مفقود',
};

export const stageColors: Record<RecoveryStage, { bg: string; text: string }> = {
  new: { bg: '#F1F5F9', text: '#475569' },
  attempt1: { bg: '#FEF3C7', text: '#B45309' },
  attempt2: { bg: '#FED7AA', text: '#9A3412' },
  attempt3: { bg: '#FECACA', text: '#991B1B' },
  recovered: { bg: '#DCFCE7', text: '#15803D' },
  lost: { bg: '#FEE2E2', text: '#B91C1C' },
};

export const cancelReasonLabels: Record<CancelReason, string> = {
  high_price: 'السعر مرتفع',
  found_alternative: 'وجد بديل',
  shipping_delay: 'تأخير الشحن',
  changed_mind: 'غيّر رأيه',
  fake_order: 'طلب وهمي',
  other: 'أخرى',
};

export const callStatusLabels: Record<CallStatus, string> = {
  answered: 'تم الرد',
  no_answer: 'لم يرد',
  busy: 'مشغول',
  wrong_number: 'رقم خاطئ',
};

export const callResultLabels: Record<CallResult, string> = {
  confirmed: 'أكد الطلب',
  rejected: 'رفض',
  interested: 'مهتم — متابعة',
  later: 'وقت لاحق',
};

export const agents = ['أحمد المطيري', 'سارة العتيبي', 'محمد الزهراني', 'نورة الحربي', 'فهد القحطاني'];
export const stores = ['متجر هلا', 'متجر النخبة', 'متجر السلام', 'متجر الفخامة'];

const cities = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة', 'الطائف', 'تبوك', 'أبها', 'حائل', 'الخبر'];
const products = [
  'سماعات بلوتوث لاسلكية',
  'ساعة ذكية رياضية',
  'كاميرا مراقبة منزلية',
  'مكبر صوت محمول',
  'شاحن سريع 65W',
  'حقيبة ظهر فاخرة',
  'مكواة شعر احترافية',
  'جهاز تنقية الهواء',
  'مكنسة لاسلكية',
  'عطر شرقي فاخر',
];
const firstNames = ['عبدالله', 'محمد', 'فهد', 'خالد', 'سعد', 'نورة', 'سارة', 'منى', 'هند', 'ريم', 'بدر', 'تركي'];
const lastNames = ['العتيبي', 'القحطاني', 'الغامدي', 'الشهري', 'المطيري', 'الزهراني', 'الحربي', 'الدوسري'];

const reasons: CancelReason[] = ['high_price', 'found_alternative', 'shipping_delay', 'changed_mind', 'fake_order', 'other'];
const stages: RecoveryStage[] = ['new', 'attempt1', 'attempt2', 'attempt3', 'recovered', 'lost'];

const generateOrders = (count: number): CancelledOrder[] => {
  const orders: CancelledOrder[] = [];
  for (let i = 0; i < count; i++) {
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const attemptCount =
      stage === 'new' ? 0 :
      stage === 'attempt1' ? 1 :
      stage === 'attempt2' ? 2 :
      stage === 'attempt3' ? 3 :
      stage === 'recovered' ? Math.floor(Math.random() * 3) + 1 :
      3;
    const agent = agents[i % agents.length];
    const callLogs: CallLog[] = [];
    for (let a = 1; a <= Math.min(attemptCount, 3); a++) {
      callLogs.push({
        id: `${i}-${a}`,
        date: `2026/03/${String(20 + (a % 8)).padStart(2, '0')}`,
        time: `${10 + a}:${15 + a * 5} ص`,
        attemptNumber: a as 1 | 2 | 3,
        agentName: agent,
        callStatus: a === attemptCount && stage === 'recovered' ? 'answered' : (['answered', 'no_answer', 'busy'] as CallStatus[])[a % 3],
        callResult: stage === 'recovered' && a === attemptCount ? 'confirmed' : undefined,
        notes: 'تم التواصل مع العميل ومناقشة تفاصيل الطلب.',
      });
    }
    orders.push({
      id: `co-${i + 1}`,
      orderNumber: `ORD-${String(10001 + i).padStart(5, '0')}`,
      customerName: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      customerPhone: `05${String(10000000 + Math.floor(Math.random() * 89999999))}`,
      customerEmail: `customer${i + 1}@example.com`,
      city: cities[i % cities.length],
      address: `حي النخيل، شارع ${i + 1}`,
      amount: Math.floor(Math.random() * 800) + 100,
      productName: products[i % products.length],
      cancelReason: reasons[i % reasons.length],
      stage,
      attemptCount,
      lastCallDate: callLogs.length ? `${callLogs[callLogs.length - 1].date} ${callLogs[callLogs.length - 1].time}` : undefined,
      assignedAgent: agent,
      storeName: stores[i % stores.length],
      cancelledDate: `2026/03/${String((i % 28) + 1).padStart(2, '0')}`,
      previousOrders: Math.floor(Math.random() * 8),
      totalSpent: Math.floor(Math.random() * 5000) + 200,
      callLogs,
    });
  }
  return orders;
};

export const cancelledOrders: CancelledOrder[] = generateOrders(48);

// Aggregate fake totals
export const totalCancelledOrders = 8682;
