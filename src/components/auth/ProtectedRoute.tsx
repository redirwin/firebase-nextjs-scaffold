"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

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
        }

        if (!loading && isInitialized) {
            // If user needs email verification, redirect to verify-email page
            if (user && !auth.currentUser?.emailVerified && 
                pathname !== "/login" && 
                pathname !== "/register" && 
                pathname !== "/" && 
                pathname !== "/verify-email" &&
                pathname !== "/verify-email/success"
            ) {
                router.push("/verify-email");
                return;
            }
        }
    }, [user, loading, router, pathname, isInitialized]);

    if (loading || !isInitialized) {
        return <div>Loading...</div>;
    }

    // For protected routes, don't render if not authenticated
    if (!user && pathname !== "/login" && pathname !== "/register" && pathname !== "/") {
        router.push("/login");
        return null;
    }

    return <>{children}</>;
}