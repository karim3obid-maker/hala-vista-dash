import { useState } from "react";
import { Calendar, ChevronDown, Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FilterHeaderProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  period: string;
  channel: string;
  country: string;
  shippingCompany: string;
  product: string;
  paymentMethod: string;
  revenueAfterDelivery: boolean;
}

const periods = [
  { value: "today", label: "اليوم" },
  { value: "7days", label: "آخر 7 أيام" },
  { value: "30days", label: "آخر 30 يوم" },
  { value: "custom", label: "مخصص" },
];

const channels = [
  { value: "all", label: "جميع القنوات" },
  { value: "website", label: "الموقع" },
  { value: "app", label: "التطبيق" },
  { value: "whatsapp", label: "واتساب" },
];

const countries = [
  { value: "all", label: "جميع الدول" },
  { value: "sa", label: "السعودية" },
  { value: "ae", label: "الإمارات" },
  { value: "eg", label: "مصر" },
];

const shippingCompanies = [
  { value: "all", label: "جميع شركات الشحن" },
  { value: "aramex", label: "أرامكس" },
  { value: "smsa", label: "SMSA" },
  { value: "dhl", label: "DHL" },
];

const paymentMethods = [
  { value: "all", label: "جميع طرق الدفع" },
  { value: "cod", label: "الدفع عند الاستلام" },
  { value: "card", label: "بطاقة ائتمان" },
  { value: "mada", label: "مدى" },
];

export function FilterHeader({ onFilterChange }: FilterHeaderProps) {
  const [filters, setFilters] = useState<FilterState>({
    period: "30days",
    channel: "all",
    country: "all",
    shippingCompany: "all",
    product: "all",
    paymentMethod: "all",
    revenueAfterDelivery: false,
  });

  const handleFilterChange = (key: keyof FilterState, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      period: "30days",
      channel: "all",
      country: "all",
      shippingCompany: "all",
      product: "all",
      paymentMethod: "all",
      revenueAfterDelivery: false,
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container max-w-[1280px] mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Period Filter */}
          <Select
            value={filters.period}
            onValueChange={(value) => handleFilterChange("period", value)}
          >
            <SelectTrigger className="w-[140px] bg-background">
              <Calendar className="w-4 h-4 ml-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Channel Filter */}
          <Select
            value={filters.channel}
            onValueChange={(value) => handleFilterChange("channel", value)}
          >
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {channels.map((channel) => (
                <SelectItem key={channel.value} value={channel.value}>
                  {channel.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Country Filter */}
          <Select
            value={filters.country}
            onValueChange={(value) => handleFilterChange("country", value)}
          >
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue />
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
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {shippingCompanies.map((company) => (
                <SelectItem key={company.value} value={company.value}>
                  {company.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Payment Method Filter */}
          <Select
            value={filters.paymentMethod}
            onValueChange={(value) => handleFilterChange("paymentMethod", value)}
          >
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Revenue Toggle */}
          <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border">
            <Switch
              id="revenue-toggle"
              checked={filters.revenueAfterDelivery}
              onCheckedChange={(checked) =>
                handleFilterChange("revenueAfterDelivery", checked)
              }
            />
            <Label
              htmlFor="revenue-toggle"
              className="text-sm font-medium cursor-pointer"
            >
              إيراد بعد التسليم
            </Label>
          </div>

          {/* Reset Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="mr-auto text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 ml-2" />
            إعادة تعيين
          </Button>
        </div>
      </div>
    </header>
  );
}
