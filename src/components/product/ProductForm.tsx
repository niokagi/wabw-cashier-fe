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
import { createProductService, getProductCategoriesService, updateProductService, type Product } from "@/services/products.service";
import { productPayloadSchema, type ProductPayload } from "@/schemas/products.schema";


interface ProductFormProps {
    initialData?: Product | null;
    onSuccess: () => void;
}

const safeParseFloat = (value: string | number | undefined | null): number => {
    if (!value) return 0;
    const num = parseFloat(String(value));
    return isNaN(num) ? 0 : num;
};

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
    const queryClient = useQueryClient();
    const isEditMode = !!initialData;
    const {
        data: categoriesResponse,
        isLoading: isLoadingCategories,
    } = useQuery({
        queryKey: ['product-categories'],
        queryFn: getProductCategoriesService,
        staleTime: 1000 * 60 * 10,
    });

    const categories = useMemo(() => categoriesResponse?.data.categories || [], [categoriesResponse]);

    const form = useForm<ProductPayload>({
        resolver: zodResolver(productPayloadSchema),
        defaultValues: {
            name: "",
            price: 0,
            stock: 0,
            category: "Food",
            description: "",
        },
    });

    useEffect(() => {
        if (isEditMode && initialData) {
            form.reset({
                name: initialData.name,
                price: safeParseFloat(initialData.price),
                stock: safeParseFloat(initialData.stock),
                category: initialData.category as any,
                description: initialData.description || "",
            });
        }
    }, [initialData, isEditMode, form, categories]);

    // mutate
    const { mutate, isPending: isSubmitting } = useMutation({
        mutationFn: (data: FormData) => {
            if (isEditMode && initialData) {
                return updateProductService(initialData.id, data);
            }
            return createProductService(data as any);
        },
        onSuccess: (data) => {
            toast.success(data.message || `product successfully ${isEditMode ? 'updated' : 'added'}!`);
            queryClient.invalidateQueries({ queryKey: ['products'] });
            onSuccess();
        },
        onError: (error) => {
            toast.error(error.message || "an error occured while saving product.");
        },
    });

    async function onSubmit(values: ProductPayload) {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('price', String(values.price));
        formData.append('stock', String(values.stock));
        formData.append('category', values.category);
        formData.append('description', values.description || '');

        // formData.forEach((value, key) => {
        //     console.log(`KEY: ${key} | VALUE: ${value}`);
        // });
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
                                <FormControl><Input placeholder="e.g. Spaghetti Carbonara" {...field} /></FormControl>
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
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="75000"
                                        {...field}
                                        value={isNaN(field.value) ? '' : field.value}
                                        onChange={e => field.onChange(e.target.valueAsNumber)}
                                    />
                                </FormControl>
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
                                <FormControl>
                                    <Input type="number" placeholder="50" {...field} value={isNaN(field.value) ? '' : field.value} onChange={e => field.onChange(e.target.valueAsNumber)} />
                                </FormControl>
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
                                        <SelectValue placeholder={isFormLoading ? "Loading..." : "Select..."} />
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
                            <FormControl><Textarea placeholder="short description" {...field} value={field.value || ''} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isFormLoading} className="w-full">
                    {isFormLoading ? <Loader2 className="animate-spin mr-2" /> : (isEditMode ? "Save Changes" : "Add Product")}
                </Button>
            </form>
        </Form>
    );
}