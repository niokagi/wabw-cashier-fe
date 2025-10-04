import ProductsList from "@/components/common/ProductsList"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export default function Dashboard() {


    return (
        <SidebarProvider>
            <SidebarLeft />
            <SidebarInset>
                <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2 z-20">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">
                                        Dashboard starter template
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                {/* work here (main wrapper) */}
                {/* products list */}
                <ProductsList />
                {/*  */}
            </SidebarInset>
            <SidebarRight />
        </SidebarProvider>
    )
}
