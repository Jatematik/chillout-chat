import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import Cookies from "js-cookie";

export const loginWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);

    const idToken = await data.user.getIdToken();

    Cookies.set("session", idToken, { expires: 7 });

    return idToken;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
