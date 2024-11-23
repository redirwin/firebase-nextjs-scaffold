import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firestore";
import type { UserProfile } from "@/types/auth";

export async function createUserProfile(user: UserProfile): Promise<void> {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
        ...user,
        createdAt: new Date(),
        lastLogin: new Date(),
        role: "user" // Default role
    });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
    }
    return null;
}