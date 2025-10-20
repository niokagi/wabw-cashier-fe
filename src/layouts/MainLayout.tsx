import { SidebarMenu } from "@/components/common/SidebarMenu"
import { OrderDetailsSidebar } from "@/components/order/OrderDetailsSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function MainLayout() {
    return (
        <SidebarProvider>
            <SidebarMenu />
            <Outlet />
            {/* moved to ordermenu.tsx/component */}
        </SidebarProvider>
    )
}