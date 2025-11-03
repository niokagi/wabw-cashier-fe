import {
  FileText,
  Home,
  Inbox,
  MessageCircleQuestion,
  Settings2,
  Users,
  Utensils,
  ScanLine,
  ListOrdered
} from "lucide-react"

export const sidebarMenuData = {
  teams: [
    {
      name: "Nio Cashier",
      logo: ScanLine,
      plan: "Enterprise",
    },
  ],
  // add url
  navMain: [
    {
      title: "Menu",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Inbox,
      badge: "10",
    },
    {
      // > admin
      title: "Orders",
      url: "/orders",
      icon: ListOrdered,
      badge: "10",
    },
    {
      // > admin
      title: "Foods",
      url: "/foods-detail",
      icon: Utensils,
      badge: "10",
    },
    {
      // > admin
      title: "Cashiers",
      url: "/cashiers-detail",
      icon: Users,
      badge: "10",
    },
    {
      // > admin
      title: "Reports",
      url: "/reports",
      icon: FileText,
      badge: "10",
    },
  ],
  // bottom
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
    {
      title: "Help",
      url: "/help",
      icon: MessageCircleQuestion,
    },
  ],
}
