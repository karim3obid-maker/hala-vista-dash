import { BarChart3, Calculator, ShoppingBag, Tag, ClipboardList, Package, Wallet, Users, Trophy, ShieldCheck, XCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "التحليلات", url: "/", icon: BarChart3 },
  { title: "حاسبة الأسعار", url: "/calculator", icon: Calculator },
  { title: "هلا جملة", url: "/wholesale", icon: ShoppingBag },
  { title: "الأسعار", url: "/pricing", icon: Tag },
  { title: "الطلبات", url: "/orders", icon: ClipboardList },
  { title: "المنتجات", url: "/products", icon: Package },
  { title: "المحفظة", url: "/wallet", icon: Wallet },
  { title: "الأفلييت", url: "/affiliate", icon: Users },
  { title: "تحديات هلا", url: "/challenges", icon: Trophy },
  { title: "فالديشن", url: "/validation", icon: ShieldCheck },
  { title: "طلبات الملغاة", url: "/cancelled-orders", icon: XCircle },
];

export function AppSidebar() {
  return (
    <Sidebar side="right" collapsible="icon" className="border-r-0 border-s border-border">
      <SidebarContent className="pt-6">
        {/* Logo / Brand */}
        <div className="px-4 pb-6 flex items-center gap-3 justify-end">
          <div className="flex flex-col items-end group-data-[collapsible=icon]:hidden">
            <span className="text-xl font-bold bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
              هلا كوميرس
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wide">لوحة التحكم</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg shadow-primary/25">
            <span className="text-primary-foreground font-bold text-base">هـ</span>
          </div>
        </div>

        <div className="mx-4 mb-4 h-px bg-gradient-to-l from-transparent via-border to-transparent group-data-[collapsible=icon]:hidden" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5 px-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} size="lg">
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                      activeClassName="!bg-primary/10 !text-primary font-semibold shadow-sm"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <div className="mx-4 mb-2 h-px bg-gradient-to-l from-transparent via-border to-transparent" />
        <div className="px-4 pb-4 text-center">
          <p className="text-[10px] text-muted-foreground">© 2026 هلا كوميرس</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
