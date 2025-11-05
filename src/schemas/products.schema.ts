import { z } from "zod"

const ProductCategoryEnum = z.enum(['Food', 'Beverage', 'Dessert'] as const, {
    message: 'Kategori tidak valid.'
});

export const productPayloadSchema = z.object({
    name: z.string().min(3, 'Nama produk minimal 3 karakter.'),
    price: z.coerce.number().positive('Harga harus lebih dari 0.').min(1, 'Harga minimal Rp 1.'),
    category: ProductCategoryEnum,
    stock: z.coerce.number().int('Stok harus berupa bilangan bulat.').min(0, 'Stok tidak boleh negatif.'),
    description: z.string().optional().nullable(),
});

export type ProductPayload = z.infer<typeof productPayloadSchema>