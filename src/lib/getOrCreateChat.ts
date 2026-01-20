import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { IUser } from "@/types/User.types";

export const getOrCreateChat = async (otherUser: IUser) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("Пользователь не авторизован");
  }

  const sortedIds = [currentUser.uid, otherUser.id].sort();
  const chatId = sortedIds.join("_");

  const chatRef = doc(db, "chats", chatId);
  const chatSnap = await getDoc(chatRef);

  if (chatSnap.exists()) {
    return chatId;
  }

  const currentUserRef = doc(db, "users", currentUser.uid);
  const currentUserSnap = await getDoc(currentUserRef);

  const user = currentUserSnap.data() as IUser;

  const newChat = {
    id: chatId,
    users: [currentUser.uid, otherUser.id],
    profiles: {
      [currentUser.uid]: {
        displayName: user.displayName,
        isTyping: false,
        avatar: null,
      },
      [otherUser.id]: {
        displayName: otherUser.displayName,
        isTyping: false,
        avatar: null,
      },
    },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    lastMessage: null,
  };

  await setDoc(chatRef, newChat);

  return chatId;
};
