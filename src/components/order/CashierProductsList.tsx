import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { type Product } from "@/services/products.service"
import { formatIDR } from "@/utils/formatters"
import { Button } from "../ui/button"
import { Plus, Minus } from "lucide-react"

interface CashierProductsListProps {
    products: Product[];
    isLoading: boolean;
    error: Error | null;
    onPlus: (product: Product) => void;
    onMinus: (productId: string) => void;
    getItemQuantity: (productId: string) => number;
}

export default function CashierProductsList({
    products,
    isLoading,
    error,
    onPlus,
    onMinus,
    getItemQuantity
}: CashierProductsListProps) {

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-lg font-semibold px-7">Foodies Menu</h1>
                <div className="product-card-container p-4 md:p-6 md:pt-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Card key={index} className="aspect-square flex flex-col justify-between p-3 border bg-gray-50">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <div className="flex justify-between items-end">
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-8 w-1/3 rounded-md" />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 p-8">Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-1 flex-col gap-4 w-full">
            <h1 className="text-lg font-semibold px-7">Foodies Menu</h1>
            <div className="product-card-container p-4 md:p-6 md:pt-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product: Product) => {
                    const currentQuantity = getItemQuantity(product.id);
                    const isAvailable = Number(product.stock) > 0;

                    return (
                        <Card
                            key={product.id}
                            className={`aspect-square flex flex-col justify-between p-3 transition-all ${!isAvailable ? 'bg-gray-100 text-muted-foreground opacity-70 cursor-not-allowed' :
                                currentQuantity > 0 ? 'bg-secondary text-primary border-l-[3px] border-primary/50' :
                                    'bg-white hover:bg-gray-50 border'
                                }`}
                        >
                            {/* header */}
                            <CardHeader className="p-1 flex-shrink-0">
                                <p className={`text-xs ${currentQuantity > 0 ? 'text-primary/80' : 'text-gray-500'}`}>
                                    Stock: {product.stock}
                                </p>
                                <CardTitle className={`text-sm font-semibold mb-0 truncate ${currentQuantity > 0 ? 'text-primary' : 'text-gray-800'}`}>
                                    {product.name}
                                </CardTitle>
                                <p className="text-sm font-semibold">
                                    {formatIDR(Number(product.price))}
                                </p>
                            </CardHeader>

                            <CardFooter className="flex justify-between p-0">
                                <div className="flex justify-between w-full">
                                    {/* (-) btn */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7 text-gray-700 border-gray-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onMinus(product.id);
                                        }}
                                        disabled={currentQuantity <= 0}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>

                                    <span className="text-base font-bold w-4 text-center">
                                        {currentQuantity}
                                    </span>

                                    {/* (+) btn */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7 text-gray-700 border-gray-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onPlus(product);
                                        }}
                                        disabled={!isAvailable}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}