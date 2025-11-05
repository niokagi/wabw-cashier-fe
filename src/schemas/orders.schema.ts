import { z } from "zod";

const orderItemSchema = z.object({
    productId: z.string().min(1, "Product ID tidak boleh kosong."),
    quantity: z
        .number()
        .int("Kuantitas harus angka bulat")
        .positive("Kuantitas harus minimal 1"),
});

export const ordersPayloadSchema = z.object({
    items: z.array(orderItemSchema)
        .min(1, "Keranjang tidak boleh kosong."),

    customerName: z.string().optional().nullable(),

    paymentMethod: z.enum(["CASH", "QRIS"]).describe("Payment Method").refine((val) => val !== undefined, {
        message: "Metode pembayaran harus dipilih.",
    }),
});

// Mengekspor tipe TypeScript untuk digunakan di service
export type OrdersPayload = z.infer<typeof ordersPayloadSchema>;