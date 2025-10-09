import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function MainLayout() {
    return (
        <SidebarProvider>
            <SidebarLeft />
            <Outlet />
            <SidebarRight />
        </SidebarProvider>
    )
}