import { useState, useMemo } from "react";
import { DollarSign, Tag, TrendingUp, RefreshCw, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const FX = 3.75;

export function SuggestedPriceCalculator() {
  const [productCost, setProductCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [confirmationCost, setConfirmationCost] = useState(0);
  const [adsCost, setAdsCost] = useState(0);
  const [otherCosts, setOtherCosts] = useState(0);
  const [targetMargin, setTargetMargin] = useState(30);

  const calc = useMemo(() => {
    const totalCost = productCost + shippingCost + confirmationCost + adsCost + otherCosts;
    const suggestedPrice = totalCost > 0 ? totalCost / (1 - targetMargin / 100) : 0;
    const profit = suggestedPrice - totalCost;
    const suggestedSar = suggestedPrice * FX;
    const profitSar = profit * FX;
    const totalCostSar = totalCost * FX;
    return { totalCost, suggestedPrice, profit, suggestedSar, profitSar, totalCostSar };
  }, [productCost, shippingCost, confirmationCost, adsCost, otherCosts, targetMargin]);

  const reset = () => {
    setProductCost(0);
    setShippingCost(0);
    setConfirmationCost(0);
    setAdsCost(0);
    setOtherCosts(0);
    setTargetMargin(30);
  };

  const fmt = (v: number) => v.toFixed(2);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={reset} className="rounded-xl gap-1.5 text-xs h-8">
          <RefreshCw className="w-3.5 h-3.5" />
          إعادة تعيين
        </Button>
        <h2 className="text-lg font-bold text-foreground">حاسبة سعر البيع المقترح</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* RIGHT: Inputs */}
        <div className="lg:col-span-2 space-y-4 order-1 lg:order-2">
          {/* Costs */}
          <div className="bg-card rounded-2xl border border-border p-4 space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 justify-end">
              <h3 className="text-sm font-bold text-foreground">التكاليف</h3>
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-accent" />
              </div>
            </div>
            <CostInput label="تكلفة المنتج" value={productCost} onChange={setProductCost} />
            <CostInput label="تكلفة الشحن" value={shippingCost} onChange={setShippingCost} />
            <CostInput label="تكلفة التأكيد" value={confirmationCost} onChange={setConfirmationCost} />
            <CostInput label="تكلفة الإعلان (لكل طلب)" value={adsCost} onChange={setAdsCost} />
            <CostInput label="مصاريف أخرى" value={otherCosts} onChange={setOtherCosts} />
          </div>

          {/* Target Margin */}
          <div className="bg-card rounded-2xl border border-border p-4 space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 justify-end">
              <h3 className="text-sm font-bold text-foreground">هامش الربح المطلوب</h3>
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={targetMargin}
                    onChange={(e) => {
                      let v = parseFloat(e.target.value) || 0;
                      if (v > 95) v = 95;
                      if (v < 1) v = 1;
                      setTargetMargin(v);
                    }}
                    min="1" max="95" step="1"
                    className="w-16 h-7 rounded-lg text-xs text-center font-bold border-border"
                  />
                  <span className="text-xs text-muted-foreground">%</span>
                </div>
                <label className="text-xs text-muted-foreground">نسبة الهامش</label>
              </div>
              <Slider
                value={[targetMargin]}
                onValueChange={([v]) => setTargetMargin(v)}
                min={5} max={80} step={1}
                className="w-full"
              />
              <div className="flex justify-between text-[9px] text-muted-foreground/50">
                <span>5%</span>
                <span>40%</span>
                <span>80%</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground text-center">
            أدخل جميع التكاليف وحدد هامش الربح المطلوب لحساب سعر البيع
          </p>
        </div>

        {/* LEFT: Results */}
        <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
          {/* Hero suggested price */}
          <div
            className="relative overflow-hidden rounded-2xl p-6 border-2 bg-gradient-to-bl from-primary/10 via-primary/5 to-card border-primary/30"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-20 bg-primary" />
            <div className="relative flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/15">
                <Tag className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">سعر البيع المقترح</p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black tracking-tight text-primary">
                  ${fmt(calc.suggestedPrice)}
                </span>
                <span className="text-lg text-muted-foreground font-medium">
                  ({fmt(calc.suggestedSar)} SAR)
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-3 gap-3">
            <DetailCard
              label="إجمالي التكاليف"
              usd={calc.totalCost}
              sar={calc.totalCostSar}
              icon={<DollarSign className="w-4 h-4" />}
              color="destructive"
            />
            <DetailCard
              label="الربح المتوقع"
              usd={calc.profit}
              sar={calc.profitSar}
              icon={<TrendingUp className="w-4 h-4" />}
              color="success"
            />
            <DetailCard
              label="هامش الربح"
              value={`${targetMargin}%`}
              icon={<Zap className="w-4 h-4" />}
              color="primary"
            />
          </div>

          {/* Cost breakdown */}
          <div className="bg-card rounded-2xl border border-border p-4 space-y-3" style={{ boxShadow: "var(--shadow-card)" }}>
            <h3 className="text-sm font-bold text-foreground text-right">تفصيل التكاليف</h3>
            <div className="space-y-2">
              <BreakdownLine label="تكلفة المنتج" usd={productCost} />
              <BreakdownLine label="الشحن" usd={shippingCost} />
              <BreakdownLine label="التأكيد" usd={confirmationCost} />
              <BreakdownLine label="الإعلانات" usd={adsCost} />
              <BreakdownLine label="مصاريف أخرى" usd={otherCosts} />
              <div className="border-t border-border pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">${fmt(calc.totalCost)}</span>
                    <span className="text-[10px] text-muted-foreground">({fmt(calc.totalCostSar)} SAR)</span>
                  </div>
                  <span className="text-xs font-bold text-foreground">الإجمالي</span>
                </div>
              </div>
            </div>
          </div>

          {/* Multiple margin suggestions */}
          <div className="bg-card rounded-2xl border border-border p-4 space-y-3" style={{ boxShadow: "var(--shadow-card)" }}>
            <h3 className="text-sm font-bold text-foreground text-right">أسعار مقترحة بهوامش مختلفة</h3>
            <div className="grid grid-cols-4 gap-2">
              {[20, 30, 40, 50].map((margin) => {
                const price = calc.totalCost > 0 ? calc.totalCost / (1 - margin / 100) : 0;
                const isActive = margin === targetMargin;
                return (
                  <button
                    key={margin}
                    onClick={() => setTargetMargin(margin)}
                    className={`rounded-xl p-3 text-center border transition-all ${
                      isActive
                        ? "bg-primary/10 border-primary/40 ring-1 ring-primary/20"
                        : "bg-muted/20 border-border hover:bg-muted/40"
                    }`}
                  >
                    <p className={`text-lg font-bold ${isActive ? "text-primary" : "text-foreground"}`}>
                      ${fmt(price)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{fmt(price * FX)} SAR</p>
                    <p className={`text-xs font-semibold mt-1 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {margin}%
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CostInput({ label, value, onChange }: {
  label: string; value: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[130px] flex-shrink-0">
        <Input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={0.5}
          min="0"
          placeholder="0.00"
          className="rounded-xl h-10 text-sm text-center bg-success/5 border-success/30 focus:border-success pr-3 pl-8 font-medium"
        />
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-success/70">$</span>
      </div>
      <label className="text-xs text-muted-foreground flex-1 text-right">{label}</label>
    </div>
  );
}

function DetailCard({ label, usd, sar, value, icon, color }: {
  label: string; usd?: number; sar?: number; value?: string; icon: React.ReactNode; color: string;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-3 text-center space-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className={`w-8 h-8 rounded-lg bg-${color}/10 flex items-center justify-center mx-auto text-${color}`}>
        {icon}
      </div>
      {value ? (
        <p className={`text-lg font-bold text-${color}`}>{value}</p>
      ) : (
        <>
          <p className={`text-lg font-bold text-${color}`}>${usd?.toFixed(2)}</p>
          {sar !== undefined && (
            <p className="text-[10px] text-muted-foreground">{sar.toFixed(2)} SAR</p>
          )}
        </>
      )}
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function BreakdownLine({ label, usd }: { label: string; usd: number }) {
  if (usd === 0) return null;
  return (
    <div className="flex items-center justify-between py-0.5">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">${usd.toFixed(2)}</span>
        <span className="text-[10px] text-muted-foreground">({(usd * FX).toFixed(2)} SAR)</span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
