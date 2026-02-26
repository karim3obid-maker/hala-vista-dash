import { useState, useMemo } from "react";
import { RefreshCw, Copy, Lock, Globe, ShoppingCart, TrendingUp, Megaphone, DollarSign, Truck, Phone, Receipt, PiggyBank, Target, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Lang = "ar" | "en";

const labels: Record<string, Record<Lang, string>> = {
  title: { ar: "حاسبة التسعير والأرباح (COD)", en: "Pricing & Profit Calculator (COD)" },
  reset: { ar: "إعادة تعيين", en: "Reset" },
  copy: { ar: "نسخ السيناريو", en: "Copy Scenario" },
  editableNote: { ar: "عدّل القيم لحساب أرباحك فوراً", en: "Edit values to calculate profits instantly" },
  fixedConstants: { ar: "الثوابت الثابتة", en: "Fixed Constants" },
  section1: { ar: "المنتج والتسعير", en: "Product & Pricing" },
  section2: { ar: "نسب التأكيد والتوصيل", en: "Confirmation & Delivery" },
  section3: { ar: "الإعلانات", en: "Ads" },
  all_orders: { ar: "عدد الطلبات", en: "Total Orders" },
  product_cost_sar: { ar: "تكلفة المنتج", en: "Product Cost" },
  selling_price_sar: { ar: "سعر البيع", en: "Selling Price" },
  confirma_rate: { ar: "نسبة التأكيدات", en: "Confirmation Rate" },
  delivered_rate: { ar: "نسبة التوصيل", en: "Delivery Rate" },
  cpp_usd: { ar: "تكلفة الشراء الإعلاني", en: "Cost per Purchase" },
  fx: { ar: "سعر الصرف", en: "FX Rate" },
  cc_lead: { ar: "كول سنتر - ليد", en: "CC Lead" },
  cc_confirm: { ar: "كول سنتر - تأكيد", en: "CC Confirm" },
  cc_delivered: { ar: "كول سنتر - توصيل", en: "CC Delivered" },
  ship_delivered: { ar: "شحن توصيل", en: "Ship Delivered" },
  ship_return: { ar: "شحن مرتجع", en: "Ship Return" },
  cod_fee: { ar: "رسوم COD", en: "COD Fee" },
  fixed_costs: { ar: "تكاليف ثابتة", en: "Fixed Costs" },
};

const t = (key: string, lang: Lang) => labels[key]?.[lang] || key;

const DEFAULTS = {
  all_orders: 200,
  product_cost_sar: 22.5,
  selling_price_sar: 247,
  confirma_rate: 55,
  delivered_rate: 35,
  cpp_usd: 6,
};

const CONSTANTS = {
  fx_sar_to_usd: 3.75,
  call_center_lead_price: 0.5,
  call_center_confirm_price: 1.0,
  call_center_delivered_price: 1.5,
  shipping_cost_delivered: 5.0,
  shipping_cost_return: 3.0,
  cod_fee_pct: 5.0,
  fixed_costs_usd: 0.0,
};

export function CODCalculator() {
  const [lang, setLang] = useState<Lang>("ar");
  const [allOrders, setAllOrders] = useState(DEFAULTS.all_orders);
  const [productCostSar, setProductCostSar] = useState(DEFAULTS.product_cost_sar);
  const [sellingPriceSar, setSellingPriceSar] = useState(DEFAULTS.selling_price_sar);
  const [confirmaRate, setConfirmaRate] = useState(DEFAULTS.confirma_rate);
  const [deliveredRate, setDeliveredRate] = useState(DEFAULTS.delivered_rate);
  const [cppUsd, setCppUsd] = useState(DEFAULTS.cpp_usd);
  const [showConstants, setShowConstants] = useState(false);

  const calc = useMemo(() => {
    const C = CONSTANTS;
    const productCostUsd = productCostSar / C.fx_sar_to_usd;
    const aovUsd = sellingPriceSar / C.fx_sar_to_usd;

    let confirmed = Math.round(allOrders * (confirmaRate / 100));
    if (confirmed < 0) confirmed = 0;
    let delivered = Math.round(confirmed * (deliveredRate / 100));
    if (delivered > confirmed) delivered = confirmed;
    if (delivered < 0) delivered = 0;
    const failedDelivered = confirmed - delivered;

    const salesUsd = delivered * aovUsd;
    const adsUsd = allOrders * cppUsd;
    const productSoldUsd = delivered * productCostUsd;
    const shippingUsd = delivered * C.shipping_cost_delivered + failedDelivered * C.shipping_cost_return;
    const callCenterUsd = allOrders * C.call_center_lead_price + confirmed * C.call_center_confirm_price + delivered * C.call_center_delivered_price;
    const codFeesUsd = salesUsd * (C.cod_fee_pct / 100);
    const investUsd = adsUsd + productSoldUsd + shippingUsd + callCenterUsd + codFeesUsd + C.fixed_costs_usd;
    const profitsUsd = salesUsd - investUsd;
    const epDelivered = delivered > 0 ? profitsUsd / delivered : 0;
    const roi = investUsd > 0 ? profitsUsd / investUsd : 0;
    const netProfitSales = salesUsd > 0 ? profitsUsd / salesUsd : 0;
    const salesDashboard = aovUsd * allOrders;
    const roiDashboard = adsUsd > 0 ? salesDashboard / adsUsd : 0;

    return {
      productCostUsd, aovUsd, confirmed, delivered, failedDelivered,
      salesUsd, adsUsd, productSoldUsd, shippingUsd, callCenterUsd,
      codFeesUsd, investUsd, profitsUsd, epDelivered, roi,
      netProfitSales, salesDashboard, roiDashboard,
    };
  }, [allOrders, productCostSar, sellingPriceSar, confirmaRate, deliveredRate, cppUsd]);

  const reset = () => {
    setAllOrders(DEFAULTS.all_orders);
    setProductCostSar(DEFAULTS.product_cost_sar);
    setSellingPriceSar(DEFAULTS.selling_price_sar);
    setConfirmaRate(DEFAULTS.confirma_rate);
    setDeliveredRate(DEFAULTS.delivered_rate);
    setCppUsd(DEFAULTS.cpp_usd);
  };

  const copyScenario = () => {
    const data = {
      inputs: { allOrders, productCostSar, sellingPriceSar, confirmaRate, deliveredRate, cppUsd },
      constants: CONSTANTS,
      results: calc,
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast.success(lang === "ar" ? "تم نسخ السيناريو" : "Scenario copied!");
  };

  const FX = CONSTANTS.fx_sar_to_usd;
  const fmt = (v: number) => v.toFixed(2);
  const fmtSar = (usd: number) => fmt(usd * FX);

  const isProfitable = calc.profitsUsd >= 0;

  const constantsList = [
    { label: t("fx", lang), value: `${CONSTANTS.fx_sar_to_usd}` },
    { label: t("cc_lead", lang), value: `$${CONSTANTS.call_center_lead_price}` },
    { label: t("cc_confirm", lang), value: `$${CONSTANTS.call_center_confirm_price}` },
    { label: t("cc_delivered", lang), value: `$${CONSTANTS.call_center_delivered_price}` },
    { label: t("ship_delivered", lang), value: `$${CONSTANTS.shipping_cost_delivered}` },
    { label: t("ship_return", lang), value: `$${CONSTANTS.shipping_cost_return}` },
    { label: t("cod_fee", lang), value: `${CONSTANTS.cod_fee_pct}%` },
    { label: t("fixed_costs", lang), value: `$${CONSTANTS.fixed_costs_usd}` },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={reset} className="rounded-xl gap-1.5 text-xs h-8">
            <RefreshCw className="w-3.5 h-3.5" />
            {t("reset", lang)}
          </Button>
          <Button variant="outline" size="sm" onClick={copyScenario} className="rounded-xl gap-1.5 text-xs h-8">
            <Copy className="w-3.5 h-3.5" />
            {t("copy", lang)}
          </Button>
          <Button
            variant="ghost" size="sm"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="rounded-xl gap-1 text-xs h-8"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "ar" ? "EN" : "عربي"}
          </Button>
        </div>
        <h2 className="text-lg font-bold text-foreground">{t("title", lang)}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* ===== RIGHT: INPUTS (2 cols) ===== */}
        <div className="lg:col-span-2 space-y-4 order-1 lg:order-2">
          {/* Product & Pricing */}
          <InputCard
            title={t("section1", lang)}
            icon={<ShoppingCart className="w-4 h-4 text-accent" />}
            color="accent"
          >
            <NumberInput
              label={t("all_orders", lang)} value={allOrders}
              onChange={setAllOrders} suffix={lang === "ar" ? "طلب" : "orders"} step={1}
            />
            <NumberInput
              label={t("product_cost_sar", lang)} value={productCostSar}
              onChange={setProductCostSar} suffix="SAR" step={0.5}
            />
            <NumberInput
              label={t("selling_price_sar", lang)} value={sellingPriceSar}
              onChange={setSellingPriceSar} suffix="SAR" step={1}
            />
          </InputCard>

          {/* Rates with sliders */}
          <InputCard
            title={t("section2", lang)}
            icon={<Target className="w-4 h-4 text-primary" />}
            color="primary"
          >
            <SliderInput
              label={t("confirma_rate", lang)} value={confirmaRate}
              onChange={setConfirmaRate} color="primary"
            />
            <QuickChips values={[50, 55, 60, 65, 70]} current={confirmaRate} onChange={setConfirmaRate} suffix="%" />
            <SliderInput
              label={t("delivered_rate", lang)} value={deliveredRate}
              onChange={setDeliveredRate} color="success"
            />
            <QuickChips values={[20, 30, 40, 50, 60]} current={deliveredRate} onChange={setDeliveredRate} suffix="%" />
          </InputCard>

          {/* Ads */}
          <InputCard
            title={t("section3", lang)}
            icon={<Megaphone className="w-4 h-4 text-accent" />}
            color="accent"
          >
            <NumberInput
              label={t("cpp_usd", lang)} value={cppUsd}
              onChange={setCppUsd} suffix="$" step={0.5}
            />
            <QuickChips values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} current={cppUsd} onChange={setCppUsd} suffix="$" />
          </InputCard>

          <p className="text-[11px] text-muted-foreground text-center">
            {t("editableNote", lang)}
          </p>

          {/* Constants toggle */}
          <button
            onClick={() => setShowConstants(!showConstants)}
            className="w-full flex items-center justify-between bg-muted/30 rounded-xl px-4 py-2.5 text-xs text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="font-medium">{t("fixedConstants", lang)}</span>
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

        {/* ===== LEFT: RESULTS (3 cols) ===== */}
        <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
          {/* === HERO PROFIT CARD === */}
          <div
            className={`relative overflow-hidden rounded-2xl p-6 border-2 transition-colors ${
              isProfitable
                ? "bg-gradient-to-bl from-success/10 via-success/5 to-card border-success/30"
                : "bg-gradient-to-bl from-destructive/10 via-destructive/5 to-card border-destructive/30"
            }`}
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Background decoration */}
            <div className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-20 ${isProfitable ? "bg-success" : "bg-destructive"}`} />
            
            <div className="relative flex flex-col items-center text-center gap-3">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isProfitable ? "bg-success/15" : "bg-destructive/15"}`}>
                {isProfitable
                  ? <ArrowUpRight className="w-7 h-7 text-success" />
                  : <ArrowDownRight className="w-7 h-7 text-destructive" />
                }
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {lang === "ar" ? "صافي الأرباح" : "Net Profit"}
              </p>
              <div className="flex items-baseline gap-3">
                <span className={`text-4xl font-black tracking-tight ${isProfitable ? "text-success" : "text-destructive"}`}>
                  ${fmt(calc.profitsUsd)}
                </span>
                <span className="text-lg text-muted-foreground font-medium">
                  ({fmtSar(calc.profitsUsd)} SAR)
                </span>
              </div>
              
              {/* KPI row */}
              <div className="flex items-center gap-4 mt-1">
                <KPIBadge
                  label={lang === "ar" ? "هامش الربح" : "Margin"}
                  value={`${(calc.netProfitSales * 100).toFixed(1)}%`}
                  positive={calc.netProfitSales >= 0}
                />
                <KPIBadge
                  label="ROI"
                  value={`${(calc.roi * 100).toFixed(1)}%`}
                  positive={calc.roi >= 0}
                />
                <KPIBadge
                  label={lang === "ar" ? "ربح/طلب" : "EP/Order"}
                  value={`$${fmt(calc.epDelivered)}`}
                  positive={calc.epDelivered >= 0}
                />
              </div>
            </div>
          </div>

          {/* === FUNNEL CARDS === */}
          <div className="grid grid-cols-4 gap-3">
            <MiniKPI
              icon={<ShoppingCart className="w-4 h-4" />}
              label={lang === "ar" ? "الطلبات" : "Leads"}
              value={allOrders.toLocaleString()}
              color="primary"
            />
            <MiniKPI
              icon={<Phone className="w-4 h-4" />}
              label={lang === "ar" ? "المؤكدة" : "Confirmed"}
              value={calc.confirmed.toLocaleString()}
              sub={`${confirmaRate}%`}
              color="primary"
            />
            <MiniKPI
              icon={<Truck className="w-4 h-4" />}
              label={lang === "ar" ? "الموصّلة" : "Delivered"}
              value={calc.delivered.toLocaleString()}
              sub={`${deliveredRate}%`}
              color="success"
            />
            <MiniKPI
              icon={<ArrowDownRight className="w-4 h-4" />}
              label={lang === "ar" ? "فشل التوصيل" : "Failed"}
              value={calc.failedDelivered.toLocaleString()}
              color="destructive"
            />
          </div>

          {/* === REVENUE & COSTS === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Revenue */}
            <ResultCard
              title={lang === "ar" ? "الإيرادات" : "Revenue"}
              icon={<DollarSign className="w-4 h-4 text-success" />}
            >
              <ResultLine label={lang === "ar" ? "المبيعات" : "Sales"} usd={calc.salesUsd} sar={calc.salesUsd * FX} bold />
              <ResultLine label={lang === "ar" ? "متوسط قيمة الطلب" : "AOV"} usd={calc.aovUsd} sar={sellingPriceSar} highlight="primary" />
              <ResultLine label={lang === "ar" ? "مبيعات الداشبورد" : "Sales Dashboard"} usd={calc.salesDashboard} sar={calc.salesDashboard * FX} />
              <ResultLine label={lang === "ar" ? "ROI الداشبورد" : "ROI Dashboard"} value={`${(calc.roiDashboard * 100).toFixed(1)}%`} />
            </ResultCard>

            {/* Costs */}
            <ResultCard
              title={lang === "ar" ? "التكاليف" : "Costs"}
              icon={<Receipt className="w-4 h-4 text-destructive" />}
            >
              <ResultLine label={lang === "ar" ? "الإعلانات" : "Ads"} usd={calc.adsUsd} sar={calc.adsUsd * FX} />
              <ResultLine label={lang === "ar" ? "المنتج المباع" : "Product Sold"} usd={calc.productSoldUsd} sar={calc.productSoldUsd * FX} />
              <ResultLine label={lang === "ar" ? "الشحن" : "Shipping"} usd={calc.shippingUsd} sar={calc.shippingUsd * FX} />
              <ResultLine label={lang === "ar" ? "كول سنتر" : "Call Center"} usd={calc.callCenterUsd} sar={calc.callCenterUsd * FX} />
              <ResultLine label={lang === "ar" ? "رسوم COD" : "COD Fees"} usd={calc.codFeesUsd} sar={calc.codFeesUsd * FX} />
              <div className="border-t border-border pt-2 mt-1">
                <ResultLine label={lang === "ar" ? "إجمالي الاستثمار" : "Total Investment"} usd={calc.investUsd} sar={calc.investUsd * FX} bold highlight="destructive" />
              </div>
            </ResultCard>
          </div>

          {/* === CHARTS === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cost Distribution Pie */}
            <div className="bg-card rounded-2xl border border-border p-4 space-y-3" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-2 justify-end border-b border-border pb-2">
                <h3 className="text-sm font-bold text-foreground">
                  {lang === "ar" ? "توزيع التكاليف" : "Cost Breakdown"}
                </h3>
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: lang === "ar" ? "الإعلانات" : "Ads", value: Math.round(calc.adsUsd * 100) / 100 },
                        { name: lang === "ar" ? "المنتج" : "Product", value: Math.round(calc.productSoldUsd * 100) / 100 },
                        { name: lang === "ar" ? "الشحن" : "Shipping", value: Math.round(calc.shippingUsd * 100) / 100 },
                        { name: lang === "ar" ? "كول سنتر" : "Call Center", value: Math.round(calc.callCenterUsd * 100) / 100 },
                        { name: lang === "ar" ? "رسوم COD" : "COD Fees", value: Math.round(calc.codFeesUsd * 100) / 100 },
                      ].filter(d => d.value > 0)}
                      cx="50%" cy="50%"
                      innerRadius={45} outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {["hsl(var(--primary))", "hsl(var(--accent))", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)", "hsl(var(--destructive))"].map((color, i) => (
                        <Cell key={i} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0];
                        return (
                          <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
                            <p className="font-bold text-foreground">{d.name}</p>
                            <p className="text-muted-foreground">${Number(d.value).toFixed(2)}</p>
                          </div>
                        );
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => <span className="text-[10px] text-muted-foreground mr-1">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Bar Chart */}
            <div className="bg-card rounded-2xl border border-border p-4 space-y-3" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-2 justify-end border-b border-border pb-2">
                <h3 className="text-sm font-bold text-foreground">
                  {lang === "ar" ? "مؤشرات الأداء" : "Performance"}
                </h3>
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: lang === "ar" ? "تأكيد" : "Confirm",
                        value: confirmaRate,
                      },
                      {
                        name: lang === "ar" ? "توصيل" : "Deliver",
                        value: deliveredRate,
                      },
                      {
                        name: lang === "ar" ? "هامش" : "Margin",
                        value: Math.round(calc.netProfitSales * 1000) / 10,
                      },
                      {
                        name: "ROI",
                        value: Math.round(calc.roi * 1000) / 10,
                      },
                    ]}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 'auto']} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis type="category" dataKey="name" width={50} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0];
                        return (
                          <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
                            <p className="font-bold text-foreground">{d.payload?.name}</p>
                            <p className="text-muted-foreground">{Number(d.value).toFixed(1)}%</p>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                      {[
                        "hsl(var(--primary))",
                        "hsl(142, 71%, 45%)",
                        calc.netProfitSales >= 0 ? "hsl(142, 71%, 45%)" : "hsl(var(--destructive))",
                        calc.roi >= 0 ? "hsl(var(--accent))" : "hsl(var(--destructive))",
                      ].map((color, i) => (
                        <Cell key={i} fill={color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Sub Components ===== */

function QuickChips({ values, current, onChange, suffix }: {
  values: number[]; current: number; onChange: (v: number) => void; suffix: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-end">
      {values.map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
            current === v
              ? "bg-primary/15 border-primary/40 text-primary ring-1 ring-primary/20"
              : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
          }`}
        >
          {v}{suffix}
        </button>
      ))}
    </div>
  );
}


function InputCard({ title, icon, color, children }: {
  title: string; icon: React.ReactNode; color: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className={`flex items-center gap-2 justify-end`}>
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <div className={`w-7 h-7 rounded-lg bg-${color}/10 flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function NumberInput({ label, value, onChange, suffix, step = 1 }: {
  label: string; value: number; onChange: (v: number) => void; suffix: string; step?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[130px] flex-shrink-0">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step}
          min="0"
          className="rounded-xl h-10 text-sm text-center bg-success/5 border-success/30 focus:border-success pr-3 pl-10 font-medium"
        />
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-success/70">{suffix}</span>
      </div>
      <label className="text-xs text-muted-foreground flex-1 text-right">{label}</label>
    </div>
  );
}

function SliderInput({ label, value, onChange, color }: {
  label: string; value: number; onChange: (v: number) => void; color: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              let v = parseFloat(e.target.value) || 0;
              if (v > 100) v = 100;
              if (v < 0) v = 0;
              onChange(v);
            }}
            min="0" max="100" step="1"
            className="w-16 h-7 rounded-lg text-xs text-center font-bold border-border"
          />
          <span className="text-xs text-muted-foreground">%</span>
        </div>
        <label className="text-xs text-muted-foreground">{label}</label>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={0} max={100} step={1}
        className="w-full"
      />
      <div className="flex justify-between text-[9px] text-muted-foreground/50">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

function KPIBadge({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div className={`px-3 py-1.5 rounded-xl text-center ${positive ? "bg-success/10" : "bg-destructive/10"}`}>
      <p className={`text-sm font-bold ${positive ? "text-success" : "text-destructive"}`}>{value}</p>
      <p className="text-[9px] text-muted-foreground">{label}</p>
    </div>
  );
}

function MiniKPI({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; color: string;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-3 text-center space-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className={`w-8 h-8 rounded-lg bg-${color}/10 flex items-center justify-center mx-auto text-${color}`}>
        {icon}
      </div>
      <p className="text-lg font-bold text-foreground">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function ResultCard({ title, icon, children }: {
  title: string; icon: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 space-y-3" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2 justify-end border-b border-border pb-2">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        {icon}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ResultLine({ label, usd, sar, value, bold, highlight }: {
  label: string; usd?: number; sar?: number; value?: string; bold?: boolean; highlight?: string;
}) {
  const textClass = highlight === "primary" ? "text-primary" : highlight === "destructive" ? "text-destructive" : highlight === "success" ? "text-success" : "text-foreground";
  return (
    <div className={`flex items-center justify-between py-1 ${highlight ? `bg-${highlight}/5 -mx-2 px-2 rounded-lg` : ""}`}>
      <div className="flex items-center gap-3">
        {value ? (
          <span className={`text-sm ${bold ? "font-bold" : "font-medium"} ${textClass}`}>{value}</span>
        ) : (
          <>
            <span className={`text-sm ${bold ? "font-bold" : "font-medium"} ${textClass}`}>
              ${usd?.toFixed(2)}
            </span>
            {sar !== undefined && (
              <span className="text-[10px] text-muted-foreground">
                ({sar.toFixed(0)} SAR)
              </span>
            )}
          </>
        )}
      </div>
      <span className={`text-xs ${bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{label}</span>
    </div>
  );
}
