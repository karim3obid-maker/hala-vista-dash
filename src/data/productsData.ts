export interface Product {
  id: string;
  name: string;
  nameEn: string;
  images: string[];
  sku: string;
  costPrice: number;
  recommendedPrice: number;
  weight: string;
  dimensions: string;
  category: string;
  countries: string[];
  stock: number;
  status: "متاح" | "غير متاح";
  dateAdded: string;
  lastUpdated: string;
  description: string;
  currency: string;
  minOrder?: number;
}

export const productsData: Product[] = [
  {
    id: "1",
    name: "جهاز ألعاب محمول ريترو",
    nameEn: "Game Consoles (test)",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600",
      "https://images.unsplash.com/photo-1585620385456-4a0a5e906fa1?w=600",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600",
    ],
    sku: "cMKOCPBI",
    costPrice: 2.78,
    recommendedPrice: 2.78,
    weight: "1.000 كجم",
    dimensions: "1.00 × 1.00 × 1.00 سم",
    category: "إلكترونيات",
    countries: ["المملكة العربية السعودية", "الكويت"],
    stock: 50,
    status: "متاح",
    dateAdded: "2036/2/15",
    lastUpdated: "2036/2/15",
    description: "جهاز ألعاب محمول بتصميم فليب توب كلاسيكي (ريترو). شاشة IPS عالية الوضوح مقاس 3.0 بوصة، بدقة 320×240. يحتوي على آلاف الألعاب الكلاسيكية مثل ألعاب الأركيد و GBA و FC. بطارية ليثيوم قابلة للشحن بسعة 1020mAh.",
    currency: "$",
  },
  {
    id: "2",
    name: "سماعات بلوتوث لاسلكية",
    nameEn: "Wireless Bluetooth Earbuds",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600",
    ],
    sku: "BT-EAR-01",
    costPrice: 5.50,
    recommendedPrice: 12.99,
    weight: "0.150 كجم",
    dimensions: "6.00 × 4.00 × 3.00 سم",
    category: "إلكترونيات",
    countries: ["المملكة العربية السعودية", "الإمارات"],
    stock: 200,
    status: "متاح",
    dateAdded: "2036/1/20",
    lastUpdated: "2036/2/10",
    description: "سماعات بلوتوث 5.3 لاسلكية بالكامل مع علبة شحن. جودة صوت عالية مع خاصية إلغاء الضوضاء. عمر البطارية حتى 6 ساعات.",
    currency: "$",
  },
  {
    id: "3",
    name: "حافظة هاتف سيليكون",
    nameEn: "Silicone Phone Case",
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600",
    ],
    sku: "PH-CASE-03",
    costPrice: 0.85,
    recommendedPrice: 3.99,
    weight: "0.050 كجم",
    dimensions: "15.00 × 7.50 × 1.00 سم",
    category: "إكسسوارات",
    countries: ["المملكة العربية السعودية"],
    stock: 500,
    status: "متاح",
    dateAdded: "2036/1/05",
    lastUpdated: "2036/2/01",
    description: "حافظة سيليكون ناعمة الملمس متوافقة مع أحدث هواتف آيفون وسامسونج. حماية كاملة من الصدمات والخدوش بتصميم أنيق.",
    currency: "$",
  },
  {
    id: "4",
    name: "شاحن سيارة سريع",
    nameEn: "Fast Car Charger",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600",
    ],
    sku: "CAR-CHG-04",
    costPrice: 1.20,
    recommendedPrice: 4.50,
    weight: "0.080 كجم",
    dimensions: "6.00 × 3.00 × 3.00 سم",
    category: "إلكترونيات",
    countries: ["المملكة العربية السعودية", "الكويت", "الإمارات"],
    stock: 0,
    status: "غير متاح",
    dateAdded: "2035/12/10",
    lastUpdated: "2036/1/25",
    description: "شاحن سيارة بمنفذين USB-C و USB-A مع دعم الشحن السريع حتى 45 واط. متوافق مع جميع الأجهزة.",
    currency: "$",
  },
  {
    id: "5",
    name: "ساعة ذكية رياضية",
    nameEn: "Smart Sports Watch",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600",
    ],
    sku: "SW-SPT-05",
    costPrice: 8.00,
    recommendedPrice: 19.99,
    weight: "0.120 كجم",
    dimensions: "4.50 × 4.50 × 1.20 سم",
    category: "إلكترونيات",
    countries: ["المملكة العربية السعودية", "الإمارات", "البحرين"],
    stock: 75,
    status: "متاح",
    dateAdded: "2036/2/01",
    lastUpdated: "2036/2/20",
    description: "ساعة ذكية مقاومة للماء IP68 مع شاشة AMOLED 1.4 بوصة. تتبع النشاط الرياضي ومعدل ضربات القلب والنوم. بطارية تدوم حتى 7 أيام.",
    currency: "$",
  },
  {
    id: "6",
    name: "مصباح LED ذكي",
    nameEn: "Smart LED Bulb",
    images: [
      "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600",
    ],
    sku: "LED-SMT-06",
    costPrice: 2.00,
    recommendedPrice: 6.99,
    weight: "0.200 كجم",
    dimensions: "6.00 × 6.00 × 12.00 سم",
    category: "منزلية",
    countries: ["المملكة العربية السعودية"],
    stock: 150,
    status: "متاح",
    dateAdded: "2036/1/15",
    lastUpdated: "2036/2/05",
    description: "مصباح LED ذكي يتحكم عبر الواي فاي وتطبيق الهاتف. 16 مليون لون مع جدولة زمنية وتوافق مع أليكسا وجوجل هوم.",
    currency: "$",
  },
];
