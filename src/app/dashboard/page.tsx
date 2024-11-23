import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <SignOutButton />
                </div>
                {/* Dashboard content */}
            </div>
        </ProtectedRoute>
    );
}