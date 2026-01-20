import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";

export const registrationUser = async ({
  email,
  password,
  username,
  displayName,
}: {
  email: string;
  password: string;
  username: string;
  displayName: string;
}) => {
  try {
    const usernameQuery = query(
      collection(db, "users"),
      where("username", "==", username.toLowerCase()),
    );
    const usernameSnapshot = await getDocs(usernameQuery);

    if (!usernameSnapshot.empty) {
      alert("Username уже занят");
      return;
    }

    const data = await createUserWithEmailAndPassword(auth, email, password);

    const user = data.user;

    const idToken = await data.user.getIdToken();

    Cookies.set("session", idToken, { expires: 7 });

    await setDoc(doc(db, "users", user.uid), {
      userId: user.uid,
      email: user.email,
      username: username.toLowerCase(),
      displayName: displayName || email.split("@")[0],
      createdAt: new Date(),
      lastSeen: new Date(),
    });
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
