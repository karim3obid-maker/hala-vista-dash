import { useState } from "react";
import { productsData, Product } from "@/data/productsData";
import { ProductDetail } from "@/components/products/ProductDetail";
import { Search, Package, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");

  const categories = ["الكل", ...new Set(productsData.map((p) => p.category))];

  const filtered = productsData.filter((p) => {
    const matchSearch =
      p.name.includes(search) || p.nameEn.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search);
    const matchCat = selectedCategory === "الكل" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div />
        <div className="flex items-center gap-3">
          <Package className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">المنتجات</h1>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-chip text-xs ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px] max-w-xs mr-auto">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="بحث بالاسم أو SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9 rounded-xl bg-card border-border"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-right group"
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
                <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground text-[10px]">
                  {product.category}
                </Badge>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-sm text-foreground line-clamp-1">{product.name}</h3>
              <p className="text-[11px] text-muted-foreground line-clamp-1">{product.nameEn}</p>
              <div className="flex items-center justify-between pt-1">
                <Badge
                  variant="outline"
                  className={`text-[10px] ${product.stock > 0 ? "border-success/30 text-success" : "border-destructive/30 text-destructive"}`}
                >
                  {product.stock > 0 ? `${product.stock} قطعة` : "نفذ"}
                </Badge>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-primary">{product.costPrice.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">{product.currency}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>لا توجد منتجات مطابقة</p>
        </div>
      )}
    </div>
  );
}
