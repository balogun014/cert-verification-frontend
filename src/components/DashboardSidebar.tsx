import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Home, FileText, Check, LogOut, Table2 } from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Issue Certificate",
      path: "/dashboard/issue",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Verify Certificate",
      path: "/dashboard/verify",
      icon: <Check className="h-5 w-5" />,
    },
    {
      title: "View",
      path: "/admin",
      icon: <Table2 className="h-5 w-5" />,
    },
  ];
  
  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CC</span>
          </div>
          <span className="font-semibold text-lg">CertiChain</span>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center space-x-3 py-2",
                        isActive(item.path) ? "text-primary" : "text-sidebar-foreground"
                      )}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-border">
          <Button 
            variant="outline" 
            className="w-full flex items-center space-x-2 justify-center" 
            asChild
          >
            <Link to="/">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Link>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
