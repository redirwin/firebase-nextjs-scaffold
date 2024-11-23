"use client";

import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
                <LoginForm />
            </div>
        </div>
    );
}