import { useState } from "react";
import { Product } from "@/data/productsData";
import { Calculator, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Props {
  product: Product;
}

export function ProductCalculator({ product }: Props) {
  const [sellingPrice, setSellingPrice] = useState("");
  const [qty, setQty] = useState("1");
  const [shipping, setShipping] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [cod, setCod] = useState("");
  const [returnRate, setReturnRate] = useState("");

  const sell = parseFloat(sellingPrice) || 0;
  const q = parseInt(qty) || 1;
  const ship = parseFloat(shipping) || 0;
  const conf = parseFloat(confirmation) || 0;
  const codP = parseFloat(cod) || 0;
  const retP = parseFloat(returnRate) || 0;

  const revenue = sell * q;
  const productCost = product.costPrice * q;
  const shippingCost = ship * q;
  const confirmationCost = conf * q;
  const codCost = (codP / 100) * revenue;
  const returnCost = (retP / 100) * revenue;
  const totalCost = productCost + shippingCost + confirmationCost + codCost + returnCost;
  const netProfit = revenue - totalCost;
  const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const confirmRate = 100 - (retP || 0);
  const deliveryRate = 100 - (codP || 0);
  const hasResult = sell > 0;

  const costBreakdown = [
    { name: "تكلفة المنتج", value: productCost, color: "hsl(var(--primary))" },
    { name: "الشحن", value: shippingCost, color: "hsl(var(--accent))" },
    { name: "التأكيد", value: confirmationCost, color: "hsl(var(--muted-foreground))" },
    { name: "COD", value: codCost, color: "hsl(220, 70%, 55%)" },
    { name: "مرتجعات", value: returnCost, color: "hsl(var(--destructive))" },
  ].filter(item => item.value > 0);

  const ratesData = [
    { name: "التأكيد", rate: confirmRate },
    { name: "التوصيل", rate: deliveryRate },
  ];

  return (
    <div className="space-y-6 text-right">
      <div className="flex items-center gap-2 justify-end">
        <h3 className="text-sm font-bold text-foreground">حاسبة الأرباح</h3>
        <Calculator className="w-4 h-4 text-primary" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <MiniInput label="سعر البيع ($)" value={sellingPrice} onChange={setSellingPrice} />
        <MiniInput label="عدد القطع" value={qty} onChange={setQty} />
        <MiniInput label="الشحن ($)" value={shipping} onChange={setShipping} />
        <MiniInput label="التأكيد ($)" value={confirmation} onChange={setConfirmation} />
        <MiniInput label="COD (%)" value={cod} onChange={setCod} />
        <MiniInput label="مرتجعات (%)" value={returnRate} onChange={setReturnRate} />
      </div>

      {hasResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Results */}
          <div className="space-y-4">
            {/* Net Profit Card */}
            <div className={`rounded-xl p-4 space-y-3 border ${netProfit >= 0 ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"}`}>
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${netProfit >= 0 ? "text-success" : "text-destructive"}`}>
                  {netProfit.toFixed(2)} $
                </span>
                <span className="text-xs text-muted-foreground">صافي الربح</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className={`text-xs border-0 ${margin >= 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                  {margin.toFixed(1)}%
                </Badge>
                <span className="text-xs text-muted-foreground">هامش الربح</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{(netProfit / q).toFixed(2)} $</span>
                <span className="text-xs text-muted-foreground">ربح القطعة</span>
              </div>
            </div>

            {/* Rates Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border p-3 text-center space-y-1">
                <span className="text-xs text-muted-foreground">نسبة التأكيد</span>
                <p className={`text-xl font-bold ${confirmRate >= 80 ? "text-success" : confirmRate >= 50 ? "text-accent" : "text-destructive"}`}>
                  {confirmRate.toFixed(0)}%
                </p>
              </div>
              <div className="rounded-xl border border-border p-3 text-center space-y-1">
                <span className="text-xs text-muted-foreground">نسبة التوصيل</span>
                <p className={`text-xl font-bold ${deliveryRate >= 80 ? "text-success" : deliveryRate >= 50 ? "text-accent" : "text-destructive"}`}>
                  {deliveryRate.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-4">
            {/* Cost Breakdown Pie */}
            {costBreakdown.length > 0 && (
              <div className="rounded-xl border border-border p-4">
                <h4 className="text-xs font-semibold text-muted-foreground mb-3 text-right">توزيع التكاليف</h4>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        dataKey="value"
                        paddingAngle={3}
                      >
                        {costBreakdown.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload?.length) {
                            return (
                              <div className="bg-card border border-border rounded-lg p-2 shadow-lg text-xs">
                                <span className="text-muted-foreground">{payload[0].name}: </span>
                                <span className="font-bold text-foreground">{Number(payload[0].value).toFixed(2)} $</span>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {costBreakdown.map((item, i) => (
                    <div key={i} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rates Bar Chart */}
            <div className="rounded-xl border border-border p-4">
              <h4 className="text-xs font-semibold text-muted-foreground mb-3 text-right">معدلات الأداء</h4>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ratesData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={60} />
                    <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={20}>
                      {ratesData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.rate >= 80 ? "hsl(var(--success))" : entry.rate >= 50 ? "hsl(var(--accent))" : "hsl(var(--destructive))"}
                        />
                      ))}
                    </Bar>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload?.length) {
                          return (
                            <div className="bg-card border border-border rounded-lg p-2 shadow-lg text-xs">
                              <span className="font-bold text-foreground">{Number(payload[0].value).toFixed(0)}%</span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1 text-right">
      <Label className="text-[10px] text-muted-foreground">{label}</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="rounded-lg h-8 text-xs text-center"
        min="0"
        step="0.01"
      />
    </div>
  );
}
