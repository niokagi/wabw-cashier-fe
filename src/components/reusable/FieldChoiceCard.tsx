import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { getProductCategoriesService } from "@/services/products.service";
import { useState } from "react"
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";

export function FieldChoiceCard() {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const {
        data: categoriesResponse,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product-categories'],
        queryFn: getProductCategoriesService,
        // staleTime: 1000 * 60 * 5,
    })

    // with custom hook
    // const {
    //     execute: fetchCategories,
    //     data: categoriesResponse,
    //     isLoading,
    //     error,
    // } = useApi(getProductCategoriesService);

    // useEffect(() => {
    //     fetchCategories(null);
    // }, [fetchCategories]);

    const categories = categoriesResponse?.data.categories || [];

    const handleCheck = (value: string) => {
        // console.log("Category selected:", value);
        setSelectedCategory(value);
    }

    return (
        <>
            <h1 className="text-lg font-semibold px-7 py-3 pt-7">Categories</h1>
            <div className="w-full max-w-full pb-7 sm:p-7 sm:pt-0 grid gap-3 overflow-hidden overflow-x-scroll sm:overflow-auto sm:overflow-x-auto">
                <FieldGroup>
                    <FieldSet>
                        <RadioGroup onValueChange={handleCheck} value={selectedCategory} defaultValue="kubernetes" className="flex justify-center gap-4 px-5 sm:px-0">
                            {isLoading && (
                                <>
                                    <Skeleton className="h-24 w-full rounded-lg" />
                                    <Skeleton className="h-24 w-full rounded-lg" />
                                    <Skeleton className="h-24 w-full rounded-lg" />
                                </>
                            )}
                            {error && <p className="text-red-500">Failed to load categories.</p>}
                            {!isLoading && categories.map((category: string) => (
                                <FieldLabel key={category} htmlFor={category.toLowerCase()} className="bg-white">
                                    <Field orientation="horizontal" className="cursor-pointer">
                                        <FieldContent>
                                            <FieldTitle>{category}</FieldTitle>
                                            <FieldDescription>
                                                Category for {category.toLowerCase()} items.
                                            </FieldDescription>
                                        </FieldContent>
                                        <RadioGroupItem value={category} id={category.toLowerCase()} hidden />
                                    </Field>
                                </FieldLabel>
                            ))}
                        </RadioGroup>
                    </FieldSet>
                </FieldGroup>
            </div>
        </>
    )
}
