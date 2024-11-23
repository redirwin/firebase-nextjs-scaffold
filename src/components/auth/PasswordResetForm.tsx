import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const resetSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type ResetFormValues = z.infer<typeof resetSchema>;

export function PasswordResetForm() {
    const { resetPassword } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: ResetFormValues) => {
        try {
            setIsLoading(true);
            await resetPassword(data.email);
            toast({
                title: "Reset email sent",
                description: "Please check your email for password reset instructions.",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Reset failed",
                description: error instanceof Error ? error.message : "An error occurred",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Reset your password</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="email" 
                                        placeholder="email@example.com" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Send reset link"}
                    </Button>
                </form>
            </Form>

            <div className="text-center text-sm">
                Remember your password?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                    Back to login
                </Link>
            </div>
        </div>
    );
}