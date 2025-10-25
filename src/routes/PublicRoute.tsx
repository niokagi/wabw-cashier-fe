import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';

export default function PublicRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return <div></div>
    }
    
    if (isAuthenticated) {
        return <Navigate to="/" replace={true} />;
    }
    return <Outlet />
}