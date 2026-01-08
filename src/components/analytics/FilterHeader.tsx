import { useState } from "react";
import { Calendar, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterHeaderProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  period: string;
  store: string;
  product: string;
  seller: string;
  confirmAgent: string;
  paymentMethod: string;
  country: string;
  shippingCompany: string;
}

const periods = [
  { value: "today", label: "اليوم" },
  { value: "yesterday", label: "أمس" },
  { value: "7days", label: "آخر 7 أيام" },
  { value: "30days", label: "آخر 30 يوم" },
  { value: "thisMonth", label: "هذا الشهر" },
  { value: "lastMonth", label: "الشهر الماضي" },
  { value: "custom", label: "فترة مخصصة" },
];

const stores = [
  { value: "all", label: "جميع المتاجر" },
  { value: "store1", label: "متجر الرياض" },
  { value: "store2", label: "متجر جدة" },
  { value: "store3", label: "متجر الدمام" },
];

const products = [
  { value: "all", label: "جميع المنتجات" },
  { value: "prod1", label: "حقيبة جلد طبيعي" },
  { value: "prod2", label: "ساعة كلاسيكية" },
  { value: "prod3", label: "عطر فاخر" },
  { value: "prod4", label: "نظارة شمسية" },
];

const sellers = [
  { value: "all", label: "جميع البائعين" },
  { value: "seller1", label: "أحمد محمد" },
  { value: "seller2", label: "سارة علي" },
  { value: "seller3", label: "خالد عبدالله" },
];

const confirmAgents = [
  { value: "all", label: "جميع الأيجنتس" },
  { value: "agent1", label: "محمد أحمد" },
  { value: "agent2", label: "فاطمة حسن" },
  { value: "agent3", label: "عمر سعيد" },
];

const paymentMethods = [
  { value: "all", label: "جميع طرق الدفع" },
  { value: "cod", label: "الدفع عند الاستلام" },
  { value: "card", label: "بطاقة ائتمان" },
  { value: "mada", label: "مدى" },
  { value: "stcpay", label: "STC Pay" },
  { value: "tabby", label: "تابي" },
];

const countries = [
  { value: "all", label: "جميع الدول" },
  { value: "sa", label: "السعودية" },
  { value: "ae", label: "الإمارات" },
  { value: "eg", label: "مصر" },
  { value: "kw", label: "الكويت" },
];

const shippingCompanies = [
  { value: "all", label: "جميع شركات الشحن" },
  { value: "aramex", label: "أرامكس" },
  { value: "smsa", label: "SMSA" },
  { value: "dhl", label: "DHL" },
  { value: "zajil", label: "زاجل" },
];

export function FilterHeader({ onFilterChange }: FilterHeaderProps) {
  const [filters, setFilters] = useState<FilterState>({
    period: "30days",
    store: "all",
    product: "all",
    seller: "all",
    confirmAgent: "all",
    paymentMethod: "all",
    country: "all",
    shippingCompany: "all",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      period: "30days",
      store: "all",
      product: "all",
      seller: "all",
      confirmAgent: "all",
      paymentMethod: "all",
      country: "all",
      shippingCompany: "all",
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container max-w-[1280px] mx-auto px-6 py-4">
        {/* First Row - Main Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {/* Period Filter - Larger with icon */}
          <Select
            value={filters.period}
            onValueChange={(value) => handleFilterChange("period", value)}
          >
            <SelectTrigger className="w-[180px] h-11 bg-background border-border rounded-xl">
              <Calendar className="w-4 h-4 ml-2 text-muted-foreground" />
              <SelectValue placeholder="اختر الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Store Filter */}
          <Select
            value={filters.store}
            onValueChange={(value) => handleFilterChange("store", value)}
          >
            <SelectTrigger className="w-[150px] h-11 bg-background border-border rounded-xl">
              <SelectValue placeholder="اختر المتجر..." />
            </SelectTrigger>
            <SelectContent>
              {stores.map((store) => (
                <SelectItem key={store.value} value={store.value}>
                  {store.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Product Filter */}
          <Select
            value={filters.product}
            onValueChange={(value) => handleFilterChange("product", value)}
          >
            <SelectTrigger className="w-[160px] h-11 bg-background border-border rounded-xl">
              <SelectValue placeholder="اختر المنتج..." />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.value} value={product.value}>
                  {product.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Seller Filter */}
          <Select
            value={filters.seller}
            onValueChange={(value) => handleFilterChange("seller", value)}
          >
            <SelectTrigger className="w-[150px] h-11 bg-background border-border rounded-xl">
              <SelectValue placeholder="اختر البائع..." />
            </SelectTrigger>
            <SelectContent>
              {sellers.map((seller) => (
                <SelectItem key={seller.value} value={seller.value}>
                  {seller.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Confirmation Agent Filter */}
          <Select
            value={filters.confirmAgent}
            onValueChange={(value) => handleFilterChange("confirmAgent", value)}
          >
            <SelectTrigger className="w-[160px] h-11 bg-background border-border rounded-xl">
              <SelectValue placeholder="أيجنت التأكيد..." />
            </SelectTrigger>
            <SelectContent>
              {confirmAgents.map((agent) => (
                <SelectItem key={agent.value} value={agent.value}>
                  {agent.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Second Row - Additional Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Payment Method Filter */}
          <Select
            value={filters.paymentMethod}
            onValueChange={(value) => handleFilterChange("paymentMethod", value)}
          >
            <SelectTrigger className="w-[160px] h-11 bg-background border-border rounded-xl">
              <SelectValue placeholder="طريقة الدفع..." />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Country Filter */}
          <Select
            value={filters.country}
            onValueChange={(value) => handleFilterChange("country", value)}
          >
            <SelectTrigger className="w-[140px] h-11 bg-background border-border rounded-xl">
              <SelectValue placeholder="اختر الدولة..." />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Shipping Company Filter */}
          <Select
            value={filters.shippingCompany}
            onValueChange={(value) => handleFilterChange("shippingCompany", value)}
          >
            <SelectTrigger className="w-[170px] h-11 bg-background border-border rounded-xl">
              <SelectValue placeholder="شركة الشحن..." />
            </SelectTrigger>
            <SelectContent>
              {shippingCompanies.map((company) => (
                <SelectItem key={company.value} value={company.value}>
                  {company.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Reset Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-11 px-4 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl mr-auto"
          >
            <RotateCcw className="w-4 h-4 ml-2" />
            إعادة تعيين
          </Button>
        </div>
      </div>
    </header>
  );
}
