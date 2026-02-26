import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Truck, Percent, BarChart3, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CODCalculator } from "@/components/calculator/CODCalculator";
import { SuggestedPriceCalculator } from "@/components/calculator/SuggestedPriceCalculator";

interface CalcResult {
  revenue: number;
  totalCost: number;
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
  profitPerUnit: number;
}

const CalculatorPage = () => {
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [shippingCost, setShippingCost] = useState("");
  const [operationalCost, setOperationalCost] = useState("");
  const [confirmationFee, setConfirmationFee] = useState("");
  const [codFee, setCodFee] = useState("");
  const [returnRate, setReturnRate] = useState("");

  const calc = (): CalcResult | null => {
    const cost = parseFloat(costPrice) || 0;
    const sell = parseFloat(sellingPrice) || 0;
    const qty = parseInt(quantity) || 1;
    const ship = parseFloat(shippingCost) || 0;
    const ops = parseFloat(operationalCost) || 0;
    const conf = parseFloat(confirmationFee) || 0;
    const cod = parseFloat(codFee) || 0;
    const ret = parseFloat(returnRate) || 0;

    if (!cost || !sell) return null;

    const revenue = sell * qty;
    const productCost = cost * qty;
    const shippingTotal = ship * qty;
    const opsTotal = ops * qty;
    const confTotal = conf * qty;
    const codTotal = (cod / 100) * revenue;
    const returnLoss = (ret / 100) * revenue;

    const totalCost = productCost + shippingTotal + opsTotal + confTotal + codTotal + returnLoss;
    const grossProfit = revenue - productCost;
    const netProfit = revenue - totalCost;
    const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    const profitPerUnit = qty > 0 ? netProfit / qty : 0;

    return { revenue, totalCost, grossProfit, netProfit, profitMargin, profitPerUnit };
  };

  const result = calc();

  const reset = () => {
    setCostPrice("");
    setSellingPrice("");
    setQuantity("1");
    setShippingCost("");
    setOperationalCost("");
    setConfirmationFee("");
    setCodFee("");
    setReturnRate("");
  };

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
          <TabsTrigger value="simple" className="rounded-lg text-xs py-2 px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm">
            حاسبة بسيطة
          </TabsTrigger>
          <TabsTrigger value="suggested" className="rounded-lg text-xs py-2 px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm">
            سعر البيع المقترح
          </TabsTrigger>
          <TabsTrigger value="cod" className="rounded-lg text-xs py-2 px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm">
            حاسبة التسعير COD
          </TabsTrigger>
        </TabsList>

        {/* COD Calculator Tab */}
        <TabsContent value="cod" className="mt-5">
          <CODCalculator />
        </TabsContent>

        {/* Suggested Price Calculator Tab */}
        <TabsContent value="suggested" className="mt-5">
          <SuggestedPriceCalculator />
        </TabsContent>

        {/* Simple Calculator Tab */}
        <TabsContent value="simple" className="mt-5">
          <div className="flex items-center justify-between mb-5">
            <Button variant="outline" size="sm" onClick={reset} className="rounded-xl gap-1 text-xs">
              <RefreshCw className="w-3.5 h-3.5" />
              إعادة تعيين
            </Button>
            <h2 className="text-base font-bold text-foreground">حاسبة أرباح المنتجات</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Right - Inputs */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-card rounded-2xl border border-border p-5 space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2 justify-end">
                  الأسعار الأساسية
                  <DollarSign className="w-5 h-5 text-primary" />
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <InputField label="عدد القطع" value={quantity} onChange={setQuantity} placeholder="1" />
                  <InputField label="سعر البيع ($)" value={sellingPrice} onChange={setSellingPrice} placeholder="0.00" />
                  <InputField label="سعر التكلفة ($)" value={costPrice} onChange={setCostPrice} placeholder="0.00" />
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-5 space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2 justify-end">
                  تكاليف التشغيل
                  <Truck className="w-5 h-5 text-accent" />
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="رسوم التأكيد (لكل قطعة $)" value={confirmationFee} onChange={setConfirmationFee} placeholder="0.00" />
                  <InputField label="تكلفة الشحن (لكل قطعة $)" value={shippingCost} onChange={setShippingCost} placeholder="0.00" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="نسبة الدفع عند الاستلام COD (%)" value={codFee} onChange={setCodFee} placeholder="0" suffix="%" />
                  <InputField label="مصاريف تشغيلية أخرى (لكل قطعة $)" value={operationalCost} onChange={setOperationalCost} placeholder="0.00" />
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-5 space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2 justify-end">
                  نسبة المرتجعات
                  <Percent className="w-5 h-5 text-destructive" />
                </h2>
                <InputField label="نسبة المرتجعات المتوقعة (%)" value={returnRate} onChange={setReturnRate} placeholder="0" suffix="%" />
              </div>
            </div>

            {/* Left - Results */}
            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border p-5 space-y-4 sticky top-20" style={{ boxShadow: "var(--shadow-card)" }}>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2 justify-end">
                  النتائج
                  <BarChart3 className="w-5 h-5 text-primary" />
                </h2>

                {result ? (
                  <div className="space-y-3">
                    <ResultRow label="إجمالي الإيرادات" value={result.revenue} color="text-foreground" />
                    <ResultRow label="إجمالي التكاليف" value={result.totalCost} color="text-destructive" />
                    <div className="h-px bg-border" />
                    <ResultRow label="الربح الإجمالي" value={result.grossProfit} color="text-foreground" />
                    
                    <div className="bg-gradient-to-l from-primary/10 to-primary/5 rounded-xl p-4 space-y-2 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <span className={`text-2xl font-bold ${result.netProfit >= 0 ? "text-success" : "text-destructive"}`}>
                          {result.netProfit.toFixed(2)} $
                        </span>
                        <span className="text-sm font-medium text-foreground">صافي الربح</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs border-0 ${result.profitMargin >= 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                          {result.profitMargin.toFixed(1)}%
                        </Badge>
                        <span className="text-xs text-muted-foreground">هامش الربح</span>
                      </div>
                    </div>

                    <ResultRow label="الربح لكل قطعة" value={result.profitPerUnit} color={result.profitPerUnit >= 0 ? "text-success" : "text-destructive"} />

                    <div className="border-t border-border pt-3 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">تفصيل التكاليف:</p>
                      <BreakdownRow label="تكلفة المنتج" value={(parseFloat(costPrice) || 0) * (parseInt(quantity) || 1)} />
                      <BreakdownRow label="الشحن" value={(parseFloat(shippingCost) || 0) * (parseInt(quantity) || 1)} />
                      <BreakdownRow label="التأكيد" value={(parseFloat(confirmationFee) || 0) * (parseInt(quantity) || 1)} />
                      <BreakdownRow label="مصاريف تشغيلية" value={(parseFloat(operationalCost) || 0) * (parseInt(quantity) || 1)} />
                      <BreakdownRow label="رسوم COD" value={((parseFloat(codFee) || 0) / 100) * result.revenue} />
                      <BreakdownRow label="خسارة مرتجعات" value={((parseFloat(returnRate) || 0) / 100) * result.revenue} />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <Calculator className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">أدخل سعر التكلفة وسعر البيع لعرض النتائج</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function InputField({
  label, value, onChange, placeholder, suffix,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; suffix?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="relative">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-xl h-10 text-center"
          step="0.01"
          min="0"
        />
        {suffix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suffix}</span>
        )}
      </div>
    </div>
  );
}

function ResultRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={`text-sm font-bold ${color}`}>{value.toFixed(2)} $</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  if (value === 0) return null;
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-destructive">{value.toFixed(2)} $</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

export default CalculatorPage;
