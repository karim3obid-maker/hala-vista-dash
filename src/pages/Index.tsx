import { useState } from "react";
import { FilterHeader } from "@/components/analytics/FilterHeader";
import { KPICard } from "@/components/analytics/KPICard";
import { RatesChart } from "@/components/analytics/RatesChart";
import { OrderStatusChart } from "@/components/analytics/OrderStatusChart";
import { CancellationReasonsChart } from "@/components/analytics/CancellationReasonsChart";
import { ReturnReasonsChart } from "@/components/analytics/ReturnReasonsChart";
import { ProductsTable } from "@/components/analytics/ProductsTable";
import { RegionsTable } from "@/components/analytics/RegionsTable";
import { ReasonsTable } from "@/components/analytics/ReasonsTable";
import { FooterActions } from "@/components/analytics/FooterActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, MapPin, AlertCircle } from "lucide-react";

const kpis = [
  {
    title: "معدل التأكيد",
    value: "87.5",
    suffix: "%",
    change: 3.2,
    tooltip: "نسبة الطلبات المؤكدة من إجمالي الطلبات الواردة",
  },
  {
    title: "معدل التسليم",
    value: "76.8",
    suffix: "%",
    change: 2.1,
    tooltip: "نسبة الطلبات التي تم تسليمها بنجاح",
  },
  {
    title: "معدل الإلغاء",
    value: "8.2",
    suffix: "%",
    change: -1.5,
    tooltip: "نسبة الطلبات الملغاة من إجمالي الطلبات",
  },
  {
    title: "معدل المرتجعات",
    value: "4.5",
    suffix: "%",
    change: 0.3,
    tooltip: "نسبة الطلبات المرتجعة بعد التسليم",
  },
  {
    title: "إجمالي المبيعات",
    value: "245,890",
    suffix: "SAR",
    change: 12.8,
    tooltip: "إجمالي الإيرادات المحققة في الفترة المحددة",
  },
  {
    title: "الربح الصافي",
    value: "48,320",
    suffix: "SAR",
    change: 8.5,
    tooltip: "صافي الربح بعد خصم جميع التكاليف",
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Filter Header */}
      <FilterHeader />

      <main className="container max-w-[1280px] mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">لوحة التحليلات</h1>
          <p className="text-muted-foreground mt-1">
            نظرة شاملة على أداء متجرك
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              suffix={kpi.suffix}
              change={kpi.change}
              tooltip={kpi.tooltip}
            />
          ))}
        </div>

        {/* Charts Grid - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RatesChart />
          <OrderStatusChart />
        </div>

        {/* Charts Grid - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CancellationReasonsChart />
          <ReturnReasonsChart />
        </div>

        {/* Tabbed Tables Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="w-full justify-start bg-card border border-border p-1 h-14 mb-6">
            <TabsTrigger
              value="products"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-10 px-6"
            >
              <Package className="w-4 h-4" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger
              value="regions"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-10 px-6"
            >
              <MapPin className="w-4 h-4" />
              المناطق
            </TabsTrigger>
            <TabsTrigger
              value="reasons"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-10 px-6"
            >
              <AlertCircle className="w-4 h-4" />
              الأسباب
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="animate-fade-in">
            <ProductsTable />
          </TabsContent>

          <TabsContent value="regions" className="animate-fade-in">
            <RegionsTable />
          </TabsContent>

          <TabsContent value="reasons" className="animate-fade-in">
            <ReasonsTable />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer Actions */}
      <FooterActions />
    </div>
  );
};

export default Index;
