import { useState } from "react";
import { Product } from "@/data/productsData";
import { Calculator, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

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
  const totalCost =
    product.costPrice * q +
    ship * q +
    conf * q +
    (codP / 100) * revenue +
    (retP / 100) * revenue;
  const netProfit = revenue - totalCost;
  const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const hasResult = sell > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 justify-end">
        <h3 className="text-sm font-bold text-foreground">حاسبة الأرباح</h3>
        <Calculator className="w-4 h-4 text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <MiniInput label="عدد القطع" value={qty} onChange={setQty} />
        <MiniInput label="سعر البيع ($)" value={sellingPrice} onChange={setSellingPrice} />
        <MiniInput label="الشحن ($)" value={shipping} onChange={setShipping} />
        <MiniInput label="التأكيد ($)" value={confirmation} onChange={setConfirmation} />
        <MiniInput label="COD (%)" value={cod} onChange={setCod} />
        <MiniInput label="مرتجعات (%)" value={returnRate} onChange={setReturnRate} />
      </div>

      {hasResult && (
        <div className={`rounded-xl p-3 space-y-2 border ${netProfit >= 0 ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"}`}>
          <div className="flex items-center justify-between">
            <span className={`text-lg font-bold ${netProfit >= 0 ? "text-success" : "text-destructive"}`}>
              {netProfit.toFixed(2)} $
            </span>
            <span className="text-xs text-muted-foreground">صافي الربح</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge className={`text-[10px] border-0 ${margin >= 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
              {margin.toFixed(1)}%
            </Badge>
            <span className="text-[10px] text-muted-foreground">هامش الربح</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">{(netProfit / q).toFixed(2)} $</span>
            <span className="text-[10px] text-muted-foreground">ربح القطعة</span>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
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
