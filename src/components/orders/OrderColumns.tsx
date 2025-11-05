"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type Order, deleteOrderService } from "@/services/orders.service"
import { formatIDR } from "@/utils/formatters"

const OrderActions: React.FC<{ order: Order }> = ({ order }) => {
    const queryClient = useQueryClient();

    const { mutate: deleteOrder, isPending } = useMutation({
        mutationFn: deleteOrderService,
        onSuccess: () => {
            toast.success(`Order ${order.id.substring(0, 8)}... berhasil dihapus.`);
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (error) => {
            toast.error(error.message || "Gagal menghapus order.");
        },
    });

    const handleDelete = () => {
        if (window.confirm(`Anda yakin ingin menghapus order ${order.id}?`)) {
            deleteOrder(order.id);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Buka menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => toast.info('Fitur "Lihat Detail" belum dibuat.')}>
                    View Detail
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleDelete}
                    disabled={isPending}
                    className="text-destructive"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

// Definisi Kolom untuk Tipe Data 'Order'
export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "ID Transaksi",
        cell: ({ row }) => {
            const shortId = (row.getValue("id") as string).substring(0, 8);
            return <div className="font-medium">{shortId}...</div>
        },
    },
    {
        accessorKey: "customer_name",
        header: "Pelanggan",
    },
    {
        accessorKey: "cashier_email",
        header: "Kasir",
    },
    {
        accessorKey: "total_amount",
        header: () => <div className="text-right">Total Bayar</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total_amount"));
            return <div className="text-right font-medium">{formatIDR(amount)}</div>
        },
    },
    {
        accessorKey: "payment_method",
        header: "Metode Bayar",
        cell: ({ row }) => {
            return <Badge variant="outline">{row.getValue("payment_method")}</Badge>
        },
    },
    {
        accessorKey: "created_at",
        header: "Tanggal",
        cell: ({ row }) => {
            return <div className="min-w-[120px]">{format(new Date(row.getValue("created_at")), "dd MMM yyyy, HH:mm")}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <OrderActions order={row.original} />,
    },
]