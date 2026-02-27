import {
  Download, Upload, ShoppingCart, ArrowLeftRight, Megaphone, Camera, Package,
  CheckCircle2, Truck,
} from "lucide-react";
import type { Transaction, Invoice } from "./WalletTypes";

export const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2026-008',
    period: '20 - 27 فبراير 2026',
    periodType: 'weekly',
    issueDate: '2026/02/27',
    totalAmount: 4850,
    status: 'unpaid',
    services: [
      { name: 'تأكيد الطلبات', details: '320 طلب × 5 ر.س', amount: 1600 },
      { name: 'خدمات الشحن', details: '285 شحنة × 8 ر.س', amount: 2280 },
      { name: 'رسوم COD', details: '5% من 12,400 ر.س', amount: 620 },
      { name: 'رسوم المنصة', details: 'اشتراك أسبوعي', amount: 350 },
    ],
  },
  {
    id: '2',
    invoiceNumber: 'INV-2026-007',
    period: '13 - 19 فبراير 2026',
    periodType: 'weekly',
    issueDate: '2026/02/19',
    totalAmount: 5230,
    status: 'paid',
    services: [
      { name: 'تأكيد الطلبات', details: '380 طلب × 5 ر.س', amount: 1900 },
      { name: 'خدمات الشحن', details: '310 شحنة × 8 ر.س', amount: 2480 },
      { name: 'رسوم COD', details: '5% من 10,000 ر.س', amount: 500 },
      { name: 'رسوم المنصة', details: 'اشتراك أسبوعي', amount: 350 },
    ],
  },
  {
    id: '3',
    invoiceNumber: 'INV-2026-006',
    period: 'يناير 2026',
    periodType: 'monthly',
    issueDate: '2026/02/01',
    totalAmount: 18750,
    status: 'paid',
    services: [
      { name: 'تأكيد الطلبات', details: '1,450 طلب × 5 ر.س', amount: 7250 },
      { name: 'خدمات الشحن', details: '1,180 شحنة × 8 ر.س', amount: 9440 },
      { name: 'رسوم COD', details: '5% من 22,200 ر.س', amount: 1110 },
      { name: 'رسوم المنصة', details: 'اشتراك شهري', amount: 950 },
    ],
  },
];

export const transactions: Transaction[] = [
  { id: '1', type: 'deposit', description: 'شحن رصيد عبر تحويل بنكي', amount: 5000, date: '2026/02/27', time: '10:30 ص', status: 'completed', reference: 'DEP-8821' },
  { id: '2', type: 'purchase', description: 'شراء بضاعة - سماعة بلوتوث ×50 من هلا', amount: -2400, date: '2026/02/26', time: '3:15 م', status: 'completed', reference: 'PUR-4412' },
  { id: '3', type: 'ads_tiktok', description: 'سحب إعلانات تيك توك - حملة فبراير', amount: -1200, date: '2026/02/25', time: '9:00 ص', status: 'completed', reference: 'AD-TT-091' },
  { id: '4', type: 'ads_snapchat', description: 'سحب إعلانات سناب شات - حملة الساعات', amount: -800, date: '2026/02/24', time: '2:00 م', status: 'completed', reference: 'AD-SN-055' },
  { id: '5', type: 'withdrawal', description: 'سحب أرباح إلى الحساب البنكي', amount: -1500, date: '2026/02/23', time: '11:45 ص', status: 'completed', reference: 'WD-3301' },
  { id: '6', type: 'import_goods', description: 'فاند استيراد بضاعة من الصين - دفعة مقدمة', amount: -3500, date: '2026/02/22', time: '5:30 م', status: 'completed', reference: 'IMP-CN-012' },
  { id: '7', type: 'transfer', description: 'تحويل رصيد من محفظة أخرى', amount: 2000, date: '2026/02/21', time: '1:00 م', status: 'completed', reference: 'TRF-7744' },
  { id: '8', type: 'deposit', description: 'شحن رصيد عبر Apple Pay', amount: 3000, date: '2026/02/20', time: '4:15 م', status: 'pending', reference: 'DEP-8820' },
  { id: '9', type: 'purchase', description: 'شراء بضاعة - ساعة ذكية ×30 من هلا', amount: -1800, date: '2026/02/19', time: '10:00 ص', status: 'completed', reference: 'PUR-4411' },
  { id: '10', type: 'withdrawal', description: 'سحب أرباح', amount: -800, date: '2026/02/18', time: '3:30 م', status: 'failed', reference: 'WD-3300' },
];

export const reportData = {
  totalSales: 245890,
  deliveredSales: 189650,
  totalExpenses: 197570,
  netProfit: 48320,
  services: [
    {
      name: 'تأكيد الطلبات',
      items: [
        { label: 'طلب جديد', count: 3456, unitCost: 2, total: 6912 },
        { label: 'طلب مؤكد', count: 3024, unitCost: 3, total: 9072 },
        { label: 'طلب مسلم', count: 2654, unitCost: 5, total: 13270 },
      ],
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      accentBg: 'bg-emerald-500',
    },
    {
      name: 'خدمات الشحن',
      items: [
        { label: 'تجهيز الطلب', count: 0, unitCost: 0, total: 0 },
        { label: 'طلب موصل', count: 2654, unitCost: 8, total: 21232 },
        { label: 'طلب مسترجع', count: 156, unitCost: 12, total: 1872 },
        { label: 'نسبة COD 5%', count: null, unitCost: null, total: 9450 },
      ],
      icon: Truck,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      accentBg: 'bg-blue-500',
    },
  ],
  halaGoods: [
    { label: 'سماعة بلوتوث', count: 200, unitCost: 15, total: 3000 },
    { label: 'ساعة ذكية', count: 150, unitCost: 25, total: 3750 },
    { label: 'شاحن متنقل', count: 100, unitCost: 12, total: 1200 },
  ],
  marketerGoods: [
    { label: 'كفرات جوال - دفعة 1', count: 500, unitCost: 3, total: 1500 },
    { label: 'إكسسوارات - دفعة 2', count: 300, unitCost: 5, total: 1500 },
  ],
  adBalance: {
    tiktok: 12500,
    snapchat: 8200,
    total: 20700,
  },
  goodsBalance: {
    halaBalance: -4200,
    importBalance: -3500,
    total: -7700,
  },
};

export const typeConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
  deposit: { label: 'إيداع', icon: Download, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  withdrawal: { label: 'سحب', icon: Upload, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  purchase: { label: 'شراء بضاعة', icon: ShoppingCart, color: 'text-primary', bg: 'bg-primary/10' },
  transfer: { label: 'تحويل', icon: ArrowLeftRight, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ads_tiktok: { label: 'إعلانات تيك توك', icon: Megaphone, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  ads_snapchat: { label: 'إعلانات سناب شات', icon: Camera, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  import_goods: { label: 'استيراد بضاعة', icon: Package, color: 'text-violet-500', bg: 'bg-violet-500/10' },
};

export const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  completed: { label: 'مكتمل', variant: 'default' },
  pending: { label: 'معلّق', variant: 'secondary' },
  failed: { label: 'فشل', variant: 'destructive' },
  paid: { label: 'مدفوعة', variant: 'default' },
  unpaid: { label: 'غير مدفوعة', variant: 'destructive' },
  partial: { label: 'مدفوعة جزئياً', variant: 'secondary' },
};

export const transactionTypes = [
  { value: 'all', label: 'الكل' },
  { value: 'deposit', label: 'إيداع' },
  { value: 'withdrawal', label: 'سحب' },
  { value: 'purchase', label: 'شراء بضاعة' },
  { value: 'ads', label: 'إعلانات' },
];

export const products = [
  { value: 'all', label: 'كل المنتجات' },
  { value: 'earbuds', label: 'سماعة بلوتوث' },
  { value: 'smartwatch', label: 'ساعة ذكية' },
  { value: 'powerbank', label: 'شاحن متنقل' },
  { value: 'phone_case', label: 'كفر جوال' },
];

export const stores = [
  { value: 'all', label: 'كل المتاجر' },
  { value: 'store_sa', label: 'متجر السعودية' },
  { value: 'store_ae', label: 'متجر الإمارات' },
  { value: 'store_kw', label: 'متجر الكويت' },
];

// Monthly financial data for charts
export const monthlyFinancialData = [
  { month: 'سبتمبر', sales: 180000, expenses: 145000, profit: 35000 },
  { month: 'أكتوبر', sales: 195000, expenses: 158000, profit: 37000 },
  { month: 'نوفمبر', sales: 210000, expenses: 168000, profit: 42000 },
  { month: 'ديسمبر', sales: 235000, expenses: 185000, profit: 50000 },
  { month: 'يناير', sales: 225000, expenses: 178000, profit: 47000 },
  { month: 'فبراير', sales: 245890, expenses: 197570, profit: 48320 },
];

export const expenseBreakdownData = [
  { name: 'تأكيد الطلبات', value: 29254, color: '#10b981' },
  { name: 'خدمات الشحن', value: 32554, color: '#3b82f6' },
  { name: 'بضاعة هلا', value: 7950, color: '#8b5cf6' },
  { name: 'استيراد بضاعة', value: 3000, color: '#a855f7' },
  { name: 'إعلانات تيك توك', value: 12500, color: '#ec4899' },
  { name: 'إعلانات سناب شات', value: 8200, color: '#eab308' },
];
