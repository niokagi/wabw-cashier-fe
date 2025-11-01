import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import MainLayout from "@/layouts/MainLayout"
import AuthLayout from "@/layouts/AuthLayout"
import SignIn from "@/pages/auth/SignIn"
import SignUp from "@/pages/auth/SignUp"
import ProtectedRoutes from "./ProtectedRoutes"
import PublicRoute from "./PublicRoute"
import CashierPage from "@/pages/CashierPage"
import Dashboard from "@/pages/Dashboard"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoutes />} >
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<CashierPage />} />
                        {/* <Route path="/" element={<CashierPage />} /> */}
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route index element={<Navigate to="/auth/sign-in" replace />} />
                        <Route path="sign-in" element={<SignIn />} />
                        <Route path="sign-up" element={<SignUp />} />
                    </Route>
                </Route>
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
        </BrowserRouter>
    )
}