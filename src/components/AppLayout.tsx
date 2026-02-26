import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-end border-b border-border px-4 bg-card sticky top-0 z-30">
            <SidebarTrigger />
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
}
