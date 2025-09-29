import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { useApi } from "@/hooks/useApi"
import { signInService } from "@/services/auth.service"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { signInSchema } from "@/schemas/auth.schema"
import { Loader2 } from "lucide-react"
// import { signInSchema, type SignInPayload } from "@/schemas/auth.schema";
// 
export default function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
    const { signIn: setAuthToken } = useAuth()
    const { execute: performSignIn, isLoading } = useApi(signInService)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof signInSchema>) {
        const response = await performSignIn(values)
        if (response.error) {
            toast.error(response.error || "an unknown error occurred.");
            return;
        }
        console.log(response);

        if (response.data && response.data.token) {
            const token = response.data.token
            if (response.successMessage) {
                toast.success(response.successMessage)
            }
            setTimeout(() => {
                setAuthToken(token)
                navigate('/', { replace: true })
            }, 1050)
        } else {
            toast.error(response.error || 'an unknown error occurred')
            // toast.error('an unknown error occurred')
        }
    }

    return (
        <div className={cn("flex flex-col gap-4", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle id="signin-form-card" className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Sign in with your Cashier Account Credential
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
                        {/* wrapper */}
                        <div className="grid gap-7 px-9 py-3">
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email Address" {...field} autoComplete="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input id="password" type="password" placeholder="Password" {...field} autoComplete="current-password" />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your Password
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" className="w-full" aria-live="polite" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </div>
                        <div className="text-center text-sm">
                            Don't have an account?{" "}
                            <Link to="/auth/sign-up" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </Form>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <Link to="#">Privacy Policy</Link>.
            </div>
        </div>
    )
}