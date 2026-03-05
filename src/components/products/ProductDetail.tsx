import { useState } from "react";
import { Product } from "@/data/productsData";
import { AddToMyProductsDialog } from "@/components/products/AddToMyProductsDialog";
import { ProductPricingCalculator } from "@/components/products/ProductPricingCalculator";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Package,
  Ruler,
  Tag,
  Globe,
  Calendar,
  RefreshCw,
  Store,
  Plus,
  Copy,
  CheckCircle2,
  Weight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [skuCopied, setSkuCopied] = useState(false);

  const copySku = () => {
    navigator.clipboard.writeText(product.sku);
    setSkuCopied(true);
    toast.success("تم نسخ SKU");
    setTimeout(() => setSkuCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8 overflow-y-auto h-[calc(100vh-3.5rem)]" dir="rtl">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <button onClick={onBack} className="hover:text-primary transition-colors flex items-center gap-1.5">
          <span>العودة</span>
          <span>/</span>
        </button>
        <span>المنتجات</span>
        <span>/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </motion.nav>

      {/* Product Title - Mobile */}
      <h1 className="text-2xl font-bold text-foreground lg:hidden">{product.name}</h1>

      {/* Main Grid: Right = Info, Left = Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Right Column - Info */}
        <div className="space-y-5 order-2 lg:order-1">
          {/* Title - Desktop */}
          <h1 className="text-2xl font-bold text-foreground hidden lg:block">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.nameEn}</p>

          {/* Status & Rating */}
          <div className="flex items-center gap-3">
            <Badge className={`text-xs border-0 rounded-md px-3 py-1 ${product.status === "متاح" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
              {product.status}
            </Badge>
            <span className="text-sm text-muted-foreground">({product.stock} قطعة)</span>
            <span className="text-sm font-semibold">4.8</span>
          </div>

          {/* Price Block */}
          <div className="flex items-end gap-6">
            <div className="bg-primary/8 border border-primary/15 rounded-2xl px-6 py-4">
              <p className="text-[11px] text-muted-foreground mb-1">سعر القطعة</p>
              <p className="text-3xl font-extrabold text-primary">
                <span className="text-base font-bold text-muted-foreground ml-1">{product.currency}</span>
                {product.costPrice.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">سعر البيع الموصى به</p>
              <p className="text-lg font-bold text-foreground">
                <span className="text-sm text-muted-foreground ml-1">{product.currency}</span>
                {product.recommendedPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <Separator />

          {/* Stock */}
          <div className={`flex items-center justify-between rounded-2xl px-5 py-4 ${
            product.stock > 0
              ? "bg-success/8 border border-success/15"
              : "bg-destructive/8 border border-destructive/15"
          }`}>
            <div className={`flex items-center gap-2.5 text-sm font-semibold ${product.stock > 0 ? "text-success" : "text-destructive"}`}>
              <Package className="w-5 h-5" />
              <span>المخزون المتاح</span>
            </div>
            <span className={`text-xl font-extrabold ${product.stock > 0 ? "text-success" : "text-destructive"}`}>
              {product.stock} <span className="text-xs font-medium">قطعة</span>
            </span>
          </div>

          <Separator />

          {/* SKU */}
          <InfoRow label="SKU">
            <button
              onClick={copySku}
              className="flex items-center gap-2 font-mono text-xs bg-muted/40 hover:bg-muted rounded-lg px-3 py-2 border border-border transition-colors group"
            >
              {skuCopied ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
              <span>{product.sku}</span>
            </button>
          </InfoRow>

          <Separator />

          {/* Specs */}
          <div className="space-y-0">
            <InfoRow label="الوزن" icon={Weight} value={product.weight} />
            <InfoRow label="الأبعاد" icon={Ruler} value={product.dimensions} />
            <InfoRow label="التصنيف" icon={Tag}>
              <Badge className="bg-primary/10 text-primary border-0 text-xs">{product.category}</Badge>
            </InfoRow>
            <InfoRow label="الدول" icon={Globe}>
              <div className="flex flex-wrap gap-1.5">
                {product.countries.map((c) => (
                  <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                ))}
              </div>
            </InfoRow>
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-3 pt-1">
            <Button
              onClick={() => setShowAddDialog(true)}
              className="w-full rounded-2xl h-13 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base gap-2"
            >
              <Plus className="w-5 h-5" />
              إضافة الى منتجاتي
            </Button>
            <Button
              onClick={() => toast.success("تمت إضافة المنتج إلى هلا ستور")}
              variant="outline"
              className="w-full rounded-2xl h-12 border-accent text-accent hover:bg-accent/10 font-semibold gap-2"
            >
              <Store className="w-4 h-4" />
              إضافة الى هلا ستور
            </Button>
          </div>
        </div>

        {/* Left Column - Image */}
        <div className="space-y-4 order-1 lg:order-2">
          <div className="bg-card rounded-3xl border border-border overflow-hidden aspect-square flex items-center justify-center">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex items-center justify-center gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedImage
                      ? "border-primary shadow-md scale-105"
                      : "border-border opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" dir="rtl" className="border-t border-border pt-6">
        <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-8 h-auto p-0">
          {[
            { value: "description", label: "الوصف" },
            { value: "info", label: "معلومات إضافية" },
            { value: "pricing", label: "سعر البيع المقترح" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 text-sm font-semibold"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="description" className="pt-6 text-right">
          <h3 className="text-base font-bold text-foreground mb-3">وصف المنتج</h3>
          <p className="text-sm leading-8 text-muted-foreground">{product.description}</p>
        </TabsContent>

        <TabsContent value="info" className="pt-6">
          <div className="space-y-0 text-right">
            <InfoRow label="تاريخ الإضافة" icon={Calendar} value={product.dateAdded} />
            <InfoRow label="آخر تحديث" icon={RefreshCw} value={product.lastUpdated} />
            <InfoRow label="الوزن" icon={Package} value={product.weight} />
            <InfoRow label="الأبعاد" icon={Ruler} value={product.dimensions} />
            <InfoRow label="الدول المتاحة" icon={Globe}>
              <div className="flex flex-wrap gap-1.5">
                {product.countries.map((c) => (
                  <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                ))}
              </div>
            </InfoRow>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="pt-6">
          <ProductPricingCalculator product={product} />
        </TabsContent>
      </Tabs>

      <AddToMyProductsDialog product={product} open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon: Icon,
  children,
}: {
  label: string;
  value?: string;
  icon?: any;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{label}</span>
      </div>
      {children || <span className="text-sm font-medium text-foreground">{value}</span>}
    </div>
  );
}
