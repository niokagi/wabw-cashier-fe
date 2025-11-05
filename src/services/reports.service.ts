import apiClient from "@/lib/axios";

interface KpiStats {
    totalRevenueToday: string;
    totalOrdersToday: string;
}

export interface TopProduct {
    name: string;
    totalQuantitySold: string;
}

export interface CategoryRevenue {
    category: 'Food' | 'Beverage' | 'Dessert' | string;
    totalRevenue: string;
}

export interface DashboardStats {
    kpi: KpiStats;
    topProducts: TopProduct[];
    revenueByCategory: CategoryRevenue[];
}

interface GetDashboardStatsResponse {
    status: 'success';
    data: DashboardStats;
}

// serv func
export const getDashboardStatsService = async (): Promise<GetDashboardStatsResponse> => {
    const response = await apiClient.get<GetDashboardStatsResponse>('/reports/summary');
    return response.data;
};