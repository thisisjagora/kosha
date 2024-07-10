import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseApp from "./config";
import { db } from "./firestore";
import { IUser } from "@/types/structs";
import { ForgotPasswordDto, SignInDto, SignUpDto } from "@/types/dtos";
import { FIREBASE_COLLECTIONS } from "@/constants/enums";

export const auth = getAuth(firebaseApp);

    const signIn = async (payload: SignInDto) => {
          const { email, password } = payload;
          try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, FIREBASE_COLLECTIONS.USERS, res.user.uid));
            if (userDoc.exists()) {
              return { ...res.user, ...userDoc.data() };
            } else {
              await deleteUser(res.user);
              throw new Error("Firebase: Error (auth/user-not-found).");
            }
          } catch (err) {
            throw err;
          }
    };

    const signInWithGoogle = async () => {
      try{
        const res = await signInWithPopup(auth, new GoogleAuthProvider())
        const userDoc = await getDoc(doc(db, FIREBASE_COLLECTIONS.USERS, res.user.uid));
        if (userDoc.exists()) {
          return { ...res.user, ...userDoc.data() };
        } else {
          await deleteUser(res.user);
          throw new Error("Firebase: Error (auth/user-not-found).");
        }
      }catch(err) {
        throw err
      }
    }

    const signUp = async (payload: SignUpDto) => {
      const { name, phone, email, password } = payload;
    
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
    
        try {
          await setDoc(doc(db, FIREBASE_COLLECTIONS.USERS, res.user.uid), {
            fullName: name,
            email,
            phoneNumber: phone
          });
        } catch (err) {
          await deleteUser(res.user);
          throw err;
        }
    
        return res;
      } catch (err) {
        throw err;
      }
    };
    
    const signOutUser = async () => {
      try {
        await signOut(auth);
      } catch (err) {
        throw err;
      }
    };

    /**
     * 
     * @param user 
     * Deleting a user document would also delete the user account once the app is refreshed at any point. 
     * This is because in the auth state listener in the layout component, if a the logged in user doc doesn't exist it automatically deletes that users account.
     */
    const deleteUserAccount = async (user: IUser) => {
      try {
        await deleteDoc(doc(db, FIREBASE_COLLECTIONS.USERS, user.uid));
      } catch (err) {
        throw err;
      }
    };

    const forgotPassword = async (payload: ForgotPasswordDto) => {
      try{
        await sendPasswordResetEmail(auth, payload.email)
      }catch (err) {
        throw err;
      }
    }


export {
      signIn,
      signInWithGoogle, 
      signUp,
      signOutUser,
      deleteUserAccount,
      forgotPassword
}