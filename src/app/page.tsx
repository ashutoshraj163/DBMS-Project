'use client';

import {Sidebar, SidebarContent, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider} from '@/components/ui/sidebar';
import {Home, Users, Settings, MessageSquare} from 'lucide-react';

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/">
                <Home className="mr-2 h-4 w-4"/>
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/guests">
                <Users className="mr-2 h-4 w-4"/>
                <span>Guests</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/reviews">
                <MessageSquare className="mr-2 h-4 w-4"/>
                <span>Reviews</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings">
                <Settings className="mr-2 h-4 w-4"/>
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <SidebarInset>
        <SidebarContent>
          <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to HotelZenith Management System.</p>
          </div>
        </SidebarContent>
      </SidebarInset>
    </SidebarProvider>
  );
}

