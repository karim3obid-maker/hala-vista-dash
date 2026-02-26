import { BarChart3, Calculator, ShoppingBag, Tag, ClipboardList } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "التحليلات", url: "/", icon: BarChart3 },
  { title: "حاسبة الأسعار", url: "/calculator", icon: Calculator },
  { title: "هلا جملة", url: "/wholesale", icon: ShoppingBag },
  { title: "الأسعار", url: "/pricing", icon: Tag },
  { title: "الطلبات", url: "/orders", icon: ClipboardList },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-l-0 border-e border-border">
      <SidebarContent className="pt-4">
        {/* Logo / Brand */}
        <div className="px-4 pb-4 flex items-center gap-3 justify-end">
          <div className="flex flex-col items-end group-data-[collapsible=icon]:hidden">
            <span className="text-lg font-bold text-primary">هلا كوميرس</span>
            <span className="text-xs text-muted-foreground">لوحة التحكم</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">هـ</span>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs justify-end">القائمة الرئيسية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2 rounded-xl transition-colors hover:bg-sidebar-accent"
                      activeClassName="bg-primary/10 text-primary font-semibold"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
