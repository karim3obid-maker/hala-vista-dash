import { Wallet, ArrowUpCircle, ArrowDownCircle, ShoppingCart, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'purchase';
  description: string;
  amount: number;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  { id: '1', type: 'deposit', description: 'شحن رصيد عبر تحويل بنكي', amount: 5000, date: '2026/02/27', time: '10:30 ص', status: 'completed' },
  { id: '2', type: 'purchase', description: 'شراء منتج - سماعة بلوتوث ×50', amount: -2400, date: '2026/02/26', time: '3:15 م', status: 'completed' },
  { id: '3', type: 'deposit', description: 'شحن رصيد عبر Apple Pay', amount: 3000, date: '2026/02/25', time: '9:00 ص', status: 'completed' },
  { id: '4', type: 'withdrawal', description: 'سحب أرباح إلى الحساب البنكي', amount: -1500, date: '2026/02/24', time: '2:00 م', status: 'completed' },
  { id: '5', type: 'purchase', description: 'شراء منتج - ساعة ذكية ×30', amount: -1800, date: '2026/02/23', time: '11:45 ص', status: 'completed' },
  { id: '6', type: 'deposit', description: 'شحن رصيد عبر بطاقة ائتمان', amount: 2000, date: '2026/02/22', time: '5:30 م', status: 'pending' },
  { id: '7', type: 'withdrawal', description: 'سحب أرباح', amount: -800, date: '2026/02/21', time: '1:00 م', status: 'failed' },
];

const balance = 3500;
const totalDeposits = transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
const totalWithdrawals = Math.abs(transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0));
const totalPurchases = Math.abs(transactions.filter(t => t.type === 'purchase').reduce((sum, t) => sum + t.amount, 0));

const typeConfig = {
  deposit: { label: 'إيداع', icon: ArrowDownCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  withdrawal: { label: 'سحب', icon: ArrowUpCircle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  purchase: { label: 'شراء', icon: ShoppingCart, color: 'text-primary', bg: 'bg-primary/10' },
};

const statusConfig = {
  completed: { label: 'مكتمل', variant: 'default' as const },
  pending: { label: 'معلّق', variant: 'secondary' as const },
  failed: { label: 'فشل', variant: 'destructive' as const },
};

export default function WalletPage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
          <Wallet className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">المحفظة</h1>
          <p className="text-sm text-muted-foreground">إدارة رصيدك ومعاملاتك المالية</p>
        </div>
      </div>

      {/* Balance & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-primary to-accent text-primary-foreground border-0 shadow-xl shadow-primary/20">
          <CardContent className="p-5 text-center">
            <p className="text-sm opacity-80 mb-1">الرصيد الحالي</p>
            <p className="text-4xl font-bold">{balance.toLocaleString()}</p>
            <p className="text-sm opacity-80 mt-1">ر.س</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <TrendingDown className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">إجمالي الإيداعات</p>
              <p className="text-xl font-bold text-foreground">{totalDeposits.toLocaleString()} <span className="text-xs text-muted-foreground">ر.س</span></p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">إجمالي السحوبات</p>
              <p className="text-xl font-bold text-foreground">{totalWithdrawals.toLocaleString()} <span className="text-xs text-muted-foreground">ر.س</span></p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">إجمالي المشتريات</p>
              <p className="text-xl font-bold text-foreground">{totalPurchases.toLocaleString()} <span className="text-xs text-muted-foreground">ر.س</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-foreground">سجل المعاملات</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {transactions.map((tx) => {
              const config = typeConfig[tx.type];
              const status = statusConfig[tx.status];
              const Icon = config.icon;
              return (
                <div key={tx.id} className="flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors">
                  <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.date} • {tx.time}</p>
                  </div>
                  <div className="text-left flex flex-col items-end gap-1 shrink-0">
                    <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-500' : 'text-foreground'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ر.س
                    </span>
                    <Badge variant={status.variant} className="text-[10px] px-2 py-0">
                      {status.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
