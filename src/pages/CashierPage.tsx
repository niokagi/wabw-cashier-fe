import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
// 
import CashierProductsList from "@/components/order/CashierProductsList";
import { FieldChoiceCard } from "@/components/reusable/FieldChoiceCard";
import { OrderDetailsSidebar } from "@/components/order/OrderDetailsSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { getProductsService, type Product } from "@/services/products.service";
import { createOrderService } from '@/services/orders.service';

interface CartItem extends Product {
    quantity: number;
}

const CART_STORAGE_KEY = 'cashierCart';
const CUSTOMER_STORAGE_KEY = 'cashierCustomerName';
const PAYMENT_STORAGE_KEY = 'cashierPaymentMethod';

export default function CashierPage() {
    const queryClient = useQueryClient();
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            return [];
        }
    });

    const [customerName, setCustomerName] = useState<string>(() => {
        return localStorage.getItem(CUSTOMER_STORAGE_KEY) || "";
    });

    const [paymentMethod, setPaymentMethod] = useState<string>(() => {
        return localStorage.getItem(PAYMENT_STORAGE_KEY) || "";
    });

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem(CUSTOMER_STORAGE_KEY, customerName);
    }, [customerName]);

    useEffect(() => {
        localStorage.setItem(PAYMENT_STORAGE_KEY, paymentMethod);
    }, [paymentMethod]);

    // catch
    const { data: productsResponse, isLoading: isLoadingProducts, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProductsService,
    });

    // category filtering
    const filteredProducts = useMemo(() => {
        const allProducts = productsResponse?.data.products || [];

        if (selectedCategory === "ALL") {
            return allProducts;
        }

        return allProducts.filter(product =>
            product.category.toUpperCase() === selectedCategory.toUpperCase()
        );
    }, [productsResponse, selectedCategory]);

    // mutate
    const { mutate: submitOrder, isPending: isCreatingOrder } = useMutation({
        mutationFn: createOrderService,
        onSuccess: (data) => {
            toast.success(data?.message || "Transaksi berhasil dibuat!");
            setCart([]);
            setCustomerName("");
            setPaymentMethod("");
            // 
            localStorage.removeItem(CART_STORAGE_KEY);
            localStorage.removeItem(CUSTOMER_STORAGE_KEY);
            localStorage.removeItem(PAYMENT_STORAGE_KEY);

            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            toast.error(error.message || "failed to load trx.");
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

    // 
    const handleSubmitOrder = () => {
        if (cart.length === 0) {
            toast.error("Cart still empty.");
            return;
        }
        if (!paymentMethod) {
            toast.error("Metode pembayaran harus dipilih.");
            return;
        }

        const orderPayload = {
            items: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
            customerName: customerName || 'Walk-in Customer',
            paymentMethod,
        };
        submitOrder(orderPayload);
    };

    const getItemQuantity = (productId: string) => {
        return cart.find(item => item.id === productId)?.quantity || 0;
    };
    const handleOnPlus = handleAddToCart;

    const handleOnMinus = (productId: string) => {
        const productInCart = cart.find(item => item.id === productId);
        if (!productInCart) return;

        handleUpdateQuantity(productId, productInCart.quantity - 1);
    };

    return (
        <>
            <SidebarInset>
                <header className="bg-background sticky top-0 flex h-20 shrink-0 items-center gap-2 z-10 shadow-xs">
                    <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-5">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="mx-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {/* <SearchBar /> */}
                                        <h1 className="text-base font-medium">Menu</h1>
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                {/* main */}
                <section className="max-w-full bg-gray-50 flex-1 overflow-y-auto">
                    <FieldChoiceCard
                        onCategoryChange={setSelectedCategory}
                        currentCategory={selectedCategory}
                    />
                    {/* <Separator /> */}
                    <CashierProductsList
                        products={filteredProducts}
                        isLoading={isLoadingProducts}
                        error={error}
                        onPlus={handleOnPlus}
                        onMinus={handleOnMinus}
                        getItemQuantity={getItemQuantity}
                    />
                    <footer className="h-14 mt-10 flex justify-center items-center bg-gray-100">
                        <p className='text-sm'>Simple cashier web made by <span className='font-semibold'>Adhim Niokagi - 3124510109</span></p>
                    </footer>
                </section>
            </SidebarInset>
            {/* right sdbr */}
            <OrderDetailsSidebar
                cart={cart}
                handleUpdateQuantity={handleUpdateQuantity}
                handleRemoveItem={handleRemoveItem}
                handleSubmitOrder={handleSubmitOrder}
                isCreatingOrder={isCreatingOrder}
                totalAmount={totalAmount}
                customerName={customerName}
                setCustomerName={setCustomerName}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
            />
        </>
    );
}