"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Firebase Auth Scaffold</h1>
        <p className="text-gray-600">A secure authentication system built with Next.js and Firebase</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {!user ? (
          <ul className="text-center space-y-2">
            <li>
              <Link 
                href="/login" 
                className="text-blue-600 hover:underline"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link 
                href="/register" 
                className="text-blue-600 hover:underline"
              >
                Create Account
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="text-center space-y-2">
            <li>
              <Link 
                href="/dashboard" 
                className="text-blue-600 hover:underline"
              >
                Go to Dashboard
              </Link>
            </li>
            {user.role === "admin" && (
              <li>
                <Link 
                  href="/admin" 
                  className="text-blue-600 hover:underline"
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}