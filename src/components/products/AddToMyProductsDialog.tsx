import { useState } from "react";
import { Product } from "@/data/productsData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AddToMyProductsDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const countries = [
  { code: "SA", name: "المملكة العربية السعودية", currency: "ر.س" },
  { code: "KW", name: "الكويت", currency: "د.ك" },
  { code: "AE", name: "الإمارات", currency: "د.إ" },
  { code: "BH", name: "البحرين", currency: "د.ب" },
  { code: "OM", name: "عمان", currency: "ر.ع" },
  { code: "QA", name: "قطر", currency: "ر.ق" },
];

export function AddToMyProductsDialog({ product, open, onOpenChange }: AddToMyProductsDialogProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [description, setDescription] = useState(product.description);

  const country = countries.find((c) => c.code === selectedCountry);
  const costInCurrency = product.costPrice.toFixed(2);

  const handleSubmit = () => {
    if (!selectedCountry) {
      toast.error("اختر الدولة أولاً");
      return;
    }
    if (!price1) {
      toast.error("أدخل سعر القطعة");
      return;
    }
    toast.success("تمت إضافة المنتج إلى منتجاتي بنجاح");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-bold text-foreground">تسعير المنتج</DialogTitle>
          <p className="text-sm text-muted-foreground">{product.nameEn}</p>
        </DialogHeader>

        <div className="p-6 space-y-5">
          {/* Country Select */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">اختر البلد</Label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="rounded-xl h-11">
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.name} ({c.currency})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description / Content */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">المحتوى (اختياري)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أضف وصف أو تفاصيل إضافية للمنتج..."
              className="rounded-xl min-h-[120px] resize-none"
            />
          </div>

          {/* Note */}
          <div className="bg-muted/30 rounded-xl p-3 space-y-1 text-right">
            <p className="text-sm font-semibold text-foreground">ملاحظة:</p>
            <p className="text-xs text-muted-foreground">
              يتم حساب سعر التكلفة حسب عملة البلد المختارة{" "}
              <span className="text-destructive font-medium">لا يمكنك كتابة سعر اقل من سعر التكلفة</span>
            </p>
            {country && (
              <p className="text-xs text-primary font-medium mt-1">
                سعر التكلفة: {costInCurrency} {country.currency}
              </p>
            )}
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">سعر ال 3 قطع</Label>
              <Input
                type="number"
                value={price3}
                onChange={(e) => setPrice3(e.target.value)}
                placeholder="0.00"
                className="rounded-xl h-11 text-center"
                min={product.costPrice}
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">سعر القطعتين</Label>
              <Input
                type="number"
                value={price2}
                onChange={(e) => setPrice2(e.target.value)}
                placeholder="0.00"
                className="rounded-xl h-11 text-center"
                min={product.costPrice}
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">سعر القطعة</Label>
              <Input
                type="number"
                value={price1}
                onChange={(e) => setPrice1(e.target.value)}
                placeholder="0.00"
                className="rounded-xl h-11 text-center"
                min={product.costPrice}
                step="0.01"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            className="w-full rounded-xl h-12 bg-gradient-to-l from-primary to-accent text-primary-foreground font-bold text-base"
          >
            إضافة إلى منتجاتي
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
