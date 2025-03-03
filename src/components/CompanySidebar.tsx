
import React, { useState } from 'react';
import { Truck, User, Settings, BarChart, Users, LogOut } from 'lucide-react';
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

interface CompanySidebarProps {
  companyName: string;
}

export function CompanySidebar({ companyName }: CompanySidebarProps) {
  const [avatarLoaded, setAvatarLoaded] = useState(false);

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
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="w-20 h-20">
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
          <h2 className="text-lg font-semibold text-center">{companyName}</h2>
        </div>
        <Separator className="my-4" />
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start">
              <Truck />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start">
              <BarChart />
              <span>Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start">
              <User />
              <span>Company Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start">
              <Users />
              <span>Manage Access</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarMenuButton className="w-full justify-start bg-destructive/10 text-destructive hover:bg-destructive/20">
          <LogOut />
          <span>Log Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
