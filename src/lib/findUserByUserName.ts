import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import { IUser } from "@/types/User.types";

export const findUserByUsername = async (
  searchName: string
): Promise<IUser | null> => {
  const q = query(
    collection(db, "users"),
    where("username", "==", searchName.toLowerCase())
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const { displayName, username, email } = doc.data();
  const user: IUser = { id: doc.id, displayName, username, email };
  return user;
};
