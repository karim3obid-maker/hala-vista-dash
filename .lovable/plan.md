

## Plan: Create Affiliate Page (الأفلييت)

### Files to create
1. **`src/pages/Affiliate.tsx`** — New page with:
   - Header with title and icon
   - Affiliate link section with copy button
   - Summary cards: withdrawable balance, total registered accounts, total commission earned
   - Table of registered accounts showing: account name, registration date, total orders delivered, balance/commission earned

### Files to modify
2. **`src/components/AppSidebar.tsx`** — Add "الأفلييت" menu item with `Users` icon and `/affiliate` route
3. **`src/App.tsx`** — Add `/affiliate` route

### Page structure (Affiliate.tsx)
- **Top section**: Affiliate link display with copy-to-clipboard button
- **Stats cards row** (3 cards):
  - الرصيد القابل للسحب (Withdrawable balance)
  - عدد الحسابات المسجلة (Registered accounts count)
  - إجمالي العمولات (Total commissions)
- **Registered accounts table**: columns for account name, registration date, orders delivered, commission earned per account
- Sample mock data for 4-5 affiliate accounts
- RTL design matching existing wallet page style

