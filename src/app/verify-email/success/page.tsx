"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function VerificationSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to dashboard after 5 seconds
        const timeout = setTimeout(() => {
            router.push("/dashboard");
        }, 5000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-6 text-center">
                <div className="flex justify-center">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h1 className="text-2xl font-bold">Email Verified!</h1>
                <p className="text-muted-foreground">
                    Thank you for verifying your email. You'll be redirected to your dashboard shortly.
                </p>
                <Button
                    onClick={() => router.push("/dashboard")}
                    className="w-full"
                >
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
}