"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: "user" | "admin";
}

export function ProtectedRoute({ children, requiredRole = "user" }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!loading && !isInitialized) {
            setIsInitialized(true);
            return;
        }

        if (!loading && isInitialized) {
            // If user is authenticated and on login/register page, redirect to dashboard
            if (user && (pathname === "/login" || pathname === "/register")) {
                router.replace("/dashboard");
                return;
            }

            // If user is not authenticated and not on allowed public paths, redirect to login
            if (!user && 
                pathname !== "/login" && 
                pathname !== "/register" && 
                pathname !== "/" && 
                pathname !== "/reset-password"
            ) {
                router.replace("/login");
                return;
            }
        }
    }, [user, loading, router, pathname, requiredRole, isInitialized]);

    // Show loading until fully initialized
    if (loading || !isInitialized) {
        return <div>Loading...</div>;
    }

    // For protected routes, don't render if not authenticated
    if (!user && pathname !== "/login" && pathname !== "/register") {
        return null;
    }

    return <>{children}</>;
}