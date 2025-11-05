import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useQuery } from '@tanstack/react-query';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createProductService, getProductCategoriesService, updateProductService, type Product } from "@/services/products.service";
import { productPayloadSchema, type ProductPayload } from "@/schemas/products.schema";


interface ProductFormProps {
    initialData?: Product | null;
    onSuccess: () => void;
}

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
    const queryClient = useQueryClient();
    const isEditMode = !!initialData;

    const {
        data: categoriesResponse,
        isLoading: isLoadingCategories,
    } = useQuery({
        queryKey: ['product-categories'],
        queryFn: getProductCategoriesService,
        staleTime: 1000 * 60 * 2,
    });

    const categories = useMemo(() => categoriesResponse?.data.categories || [], [categoriesResponse]);

    const form = useForm<any>({
        resolver: zodResolver(productPayloadSchema),
        defaultValues: {
            name: "",
            price: "",
            stock: "",
            description: "",
        },
    });

    useEffect(() => {
        if (isEditMode && initialData) {
            form.reset({
                name: initialData.name,
                price: Number(initialData.price),
                stock: initialData.stock,
                category: initialData.category,
                description: initialData.description || "",
            });
        }
    }, [initialData, isEditMode, form]);


    const { mutate, isPending: isSubmitting } = useMutation({
        mutationFn: (data: FormData) => {
            if (isEditMode && initialData) {
                return updateProductService(initialData.id, data);
            }
            return createProductService(data as any);
        },
        onSuccess: (data) => {
            toast.success(data.message || `Produk berhasil ${isEditMode ? 'diperbarui' : 'ditambahkan'}!`);
            queryClient.invalidateQueries({ queryKey: ['products'] });
            onSuccess();
        },
        onError: (error) => {
            toast.error(error.message || "Terjadi kesalahan saat menyimpan produk.");
        },
    });


    async function onSubmit(values: ProductPayload) {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('price', String(values.price));
        formData.append('stock', String(values.stock));
        formData.append('category', values.category);
        formData.append('description', values.description || '');

        formData.forEach((value, key) => {
            if (value instanceof File) {
                console.log(`KEY: ${key} | VALUE: [File Object], Name: ${value.name}, Size: ${value.size} bytes`);
            } else {
                console.log(`KEY: ${key} | VALUE: ${value}`);
            }
        });
        mutate(formData);
    }

    const isFormLoading = isLoadingCategories || isSubmitting;


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Product Name</FormLabel>
                                <FormControl><Input placeholder="Contoh: Spaghetti Carbonara" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price (IDR)</FormLabel>
                                <FormControl><Input type="number" placeholder="75000" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl><Input type="number" placeholder="50" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger disabled={isFormLoading}>
                                        <SelectValue placeholder={isFormLoading ? "Memuat..." : "Pilih kategori..."} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl><Textarea placeholder="Deskripsi singkat produk" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator />

                <Button type="submit" disabled={isFormLoading} className="w-full">
                    {isFormLoading ? <Loader2 className="animate-spin mr-2" /> : (isEditMode ? "Simpan Perubahan" : "Tambah Produk")}
                </Button>
            </form>
        </Form>
    );
}