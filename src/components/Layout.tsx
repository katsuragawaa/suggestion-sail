
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Lightbulb, 
  Kanban, 
  MessageSquarePlus,
  Settings,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Suggestions", path: "/suggestions", icon: <Lightbulb className="w-5 h-5" /> },
  { name: "Kanban Board", path: "/kanban", icon: <Kanban className="w-5 h-5" /> },
  { name: "Submit Feedback", path: "/submit", icon: <MessageSquarePlus className="w-5 h-5" /> },
  { name: "Settings", path: "/settings", icon: <Settings className="w-5 h-5" /> },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/40 px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SidebarTrigger>
              <h1 className="font-medium text-lg">
                {menuItems.find(item => item.path === location.pathname)?.name || "FeedbackHub"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Upgrade
              </Button>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                JD
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container py-6 animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="py-6 flex justify-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">F</span>
          </div>
          <span className="font-semibold text-lg">FeedbackHub</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-secondary/80"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export default Layout;
