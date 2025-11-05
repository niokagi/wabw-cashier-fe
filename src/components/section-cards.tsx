import { IconTrendingUp, IconCash, IconNotes, IconCategory } from "@tabler/icons-react";
import { formatIDR } from "@/utils/formatters"; // Asumsi Anda memiliki ini

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Tentukan props yang diterima
interface SectionCardsProps {
  kpiStats: {
    totalRevenueToday: string;
    totalOrdersToday: string;
  };
  topCategory: {
    category: string;
    totalRevenue: string;
  } | null;
}

export function SectionCards({ kpiStats, topCategory }: SectionCardsProps) {

  // Format data agar siap ditampilkan
  const revenue = formatIDR(Number(kpiStats?.totalRevenueToday || 0));
  const orders = kpiStats?.totalOrdersToday || 0;
  const topCatName = topCategory?.category || 'N/A';
  const topCatRevenue = formatIDR(Number(topCategory?.totalRevenue || 0));

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* Card 1: Total Revenue Today */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue (Today)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {revenue}
          </CardTitle>
          <Badge variant="outline" className="mt-2 w-fit">
            <IconCash className="mr-1 h-4 w-4" />
            Live Update
          </Badge>
        </CardHeader>
      </Card>

      {/* Card 2: Total Orders Today */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders (Today)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {orders}
          </CardTitle>
          <Badge variant="outline" className="mt-2 w-fit">
            <IconNotes className="mr-1 h-4 w-4" />
            Transactions
          </Badge>
        </CardHeader>
      </Card>

      {/* Card 3: Top Category */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Top Category (by Revenue)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {topCatName}
          </CardTitle>
          <Badge variant="outline" className="mt-2 w-fit">
            <IconCategory className="mr-1 h-4 w-4" />
            {topCatRevenue}
          </Badge>
        </CardHeader>
      </Card>

      {/* Card 4: Placeholder */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-muted-foreground">
            (Coming Soon)
          </CardTitle>
          <Badge variant="outline" className="mt-2 w-fit">
            <IconTrendingUp className="mr-1 h-4 w-4" />
            ...
          </Badge>
        </CardHeader>
      </Card>

    </div>
  )
}