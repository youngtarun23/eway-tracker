
import React, { useState } from 'react';
import { Truck, User, Settings, BarChart, Users, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface CompanySidebarProps {
  companyName: string;
}

export function CompanySidebar({ companyName }: CompanySidebarProps) {
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleAvatarLoad = () => {
    setAvatarLoaded(true);
  };

  const handleAvatarError = () => {
    setAvatarLoaded(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="relative h-screen">
      <Sidebar className={`transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <SidebarHeader className={`p-4 ${collapsed ? "items-center" : ""}`}>
          <div className={`flex flex-col ${collapsed ? "items-center" : "items-center"} space-y-2`}>
            <Avatar className={`${collapsed ? "w-10 h-10" : "w-20 h-20"}`}>
              <AvatarImage 
                src="/placeholder.svg" 
                alt={companyName} 
                onLoad={handleAvatarLoad} 
                onError={handleAvatarError}
              />
              <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                {getInitials(companyName)}
              </AvatarFallback>
            </Avatar>
            {!collapsed && <h2 className="text-lg font-semibold text-center">{companyName}</h2>}
          </div>
          <Separator className="my-4" />
        </SidebarHeader>
        
        <SidebarContent className={`px-2 ${collapsed ? "px-1" : "px-2"}`}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className={`w-full justify-${collapsed ? "center" : "start"}`}>
                <Truck />
                {!collapsed && <span>Dashboard</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className={`w-full justify-${collapsed ? "center" : "start"}`}>
                <BarChart />
                {!collapsed && <span>Analytics</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className={`w-full justify-${collapsed ? "center" : "start"}`}>
                <User />
                {!collapsed && <span>Company Profile</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className={`w-full justify-${collapsed ? "center" : "start"}`}>
                <Users />
                {!collapsed && <span>Manage Access</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className={`w-full justify-${collapsed ? "center" : "start"}`}>
                <Settings />
                {!collapsed && <span>Settings</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className={`p-4 ${collapsed ? "p-2" : "p-4"}`}>
          <SidebarMenuButton className={`w-full justify-${collapsed ? "center" : "start"} bg-destructive/10 text-destructive hover:bg-destructive/20`}>
            <LogOut />
            {!collapsed && <span>Log Out</span>}
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background shadow-md border" 
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </Button>
    </div>
  );
}
