// src/components/auth/SignOutButton.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
    const { signOut } = useAuth();

    return (
        <Button
            onClick={signOut}
            variant="outline"
            className="gap-2"
        >
            <LogOut className="h-4 w-4" />
            Sign Out
        </Button>
    );
}