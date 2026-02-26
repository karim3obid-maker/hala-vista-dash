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
import { Plus, Trash2, Image, X } from "lucide-react";

interface AddToMyProductsDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Offer {
  id: number;
  quantity: string;
  price: string;
}

const countries = [
  { code: "SA", name: "المملكة العربية السعودية", currency: "ر.س", rate: 3.75 },
  { code: "KW", name: "الكويت", currency: "د.ك", rate: 0.31 },
  { code: "AE", name: "الإمارات", currency: "د.إ", rate: 3.67 },
  { code: "BH", name: "البحرين", currency: "د.ب", rate: 0.38 },
  { code: "OM", name: "عمان", currency: "ر.ع", rate: 0.38 },
  { code: "QA", name: "قطر", currency: "ر.ق", rate: 3.64 },
];

let nextId = 1;

export function AddToMyProductsDialog({ product, open, onOpenChange }: AddToMyProductsDialogProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [description, setDescription] = useState(product.description);
  const [offers, setOffers] = useState<Offer[]>([{ id: 0, quantity: "1", price: "" }]);
  const [selectedImages, setSelectedImages] = useState<string[]>([...product.images]);
  const [customImages, setCustomImages] = useState<string[]>([]);

  const country = countries.find((c) => c.code === selectedCountry);
  const costInCurrency = product.costPrice.toFixed(2);

  const addOffer = () => {
    setOffers([...offers, { id: nextId++, quantity: "", price: "" }]);
  };

  const removeOffer = (id: number) => {
    if (offers.length <= 1) return;
    setOffers(offers.filter((o) => o.id !== id));
  };

  const updateOffer = (id: number, field: "quantity" | "price", value: string) => {
    setOffers(offers.map((o) => (o.id === id ? { ...o, [field]: value } : o)));
  };

  const handleSubmit = () => {
    if (!selectedCountry) {
      toast.error("اختر الدولة أولاً");
      return;
    }
    const firstOffer = offers[0];
    if (!firstOffer.quantity || !firstOffer.price) {
      toast.error("أدخل عدد القطع والسعر للعرض الأول على الأقل");
      return;
    }
    toast.success("تمت إضافة المنتج إلى منتجاتي بنجاح");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-bold text-foreground">تسعير المنتج</DialogTitle>
          <p className="text-sm text-muted-foreground">{product.nameEn}</p>
        </DialogHeader>

        <div className="p-6 space-y-5">
          {/* Cost Price Banner */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-l from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                سعر التكلفة بعملة الدولة {country ? `(${country.currency})` : ""}
              </p>
              <span className="text-2xl font-bold text-primary">
                {country ? (product.costPrice * (country.rate || 1)).toFixed(2) : "—"}
              </span>
              {country && <span className="text-sm text-primary mr-1">{country.currency}</span>}
            </div>
            <div className="bg-card rounded-xl border border-border p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">سعر التكلفة بالدولار</p>
              <span className="text-2xl font-bold text-foreground">{product.costPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground mr-1">$</span>
            </div>
          </div>

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

          {/* Product Images */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">صور المنتج</Label>
            <div className="flex flex-wrap gap-2">
              {product.images.map((img, i) => {
                const isSelected = selectedImages.includes(img);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() =>
                      setSelectedImages(
                        isSelected
                          ? selectedImages.filter((s) => s !== img)
                          : [...selectedImages, img]
                      )
                    }
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      isSelected
                        ? "border-primary shadow-md ring-2 ring-primary/20"
                        : "border-border opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-[10px] font-bold">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-muted-foreground">اضغط على الصورة لتحديدها أو إلغاء تحديدها</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">وصف المنتج</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أضف وصف تفصيلي للمنتج يشمل المميزات والمواصفات..."
              className="rounded-xl min-h-[140px] resize-y leading-7"
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

          {/* Dynamic Offers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOffer}
                className="rounded-xl gap-1 text-xs border-primary text-primary hover:bg-primary/10"
              >
                <Plus className="w-3.5 h-3.5" />
                إضافة عرض
              </Button>
              <Label className="text-sm font-medium text-foreground">العروض</Label>
            </div>

            <div className="space-y-2">
              {offers.map((offer, index) => (
                <div key={offer.id} className="flex items-center gap-2">
                  {offers.length > 1 && (
                    <button
                      onClick={() => removeOffer(offer.id)}
                      className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      type="number"
                      value={offer.price}
                      onChange={(e) => updateOffer(offer.id, "price", e.target.value)}
                      placeholder="السعر"
                      className="rounded-xl h-10 text-center flex-1"
                      min={product.costPrice}
                      step="0.01"
                    />
                    <Input
                      type="number"
                      value={offer.quantity}
                      onChange={(e) => updateOffer(offer.id, "quantity", e.target.value)}
                      placeholder="العدد"
                      className="rounded-xl h-10 text-center w-24"
                      min="1"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 w-16 text-right">
                    {offer.quantity ? `${offer.quantity} قطعة` : `عرض ${index + 1}`}
                  </span>
                </div>
              ))}
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
