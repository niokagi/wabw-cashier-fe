import { z } from "zod"

export const productPayloadSchema = z.object({
    name: z.string().min(1, 'Nama produk harus diisi.'),
    price: z.coerce.number().positive('Harga harus lebih dari 0.'),
    category: z.enum(['Food', 'Beverage', 'Dessert']),
    stock: z.coerce.number().int().min(0, 'Stok tidak boleh negatif.'),
});

export type ProductPayload = z.infer<typeof productPayloadSchema>