import SignInForm from "@/components/auth/SignInForm";

export default function SignIn() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <p className="flex items-center gap-2 self-center font-medium">
                    NCashier Auth page
                </p>
                <SignInForm />
            </div>
        </div>
    )
}