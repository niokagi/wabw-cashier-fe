import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
// 
import CashierProductsList from "@/components/order/CashierProductsList";
import SearchBar from "@/components/common/SearchBar";
import { FieldChoiceCard } from "@/components/reusable/FieldChoiceCard";
import { OrderDetailsSidebar } from "@/components/order/OrderDetailsSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button"; // Impor Button
import { getProductsService, type Product } from "@/services/products.service";
import { createOrderService } from '@/services/orders.service';

interface CartItem extends Product {
    quantity: number;
}

export default function CashierPage() {
    const queryClient = useQueryClient();
    const [cart, setCart] = useState<CartItem[]>([]);
    const { data: productsResponse, isLoading: isLoadingProducts, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProductsService,
    });

    const { mutate: submitOrder, isPending: isCreatingOrder } = useMutation({
        mutationFn: createOrderService,
        onSuccess: (data) => {
            toast.success(data?.message || "Transaksi berhasil dibuat!");
            setCart([]);
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            toast.error(error.message || "Gagal membuat transaksi.");
        },
    });

    const handleAddToCart = (product: Product) => {
        if (product.stock <= 0) {
            toast.error(`Stok ${product.name} habis.`);
            return;
        }
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                const newQuantity = existingItem.quantity + 1;
                if (newQuantity > product.stock) {
                    toast.warning(`Stok ${product.name} hanya tersisa ${product.stock}.`);
                    return prevCart;
                }
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: newQuantity } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const handleUpdateQuantity = (productId: string, newQuantity: number) => {
        const productInCart = cart.find(item => item.id === productId);
        if (!productInCart) return;

        if (newQuantity > productInCart.stock) {
            toast.warning(`Stok ${productInCart.name} hanya tersisa ${productInCart.stock}.`);
            newQuantity = productInCart.stock;
        }

        setCart((prevCart) => {
            if (newQuantity <= 0) {
                return prevCart.filter((item) => item.id !== productId);
            }
            return prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    const handleRemoveItem = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const totalAmount = useMemo(() => {
        return cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
    }, [cart]);

    const handleSubmitOrder = (customerName: string, paymentMethod: string) => {
        const orderPayload = {
            items: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
            customerName: customerName || 'Walk-in Customer',
            paymentMethod,
        };
        submitOrder(orderPayload as any);
    };

    return (
        <>
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
                                        <SearchBar />
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <section className="max-w-full bg-gray-50 flex-1 overflow-y-auto">
                    <FieldChoiceCard />
                    <Separator />
                    <CashierProductsList
                        products={productsResponse?.data.products || []}
                        isLoading={isLoadingProducts}
                        error={error}
                        onAddToCart={handleAddToCart}
                    />
                </section>
            </SidebarInset>
            {/* left sdbr */}
            <OrderDetailsSidebar
                cart={cart}
                handleUpdateQuantity={handleUpdateQuantity}
                handleRemoveItem={handleRemoveItem}
                handleSubmitOrder={handleSubmitOrder}
                isCreatingOrder={isCreatingOrder}
                totalAmount={totalAmount}
            />
        </>
    );
}