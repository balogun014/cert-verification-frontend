import React from 'react';
import { 
  Bell, 
  Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHeader = ({ title }: { title: string }) => {
  return (
    <header className="p-4 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        
        <div className="hidden sm:flex items-center gap-x-2">
      
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
          
          <div className="border-l border-border h-8 mx-2"></div>
          
          <div className="flex items-center gap-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback>Ad</AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="text-xs text-muted-foreground">Organization Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
