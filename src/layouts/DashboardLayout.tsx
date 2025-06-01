import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from '@/components/DashboardSidebar';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <DashboardSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
