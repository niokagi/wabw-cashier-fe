import { z } from 'zod'

export const signInSchema = z.object({
    email: z.email("invalid email address"),
    password: z.string().min(8, "password must be at least 8 character").max(50),
})

export const signUpSchema = z.object({
    username: z.string().min(4).max(50),
    email: z.email("invalid email address"),
    password: z.string().min(8, "password must be at least 8 character").max(50),
})

export type SignInPayload = z.infer<typeof signInSchema>
export type SignUpPayload = z.infer<typeof signUpSchema>