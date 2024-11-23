"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinkStyles = "text-muted-foreground hover:text-primary transition-colors";

export function Header() {
    const { user, loading, signOut } = useAuth();

    if (loading) {
        return (
            <header className="border-b border-border">
                <nav className="container mx-auto px-4 h-14 flex items-center">
                    <div className="text-muted-foreground">Loading...</div>
                </nav>
            </header>
        );
    }

    return (
        <header className="border-b border-border bg-background">
            <nav className="container mx-auto px-4 h-14">
                <ul className="flex items-center gap-6 h-full text-sm">
                    <li>
                        <Link 
                            href="/" 
                            className={navLinkStyles}
                        >
                            Home
                        </Link>
                    </li>

                    {!user ? (
                        // Public links
                        <>
                            <li>
                                <Link 
                                    href="/login"
                                    className={navLinkStyles}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/register"
                                    className={navLinkStyles}
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    ) : (
                        // Authenticated user links
                        <>
                            <li>
                                <Link 
                                    href="/dashboard"
                                    className={navLinkStyles}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            {user.role === "admin" && (
                                <li>
                                    <Link 
                                        href="/admin"
                                        className={navLinkStyles}
                                    >
                                        Admin
                                    </Link>
                                </li>
                            )}
                            <li>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut();
                                    }}
                                    className={cn(
                                        navLinkStyles,
                                        "cursor-pointer"
                                    )}
                                >
                                    Sign Out
                                </button>
                            </li>
                            <li className="text-muted-foreground ml-auto">
                                {user.email}
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}