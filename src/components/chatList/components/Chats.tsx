"use client";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { ChatItem } from "./ChatItem";
import { auth, db } from "@/lib/firebase";
import type { IChat, IChatInList } from "@/types/Chat.types";
import { useSelectedUser } from "@/hooks";

export const Chats = () => {
  const [user] = useAuthState(auth);
  const [chats, setChats] = useState<IChatInList[]>([]);
  const { handleSelectUser } = useSelectedUser();

  useEffect(() => {
    if (!user) {
      return;
    }

    const q = query(
      collection(db, "chats"),
      where("users", "array-contains", user.uid),
      orderBy("updatedAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const chatsData = snapshot.docs.map((doc) => {
          const data = doc.data() as IChat;

          const otherUser = Object.entries(data.profiles).filter(
            (item) => item[0] !== user.uid,
          )[0];

          const selectedUser = {
            id: data.id,
            ...otherUser[1],
            lastMessage: data.lastMessage,
          };

          handleSelectUser(selectedUser);

          return selectedUser;
        }) as IChatInList[];

        setChats(chatsData);
      },
      (error) => {
        console.error("Ошибка при получении чатов: ", error);
      },
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <>
      <h1 className="mb-1.5 text-3xl text-slate-950 dark:text-slate-100">
        Messages
      </h1>
      <ul className="flex flex-col gap-1.5 w-full">
        {chats.map((item) => (
          <ChatItem
            key={item.id}
            displayName={item.displayName}
            isTyping={item.isTyping}
            lastMessage={item.lastMessage}
            chatId={item.id}
          />
        ))}
      </ul>
    </>
  );
};
