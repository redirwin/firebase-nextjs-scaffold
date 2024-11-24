/**
 * Core authentication types for the application
 */

export type UserRole = "user" | "admin";

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    role: UserRole;
    createdAt: Date | null;
    lastLogin: Date | null;
}

export interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    error: Error | null;
    signInWithGoogle: () => Promise<boolean>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => Promise<void>;
    sendVerificationEmail: () => Promise<void>;
}