import { SidebarMenu } from "@/components/common/SidebarMenu"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import { Toaster } from "sonner"
// import { OrderDetailsSidebar } from "@/components/order/OrderDetailsSidebar"

export default function MainLayout() {
    return (
        <SidebarProvider>
            {/* left */}
            <Toaster position="top-right" richColors />
            <SidebarMenu />
            <Outlet />
            {/* right */}
            {/* moved to ordermenu.tsx/component, for usability */}
        </SidebarProvider>
    )
}