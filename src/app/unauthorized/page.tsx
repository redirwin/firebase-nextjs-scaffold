import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-4 max-w-md">
                <h1 className="text-4xl font-bold text-red-600">Unauthorized Access</h1>
                <p className="text-gray-600">
                    You don't have permission to access this page. Please contact an administrator if you believe this is an error.
                </p>
                <Link href="/">
                    <Button>Return to Home</Button>
                </Link>
            </div>
        </div>
    );
}