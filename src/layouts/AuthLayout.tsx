import { Outlet } from "react-router"
import { Toaster } from "sonner"

export default function AuthLayout() {
    return (
        <main>
            <Toaster position="top-right" richColors />
            <Outlet />
        </main>
    )
}