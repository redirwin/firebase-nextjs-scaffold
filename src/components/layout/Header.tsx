"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export function Header() {
    const { user, loading, signOut } = useAuth();

    if (loading) {
        return (
            <header className="border-b">
                <nav className="container mx-auto p-4">
                    <div>Loading...</div>
                </nav>
            </header>
        );
    }

    return (
        <header className="border-b">
            <nav className="container mx-auto p-4">
                <ul className="flex items-center gap-6 text-sm">
                    <li>
                        <Link 
                            href="/" 
                            className="text-gray-600 hover:text-blue-600 transition-colors"
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
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/register"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
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
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            {user.role === "admin" && (
                                <li>
                                    <Link 
                                        href="/admin"
                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        Admin
                                    </Link>
                                </li>
                            )}
                            <li>
                                <a 
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut();
                                    }}
                                    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                                >
                                    Sign Out
                                </a>
                            </li>
                            <li className="text-gray-600 ml-auto">
                                {user.email}
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}