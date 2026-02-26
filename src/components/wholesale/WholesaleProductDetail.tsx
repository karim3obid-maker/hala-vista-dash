import { useState } from "react";
import { Product } from "@/data/productsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Package,
  Weight,
  Ruler,
  Hash,
  MapPin,
  ShoppingCart,
  AlertCircle,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Props {
  product: Product;
  onBack: () => void;
}

export function WholesaleProductDetail({ product, onBack }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [copiedSku, setCopiedSku] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  const minOrder = product.minOrder || 10;

  const handleCopySku = () => {
    navigator.clipboard.writeText(product.sku);
    setCopiedSku(true);
    setTimeout(() => setCopiedSku(false), 2000);
  };

  const handleSubmit = () => {
    if (!selectedCountry) {
      toast({ title: "اختر الدولة", description: "يرجى اختيار دولة الشحن", variant: "destructive" });
      return;
    }
    const qty = parseInt(quantity);
    if (!qty || qty < minOrder) {
      toast({ title: "كمية غير صحيحة", description: `الحد الأدنى للطلب ${minOrder} قطعة`, variant: "destructive" });
      return;
    }

    toast({
      title: "✅ تم إرسال الطلب بنجاح",
      description: `طلب ${qty} قطعة من ${product.name} إلى ${selectedCountry}`,
    });

    setSelectedCountry("");
    setQuantity("");
    setNotes("");
    setOrderOpen(false);
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto" dir="rtl">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        العودة للمنتجات
      </button>

      {/* Product Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted/20 border border-border">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-accent ring-2 ring-accent/20" : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{product.nameEn}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-accent">{product.costPrice.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">{product.currency} / للقطعة</span>
          </div>

          {/* MOQ & Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-xl px-4 py-3">
              <Package className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">أقل طلب</p>
                <p className="text-lg font-bold text-accent">{minOrder} قطعة</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 rounded-xl px-4 py-3 border ${product.stock > 0 ? "bg-success/10 border-success/20" : "bg-destructive/10 border-destructive/20"}`}>
              <Package className={`w-5 h-5 ${product.stock > 0 ? "text-success" : "text-destructive"}`} />
              <div>
                <p className="text-xs text-muted-foreground">الكمية المتوفرة</p>
                <p className={`text-lg font-bold ${product.stock > 0 ? "text-success" : "text-destructive"}`}>
                  {product.stock > 0 ? `${product.stock} قطعة` : "نفذ المخزون"}
                </p>
              </div>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground">SKU</p>
                <p className="text-xs font-mono font-medium truncate">{product.sku}</p>
              </div>
              <button onClick={handleCopySku} className="text-muted-foreground hover:text-accent">
                {copiedSku ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
              <Weight className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-[10px] text-muted-foreground">الوزن</p>
                <p className="text-xs font-medium">{product.weight}</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3 col-span-2">
              <Ruler className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-[10px] text-muted-foreground">الأبعاد</p>
                <p className="text-xs font-medium">{product.dimensions}</p>
              </div>
            </div>
          </div>

          {/* Order Button */}
          <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={product.stock === 0}
                className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-3 text-sm font-bold"
              >
                <ShoppingCart className="w-4 h-4 ml-2" />
                اطلب المنتج
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md" dir="rtl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-accent">
                  <ShoppingCart className="w-5 h-5" />
                  طلب {product.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-sm">الدولة</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.countries.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">الكمية</Label>
                  <Input
                    type="number"
                    placeholder={`الحد الأدنى ${minOrder}`}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={minOrder}
                    className="rounded-xl"
                  />
                  {quantity && parseInt(quantity) < minOrder && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      الحد الأدنى {minOrder} قطعة
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">ملاحظات (اختياري)</Label>
                  <Textarea
                    placeholder="أضف أي ملاحظات على الطلب..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="rounded-xl min-h-[80px]"
                    maxLength={500}
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={product.stock === 0}
                  className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-2.5 text-sm font-bold"
                >
                  <ShoppingCart className="w-4 h-4 ml-2" />
                  إرسال الطلب
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Countries & Stock */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-bold text-foreground">الدول المتاحة والاستوك</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {product.countries.map((country) => (
            <div
              key={country}
              className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-accent/30 transition-colors"
            >
              <span className="text-sm font-medium text-foreground">{country}</span>
              <Badge className={`text-[10px] ${product.stock > 0 ? "bg-success/15 text-success border-success/30" : "bg-destructive/15 text-destructive border-destructive/30"}`}>
                {product.stock > 0 ? "متاح" : "نفذ"}
              </Badge>
            </div>
          ))}
        </div>
        {product.stock > 0 && (
          <p className="text-xs text-muted-foreground">
            الاستوك الكلي: <span className="font-bold text-foreground">{product.stock}</span> قطعة
          </p>
        )}
      </div>

      {/* Description */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-bold text-foreground">وصف المنتج</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}
