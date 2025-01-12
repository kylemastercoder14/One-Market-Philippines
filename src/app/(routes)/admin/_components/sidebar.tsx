import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconHelpCircle,
  IconLayersIntersect,
  IconLayoutColumns,
  IconNotebook,
  IconSettings,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react";
import Image from "next/image";
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconBrandTabler,
    },
    {
      title: "Manage Categories",
      url: "/admin/dashboard/manage-categories",
      icon: IconLayersIntersect,
    },
    {
      title: "Sellers Account",
      url: "/admin/dashboard/sellers",
      icon: IconUsers,
    },
    {
      title: "Customers",
      url: "/admin/dashboard/customers",
      icon: IconLayoutColumns,
    },
    {
      title: "Policies",
      url: "/admin/dashboard/policies",
      icon: IconNotebook,
    },
    {
      title: "Commisions",
      url: "/admin/dashboard/commisions",
      icon: IconWallet,
    },
    {
      title: "Settings",
      url: "/admin/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Help Center",
      url: "/admin/dashboard/help-center",
      icon: IconHelpCircle,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/admin/dashboard">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    1 Market Philippines
                  </span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
