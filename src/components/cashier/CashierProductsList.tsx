import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { getProductsService, type Product } from "@/services/products.service"
import { formatIDR } from "@/utils/formatters"

export default function CashierProductsList() {
    const {
        data: productsResponse,
        isLoading,
        error
    } = useQuery({
        queryKey: ['products'],
        queryFn: getProductsService,
    });

    if (isLoading) {
        return (
            <div className="product-card-container p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <Skeleton className="h-[9rem] sm:h-[7rem] w-full rounded-lg" />
                            <Skeleton className="h-6 w-3/4 mt-3" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-5 w-1/4" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 p-8">Error: {error.message}</div>;
    }

    const products = productsResponse?.data.products || [];

    return (
        <div className="flex flex-1 flex-col gap-4 w-full">
            <div className="product-card-container p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product: Product) => (
                    <Card key={product.id} className="border-0 gap-3">
                        <CardHeader>
                            <Skeleton className="h-[9rem] sm:h-[7rem] w-full rounded-lg" />
                            <CardTitle className="mt-3 mb-0">{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-gray-500 truncate">Description placeholder</p>
                        </CardContent>
                        <CardFooter>
                            <p className="font-semibold">{formatIDR(Number(product.price))}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}