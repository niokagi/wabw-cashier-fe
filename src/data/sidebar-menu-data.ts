import {
  FileText,
  Home,
  Inbox,
  MessageCircleQuestion,
  Settings2,
  // Users,
  // Utensils,
  ScanLine,
  ListOrdered,
  Utensils,
  // Users
} from "lucide-react"

export const sidebarMenuData = {
  teams: [
    {
      name: "N-Cashier",
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
      requiredRole: "CASHIER",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Inbox,
      requiredRole: "ADMIN",
      // badge: "10",
    },
    {
      // > admin
      title: "Orders",
      url: "/orders",
      icon: ListOrdered,
      requiredRole: "CASHIER",
      // badge: "10",
    },
    {
      // > admin
      title: "Foods",
      url: "/products",
      icon: Utensils,
      requiredRole: "ADMIN",
      // badge: "10",
    },
    // {
    //   // > admin
    //   title: "Cashiers",
    //   url: "/cashiers-detail",
    //   icon: Users,
    //   requiredRole: "ADMIN",
    //   // badge: "10",
    // },
    {
      // > admin
      title: "Reports",
      url: "/reports",
      icon: FileText,
      requiredRole: "ADMIN",
      // badge: "10",
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
