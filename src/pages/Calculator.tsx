import { Calculator } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CODCalculator } from "@/components/calculator/CODCalculator";
import { SuggestedPriceCalculator } from "@/components/calculator/SuggestedPriceCalculator";

const CalculatorPage = () => {
  return (
    <div className="container max-w-[1200px] mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 justify-end">
        <div>
          <h1 className="text-2xl font-bold text-foreground">الحاسبات المالية</h1>
          <p className="text-sm text-muted-foreground">أدوات حساب الأرباح والتسعير</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
      </div>

      <Tabs defaultValue="cod" className="w-full">
        <TabsList className="w-full justify-end bg-muted/50 rounded-xl p-1 h-auto">
          <TabsTrigger value="suggested" className="rounded-lg text-xs py-2 px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm">
            سعر البيع المقترح
          </TabsTrigger>
          <TabsTrigger value="cod" className="rounded-lg text-xs py-2 px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm">
            حاسبة التسعير COD
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cod" className="mt-5">
          <CODCalculator />
        </TabsContent>

        <TabsContent value="suggested" className="mt-5">
          <SuggestedPriceCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalculatorPage;
