import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table"
import { Loader2, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
// comp's
import { OrderDetailDrawer } from "@/components/orders/OrderDetailDrawer";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
// service, types
import { getOrdersService, deleteOrderService, type Order } from "@/services/orders.service";
import { formatIDR } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DataTable } from "@/components/reusable/DataTable";
import Footer from "./Footer";

export default function OrdersPage() {
    const queryClient = useQueryClient();
    const [viewingOrderId, setViewingOrderId] = React.useState<string | null>(null);
    const [orderToDelete, setOrderToDelete] = React.useState<string | null>(null);

    const { data: ordersResponse, isLoading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrdersService,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteOrderService,
        onSuccess: (_data, id) => {
            toast.success(`Order ${id.substring(0, 8)}... delete successfully.`);
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (error) => {
            const backendErrorMessage = (error as any).response?.data?.message || error.message || "fail to delete order.";
            toast.error(backendErrorMessage);
        },
    });

    const confirmDelete = () => {
        if (orderToDelete) {
            deleteMutation.mutate(orderToDelete);
            setOrderToDelete(null);
        }
    };

    const handleDeleteClick = (orderId: string) => {
        setOrderToDelete(orderId);
    };

    const columns: ColumnDef<Order>[] = [
        {
            id: "numbering",
            header: () => <div className="text-center">#</div>,
            cell: ({ row }) => {
                return <div className="text-center">{row.index + 1}</div>;
            },
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: "id",
            header: "ID Transaksi",
            cell: ({ row }) => {
                const idValue = row.getValue("id");
                const shortId = String(idValue ?? "").substring(0, 8);
                return <div className="font-medium">{shortId}...</div>
            },
        },
        {
            accessorKey: "customer_name",
            header: "Customer",
        },
        {
            accessorKey: "cashier_email",
            header: "Cashier",
        },
        {
            accessorKey: "total_amount",
            header: () => <div className="text-left">Total</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("total_amount"));
                return <div className="text-left font-medium">{formatIDR(amount)}</div>
            },
        },
        {
            accessorKey: "payment_method",
            header: "Payment Method",
            cell: ({ row }) => {
                return <Badge variant="outline">{row.getValue("payment_method")}</Badge>
            },
        },
        {
            accessorKey: "created_at",
            header: "Date",
            cell: ({ row }) => {
                return <div className="min-w-[120px]">{format(new Date(row.getValue("created_at")), "dd MMM yyyy, HH:mm")}</div>
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const order = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Action</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setViewingOrderId(order.id)} className="cursor-pointer">
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDeleteClick(order.id)}
                                disabled={deleteMutation.isPending && deleteMutation.variables === order.id}
                                className="text-destructive cursor-pointer"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];

    const data = React.useMemo(() => ordersResponse?.data.orders || [], [ordersResponse]);

    if (error) {
        return (
            <SidebarInset>
                <SiteHeader />
                <div className="p-8 text-center text-destructive">
                    Error load order data: {error.message}
                </div>
            </SidebarInset>
        );
    }

    if (isLoading) {
        return (
            <SidebarInset>
                <SiteHeader />
                <div className="p-8 flex justify-center items-center h-[calc(100vh-10rem)]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </SidebarInset>
        );
    }

    return (
        <>
            <SidebarInset className="bg-gray-50">
                <SiteHeader />
                <div className="container mx-auto py-8 px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Orders History</h1>
                    </div>

                    <DataTable
                        columns={columns}
                        data={data}
                        filterColumnId="customer_name"
                        filterPlaceholder="Find order by customer name..."
                    />
                </div>
                <Footer />
            </SidebarInset>
            {/*  */}
            <OrderDetailDrawer
                orderId={viewingOrderId}
                onClose={() => setViewingOrderId(null)}
            />
            {/*  */}
            <AlertDialog
                open={!!orderToDelete}
                onOpenChange={(open) => !open && setOrderToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. It will permanently delete the order data.
                            <br />
                            <span className="font-bold">ID Order: {orderToDelete?.substring(0, 8)}...</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOrderToDelete(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-white hover:bg-destructive/90"
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}