import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";

export default function ReportsPage() {
    return (
        <>
            <SidebarInset className="bg-gray-50">
                <SiteHeader />
                <div className="flex justify-center items-center py-4 w-full h-full">
                    <h1>Coming soon</h1>
                </div>
            </SidebarInset>
        </>
    )
}