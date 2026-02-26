import { useState } from "react";
import { Product } from "@/data/productsData";
import { AddToMyProductsDialog } from "@/components/products/AddToMyProductsDialog";
import { ProductCalculator } from "@/components/products/ProductCalculator";
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
  Minus,
  ChevronLeft,
  ChevronRight,
  Box,
  Copy,
  CheckCircle2 } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [skuCopied, setSkuCopied] = useState(false);

  const totalPrice = (product.costPrice * quantity).toFixed(2);

  const nextImage = () => setSelectedImage((i) => (i + 1) % product.images.length);
  const prevImage = () => setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length);

  const copySku = () => {
    navigator.clipboard.writeText(product.sku);
    setSkuCopied(true);
    toast.success("تم نسخ SKU");
    setTimeout(() => setSkuCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 overflow-y-auto h-[calc(100vh-3.5rem)]">
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={onBack} className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowRight className="w-4 h-4" />
            <span>العودة</span>
          </button>
          <span>/</span>
          <span>المنتجات</span>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Title */}
      <h1 className="text-xl font-bold text-foreground text-right">{product.name}</h1>

      {/* Main Content - Two Columns */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Right Side - Product Info (appears first in RTL) */}
        <div className="lg:w-[380px] shrink-0 space-y-5 order-1 lg:order-2">
          {/* Name & Rating */}
          <div className="space-y-2 text-right">
            <p className="text-sm text-muted-foreground">{product.nameEn}</p>
            <div className="flex items-center gap-3 justify-end">
              <Badge className={`text-xs border-0 ${product.status === "متاح" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                {product.status}
              </Badge>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">({product.stock} قطعة)</span>
                
                <span className="text-sm font-semibold">4.8</span>
              </div>
            </div>
          </div>

          {/* Prices - highlighted cost price */}
          <div className="flex items-center gap-4 justify-end border-b border-border pb-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">سعر البيع الموصى به</p>
              <p className="text-lg font-bold text-foreground">
                {product.recommendedPrice.toFixed(2)} <span className="text-sm text-muted-foreground">{product.currency}</span>
              </p>
            </div>
            <div className="text-right bg-primary/10 rounded-xl px-5 py-3 border border-primary/20">
              <p className="text-[11px] text-primary/70 mb-0.5">سعر القطعة</p>
              <p className="text-2xl font-extrabold text-primary">
                {product.costPrice.toFixed(2)} <span className="text-sm font-bold text-primary/70">{product.currency}</span>
              </p>
            </div>
          </div>

          {/* Stock - highlighted */}
          <div className={`flex items-center justify-between rounded-xl px-4 py-3 ${
          product.stock > 0 ?
          "bg-success/10 border border-success/20" :
          "bg-destructive/10 border border-destructive/20"}`
          }>
            <span className={`text-lg font-extrabold ${product.stock > 0 ? "text-success" : "text-destructive"}`}>
              {product.stock} <span className="text-xs font-medium">قطعة</span>
            </span>
            <div className={`flex items-center gap-2 text-sm font-semibold ${product.stock > 0 ? "text-success" : "text-destructive"}`}>
              <span>المخزون المتاح</span>
              <Box className="w-5 h-5" />
            </div>
          </div>

          {/* SKU - copyable */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <button
              onClick={copySku}
              className="flex items-center gap-2 font-mono text-xs bg-muted/50 hover:bg-muted rounded-lg px-3 py-2 border border-border transition-colors cursor-pointer group">

              {skuCopied ?
              <CheckCircle2 className="w-3.5 h-3.5 text-success" /> :

              <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              }
              <span>{product.sku}</span>
            </button>
            <span className="text-sm text-muted-foreground">SKU</span>
          </div>

          {/* Details Grid */}
          <div className="space-y-2 border-b border-border pb-4">
            <DetailRow icon={Package} label="الوزن" value={product.weight} />
            <DetailRow icon={Ruler} label="الأبعاد" value={product.dimensions} />
            <div className="flex items-center justify-between py-2">
              <Badge className="bg-primary/10 text-primary border-0 text-xs">{product.category}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>التصنيف</span>
                <Tag className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-wrap gap-1">
                {product.countries.map((c) =>
                <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                <span>الدول</span>
                <Globe className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quantity & Buy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 justify-end">
              














            </div>

            <Button
              onClick={() => setShowAddDialog(true)}
              className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base gap-2">

              <Plus className="w-5 h-5" />
              <span>إضافة الى منتجاتي</span>
            </Button>

            <Button
              onClick={() => toast.success("تمت إضافة المنتج إلى هلا ستور")}
              variant="outline"
              className="w-full rounded-xl h-11 border-accent text-accent hover:bg-accent/10 font-semibold gap-2">

              <Store className="w-4 h-4" />
              <span>إضافة الى هلا ستور</span>
            </Button>
          </div>
        </div>

        {/* Left Side - Image Gallery (appears second in RTL) */}
        <div className="flex-1 space-y-4 order-2 lg:order-1">
          {/* Main Image */}
          <div className="relative bg-card rounded-2xl border border-border overflow-hidden aspect-square max-h-[500px]">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain p-6" />

            {product.images.length > 1 &&
            <>
                <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-md">

                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow-md">

                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            }
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 &&
          <div className="flex items-center justify-center gap-3">
              {product.images.map((img, i) =>
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
              i === selectedImage ? "border-primary shadow-md scale-105" : "border-border opacity-60 hover:opacity-100"}`
              }>

                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
            )}
            </div>
          }
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="description" dir="rtl" className="border-t border-border pt-6">
        <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-6 h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 text-sm font-semibold">
            الوصف
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 text-sm font-semibold">
            معلومات إضافية
          </TabsTrigger>
          <TabsTrigger
            value="calculator"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 text-sm font-semibold">
            حاسبة الأرباح
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="pt-6 text-right">
          <h3 className="text-base font-bold text-foreground mb-3">وصف المنتج</h3>
          <p className="text-sm leading-8 text-muted-foreground">{product.description}</p>
        </TabsContent>

        <TabsContent value="info" className="pt-6">
          <div className="space-y-3 text-right">
            <DetailRow icon={Calendar} label="تاريخ الإضافة" value={product.dateAdded} />
            <DetailRow icon={RefreshCw} label="آخر تحديث" value={product.lastUpdated} />
            <DetailRow icon={Package} label="الوزن" value={product.weight} />
            <DetailRow icon={Ruler} label="الأبعاد" value={product.dimensions} />
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-wrap gap-1">
                {product.countries.map((c) =>
                <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>الدول المتاحة</span>
                <Globe className="w-4 h-4" />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="pt-6">
          <ProductCalculator product={product} />
        </TabsContent>
      </Tabs>

      <AddToMyProductsDialog product={product} open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>);

}

function DetailRow({ icon: Icon, label, value }: {icon: any;label: string;value: string;}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-foreground">{value}</span>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{label}</span>
        <Icon className="w-4 h-4" />
      </div>
    </div>);

}