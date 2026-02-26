import { useState } from "react";
import { Product } from "@/data/productsData";
import { AddToMyProductsDialog } from "@/components/products/AddToMyProductsDialog";
import {
  ArrowRight,
  Star,
  Package,
  Ruler,
  Tag,
  Globe,
  Calendar,
  RefreshCw,
  ShoppingCart,
  Store,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Box,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const totalPrice = (product.costPrice * quantity).toFixed(2);

  const nextImage = () => setSelectedImage((i) => (i + 1) % product.images.length);
  const prevImage = () => setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length);

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-hidden flex flex-col">
      {/* Top Bar - Quantity & Price */}
      <div className="bg-gradient-to-l from-primary/10 via-accent/5 to-transparent border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-card rounded-xl border border-border px-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-foreground">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">{totalPrice}</span>
            <span className="text-sm text-muted-foreground">{product.currency}</span>
          </div>
          <span className="text-xs text-muted-foreground">({quantity} قطعة)</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">{product.name}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-row-reverse">
        {/* Right Side - Images & Description */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Main Image */}
          <div className="relative bg-card rounded-2xl border border-border overflow-hidden aspect-[4/3] max-h-[55vh]">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center justify-center gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedImage ? "border-primary shadow-md scale-105" : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
            <h2 className="text-base font-bold text-foreground">الوصف التفصيلي:</h2>
            <p className="text-sm leading-7 text-muted-foreground">{product.description}</p>
          </div>
        </div>

        {/* Left Side - Product Info */}
        <div className="w-[420px] shrink-0 border-r border-border overflow-y-auto p-5 space-y-4">
          {/* Stock Badge */}
          <div className="bg-gradient-to-l from-success/10 to-transparent rounded-xl p-3 flex items-center justify-between">
            <span className="font-bold text-foreground">{product.stock}</span>
            <div className="flex items-center gap-2 text-success">
              <span className="text-sm font-medium">المخزون المتاح</span>
              <Box className="w-5 h-5" />
            </div>
          </div>

          {/* SKU */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">SKUs:</p>
            <Badge variant="outline" className="font-mono text-xs">
              {product.sku}
            </Badge>
          </div>

          {/* Prices */}
          <div className="space-y-3">
            <div className="bg-card rounded-xl border border-border p-3 flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-foreground">{product.costPrice.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">{product.currency}</span>
              </div>
              <span className="text-sm text-muted-foreground">سعر التكلفة:</span>
            </div>

            <div className="bg-gradient-to-l from-accent/10 to-accent/5 rounded-xl border border-accent/20 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-foreground">{product.recommendedPrice.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">{product.currency}</span>
                </div>
              </div>
              <span className="text-sm text-accent font-medium">السعر الموصى به:</span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <DetailRow icon={Package} label="الوزن" value={product.weight} />
            <DetailRow icon={Ruler} label="الأبعاد" value={product.dimensions} />
            <div className="flex items-center justify-between py-2">
              <Badge className="bg-primary/10 text-primary border-0 text-xs">{product.category}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>التصنيف:</span>
                <Tag className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-wrap gap-1">
                {product.countries.map((c) => (
                  <Badge key={c} variant="secondary" className="text-[10px]">
                    {c}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                <span>الدول:</span>
                <Globe className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t border-border pt-3 space-y-2">
            <p className="text-sm font-semibold text-foreground">معلومات إضافية:</p>
            <DetailRow icon={Calendar} label="تاريخ الإضافة" value={product.dateAdded} />
            <DetailRow icon={RefreshCw} label="آخر تحديث" value={product.lastUpdated} />
            <div className="flex items-center justify-between py-2">
              <Badge className={`text-xs border-0 ${product.status === "متاح" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                {product.status}
              </Badge>
              <span className="text-sm text-muted-foreground">الحالة:</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button
              onClick={() => setShowAddDialog(true)}
              className="w-full rounded-xl h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
            >
              <span>إضافة الى منتجاتي</span>
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => toast.success("تمت إضافة المنتج إلى هلا ستور")}
              variant="outline"
              className="w-full rounded-xl h-11 border-accent text-accent hover:bg-accent/10 font-semibold gap-2"
            >
              <span>إضافة الى هلا ستور</span>
              <Store className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <AddToMyProductsDialog product={product} open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-foreground">{value}</span>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{label}:</span>
        <Icon className="w-4 h-4" />
      </div>
    </div>
  );
}
