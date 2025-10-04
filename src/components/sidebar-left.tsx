import * as React from "react"
import {
  BookText,
  Command,
  FileText,
  Home,
  Inbox,
  MessageCircleQuestion,
  Presentation,
  Settings2,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary"
import { Separator } from "@radix-ui/react-separator"
// import { NavWorkspaces } from "./nav-workspaces"

// This is sample data.
const data = {
  teams: [
    {
      name: "Nio Cashier",
      logo: Command,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Dashboard",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
    {
      // > admin
      title: "Cashiers List",
      url: "#",
      icon: Users,
      badge: "10",
    },
    {
      // > admin
      title: "Reports",
      url: "#",
      icon: FileText,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  favorites: [
    {
      name: "Project Management",
      url: "#",
      icon: Presentation,
    },
    {
      name: "Book Notes",
      url: "#",
      icon: BookText,
    },
  ],
  workspaces: [
    {
      name: "Creative Projects",
      emoji: "",
      pages: [
        {
          name: "Writing Ideas & Story Outlines",
          url: "#",
          emoji: "",
        },
        {
          name: "Art & Design Portfolio",
          url: "#",
          emoji: "",
        },
      ],
    },
  ],
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="pt-6">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex gap-2 items-center px-2">
          <span className="truncate font-medium">{"< "}{data.teams[0].name}{" />"}</span>
        </div>
        <Separator  />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites favorites={data.favorites} /> */}
        {/* <NavWorkspaces workspaces={data.workspaces} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
