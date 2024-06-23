import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseApp from "./config";
import { db } from "./firestore";

export const auth = getAuth(firebaseApp);

const signIn = async (payload: SignInDto) => {
      const { email, password } = payload;
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, "users", res.user.uid));
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

const signUp = async (payload: SignUpDto) => {
      const { name, phone, email, password } = payload;
    
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
    
        try {
          await setDoc(doc(db, "users", res.user.uid), {
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


export {
      signIn,
      signUp,
      signOutUser
}