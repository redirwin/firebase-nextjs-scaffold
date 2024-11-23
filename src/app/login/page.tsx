"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function LoginPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen flex items-center justify-center bg-background p-4 md:p-8">
                <div className="w-full max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to sign in to your account
                        </p>
                    </div>
                    
                    <div className="border rounded-lg bg-card p-6 shadow-sm">
                        <LoginForm />
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        New here?{" "}
                        <Link 
                            href="/register" 
                            className="text-primary underline-offset-4 hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </ProtectedRoute>
    );
}