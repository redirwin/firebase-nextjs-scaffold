"use client";

import { PasswordResetForm } from "@/components/auth/PasswordResetForm";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6">
                <PasswordResetForm />
            </div>
        </div>
    );
}