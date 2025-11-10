import { type LucideIcon } from "lucide-react"
import { useLocation, Link } from "react-router"
import { useAuth } from "@/contexts/AuthContext";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// defining roles
type ValidRole = 'CASHIER' | 'ADMIN' | 'SUPER_ADMIN';

const ROLE_HIERARCHY: Record<ValidRole, number> = {
    CASHIER: 1,
    ADMIN: 2,
    SUPER_ADMIN: 3,
};

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
  requiredRole?: ValidRole; 
};

export function NavMain({
  items,
}: { items: NavItem[] }) {
  const { user } = useAuth();
  const userRole = user?.role as ValidRole | undefined;
  const { pathname } = useLocation();

  // filter logic
  const isAllowed = (requiredRole?: ValidRole): boolean => {
    if (!userRole) {
        return !requiredRole; 
    }
    if (!requiredRole) return true; 

    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;

    return userLevel >= requiredLevel;
  };
  // applying filter
  const filteredItems = items.filter(item => isAllowed(item.requiredRole));

  return (
    <SidebarMenu className="p-2">
      {filteredItems.map((item) => {
        const isActive = pathname === item.url;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link to={item.url}>
                <item.icon />
                <span className="text-[0.9rem] ms-1">{item.title}</span>
                {item.badge && <span className="ml-auto text-xs font-semibold text-muted-foreground">{item.badge}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  )
}
