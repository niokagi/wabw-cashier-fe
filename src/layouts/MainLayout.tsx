import { SidebarMenu } from "@/components/common/SidebarMenu"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
// import { OrderDetailsSidebar } from "@/components/order/OrderDetailsSidebar"

export default function MainLayout() {
    return (
        <SidebarProvider>
            <SidebarMenu />
            <Outlet />
            {/* moved to ordermenu.tsx/component */}
        </SidebarProvider>
    )
}