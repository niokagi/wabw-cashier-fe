import CashierProductsList from "@/components/cashier/CashierProductsList"
import SearchBar from "@/components/common/SearchBar"
import { FieldChoiceCard } from "@/components/reusable/FieldChoiceCard"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Dashboard() {
    return (
        <SidebarInset>
            <header className="bg-background sticky top-0 flex h-20 shrink-0 items-center gap-2 z-10 shadow-xs">
                <div className="flex flex-1 items-center gap-2 px-3">
                    <SidebarTrigger />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {/*  */}
                                    <SearchBar />
                                    {/*  */}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <section className="max-w-full bg-gray-50">
                <FieldChoiceCard />
                <Separator />
                <CashierProductsList />
                {/* footer for inside menu (soon) */}
            </section>
        </SidebarInset>
    )
}
