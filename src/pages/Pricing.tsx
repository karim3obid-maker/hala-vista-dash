import { Tag } from "lucide-react";

const PricingPage = () => (
  <div className="container max-w-[1280px] mx-auto px-6 py-8">
    <div className="flex items-center gap-3 mb-6 justify-end">
      <div>
        <h1 className="text-2xl font-bold text-foreground">الأسعار</h1>
        <p className="text-muted-foreground mt-1">إدارة أسعار المنتجات والعروض</p>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Tag className="w-6 h-6 text-primary" />
      </div>
    </div>
    <div className="bg-card rounded-2xl p-12 text-center border border-border">
      <p className="text-muted-foreground text-lg">قريباً...</p>
    </div>
  </div>
);

export default PricingPage;
