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
  Utensils,
} from "lucide-react"

export const sidebarMenuData = {
  teams: [
    {
      name: "Nio Cashier",
      logo: Command,
      plan: "Enterprise",
    },
  ],
  // add url
  navMain: [
    {
      title: "Menu",
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
      title: "Foods",
      url: "#",
      icon: Utensils,
      badge: "10",
    },
    {
      // > admin
      title: "Cashiers",
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
  // bottom
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
