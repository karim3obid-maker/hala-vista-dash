

## Plan: Create "تحديات هلا" (Hala Challenges) Page

Based on the screenshot reference, this is a bonus & delivery challenges system with milestones, active challenges, progress tracking, and a leaderboard.

### New file: `src/pages/Challenges.tsx`

Full-featured page with these sections:

1. **Header**: Title "تحديات هلا — البونص & التسليم" with filter controls (period selector, account info) and "طلب سحب البونص" button
2. **Summary Cards Row** (4 cards):
   - Delivered هذا الشهر (e.g. 320 delivered)
   - البونص المكتسب (e.g. USD 55 earned)
   - قيد المعالجة (e.g. USD 20 pending)
   - الهدف القادم (e.g. Milestone 500, remaining 180)
3. **Progress Section**: "تقدمك نحو الهدف" with progress bar showing current/target, percentage, and note about Delivered-only counting
4. **Two-column layout**:
   - **Right: التحديات الحالية** — Active challenge cards (تحدي 500 مُسلَّم, تحدي الاستمرارية, تحدي التفعيل, تحدي الجودة) each with bonus amount, progress bar, and details button
   - **Left: سُلَّم المكافآت (Milestones)** — Tiered milestone list (100/250/500/1000 delivered) with bonus amounts and status badges (achieved/close/target/elite)
5. **Bottom Section**: Leaderboard header with period filter + bonus log section with PDF/CSV export buttons

### Files to modify
- **`src/components/AppSidebar.tsx`** — Add "تحديات هلا" menu item with `Trophy` icon at `/challenges`
- **`src/App.tsx`** — Add `/challenges` route

### Design approach
- RTL layout matching existing pages
- Mock data for all stats, challenges, milestones
- Purple accent for progress bars (matching screenshot)
- Consistent card/border styling with rest of app

