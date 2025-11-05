import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { format } from "date-fns";
import { type ColumnDef } from "@tanstack/react-table"
// comps
import ProductForm from '@/components/product/ProductForm';
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
// service, types
import { deleteProductService, getProductsService, type Product } from '@/services/products.service';
import { formatIDR } from '@/utils/formatters';
// UI
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader2, PlusCircle, MoreHorizontal } from "lucide-react";
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
import Footer from './Footer';

export default function ProductsPage() {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = React.useState<string | null>(null);

    const {
        data: productsResponse,
        isLoading,
        error,
        // refetch,
        // isRefetching
    } = useQuery({
        queryKey: ['products'],
        queryFn: getProductsService,
        staleTime: 1000 * 60 * 10,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProductService,
        onSuccess: (_data, id) => {
            toast.success(`Produk ${id.substring(0, 8)}... delete successfully!`);
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            const backendErrorMessage = (error as any).response?.data?.message || error.message || "fail to delete product.";
            toast.error(backendErrorMessage);
            // console.log(error);
        },
    });

    const products = useMemo(() => productsResponse?.data.products || [], [productsResponse]);

    const handleAdd = () => {
        setEditingProduct(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            deleteMutation.mutate(productToDelete);
            setProductToDelete(null);
        }
    };

    const handleDeleteClick = (orderId: string) => {
        setProductToDelete(orderId);
    };

    const handleFormSuccess = () => {
        setIsDialogOpen(false);
    };

    const columns = useMemo<ColumnDef<Product>[]>(() => [
        {
            id: "numbering",
            header: () => <div className='text-center'>#</div>,
            cell: ({ row }) => {
                return <div className="text-center">{row.index + 1}</div>;
            },
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: "name",
            header: "Product Name",
            cell: ({ row }) => (
                <div className="font-medium truncate max-w-xs">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => {
                return <Badge variant="outline">{row.getValue("category")}</Badge>
            },
        },
        {
            accessorKey: "price",
            header: () => <div className="text-left">Price</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"));
                return <div className="text-left font-medium">{formatIDR(amount)}</div>
            },
        },
        {
            accessorKey: "stock",
            header: () => <div className="text-left">Stock</div>,
            cell: ({ row }) => {
                const stock = row.getValue("stock") as number;
                return (
                    <div className={`text-left font-medium ${stock <= 5 ? 'text-destructive' : ''}`}>
                        {stock}
                    </div>
                )
            },
        },
        {
            accessorKey: "created_at",
            header: "Created at",
            cell: ({ row }) => (
                <div className="min-w-[120px]">
                    {format(new Date(row.getValue("created_at")), "dd MMM yyyy")}
                </div>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(product)} className='cursor-pointer'>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDeleteClick(product.id)}
                                className="text-destructive cursor-pointer"
                                disabled={deleteMutation.isPending && deleteMutation.variables === product.id}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], [deleteMutation, products]);

    if (error) return <div className="p-8 text-destructive">Fail to load data: {error.message}</div>;

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
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-10">Product Management</h1>
                    <Button onClick={handleAdd} className='bg-gray-100 text-foreground hover:bg-gray-200'>
                        <PlusCircle className="h-4 w-4" />
                        Add Product
                    </Button>
                    <DataTable
                        columns={columns}
                        data={products}
                        filterColumnId="name"
                        filterPlaceholder="Find by product name..."
                    />
                </div>
                <Footer />
            </SidebarInset>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-xl p-8" aria-describedby='edit pop-up'>
                    <DialogHeader>
                        <DialogTitle className='mb-4'>{editingProduct ? 'Edit: ' + editingProduct.name : 'Add New Product'}</DialogTitle>
                    </DialogHeader>
                    <ProductForm onSuccess={handleFormSuccess} initialData={editingProduct} />
                </DialogContent>
            </Dialog>
            {/*  */}
            <AlertDialog
                open={!!productToDelete}
                onOpenChange={(open) => !open && setProductToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. It will permanently delete the order data.
                            <br />
                            <span className="font-bold">ID Order: {productToDelete?.substring(0, 8)}...</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setProductToDelete(null)}>
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