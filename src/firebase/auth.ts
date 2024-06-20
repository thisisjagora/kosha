import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "./config";

export const auth = getAuth(firebaseApp);

const signIn = async (payload: SingInDto) => {
      const {email, password} = payload;
      try{
            await signInWithEmailAndPassword(auth, email, password)
      }catch (err){
            throw err;
      }
}


export {
      signIn
}