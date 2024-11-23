"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { ToastWrapper } from "@/components/ui/toast-wrapper";

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
            <ToastWrapper />
        </AuthProvider>
    );
}