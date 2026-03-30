// ============ TYPES ============

export type ValStatus = 'pending' | 'no_answer' | 'resolved' | 'cancelled';
export type EntryReason = 'returned' | 'failed' | 'delayed';
export type ContactResult = 'answered' | 'no_answer' | 'wrong_number' | 'whatsapp';
export type CallOutcome = 'wants_order' | 'wants_cancel' | 'postpone' | 'not_interested' | 'product_issue' | 'delivery_issue' | 'didnt_know';
export type FinalAction = 'reship' | 'cancel' | 'no_response' | 'followup' | 'escalate';
export type ProblemSource = 'confirmation' | 'carrier' | 'customer' | 'product';

export interface ContactAttempt {
  id: string;
  attemptNumber: number;
  attemptDate: string;
  attemptTime: string;
  agentName: string;
  contactResult: ContactResult;
  callOutcome?: CallOutcome;
  attemptAction?: string;
  notes?: string;
}

export interface ValidationCase {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  country: string;
  city: string;
  productName: string;
  productCount: number;
  orderValue: number;
  currency: string;
  valStatus: ValStatus;
  entryReason: EntryReason;
  lastCarrierStatus: string;
  lastCarrierTimestamp: string;
  carrierName: string;
  assignedAgent: string;
  problemSource?: ProblemSource;
  problemCategory?: string;
  problemNotes?: string;
  finalAction?: FinalAction;
  entryDate: string;
  entryTime: string;
  resolvedDate?: string;
  attempts: ContactAttempt[];
}

// ============ LABELS ============

export const valStatusLabels: Record<ValStatus, string> = {
  pending: 'في الانتظار',
  no_answer: 'لم يرد',
  resolved: 'تم التصرف',
  cancelled: 'كنسل',
};

export const valStatusColors: Record<ValStatus, { bg: string; text: string }> = {
  pending:   { bg: '#FAEEDA', text: '#854F0B' },
  no_answer: { bg: '#E6F1FB', text: '#185FA5' },
  resolved:  { bg: '#EAF3DE', text: '#3B6D11' },
  cancelled: { bg: '#FCEBEB', text: '#A32D2D' },
};

export const entryReasonLabels: Record<EntryReason, string> = {
  returned: 'مرتجع',
  failed: 'فاشل',
  delayed: 'متأخر',
};

export const entryReasonColors: Record<EntryReason, { bg: string; text: string }> = {
  returned: { bg: '#FCEBEB', text: '#A32D2D' },
  failed:   { bg: '#FAEEDA', text: '#854F0B' },
  delayed:  { bg: '#EEEDFE', text: '#534AB7' },
};

export const contactResultLabels: Record<ContactResult, string> = {
  answered: 'رد العميل',
  no_answer: 'لم يرد',
  wrong_number: 'رقم خاطئ / مغلق',
  whatsapp: 'تم التواصل واتساب',
};

export const contactResultColors: Record<ContactResult, { bg: string; text: string }> = {
  answered:     { bg: '#EAF3DE', text: '#3B6D11' },
  no_answer:    { bg: '#E6F1FB', text: '#185FA5' },
  wrong_number: { bg: '#FCEBEB', text: '#A32D2D' },
  whatsapp:     { bg: '#FEF3C7', text: '#B45309' },
};

export const callOutcomeLabels: Record<CallOutcome, string> = {
  wants_order: 'يريد الطلب',
  wants_cancel: 'طلب الإلغاء',
  postpone: 'طلب تأجيل',
  not_interested: 'غير مهتم',
  product_issue: 'مشكلة في المنتج',
  delivery_issue: 'مشكلة في التوصيل',
  didnt_know: 'لم يعلم بالطلب',
};

export const finalActionLabels: Record<FinalAction, string> = {
  reship: 'إعادة شحن',
  cancel: 'كنسل نهائي',
  no_response: 'عميل غير مهتم',
  followup: 'متابعة بموعد',
  escalate: 'تحويل للإدارة',
};

export const problemSourceLabels: Record<ProblemSource, string> = {
  confirmation: 'Confirmation',
  carrier: 'شركة الشحن',
  customer: 'العميل',
  product: 'المنتج',
};

export const problemSourceColors: Record<ProblemSource, { bg: string; text: string }> = {
  confirmation: { bg: '#FEF3C7', text: '#B45309' },
  carrier:      { bg: '#FCEBEB', text: '#A32D2D' },
  customer:     { bg: '#E6F1FB', text: '#185FA5' },
  product:      { bg: '#EEEDFE', text: '#534AB7' },
};

export const problemCategories: Record<ProblemSource, { value: string; label: string }[]> = {
  confirmation: [
    { value: 'wrong_number', label: 'رقم موبايل خاطئ أو ناقص' },
    { value: 'wrong_address', label: 'عنوان خاطئ أو ناقص' },
    { value: 'not_confirmed_properly', label: 'لم يؤكد بشكل صحيح' },
    { value: 'unserious_customer', label: 'عميل غير جاد — تم تأكيده بالخطأ' },
    { value: 'wrong_product_info', label: 'بيانات المنتج خاطئة في التأكيد' },
  ],
  carrier: [
    { value: 'insufficient_attempts', label: 'محاولات توصيل أقل من المطلوب' },
    { value: 'driver_no_call', label: 'السائق لم يتصل قبل التوصيل' },
    { value: 'address_correct_not_reached', label: 'العنوان صحيح لكن لم يصلوا' },
    { value: 'carrier_delay', label: 'تأخير تجاوز المدة المتفق عليها' },
    { value: 'wrong_delivery_location', label: 'أوصلوا لمكان خاطئ' },
  ],
  customer: [
    { value: 'customer_refused', label: 'رفض الاستلام عند الوصول' },
    { value: 'customer_unavailable', label: 'العميل لم يكن متاحاً' },
    { value: 'customer_changed_address', label: 'غيّر العنوان بعد التأكيد' },
    { value: 'customer_cancelled', label: 'طلب الإلغاء بعد الشحن' },
    { value: 'customer_unresponsive', label: 'لا يرد على أي محاولة' },
  ],
  product: [
    { value: 'wrong_item_shipped', label: 'تم شحن منتج غير الذي طُلب' },
    { value: 'damaged_product', label: 'المنتج وصل تالفاً' },
    { value: 'not_as_described', label: 'مختلف عن الوصف في الإعلان' },
    { value: 'missing_items', label: 'ناقص جزء من الطلب' },
  ],
};

// ============ AGENTS ============

export const validationAgents = [
  'يمنى علي', 'أسماء محمد', 'فيروز أحمد', 'مروت سالم', 'مرنا خالد',
];

// ============ MOCK DATA ============

export const validationCases: ValidationCase[] = [
  {
    id: 'vc-001', orderNumber: 'ORD-BXTI', customerName: 'أحمد موسى', customerPhone: '0578314516',
    country: 'المملكة العربية السعودية', city: 'مكة', productName: 'كريم تفتيح البشرة', productCount: 1,
    orderValue: 170, currency: 'ر.س', valStatus: 'pending', entryReason: 'returned',
    lastCarrierStatus: 'returned_to_origin', lastCarrierTimestamp: '2026-03-28 14:30', carrierName: 'أرامكس',
    assignedAgent: 'يمنى علي', entryDate: '2026-03-28', entryTime: '15:00',
    attempts: [],
  },
  {
    id: 'vc-002', orderNumber: 'ORD-CNXM', customerName: 'وليد محمد عثمان', customerPhone: '0536495188',
    country: 'المملكة العربية السعودية', city: 'جازان', productName: 'سيروم فيتامين سي', productCount: 1,
    orderValue: 180, currency: 'ر.س', valStatus: 'no_answer', entryReason: 'failed',
    lastCarrierStatus: 'delivery_failed', lastCarrierTimestamp: '2026-03-27 10:15', carrierName: 'SMSA',
    assignedAgent: 'يمنى علي', entryDate: '2026-03-27', entryTime: '11:00',
    attempts: [
      { id: 'a1', attemptNumber: 1, attemptDate: '2026-03-27', attemptTime: '14:30', agentName: 'يمنى علي', contactResult: 'no_answer', notes: 'الهاتف يرن ولا رد' },
    ],
  },
  {
    id: 'vc-003', orderNumber: 'ORD-Y76T', customerName: 'فهاد جربوع العرجاني', customerPhone: '0509144846',
    country: 'المملكة العربية السعودية', city: 'الرياض', productName: 'زيت أرغان للشعر', productCount: 1,
    orderValue: 180, currency: 'ر.س', valStatus: 'resolved', entryReason: 'returned',
    lastCarrierStatus: 'returned_to_origin', lastCarrierTimestamp: '2026-03-25 09:00', carrierName: 'أرامكس',
    assignedAgent: 'أسماء محمد', problemSource: 'carrier', problemCategory: 'driver_no_call',
    finalAction: 'reship', entryDate: '2026-03-25', entryTime: '10:00', resolvedDate: '2026-03-26',
    attempts: [
      { id: 'a2', attemptNumber: 1, attemptDate: '2026-03-25', attemptTime: '11:00', agentName: 'أسماء محمد', contactResult: 'answered', callOutcome: 'wants_order', attemptAction: 'reship', notes: 'العميل أكد إنه يريد الطلب — السائق لم يتصل' },
    ],
  },
  {
    id: 'vc-004', orderNumber: 'ORD-DRXD', customerName: 'محمد الدلع', customerPhone: '0565488936',
    country: 'المملكة العربية السعودية', city: 'جدة', productName: 'كريم مرطب', productCount: 1,
    orderValue: 180, currency: 'ر.س', valStatus: 'cancelled', entryReason: 'returned',
    lastCarrierStatus: 'returned_to_origin', lastCarrierTimestamp: '2026-03-24 16:00', carrierName: 'DHL',
    assignedAgent: 'يمنى علي', problemSource: 'customer', problemCategory: 'customer_refused',
    finalAction: 'cancel', entryDate: '2026-03-24', entryTime: '17:00', resolvedDate: '2026-03-25',
    attempts: [
      { id: 'a3', attemptNumber: 1, attemptDate: '2026-03-24', attemptTime: '18:00', agentName: 'يمنى علي', contactResult: 'answered', callOutcome: 'wants_cancel', attemptAction: 'cancel', notes: 'العميل طلب الإلغاء — لم يعد يريد المنتج' },
    ],
  },
  {
    id: 'vc-005', orderNumber: 'ORD-7CTX', customerName: 'محمد راما', customerPhone: '0576055257',
    country: 'المملكة العربية السعودية', city: 'مكة', productName: 'عطر عود فاخر', productCount: 1,
    orderValue: 199, currency: 'ر.س', valStatus: 'pending', entryReason: 'failed',
    lastCarrierStatus: 'delivery_failed', lastCarrierTimestamp: '2026-03-29 08:00', carrierName: 'فاستلو',
    assignedAgent: 'أسماء محمد', entryDate: '2026-03-29', entryTime: '09:00',
    attempts: [
      { id: 'a4', attemptNumber: 1, attemptDate: '2026-03-29', attemptTime: '10:00', agentName: 'أسماء محمد', contactResult: 'whatsapp', notes: 'تم إرسال رسالة واتساب — في انتظار الرد' },
    ],
  },
  {
    id: 'vc-006', orderNumber: 'ORD-KM4K', customerName: 'سحبان شيخ', customerPhone: '0598226171',
    country: 'المملكة العربية السعودية', city: 'الرياض', productName: 'سيروم هيالورونيك', productCount: 1,
    orderValue: 199, currency: 'ر.س', valStatus: 'no_answer', entryReason: 'returned',
    lastCarrierStatus: 'returned_to_origin', lastCarrierTimestamp: '2026-03-26 12:00', carrierName: 'J&T Express',
    assignedAgent: 'فيروز أحمد', entryDate: '2026-03-26', entryTime: '13:00',
    attempts: [
      { id: 'a5', attemptNumber: 1, attemptDate: '2026-03-26', attemptTime: '14:00', agentName: 'فيروز أحمد', contactResult: 'no_answer' },
      { id: 'a6', attemptNumber: 2, attemptDate: '2026-03-27', attemptTime: '10:00', agentName: 'فيروز أحمد', contactResult: 'no_answer' },
    ],
  },
  {
    id: 'vc-007', orderNumber: 'ORD-VPVY', customerName: 'عبدالرحمن حيدر الأسمري', customerPhone: '0500723712',
    country: 'المملكة العربية السعودية', city: 'الرياض', productName: 'غسول وجه طبيعي', productCount: 1,
    orderValue: 199, currency: 'ر.س', valStatus: 'pending', entryReason: 'delayed',
    lastCarrierStatus: 'out_for_delivery', lastCarrierTimestamp: '2026-03-26 08:00', carrierName: 'أرامكس',
    assignedAgent: 'مروت سالم', entryDate: '2026-03-29', entryTime: '08:00',
    attempts: [],
  },
  {
    id: 'vc-008', orderNumber: 'ORD-0WWB', customerName: 'حافظ عمر', customerPhone: '0530860850',
    country: 'المملكة العربية السعودية', city: 'الرياض', productName: 'كريم واقي شمس', productCount: 1,
    orderValue: 199, currency: 'ر.س', valStatus: 'resolved', entryReason: 'failed',
    lastCarrierStatus: 'delivery_failed', lastCarrierTimestamp: '2026-03-23 11:00', carrierName: 'SMSA',
    assignedAgent: 'أسماء محمد', problemSource: 'confirmation', problemCategory: 'wrong_address',
    finalAction: 'reship', entryDate: '2026-03-23', entryTime: '12:00', resolvedDate: '2026-03-24',
    attempts: [
      { id: 'a7', attemptNumber: 1, attemptDate: '2026-03-23', attemptTime: '13:00', agentName: 'أسماء محمد', contactResult: 'answered', callOutcome: 'wants_order', attemptAction: 'reship', notes: 'العنوان كان خاطئ — تم تصحيحه وإعادة الشحن' },
    ],
  },
  {
    id: 'vc-009', orderNumber: 'ORD-NEHC', customerName: 'عارف المليكي', customerPhone: '+96655461692',
    country: 'المملكة العربية السعودية', city: 'جدة', productName: 'مجموعة عناية بالبشرة', productCount: 2,
    orderValue: 219, currency: 'ر.س', valStatus: 'cancelled', entryReason: 'returned',
    lastCarrierStatus: 'returned_to_origin', lastCarrierTimestamp: '2026-03-22 15:00', carrierName: 'DHL',
    assignedAgent: 'مرنا خالد', problemSource: 'product', problemCategory: 'not_as_described',
    finalAction: 'cancel', entryDate: '2026-03-22', entryTime: '16:00', resolvedDate: '2026-03-23',
    attempts: [
      { id: 'a8', attemptNumber: 1, attemptDate: '2026-03-22', attemptTime: '17:00', agentName: 'مرنا خالد', contactResult: 'answered', callOutcome: 'product_issue', attemptAction: 'cancel', notes: 'المنتج مختلف عن الوصف — العميل رفض' },
    ],
  },
  {
    id: 'vc-010', orderNumber: 'ORD-DILK', customerName: 'عويش الحاتي', customerPhone: '0537718574',
    country: 'المملكة العربية السعودية', city: 'الرياض', productName: 'قناع وجه كولاجين', productCount: 1,
    orderValue: 199, currency: 'ر.س', valStatus: 'no_answer', entryReason: 'failed',
    lastCarrierStatus: 'delivery_failed', lastCarrierTimestamp: '2026-03-27 09:00', carrierName: 'فاستلو',
    assignedAgent: 'مروت سالم', entryDate: '2026-03-27', entryTime: '10:00',
    attempts: [
      { id: 'a9', attemptNumber: 1, attemptDate: '2026-03-27', attemptTime: '11:00', agentName: 'مروت سالم', contactResult: 'wrong_number' },
      { id: 'a10', attemptNumber: 2, attemptDate: '2026-03-28', attemptTime: '09:00', agentName: 'مروت سالم', contactResult: 'no_answer' },
      { id: 'a11', attemptNumber: 3, attemptDate: '2026-03-29', attemptTime: '10:00', agentName: 'مروت سالم', contactResult: 'no_answer' },
    ],
  },
  {
    id: 'vc-011', orderNumber: 'ORD-QW12', customerName: 'سارة الشمري', customerPhone: '0551234567',
    country: 'المملكة العربية السعودية', city: 'الدمام', productName: 'مجموعة مكياج كاملة', productCount: 3,
    orderValue: 350, currency: 'ر.س', valStatus: 'resolved', entryReason: 'failed',
    lastCarrierStatus: 'delivery_failed', lastCarrierTimestamp: '2026-03-20 14:00', carrierName: 'أرامكس',
    assignedAgent: 'فيروز أحمد', problemSource: 'carrier', problemCategory: 'insufficient_attempts',
    finalAction: 'reship', entryDate: '2026-03-20', entryTime: '15:00', resolvedDate: '2026-03-21',
    attempts: [
      { id: 'a12', attemptNumber: 1, attemptDate: '2026-03-20', attemptTime: '16:00', agentName: 'فيروز أحمد', contactResult: 'answered', callOutcome: 'wants_order', attemptAction: 'reship', notes: 'الشحن حاول مرة وحدة — العميلة تريد الطلب' },
    ],
  },
  {
    id: 'vc-012', orderNumber: 'ORD-RT34', customerName: 'خالد العتيبي', customerPhone: '0567890123',
    country: 'المملكة العربية السعودية', city: 'الطائف', productName: 'عطر رجالي فاخر', productCount: 1,
    orderValue: 280, currency: 'ر.س', valStatus: 'pending', entryReason: 'returned',
    lastCarrierStatus: 'returned_to_origin', lastCarrierTimestamp: '2026-03-29 16:00', carrierName: 'SMSA',
    assignedAgent: 'مرنا خالد', entryDate: '2026-03-29', entryTime: '17:00',
    attempts: [
      { id: 'a13', attemptNumber: 1, attemptDate: '2026-03-30', attemptTime: '09:00', agentName: 'مرنا خالد', contactResult: 'whatsapp', notes: 'تم إرسال رسالة واتساب' },
    ],
  },
];
