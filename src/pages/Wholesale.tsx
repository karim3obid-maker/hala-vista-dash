import { useState } from "react";
import { wholesaleProductsData } from "@/data/wholesaleProductsData";
import { Product } from "@/data/productsData";
import { ProductDetail } from "@/components/products/ProductDetail";
import { Search, ShoppingBag, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function WholesalePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");

  const categories = ["الكل", ...new Set(wholesaleProductsData.map((p) => p.category))];

  const filtered = wholesaleProductsData.filter((p) => {
    const matchSearch =
      p.name.includes(search) || p.nameEn.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search);
    const matchCat = selectedCategory === "الكل" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accent/15 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-accent">هلا جملة</h1>
            <p className="text-xs text-muted-foreground">أفضل المنتجات بأسعار الجملة</p>
          </div>
        </div>
        <Badge className="bg-accent/15 text-accent border-0 text-xs gap-1">
          <Flame className="w-3 h-3" />
          منتجات بالجملة
        </Badge>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                selectedCategory === cat
                  ? "bg-accent/15 border-accent/40 text-accent ring-1 ring-accent/20"
                  : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px] max-w-xs ml-auto">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="بحث بالاسم أو SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9 rounded-xl bg-card border-border focus:border-accent"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-right group"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden bg-muted/30 relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                  <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-lg text-xs font-bold">
                    غير متاح
                  </span>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <Badge className="bg-accent/90 text-white border-0 text-[10px]">
                  {product.category}
                </Badge>
              </div>
              {product.stock >= 1000 && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-success/90 text-white border-0 text-[10px] gap-0.5">
                    <Flame className="w-2.5 h-2.5" />
                    كمية كبيرة
                  </Badge>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-sm text-foreground line-clamp-1">{product.name}</h3>
              <p className="text-[11px] text-muted-foreground line-clamp-1">{product.nameEn}</p>

              {/* Price & Stock */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-accent">{product.costPrice.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">{product.currency}</span>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${product.stock > 0 ? "border-success/30 text-success" : "border-destructive/30 text-destructive"}`}
                >
                  {product.stock > 0 ? `${product.stock} قطعة` : "نفذ"}
                </Badge>
              </div>

              {/* Countries */}
              <div className="flex flex-wrap gap-1 pt-1">
                {product.countries.slice(0, 2).map((c) => (
                  <Badge key={c} variant="secondary" className="text-[9px] px-1.5 py-0">
                    {c}
                  </Badge>
                ))}
                {product.countries.length > 2 && (
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                    +{product.countries.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>لا توجد منتجات مطابقة</p>
        </div>
      )}
    </div>
  );
}
