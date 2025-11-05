"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Bar, BarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { type CategoryRevenue, type TopProduct } from "@/services/reports.service"
import { formatIDR } from "@/utils/formatters"

interface DashboardChartsProps {
  revenueData: CategoryRevenue[];
  topProductsData: TopProduct[];
}

const revenueChartConfig = {
  totalRevenue: {
    label: "Total Revenue",
    color: "#000000",
  },
} satisfies ChartConfig

const topProductsChartConfig = {
  totalQuantitySold: {
    label: "Quantity Sold",
    color: "#000000",
  },
} satisfies ChartConfig

export function DashboardCharts({ revenueData, topProductsData }: DashboardChartsProps) {
  const formattedRevenueData = React.useMemo(() => {
    return revenueData.map(item => ({
      category: item.category,
      totalRevenue: Number(item.totalRevenue),
    }));
  }, [revenueData]);

  const formattedTopProductsData = React.useMemo(() => {
    return topProductsData.map(item => ({
      name: item.name,
      totalQuantitySold: Number(item.totalQuantitySold),
    }));
  }, [topProductsData]);

  const totalRevenueAllCategories = React.useMemo(() => {
    return formattedRevenueData.reduce((acc, item) => acc + item.totalRevenue, 0);
  }, [formattedRevenueData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Statistics</CardTitle>
        <CardDescription>Overview of sales performance</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-8">

        {/* chart 1 */}
        <div className="flex-1 min-w-0 border rounded-md p-4">
          <h3 className="font-semibold mb-7">Revenue by Category</h3>
          <ChartContainer config={revenueChartConfig} className="w-full h-[250px]">
            <LineChart
              accessibilityLayer
              data={formattedRevenueData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `Rp${value / 1000000}jt`;
                  if (value >= 1000) return `Rp${value / 1000}rb`;
                  return formatIDR(value);
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatIDR(value as number)}
                    hideLabel
                  />
                }
              />
              <Line
                dataKey="totalRevenue"
                type="natural"
                stroke="#000000"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </div>
        {/* chart 2 */}
        <div className="flex-1 min-w-0 border rounded-md p-4">
          <h3 className="font-semibold mb-7">Top 5 Products (by Quantity)</h3>
          <ChartContainer config={topProductsChartConfig} className="w-full h-[250px]">
            <BarChart
              accessibilityLayer
              data={formattedTopProductsData}
              layout="vertical"
              margin={{ left: 10, right: 10 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis
                type="number"
                hide
              />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={80}
                className="text-xs"
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => `${value} items sold`}
                    hideLabel
                  />
                }
              />
              <Bar
                dataKey="totalQuantitySold"
                fill="hsl(var(--secondary-foreground))"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </div>

      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          <TrendingUp className="h-4 w-4" />
          Total Revenue from all categories
        </div>
        <div className="text-muted-foreground leading-none">
          {formatIDR(totalRevenueAllCategories)}
        </div>
      </CardFooter>
    </Card>
  )
}