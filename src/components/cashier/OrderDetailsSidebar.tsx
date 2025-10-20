// carts component
import * as React from "react"
import { Plus } from "lucide-react"

import { Calendars } from "@/components/calendars"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "nioka@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "Billings",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Queue",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "History",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
}

export function OrderDetailsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarHeader className="h-20 flex items-center bg-white">
        {/* <SidebarHeader className="border-sidebar-border h-16"> */}
        {/* nav user */}
        <NavUser />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Order</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
