"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AdminPage() {
    return (
        <ProtectedRoute requiredRole="admin">
            <div className="min-h-screen p-8">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
                    {/* Add admin-specific controls here */}
                </div>
            </div>
        </ProtectedRoute>
    );
}