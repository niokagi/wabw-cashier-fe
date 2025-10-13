import { email, z } from "zod"

export const usersPayloadSchema = z.object({
    // 
    username: z.string(),
    email: z.email(),
    // .... to be ...
})

export type usersPayload = z.infer<typeof usersPayloadSchema>