"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { db, auth } from "@/lib/firebase";
import { IMessage, IMessageInList } from "@/types/Message.types";

interface Props {
  id?: string | null;
}

// TODO: error state

export const useMessages = ({ id }: Props) => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<IMessageInList[]>([]);

  useEffect(() => {
    if (!id || !user) return;

    const q = query(
      collection(db, "chats", id, "messages"),
      orderBy("sentAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => {
          const data = doc.data() as IMessage;
          return {
            id: doc.id,
            isOwner: user!.uid === data.senderId,
            text: data.text,
          };
        });

        setMessages(messagesData);
      },
      (error) => {
        console.error("Ошибка при получении сообщений: ", error);
      },
    );

    return () => unsubscribe();
  }, [id, user]);

  return { messages };
};
