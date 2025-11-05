import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { format } from "date-fns";
import { formatIDR } from '@/utils/formatters';
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader2, PlusCircle, MoreHorizontal } from "lucide-react";

import ProductForm from '@/components/product/ProductForm';
import { deleteProductService, getProductsService, type Product } from '@/services/products.service';

export default function ProductsPage() {
    const queryClient = useQueryClient();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const {
        data: productsResponse,
        isLoading,
        error,
        refetch,
        isRefetching
    } = useQuery({
        queryKey: ['products'],
        queryFn: getProductsService,
        staleTime: 1000 * 60 * 2,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProductService,
        onSuccess: () => {
            toast.success("Produk berhasil dihapus!");
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            toast.error(error.message || "Gagal menghapus produk.");
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

    const handleDelete = (productId: string) => {
        if (window.confirm('Anda yakin ingin menghapus produk ini?')) {
            deleteMutation.mutate(productId);
        }
    };

    const handleFormSuccess = () => {
        setIsDialogOpen(false);
    };

    if (error) return <div className="p-8 text-destructive">Fail to load data: {error.message}</div>;

    return (
        <>
            <SidebarInset>
                <SiteHeader />
                <div className="py-10 px-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Product Management</h1>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" onClick={() => refetch()} disabled={isRefetching}>
                                <Loader2 className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                            <Button onClick={handleAdd}>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Product
                            </Button>
                        </div>
                    </div>

                    {/* tb */}
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/4">Product name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-right">Stock</TableHead>
                                    <TableHead className="text-center">Created at</TableHead>
                                    <TableHead className="w-1/12"><span className="sr-only">Action</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i}><TableCell colSpan={6}><Loader2 className="h-4 w-4 animate-spin" /></TableCell></TableRow>
                                    ))
                                ) : (products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium truncate">{product.name}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell className="text-right">{formatIDR(Number(product.price))}</TableCell>
                                        <TableCell className={`text-right font-medium ${product.stock <= 5 ? 'text-destructive' : ''}`}>{product.stock}</TableCell>
                                        <TableCell className="text-center">{product.created_at ? format(new Date(product.created_at), 'dd MMM yyyy') : '-'}</TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEdit(product)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-destructive">
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )))}
                                {!isLoading && products.length === 0 && (
                                    <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Product not found</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </SidebarInset>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle className='mb-4'>{editingProduct ? 'Edit: ' + editingProduct.name : 'Add new product'}</DialogTitle>
                    </DialogHeader>
                    <ProductForm onSuccess={handleFormSuccess} initialData={editingProduct} />
                </DialogContent>
            </Dialog>
        </>
    );
}