import { signIn } from "@/firebase/auth"

const useSignIn = () => {
      const _signIn = (payload: SingInDto) => {
            signIn(payload)
            .then()
            .catch()
      }
      return {
            signInWithEmail: _signIn
      }
}