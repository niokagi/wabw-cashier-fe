"use client"

import { useQuery } from "@tanstack/react-query"
import { Loader2, X } from "lucide-react"

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getOrderByIdService, type OrderDetail } from "@/services/orders.service"
import { formatIDR } from "@/utils/formatters"
import { format } from "date-fns"

interface OrderDetailDrawerProps {
    orderId: string | null;
    onClose: () => void;
}

function DrawerContentLoader() {
    return (
        <div className="p-4 flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    )
}

function DrawerContentError({ message }: { message: string }) {
    return (
        <div className="p-4 text-center text-destructive">
            Gagal memuat detail order: {message}
        </div>
    )
}

function OrderDetailView({ order }: { order: OrderDetail }) {
    return (
        <div className="p-4 flex flex-col h-full">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Customer</div>
                    <div className="font-semibold">{order.customer_name || 'N/A'}</div>
                </div>
                <div className="space-y-1 text-right">
                    <div className="text-sm text-muted-foreground">Cashier</div>
                    <div className="font-semibold">{order.cashier_email}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Payment method</div>
                    <div className="font-semibold text-sm">{order.payment_method}</div>
                </div>
                <div className="space-y-1 text-right">
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-semibold text-sm">{format(new Date(order.created_at), "dd MMM yyyy, HH:mm")}</div>
                </div>
            </div>
            <Separator className="my-2" />
            <h3 className="font-semibold mb-2">Item</h3>
            <div className="flex-1 overflow-y-auto -mx-4 px-4">
                <Table className="border">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.product_name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell className="text-right">{formatIDR(Number(item.price) * item.quantity)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
            <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span>{formatIDR(Number(order.total_amount))}</span>
            </div>
        </div>
    )
}

export function OrderDetailDrawer({ orderId, onClose }: OrderDetailDrawerProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderByIdService(orderId!),
        enabled: !!orderId,
    });

    return (
        <Drawer open={!!orderId} onOpenChange={(open) => !open && onClose()} direction="right">
            <DrawerContent className="h-full w-[40rem] max-w-[90vw] top-0 right-0 left-auto mt-0 rounded-l-lg">
                <DrawerHeader className="flex">
                    <div className="flex justify-between">
                        <div>
                            <DrawerTitle>Transaction detail</DrawerTitle>
                            <DrawerDescription>{orderId ? `${orderId.substring(0, 25)}...` : 'N/A'}</DrawerDescription>
                        </div>
                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </DrawerClose>
                    </div>
                </DrawerHeader>

                {isLoading && <DrawerContentLoader />}
                {error && <DrawerContentError message={error.message} />}
                {data && <OrderDetailView order={data.data.order} />}

                <DrawerFooter className="border-none">
                    <Button onClick={onClose} variant="outline">Close</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}