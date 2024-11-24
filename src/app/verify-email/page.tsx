"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

const COOLDOWN_TIME = 60; // seconds

export default function VerifyEmailPage() {
    const { user, sendVerificationEmail } = useAuth();
    const [isResending, setIsResending] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [cooldownTime, setCooldownTime] = useState(0);
    const { toast } = useToast();
    const router = useRouter();

    // Verification check effect
    useEffect(() => {
        const checkVerification = async () => {
            if (!user) return;
            
            try {
                // Reload the user data from Firebase
                await auth.currentUser?.reload();
                const currentUser = auth.currentUser;
                
                if (currentUser?.emailVerified) {
                    router.replace("/dashboard");
                }
            } catch (error) {
                console.error("Error checking verification status:", error);
            } finally {
                setIsChecking(false);
            }
        };

        const interval = setInterval(checkVerification, 3000); // Check every 3 seconds
        checkVerification(); // Initial check

        return () => clearInterval(interval);
    }, [user, router]);

    // Cooldown timer effect
    useEffect(() => {
        if (cooldownTime <= 0) return;

        const interval = setInterval(() => {
            setCooldownTime((time) => Math.max(0, time - 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldownTime]);

    const handleResendEmail = async () => {
        if (!user || isResending || cooldownTime > 0) return;
        
        try {
            setIsResending(true);
            await sendVerificationEmail();
            toast({
                title: "Success",
                description: "Verification email sent. Please check your inbox and spam folder.",
                variant: "default",
            });
            setCooldownTime(COOLDOWN_TIME);
        } catch (error) {
            const errorCode = error instanceof Error && 'code' in error 
                ? (error as { code: string }).code 
                : '';

            let errorMessage = "Failed to send verification email. Please try again later.";
            
            if (errorCode === "auth/too-many-requests") {
                errorMessage = "Too many attempts. Please wait a few minutes before trying again.";
            }

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsResending(false);
        }
    };

    if (!user || isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (user.emailVerified) {
        router.replace("/dashboard");
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-6 text-center">
                <div className="flex justify-center">
                    <Mail className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-2xl font-bold">Verify Your Email</h1>
                <p className="text-muted-foreground">
                    We sent a verification email to{" "}
                    <span className="font-medium text-foreground">
                        {user.email}
                    </span>
                </p>
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Please check your email and click the verification link to continue.
                        Once verified, you can access your dashboard.
                    </p>
                    <Button
                        onClick={handleResendEmail}
                        disabled={isResending || cooldownTime > 0}
                        variant="outline"
                        className="w-full"
                    >
                        {isResending 
                            ? "Sending..." 
                            : cooldownTime > 0 
                                ? `Resend available in ${cooldownTime}s`
                                : "Resend verification email"
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
}