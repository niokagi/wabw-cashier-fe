import * as React from "react"
import {
  BookText,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Presentation,
  Search,
  Settings2,
  Trash2,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavWorkspaces } from "./nav-workspaces"

// This is sample data.
const data = {
  teams: [
    {
      name: "Nio Cashier",
      logo: Command,
      plan: "Enterprise",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
    {
      title: "Cahiers",
      url: "#",
      icon: Users,
      badge: "10",
    },
  ],
  navSecondary: [
    // {
    //   title: "Calendar",
    //   url: "#",
    //   icon: Calendar,
    // },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
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
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
