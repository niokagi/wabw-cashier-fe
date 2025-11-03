import { DataTable } from "@/components/data-table";
import data from "./data.json"
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";

export default function OrdersPage() {
    return (
        <>
            <SidebarInset>
                <SiteHeader />
                <div className="py-4">
                    <DataTable data={data} />
                </div>
            </SidebarInset>
        </>
    )
}