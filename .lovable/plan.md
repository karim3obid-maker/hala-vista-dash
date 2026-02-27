

## Plan: Add Goods Account Section to Wallet

### What will change

1. **Remove "شراء بضاعة" from transaction filters** (`walletData.ts`) — remove the `purchase` option from `transactionTypes`

2. **Add new "كشف حساب البضاعة" (Goods Account Statement) section** above the tabs in `Wallet.tsx`:
   - **4 summary cards** at the top:
     - رصيد مدين (Debit balance)
     - تكاليف بضاعة هلا شير (Hala Share costs)
     - تكاليف استيراد من الصين (China import costs)
     - تكاليف استيراد من مصر (Egypt import costs)
   - **Goods transactions table** below the cards with columns: التاريخ، النوع، المصدر، المبلغ، المرجع (matching the reference screenshot)
   - Each entry shows: amount paid, percentage deducted, source (Hala Inventory / China Fund / Egypt Fund)

3. **Add goods account data** (`walletData.ts`):
   - `goodsAccountSummary` — balances for debit, Hala, China, Egypt
   - `goodsTransactions` — sample entries for خصم بضاعة هلا, فاند استيراد الصين, فاند استيراد مصر
   - Each transaction includes quantity withdrawn and per-unit cost breakdown

4. **Add Hala product withdrawal report** within the goods section:
   - Shows product name, quantity withdrawn, unit cost, total deducted
   - Example: سحب 100 قطعة × 15 ر.س = 1,500 ر.س

### Files to modify
- `src/components/wallet/walletData.ts` — add goods account data, remove purchase from transaction types
- `src/pages/Wallet.tsx` — add goods account section with cards + table above tabs

