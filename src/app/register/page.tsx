"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
                <RegisterForm />
            </div>
        </div>
    );
}