import { SidebarLeft } from "@/components/sidebar-left"
import { OrderDetailsSidebar } from "@/components/cashier/OrderDetailsSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function MainLayout() {
    return (
        <SidebarProvider>
            <SidebarLeft />
            <Outlet />
            <OrderDetailsSidebar />
        </SidebarProvider>
    )
}