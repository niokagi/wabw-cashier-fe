import { cn } from "@/lib/utils";
import { signUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { useApi } from "@/hooks/useApi";
import { signUpService } from "@/services/auth.service";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
    const { execute: performSignUp, isLoading } = useApi(signUpService)
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        const response = await performSignUp(values)
        if (response.error) {
            toast.error(response.error || 'an unexpected error occured.')
            return
        }

        if (response.data) {
            if (response.successMessage) {
                toast.success(response.successMessage)
            }
            setTimeout(() => {
                navigate('/auth/sign-in')
            }, 1500)
        } else {
            toast.error('an unknown error occured.')
        }

    }

    return (
        <div className={cn("flex flex-col gap-4", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle id="signup-form-card" className="text-xl">Getting started</CardTitle>
                    <CardDescription>
                        Sign up for new cashier worker
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
                        <div className="grid gap-7 px-9 py-3">
                            <FormField control={form.control} name="username" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} autoComplete="username" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
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
                                        <Input id="password" type="password" placeholder="Password" {...field} autoComplete="new-password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" className="w-full" aria-live="polite" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Signing Up...
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </div>
                        <div className="text-center text-sm">
                            Already have an account {" "}
                            <Link to={'/auth/sign-in'} className="underline underline-offset-4">Sign In</Link>
                        </div>
                    </form>
                </Form>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                <span>Made by Adhim Niokagi - 3124510109</span>
                {/* <span>Made with 🖤 by Adhim Niokagi - 3124510109</span> */}
                <br />
                <Link to="/privacy-policy">Privacy Policy</Link>.
            </div>
        </div>
    )
}