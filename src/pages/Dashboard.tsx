import { useQuery } from "@tanstack/react-query";
import { DashboardCharts } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboardStatsService } from "@/services/reports.service";
// import { getDashboardStatsService, type DashboardStats } from "@/services/reports.service";
import Footer from "./Footer";

function DashboardLoadingSkeleton() {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
            </div>
            <div className="px-4 lg:px-6">
                <Skeleton className="h-64 w-full rounded-lg" />
            </div>
        </div>
    );
}

export default function Dashboard() {
    const {
        data: statsData,
        isLoading,
        error
    } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: async () => {
            const response = await getDashboardStatsService();
            return response.data;
        },
        staleTime: 1000 * 60 * 10,
        refetchInterval: 1000 * 60 * 15,
    });

    if (isLoading) {
        return (
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <DashboardLoadingSkeleton />
                    </div>
                </div>
            </SidebarInset>
        );
    }

    if (error) {
        return (
            <SidebarInset>
                <SiteHeader />
                <div className="p-8 text-center text-destructive">
                    Error: {error.message}
                </div>
            </SidebarInset>
        );
    }

    const kpiStats = statsData?.kpi || { totalRevenueToday: '0', totalOrdersToday: '0' };
    const topCategory = statsData?.revenueByCategory?.[0] || null;
    const revenueData = statsData?.revenueByCategory || [];
    const topProductsData = statsData?.topProducts || [];

    return (
        <>
            <SidebarInset className="bg-gray-50">
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards kpiStats={kpiStats} topCategory={topCategory} />
                            <div className="px-4 lg:px-6">
                                <DashboardCharts
                                    revenueData={revenueData}
                                    topProductsData={topProductsData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </SidebarInset>
        </>
    );
}