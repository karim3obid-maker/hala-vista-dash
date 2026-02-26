import { useState, useMemo } from "react";
import { DollarSign, Tag, TrendingUp, Zap, Lock, Truck, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Product } from "@/data/productsData";

const FX = 3.75;

const FIXED = {
  cc_lead: 0.5,
  cc_confirmed: 1.0,
  cc_delivered: 1.5,
  ship_delivered: 5.0,
  ship_return: 3.5,
  cod_pct: 5.0,
};

interface Props {
  product: Product;
}

export function ProductPricingCalculator({ product }: Props) {
  const productCostUsd = product.costPrice / FX;
  const [adsCost, setAdsCost] = useState(6);
  const [confirmRate, setConfirmRate] = useState(55);
  const [deliveryRate, setDeliveryRate] = useState(35);
  const [targetMargin, setTargetMargin] = useState(30);
  const [showConstants, setShowConstants] = useState(false);

  const calc = useMemo(() => {
    const leads = 100;
    const confirmed = leads * (confirmRate / 100);
    const delivered = confirmed * (deliveryRate / 100);
    const failed = confirmed - delivered;

    const adsPerDel = delivered > 0 ? (adsCost * leads) / delivered : 0;
    const ccPerDel = delivered > 0
      ? (FIXED.cc_lead * leads + FIXED.cc_confirmed * confirmed + FIXED.cc_delivered * delivered) / delivered
      : 0;
    const shipPerDel = delivered > 0
      ? (FIXED.ship_delivered * delivered + FIXED.ship_return * failed) / delivered
      : 0;

    const totalCostBeforeCod = productCostUsd + adsPerDel + ccPerDel + shipPerDel;
    const divisor = 1 - (targetMargin / 100) - (FIXED.cod_pct / 100);
    const suggestedPrice = divisor > 0 ? totalCostBeforeCod / divisor : 0;
    const codFee = suggestedPrice * (FIXED.cod_pct / 100);
    const totalCost = totalCostBeforeCod + codFee;
    const profit = suggestedPrice - totalCost;

    return {
      productCostUsd: productCostUsd, adsPerDel, ccPerDel, shipPerDel, codFee,
      totalCostBeforeCod, totalCost, suggestedPrice, profit,
    };
  }, [productCostUsd, adsCost, confirmRate, deliveryRate, targetMargin]);

  const fmt = (v: number) => v.toFixed(2);
  const fmtSar = (usd: number) => fmt(usd * FX);

  const constantsList = [
    { label: "كول سنتر - ليد", value: `$${FIXED.cc_lead}` },
    { label: "كول سنتر - تأكيد", value: `$${FIXED.cc_confirmed}` },
    { label: "كول سنتر - توصيل", value: `$${FIXED.cc_delivered}` },
    { label: "شحن توصيل", value: `$${FIXED.ship_delivered}` },
    { label: "شحن مرتجع", value: `$${FIXED.ship_return}` },
    { label: "رسوم COD", value: `${FIXED.cod_pct}%` },
  ];

  return (
    <div className="space-y-5">
      {/* Product cost banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
        <span className="text-lg font-bold text-primary">${fmt(productCostUsd)} <span className="text-sm text-primary/70">({product.costPrice} {product.currency})</span></span>
        <span className="text-sm font-medium text-foreground">تكلفة المنتج</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* RIGHT: Inputs */}
        <div className="space-y-4 order-1 md:order-2">
          <InputCard title="الإعلانات" icon={<DollarSign className="w-4 h-4 text-accent" />}>
            <CostInput label="تكلفة الإعلان (CPP)" value={adsCost} onChange={setAdsCost} />
            <QuickChips values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} current={adsCost} onChange={setAdsCost} suffix="$" />
          </InputCard>

          <InputCard title="نسب التأكيد والتوصيل" icon={<Phone className="w-4 h-4 text-primary" />}>
            <SliderInput label="نسبة التأكيد" value={confirmRate} onChange={setConfirmRate} />
            <QuickChips values={[50, 55, 60, 65, 70]} current={confirmRate} onChange={setConfirmRate} suffix="%" />
            <SliderInput label="نسبة التوصيل" value={deliveryRate} onChange={setDeliveryRate} />
            <QuickChips values={[20, 30, 40, 50, 60]} current={deliveryRate} onChange={setDeliveryRate} suffix="%" />
          </InputCard>

          <InputCard title="هامش الربح المطلوب" icon={<TrendingUp className="w-4 h-4 text-primary" />}>
            <SliderInput label="نسبة الهامش" value={targetMargin} onChange={setTargetMargin} max={70} />
            <QuickChips values={[20, 25, 30, 35, 40, 50]} current={targetMargin} onChange={setTargetMargin} suffix="%" />
          </InputCard>

          <button
            onClick={() => setShowConstants(!showConstants)}
            className="w-full flex items-center justify-between bg-muted/30 rounded-xl px-4 py-2.5 text-xs text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="font-medium">الثوابت (شحن، كول سنتر، COD)</span>
          </button>
          {showConstants && (
            <div className="grid grid-cols-2 gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              {constantsList.map((c, i) => (
                <div key={i} className="flex items-center justify-between bg-muted/20 rounded-lg px-3 py-1.5">
                  <span className="text-[11px] font-mono text-muted-foreground">{c.value}</span>
                  <span className="text-[10px] text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LEFT: Results */}
        <div className="space-y-4 order-2 md:order-1">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl p-5 border-2 bg-gradient-to-bl from-primary/10 via-primary/5 to-card border-primary/30" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full blur-3xl opacity-20 bg-primary" />
            <div className="relative flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/15">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">سعر البيع المقترح</p>
              <span className="text-4xl font-black tracking-tight text-primary">${fmt(calc.suggestedPrice)}</span>
              <span className="text-xl font-bold text-primary/70">{fmtSar(calc.suggestedPrice)} SAR</span>
              <div className="flex items-center gap-3 mt-1">
                <KPIBadge label="هامش" value={`${targetMargin}%`} positive />
                <KPIBadge label="ربح/قطعة" value={`$${fmt(calc.profit)}`} positive={calc.profit >= 0} />
              </div>
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="bg-card rounded-2xl border border-border p-4 space-y-2" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 justify-end border-b border-border pb-2">
              <h3 className="text-sm font-bold text-foreground">تفصيل التكاليف (لكل طلب موصّل)</h3>
              <Truck className="w-4 h-4 text-destructive" />
            </div>
            <CostLine label="تكلفة المنتج" usd={calc.productCostUsd} />
            <CostLine label="الإعلانات (موزع)" usd={calc.adsPerDel} />
            <CostLine label="كول سنتر (موزع)" usd={calc.ccPerDel} />
            <CostLine label="الشحن (موزع)" usd={calc.shipPerDel} />
            <CostLine label={`رسوم COD (${FIXED.cod_pct}%)`} usd={calc.codFee} />
            <div className="border-t border-border pt-2">
              <CostLine label="إجمالي التكلفة" usd={calc.totalCost} bold />
            </div>
          </div>

          {/* Quick margin comparison */}
          <div className="bg-card rounded-2xl border border-border p-4 space-y-3" style={{ boxShadow: "var(--shadow-card)" }}>
            <h3 className="text-sm font-bold text-foreground text-right">أسعار بهوامش مختلفة</h3>
            <div className="grid grid-cols-4 gap-2">
              {[20, 30, 40, 50].map((margin) => {
                const d = 1 - (margin / 100) - (FIXED.cod_pct / 100);
                const price = d > 0 ? calc.totalCostBeforeCod / d : 0;
                const isActive = margin === targetMargin;
                return (
                  <button key={margin} onClick={() => setTargetMargin(margin)}
                    className={`rounded-xl p-2.5 text-center border transition-all ${isActive ? "bg-primary/10 border-primary/40 ring-1 ring-primary/20" : "bg-muted/20 border-border hover:bg-muted/40"}`}
                  >
                    <p className={`text-base font-bold ${isActive ? "text-primary" : "text-foreground"}`}>${fmt(price)}</p>
                    <p className="text-[9px] text-muted-foreground">{fmtSar(price)} SAR</p>
                    <p className={`text-[10px] font-semibold mt-0.5 ${isActive ? "text-primary" : "text-muted-foreground"}`}>{margin}%</p>
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

/* Sub-components */

function InputCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 space-y-3" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2 justify-end">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">{icon}</div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function CostInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[120px] flex-shrink-0">
        <Input type="number" value={value || ""} onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={0.5} min="0" placeholder="0.00"
          className="rounded-xl h-9 text-sm text-center bg-success/5 border-success/30 focus:border-success pr-3 pl-8 font-medium" />
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-success/70">$</span>
      </div>
      <label className="text-xs text-muted-foreground flex-1 text-right">{label}</label>
    </div>
  );
}

function SliderInput({ label, value, onChange, max = 100 }: { label: string; value: number; onChange: (v: number) => void; max?: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Input type="number" value={value}
            onChange={(e) => { let v = parseFloat(e.target.value) || 0; if (v > max) v = max; if (v < 0) v = 0; onChange(v); }}
            min="0" max={max} step="1"
            className="w-14 h-7 rounded-lg text-xs text-center font-bold border-border" />
          <span className="text-[10px] text-muted-foreground">%</span>
        </div>
        <label className="text-xs text-muted-foreground">{label}</label>
      </div>
      <Slider value={[value]} onValueChange={([v]) => onChange(v)} min={0} max={max} step={1} className="w-full" />
    </div>
  );
}

function QuickChips({ values, current, onChange, suffix }: { values: number[]; current: number; onChange: (v: number) => void; suffix: string }) {
  return (
    <div className="flex flex-wrap gap-1 justify-end">
      {values.map((v) => (
        <button key={v} onClick={() => onChange(v)}
          className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-all ${
            current === v ? "bg-primary/15 border-primary/40 text-primary" : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
          }`}
        >{v}{suffix}</button>
      ))}
    </div>
  );
}

function KPIBadge({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div className={`px-3 py-1 rounded-xl text-center ${positive ? "bg-success/10" : "bg-destructive/10"}`}>
      <p className={`text-sm font-bold ${positive ? "text-success" : "text-destructive"}`}>{value}</p>
      <p className="text-[9px] text-muted-foreground">{label}</p>
    </div>
  );
}

function CostLine({ label, usd, bold }: { label: string; usd: number; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-0.5`}>
      <div className="flex items-center gap-2">
        <span className={`text-sm ${bold ? "font-bold" : "font-medium"} text-foreground`}>${usd.toFixed(2)}</span>
        <span className="text-[10px] text-muted-foreground">({(usd * FX).toFixed(2)} SAR)</span>
      </div>
      <span className={`text-xs ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>{label}</span>
    </div>
  );
}
