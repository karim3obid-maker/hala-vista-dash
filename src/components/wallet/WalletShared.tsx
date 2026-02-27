/* Shared small components for Wallet */

export function StatCard({ item }: { item: { label: string; value: string | number; icon: any; color: string; bgColor: string; suffix?: string; highlight?: boolean } }) {
  const Icon = item.icon;
  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all hover:shadow-sm ${
      item.highlight
        ? "bg-primary/5 border-primary/20 hover:border-primary/40"
        : "bg-card border-border hover:border-primary/20"
    }`}>
      <div className={`p-2 rounded-lg ${item.bgColor} shrink-0`}>
        <Icon className={`w-4 h-4 ${item.color}`} />
      </div>
      <div className="min-w-0 text-right flex-1">
        <p className={`text-lg font-bold text-foreground leading-tight ${item.highlight ? "text-xl" : ""}`}>
          {typeof item.value === "number" ? item.value.toLocaleString("ar-SA") : item.value}
          {item.suffix && <span className="text-xs font-medium text-muted-foreground mr-1">{item.suffix}</span>}
        </p>
        <p className="text-[11px] text-muted-foreground truncate leading-tight mt-0.5">{item.label}</p>
      </div>
    </div>
  );
}

export function SectionHeader({ title, icon: Icon, accentColor, badge }: { title: string; icon: any; accentColor: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className={`p-1.5 rounded-lg ${accentColor}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      {badge && (
        <span className="text-[10px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{badge}</span>
      )}
    </div>
  );
}
