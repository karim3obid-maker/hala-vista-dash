export type OrderStatus = 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'paid' | 'unpaid' | 'refunded';

export interface OrderProduct {
  name: string;
  variant?: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  by: string;
  date: string;
  time: string;
  icon: 'create' | 'call' | 'whatsapp' | 'shipping' | 'delivered' | 'cancelled';
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    ordersCount: number;
    address: {
      city: string;
      district: string;
      street: string;
      country: string;
    };
  };
  products: OrderProduct[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  subtotal: number;
  shipping: number | 'free';
  discount?: { code: string; amount: number };
  total: number;
  date: string;
  time: string;
  confirmationMethod: string;
  upsell: string;
  contactAttempts: number;
  totalActivities: number;
  cancellationReason?: string;
  activityLog: ActivityLog[];
}

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'FHD-100013',
    customer: {
      name: 'بدر الرشيدي',
      phone: '0559998877',
      ordersCount: 1,
      address: {
        city: 'حائل',
        district: 'حي المحطة',
        street: 'شارع الملك سعود',
        country: 'المملكة العربية السعودية',
      },
    },
    products: [
      { name: 'مكبر صوت بلوتوث محمول', quantity: 1, price: 379, image: '' },
    ],
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'بطاقة ائتمان',
    subtotal: 379,
    shipping: 'free',
    discount: { code: 'FAHD50', amount: 121 },
    total: 400,
    date: '2026/02/25',
    time: '11:30 ص',
    confirmationMethod: 'لم يتم التواصل',
    upsell: 'لم يُعرض',
    contactAttempts: 0,
    totalActivities: 2,
    activityLog: [
      { id: '1', action: 'تم إنشاء الطلب', by: 'النظام', date: '25 فبراير', time: '11:30 ص', icon: 'create' },
      { id: '2', action: 'طلب جديد بانتظار التواصل - كوبون FAHD50 مستخدم', by: 'النظام', date: '25 فبراير', time: '11:30 ص', icon: 'create' },
    ],
  },
  {
    id: '2',
    orderNumber: 'FHD-100014',
    customer: {
      name: 'أروى العمري',
      phone: '0542225566',
      ordersCount: 1,
      address: {
        city: 'نجران',
        district: 'حي الفهد',
        street: 'شارع الملك عبدالعزيز',
        country: 'المملكة العربية السعودية',
      },
    },
    products: [
      { name: 'ساعة ذكية سبورت فت', variant: 'اللون: أسود', quantity: 1, price: 199, image: '' },
    ],
    status: 'cancelled',
    paymentStatus: 'paid',
    paymentMethod: 'تحويل بنكي',
    subtotal: 199,
    shipping: 'free',
    total: 199,
    date: '2026/02/16',
    time: '1:45 م',
    confirmationMethod: 'مكالمة هاتفية',
    upsell: 'لم يُعرض',
    contactAttempts: 4,
    totalActivities: 7,
    cancellationReason: 'العميل لم يرد على المكالمات بعد 4 محاولات',
    activityLog: [
      { id: '1', action: 'تم إنشاء الطلب', by: 'النظام', date: '16 فبراير', time: '1:45 م', icon: 'create' },
      { id: '2', action: 'محاولة اتصال أولى - لم يرد', by: 'أحمد', date: '16 فبراير', time: '2:30 م', icon: 'call' },
      { id: '3', action: 'محاولة اتصال ثانية - لم يرد', by: 'أحمد', date: '16 فبراير', time: '3:50 م', icon: 'call' },
      { id: '4', action: 'تم إرسال رسالة واتساب - لم يقرأها', by: 'أحمد', date: '16 فبراير', time: '4:05 م', icon: 'whatsapp' },
      { id: '5', action: 'محاولة اتصال ثالثة - لم يرد', by: 'سارة', date: '17 فبراير', time: '10:00 ص', icon: 'call' },
      { id: '6', action: 'محاولة اتصال رابعة - لم يرد', by: 'سارة', date: '17 فبراير', time: '2:00 م', icon: 'call' },
      { id: '7', action: 'تم إلغاء الطلب - العميل لم يرد', by: 'النظام', date: '17 فبراير', time: '5:00 م', icon: 'cancelled' },
    ],
  },
  {
    id: '3',
    orderNumber: 'FHD-100015',
    customer: {
      name: 'محمد الغامدي',
      phone: '0501234567',
      ordersCount: 3,
      address: {
        city: 'جدة',
        district: 'حي الحمراء',
        street: 'شارع فلسطين',
        country: 'المملكة العربية السعودية',
      },
    },
    products: [
      { name: 'سماعة أذن لاسلكية', quantity: 2, price: 149 },
      { name: 'شاحن سريع 65W', quantity: 1, price: 89 },
    ],
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'بطاقة ائتمان',
    subtotal: 387,
    shipping: 25,
    total: 412,
    date: '2026/02/20',
    time: '3:15 م',
    confirmationMethod: 'مكالمة هاتفية',
    upsell: 'تم العرض',
    contactAttempts: 1,
    totalActivities: 5,
    activityLog: [
      { id: '1', action: 'تم إنشاء الطلب', by: 'النظام', date: '20 فبراير', time: '3:15 م', icon: 'create' },
      { id: '2', action: 'تم التأكيد عبر مكالمة هاتفية', by: 'سارة', date: '20 فبراير', time: '4:00 م', icon: 'call' },
      { id: '3', action: 'تم تجهيز الطلب', by: 'النظام', date: '21 فبراير', time: '9:00 ص', icon: 'create' },
      { id: '4', action: 'تم الشحن - رقم التتبع: SA123456', by: 'النظام', date: '21 فبراير', time: '2:00 م', icon: 'shipping' },
      { id: '5', action: 'تم التوصيل', by: 'النظام', date: '23 فبراير', time: '11:00 ص', icon: 'delivered' },
    ],
  },
  {
    id: '4',
    orderNumber: 'FHD-100016',
    customer: {
      name: 'نورة السبيعي',
      phone: '0551112233',
      ordersCount: 2,
      address: {
        city: 'الرياض',
        district: 'حي النزهة',
        street: 'شارع الأمير سلطان',
        country: 'المملكة العربية السعودية',
      },
    },
    products: [
      { name: 'حقيبة يد جلدية فاخرة', variant: 'اللون: بني', quantity: 1, price: 450 },
    ],
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Apple Pay',
    subtotal: 450,
    shipping: 'free',
    total: 450,
    date: '2026/02/24',
    time: '10:20 ص',
    confirmationMethod: 'واتساب',
    upsell: 'تم القبول',
    contactAttempts: 1,
    totalActivities: 4,
    activityLog: [
      { id: '1', action: 'تم إنشاء الطلب', by: 'النظام', date: '24 فبراير', time: '10:20 ص', icon: 'create' },
      { id: '2', action: 'تم التأكيد عبر واتساب', by: 'أحمد', date: '24 فبراير', time: '11:00 ص', icon: 'whatsapp' },
      { id: '3', action: 'تم تجهيز الطلب', by: 'النظام', date: '24 فبراير', time: '3:00 م', icon: 'create' },
      { id: '4', action: 'تم الشحن', by: 'النظام', date: '25 فبراير', time: '9:00 ص', icon: 'shipping' },
    ],
  },
  {
    id: '5',
    orderNumber: 'FHD-100017',
    customer: {
      name: 'فهد العتيبي',
      phone: '0509876543',
      ordersCount: 5,
      address: {
        city: 'الدمام',
        district: 'حي الشاطئ',
        street: 'شارع الكورنيش',
        country: 'المملكة العربية السعودية',
      },
    },
    products: [
      { name: 'كاميرا مراقبة ذكية', quantity: 3, price: 199 },
    ],
    status: 'processing',
    paymentStatus: 'unpaid',
    paymentMethod: 'الدفع عند الاستلام',
    subtotal: 597,
    shipping: 30,
    total: 627,
    date: '2026/02/26',
    time: '8:45 ص',
    confirmationMethod: 'مكالمة هاتفية',
    upsell: 'لم يُعرض',
    contactAttempts: 1,
    totalActivities: 2,
    activityLog: [
      { id: '1', action: 'تم إنشاء الطلب', by: 'النظام', date: '26 فبراير', time: '8:45 ص', icon: 'create' },
      { id: '2', action: 'تم التأكيد عبر مكالمة', by: 'سارة', date: '26 فبراير', time: '9:30 ص', icon: 'call' },
    ],
  },
];
