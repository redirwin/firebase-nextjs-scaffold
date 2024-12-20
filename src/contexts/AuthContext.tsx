"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    sendEmailVerification
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { AuthContextType, UserProfile } from "@/types/auth";
import { useRouter } from "next/navigation";
import { createUserProfile, getUserProfile } from "@/services/userService";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();

    useEffect(() => {
        return onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    // Set minimal user data to enable immediate auth checks
                    const minimalUser: UserProfile = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email || "",
                        emailVerified: firebaseUser.emailVerified,
                        role: "user",
                        displayName: firebaseUser.displayName || null,
                        photoURL: firebaseUser.photoURL || null,
                        createdAt: null,
                        lastLogin: null
                    };
                    
                    // Set minimal user data first
                    setUser(minimalUser);
                    
                    // Then fetch and update with full profile
                    try {
                        const profile = await getUserProfile(firebaseUser.uid);
                        if (profile) {
                            setUser(profile);
                        }
                    } catch (profileError) {
                        console.error("Error fetching user profile:", profileError);
                        // Keep minimal user data if profile fetch fails
                    }
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Error in auth state change:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });
    }, []);

    const signInWithGoogle = async (): Promise<boolean> => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            // Check if user already exists in Firestore
            const existingProfile = await getUserProfile(result.user.uid);
            
            if (!existingProfile) {
                // Create new user profile if they don't exist
                const userProfile: UserProfile = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    emailVerified: result.user.emailVerified,
                    role: "user",
                    createdAt: new Date(),
                    lastLogin: new Date()
                };
                
                await createUserProfile(userProfile);
                return true; // Indicates new account was created
            }
            
            return false; // Indicates existing account was used
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to sign in with Google"));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (err) {
            console.error("AuthContext: Sign in error:", err);
            setError(err instanceof Error ? err : new Error("Failed to sign in"));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            setLoading(true);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(result.user);
            
            const userProfile: UserProfile = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                emailVerified: result.user.emailVerified,
                role: "user",
                createdAt: new Date(),
                lastLogin: new Date()
            };
            
            await createUserProfile(userProfile);
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to create account"));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            await firebaseSignOut(auth);
            router.push("/");
        } catch (err) {
            console.error("AuthContext: Sign out error:", err);
            setError(err instanceof Error ? err : new Error("Failed to sign out"));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email: string) => {
        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to reset password"));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data: Partial<UserProfile>) => {
        try {
            setLoading(true);
            // Implement profile update logic here
            setUser(prev => prev ? { ...prev, ...data } : null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to update profile"));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const sendVerificationEmail = async () => {
        try {
            if (!auth.currentUser) {
                throw new Error("No user logged in");
            }
            await sendEmailVerification(auth.currentUser);
        } catch (error) {
            console.error("Error sending verification email:", error);
            throw error; // Re-throw to handle in the component
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        error,
        signInWithGoogle,
        signInWithEmail,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        sendVerificationEmail,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthContext };