export const getFirebaseErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
      // Firebase error codes
      const errorCode = (error as { code?: string }).code;
      switch (errorCode) {
          // Authentication errors
          case "auth/email-already-in-use":
              return "An account with this email already exists.";
          case "auth/user-not-found":
              return "No account found with this email address.";
          case "auth/wrong-password":
              return "Incorrect password. Please try again.";
          case "auth/invalid-credential":
              return "Invalid email or password. Please try again.";
          case "auth/invalid-email":
              return "Please enter a valid email address.";
          case "auth/weak-password":
              return "Password should be at least 8 characters.";
          case "auth/too-many-requests":
              return "Too many failed attempts. Please try again later.";
          case "auth/user-disabled":
              return "This account has been disabled. Please contact support.";
          case "auth/operation-not-allowed":
              return "Operation not allowed. Please contact support.";
          case "auth/popup-closed-by-user":
              return "Google sign-in was cancelled. Please try again.";
          case "auth/popup-blocked":
              return "Sign-in popup was blocked by your browser. Please allow popups for this site.";
          case "auth/network-request-failed":
              return "Network error. Please check your internet connection.";
          default:
              return "Invalid email or password. Please try again.";
      }
  }
  return "An unexpected error occurred. Please try again.";
};