import { FirebaseError } from "firebase/app";

export const getErrorMessage = (error: FirebaseError) => {
      switch (error.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          return "This email is already in use.";
        case "Firebase: Error (auth/invalid-email).":
          return "Invalid email address.";
        case "Firebase: Error (auth/weak-password).":
          return "The password is too weak.";
        case "Firebase: Error (auth/user-disabled).":
          return "This account has been disabled";
        case "Firebase: Error (auth/user-not-found).":
          return "Account doesn't exist";
        case "Firebase: Error (auth/wrong-password).":
          return "Wrong email/password";
        default:
          return "An unexpected error occurred. Please try again.";
      }
    };
    