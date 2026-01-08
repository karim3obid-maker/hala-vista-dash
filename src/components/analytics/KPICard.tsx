import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel?: string;
  tooltip: string;
  suffix?: string;
  onClick?: () => void;
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = "مقارنة بالفترة السابقة",
  tooltip,
  suffix,
  onClick,
}: KPICardProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isNeutral = change === 0;

  return (
    <div
      className="kpi-card cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-muted-foreground/50 hover:text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[200px] text-right">
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          {suffix && (
            <span className="text-lg font-medium text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>

        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "trend-up" : isNegative ? "trend-down" : "trend-neutral"
          }`}
        >
          {isPositive && <TrendingUp className="w-4 h-4" />}
          {isNegative && <TrendingDown className="w-4 h-4" />}
          {isNeutral && <Minus className="w-4 h-4" />}
          <span>
            {isPositive && "+"}
            {change}%
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground/70 mt-2">{changeLabel}</p>
    </div>
  );
}
