import { z } from 'zod'

const exampleSchema = z.object({
    id: z.string().min(8, 'min 8 char').max(50),
    name: z.string().min(8).max(50),
    count: z.number(),
    available: z.boolean(),
})