import { z } from "zod"

export const ordersPayloadSchema = z.object({
    //
    // 
})

export type OrdersPayloadSchema = z.infer<typeof ordersPayloadSchema>