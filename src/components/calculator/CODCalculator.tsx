import { useState, useMemo } from "react";
import { RefreshCw, Copy, Lock, Edit3, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Lang = "ar" | "en";

const labels: Record<string, Record<Lang, string>> = {
  title: { ar: "حاسبة التسعير والأرباح (COD)", en: "Pricing & Profit Calculator (COD)" },
  reset: { ar: "إعادة تعيين", en: "Reset" },
  copy: { ar: "نسخ السيناريو", en: "Copy Scenario" },
  inputs: { ar: "المدخلات", en: "Inputs" },
  results: { ar: "النتائج", en: "Results" },
  editableNote: { ar: "الحقول الخضراء قابلة للتعديل", en: "Green fields are editable" },
  fixedConstants: { ar: "الثوابت (غير قابلة للتعديل)", en: "Fixed Constants (Locked)" },
  section1: { ar: "المنتج والتسعير", en: "Product & Pricing" },
  section2: { ar: "نسب التأكيد والتوصيل", en: "Confirmation & Delivery" },
  section3: { ar: "الإعلانات", en: "Ads" },
  all_orders: { ar: "عدد الطلبات / Leads", en: "Total Orders / Leads" },
  product_cost_sar: { ar: "تكلفة المنتج (ريال)", en: "Product Cost (SAR)" },
  selling_price_sar: { ar: "سعر البيع (ريال)", en: "Selling Price (SAR)" },
  confirma_rate: { ar: "نسبة التأكيدات (%)", en: "Confirmation Rate (%)" },
  delivered_rate: { ar: "نسبة التوصيل (%)", en: "Delivery Rate (%)" },
  cpp_usd: { ar: "تكلفة الشراء الإعلاني ($)", en: "Cost per Purchase ($)" },
  fx: { ar: "سعر الصرف ريال/دولار", en: "FX SAR/USD" },
  cc_lead: { ar: "كول سنتر - ليد ($)", en: "Call Center - Lead ($)" },
  cc_confirm: { ar: "كول سنتر - تأكيد ($)", en: "Call Center - Confirm ($)" },
  cc_delivered: { ar: "كول سنتر - توصيل ($)", en: "Call Center - Delivered ($)" },
  ship_delivered: { ar: "شحن التوصيل ($)", en: "Shipping Delivered ($)" },
  ship_return: { ar: "شحن المرتجع ($)", en: "Shipping Return ($)" },
  cod_fee: { ar: "رسوم COD (%)", en: "COD Fee (%)" },
  fixed_costs: { ar: "تكاليف ثابتة ($)", en: "Fixed Costs ($)" },
  // Results labels
  r_lead: { ar: "الطلبات (Leads)", en: "Leads" },
  r_product: { ar: "تكلفة المنتج ($)", en: "Product Cost ($)" },
  r_confirma_rate: { ar: "نسبة التأكيد", en: "Confirma Rate" },
  r_confirmed: { ar: "المؤكدة", en: "Confirmed" },
  r_delivered_rate: { ar: "نسبة التوصيل", en: "Delivery Rate" },
  r_delivered: { ar: "الموصّلة", en: "Delivered" },
  r_failed: { ar: "فشل التوصيل", en: "Failed Delivered" },
  r_aov: { ar: "متوسط قيمة الطلب ($)", en: "AOV ($)" },
  r_sales: { ar: "المبيعات ($)", en: "Sales ($)" },
  r_shipping: { ar: "الشحن ($)", en: "Shipping ($)" },
  r_callcenter: { ar: "كول سنتر ($)", en: "Call Center ($)" },
  r_cod_fees: { ar: "رسوم COD ($)", en: "COD Fees ($)" },
  r_ads: { ar: "الإعلانات ($)", en: "Ads ($)" },
  r_product_sold: { ar: "تكلفة المنتج المباع ($)", en: "Product Sold ($)" },
  r_profits: { ar: "الأرباح ($)", en: "Profits ($)" },
  r_ep_delivered: { ar: "ربح لكل طلب موصّل ($)", en: "EP / Delivered ($)" },
  r_invest: { ar: "إجمالي الاستثمار ($)", en: "Total Investment ($)" },
  r_roi: { ar: "العائد على الاستثمار", en: "ROI" },
  r_net_profit_sales: { ar: "صافي الربح / المبيعات", en: "Net Profit / Sales" },
  r_fixed_costs: { ar: "تكاليف ثابتة ($)", en: "Fixed Costs ($)" },
  r_sales_dashboard: { ar: "مبيعات الداشبورد ($)", en: "Sales Dashboard ($)" },
  r_roi_dashboard: { ar: "ROI الداشبورد", en: "ROI Dashboard" },
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (field: string, val: number) => {
    const e = { ...errors };
    if (field === "confirma_rate" || field === "delivered_rate") {
      if (val < 0 || val > 100) {
        e[field] = lang === "ar" ? "يجب أن تكون بين 0 و 100" : "Must be 0–100";
      } else {
        delete e[field];
      }
    }
    if (field === "all_orders" && val < 0) {
      e[field] = lang === "ar" ? "يجب أن تكون 0 أو أكثر" : "Must be >= 0";
    } else if (field === "all_orders" && val >= 0) {
      delete e[field];
    }
    setErrors(e);
  };

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
    setErrors({});
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

  const fmtMoney = (v: number, currency: "$" | "SAR" = "$") =>
    `${v.toFixed(2)} ${currency}`;
  const fmtPct = (v: number) => `${(v * 100).toFixed(1)}%`;
  const fmtPctInput = (v: number) => `${v.toFixed(1)}%`;
  const fmtInt = (v: number) => v.toLocaleString();

  const FX = CONSTANTS.fx_sar_to_usd;
  const toSar = (usd: number) => fmtMoney(usd * FX, "SAR");

  type ResultRow = {
    label: string;
    value: string;
    valueSar?: string;
    style?: "default" | "highlight-yellow" | "highlight-purple" | "highlight-green" | "highlight-red";
  };

  const resultRows: ResultRow[] = [
    { label: t("r_lead", lang), value: fmtInt(allOrders) },
    { label: t("r_product", lang), value: fmtMoney(calc.productCostUsd), valueSar: fmtMoney(productCostSar, "SAR") },
    { label: t("r_confirma_rate", lang), value: fmtPctInput(confirmaRate) },
    { label: t("r_confirmed", lang), value: fmtInt(calc.confirmed) },
    { label: t("r_delivered_rate", lang), value: fmtPctInput(deliveredRate) },
    { label: t("r_delivered", lang), value: fmtInt(calc.delivered), style: "highlight-yellow" },
    { label: t("r_failed", lang), value: fmtInt(calc.failedDelivered) },
    { label: t("r_aov", lang), value: fmtMoney(calc.aovUsd), valueSar: fmtMoney(sellingPriceSar, "SAR"), style: "highlight-purple" },
    { label: t("r_sales", lang), value: fmtMoney(calc.salesUsd), valueSar: toSar(calc.salesUsd) },
    { label: t("r_shipping", lang), value: fmtMoney(calc.shippingUsd), valueSar: toSar(calc.shippingUsd) },
    { label: t("r_callcenter", lang), value: fmtMoney(calc.callCenterUsd), valueSar: toSar(calc.callCenterUsd) },
    { label: t("r_cod_fees", lang), value: fmtMoney(calc.codFeesUsd), valueSar: toSar(calc.codFeesUsd) },
    { label: t("r_ads", lang), value: fmtMoney(calc.adsUsd), valueSar: toSar(calc.adsUsd) },
    { label: t("r_product_sold", lang), value: fmtMoney(calc.productSoldUsd), valueSar: toSar(calc.productSoldUsd) },
    { label: t("r_profits", lang), value: fmtMoney(calc.profitsUsd), valueSar: toSar(calc.profitsUsd), style: calc.profitsUsd >= 0 ? "highlight-green" : "highlight-red" },
    { label: t("r_ep_delivered", lang), value: fmtMoney(calc.epDelivered), valueSar: toSar(calc.epDelivered), style: "highlight-yellow" },
    { label: t("r_invest", lang), value: fmtMoney(calc.investUsd), valueSar: toSar(calc.investUsd) },
    { label: t("r_roi", lang), value: fmtPct(calc.roi) },
    { label: t("r_net_profit_sales", lang), value: fmtPct(calc.netProfitSales) },
    { label: t("r_fixed_costs", lang), value: fmtMoney(CONSTANTS.fixed_costs_usd), valueSar: toSar(CONSTANTS.fixed_costs_usd) },
    { label: t("r_sales_dashboard", lang), value: fmtMoney(calc.salesDashboard), valueSar: toSar(calc.salesDashboard) },
    { label: t("r_roi_dashboard", lang), value: fmtPct(calc.roiDashboard) },
  ];

  const rowBg = (style?: ResultRow["style"]) => {
    switch (style) {
      case "highlight-yellow": return "bg-warning/10";
      case "highlight-purple": return "bg-primary/10";
      case "highlight-green": return "bg-success/10";
      case "highlight-red": return "bg-destructive/10";
      default: return "";
    }
  };

  const rowText = (style?: ResultRow["style"]) => {
    switch (style) {
      case "highlight-green": return "text-success font-bold";
      case "highlight-red": return "text-destructive font-bold";
      case "highlight-yellow": return "text-warning font-bold";
      case "highlight-purple": return "text-primary font-bold";
      default: return "text-foreground";
    }
  };

  const constantsList = [
    { label: t("fx", lang), value: CONSTANTS.fx_sar_to_usd.toString() },
    { label: t("cc_lead", lang), value: `$ ${CONSTANTS.call_center_lead_price}` },
    { label: t("cc_confirm", lang), value: `$ ${CONSTANTS.call_center_confirm_price}` },
    { label: t("cc_delivered", lang), value: `$ ${CONSTANTS.call_center_delivered_price}` },
    { label: t("ship_delivered", lang), value: `$ ${CONSTANTS.shipping_cost_delivered}` },
    { label: t("ship_return", lang), value: `$ ${CONSTANTS.shipping_cost_return}` },
    { label: t("cod_fee", lang), value: `${CONSTANTS.cod_fee_pct}%` },
    { label: t("fixed_costs", lang), value: `$ ${CONSTANTS.fixed_costs_usd}` },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={reset} className="rounded-xl gap-1 text-xs">
            <RefreshCw className="w-3.5 h-3.5" />
            {t("reset", lang)}
          </Button>
          <Button variant="outline" size="sm" onClick={copyScenario} className="rounded-xl gap-1 text-xs">
            <Copy className="w-3.5 h-3.5" />
            {t("copy", lang)}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="rounded-xl gap-1 text-xs"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "ar" ? "EN" : "عربي"}
          </Button>
        </div>
        <h2 className="text-lg font-bold text-foreground">{t("title", lang)}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* RIGHT COLUMN - Inputs */}
        <div className="space-y-4 order-1 lg:order-2">
          {/* Section 1 - Product & Pricing */}
          <Card title={t("section1", lang)} icon={<Edit3 className="w-4 h-4 text-accent" />}>
            <EditableField
              label={t("all_orders", lang)} value={allOrders} type="int"
              error={errors.all_orders}
              onChange={(v) => { setAllOrders(v); validate("all_orders", v); }}
            />
            <EditableField
              label={t("product_cost_sar", lang)} value={productCostSar} suffix="SAR"
              onChange={setProductCostSar}
            />
            <EditableField
              label={t("selling_price_sar", lang)} value={sellingPriceSar} suffix="SAR"
              onChange={setSellingPriceSar}
            />
          </Card>

          {/* Section 2 */}
          <Card title={t("section2", lang)} icon={<Edit3 className="w-4 h-4 text-accent" />}>
            <EditableField
              label={t("confirma_rate", lang)} value={confirmaRate} suffix="%"
              error={errors.confirma_rate}
              onChange={(v) => { setConfirmaRate(v); validate("confirma_rate", v); }}
            />
            <EditableField
              label={t("delivered_rate", lang)} value={deliveredRate} suffix="%"
              error={errors.delivered_rate}
              onChange={(v) => { setDeliveredRate(v); validate("delivered_rate", v); }}
            />
          </Card>

          {/* Section 3 */}
          <Card title={t("section3", lang)} icon={<Edit3 className="w-4 h-4 text-accent" />}>
            <EditableField
              label={t("cpp_usd", lang)} value={cppUsd} suffix="$"
              onChange={setCppUsd}
            />
          </Card>

          <p className="text-xs text-success flex items-center gap-1 justify-end">
            <span className="w-3 h-3 rounded bg-success/20 border border-success/40 inline-block" />
            {t("editableNote", lang)}
          </p>

          {/* Constants */}
          <div className="bg-card rounded-2xl border border-border p-4 space-y-3" style={{ boxShadow: "var(--shadow-card)" }}>
            <h3 className="text-sm font-bold text-muted-foreground flex items-center gap-2 justify-end">
              {t("fixedConstants", lang)}
              <Lock className="w-4 h-4" />
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {constantsList.map((c, i) => (
                <div key={i} className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2">
                  <span className="text-xs font-medium text-muted-foreground">{c.value}</span>
                  <span className="text-[11px] text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LEFT COLUMN - Results */}
        <div className="order-2 lg:order-1">
          <div className="bg-card rounded-2xl border border-border overflow-hidden sticky top-20" style={{ boxShadow: "var(--shadow-card)" }}>
            {/* Purple header */}
            <div className="bg-primary px-4 py-2.5 grid grid-cols-[1fr_auto_auto] gap-2 items-center">
              <span className="text-[11px] font-bold text-primary-foreground/70 text-center">SAR</span>
              <span className="text-[11px] font-bold text-primary-foreground/70 text-center w-[110px]">USD</span>
              <span className="text-xs font-bold text-primary-foreground text-right">{t("results", lang)}</span>
            </div>
            <div className="divide-y divide-border">
              {resultRows.map((row, i) => (
                <div key={i} className={`grid grid-cols-[1fr_auto_auto] gap-2 items-center px-4 py-2 ${rowBg(row.style)}`}>
                  <span className="text-[11px] text-muted-foreground text-center">
                    {row.valueSar || "—"}
                  </span>
                  <span className={`text-sm font-medium text-center w-[110px] ${rowText(row.style)}`}>{row.value}</span>
                  <span className="text-xs text-muted-foreground text-right">{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 space-y-3" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2 justify-end border-b border-border pb-2">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        {icon}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function EditableField({
  label, value, onChange, suffix, type = "float", error,
}: {
  label: string; value: number; onChange: (v: number) => void;
  suffix?: string; type?: "int" | "float"; error?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="relative flex-shrink-0 w-[140px]">
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              const v = type === "int" ? parseInt(e.target.value) || 0 : parseFloat(e.target.value) || 0;
              onChange(v);
            }}
            step={type === "int" ? "1" : "0.01"}
            min="0"
            className="rounded-lg h-9 text-sm text-center bg-success/5 border-success/30 focus:border-success"
          />
          {suffix && (
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">{suffix}</span>
          )}
        </div>
        <label className="text-xs text-muted-foreground">{label}</label>
      </div>
      {error && <p className="text-[10px] text-destructive text-right">{error}</p>}
    </div>
  );
}
