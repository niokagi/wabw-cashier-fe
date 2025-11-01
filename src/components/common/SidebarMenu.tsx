import * as React from "react"

import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavSecondary } from "../nav-secondary"
import { Separator } from "@radix-ui/react-separator"
import { sidebarMenuData } from "@/data/sidebar-menu-data"
import { TeamSwitcher } from "../team-switcher"

export function SidebarMenu({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 z-20" {...props}>
      <SidebarHeader className="pt-6 bg-white">
        {/* opsional */}
        <TeamSwitcher teams={sidebarMenuData.teams} />
        {/* <div className="flex gap-2 items-center sm:justify-center px-2">
          <span className="truncate font-medium text-[1.05rem]">{"< "}{sidebarMenuData.teams[0].name}{" />"}</span>
        </div> */}
        <Separator  />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={sidebarMenuData.navMain} />
        <NavSecondary items={sidebarMenuData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
