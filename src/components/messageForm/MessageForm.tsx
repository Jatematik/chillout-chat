"use client";
import { FC } from "react";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegPaperPlane } from "react-icons/fa6";

import { useSafeTheme } from "@/hooks";
import { auth, db } from "@/lib/firebase";
import { iconColors } from "@/utils";

interface MessageFormProps {
  chatId?: string | null;
}

type Input = { text: string };

// TODO: error state

export const MessageForm: FC<MessageFormProps> = ({ chatId }) => {
  const [user] = useAuthState(auth);

  const { safeTheme } = useSafeTheme();
  const { register, handleSubmit, setValue } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async ({ text }) => {
    try {
      if (chatId && user) {
        await addDoc(collection(db, "chats", chatId, "messages"), {
          text,
          senderId: user.uid,
          sentAt: Timestamp.now(),
          status: "sent",
        });

        const chatRef = doc(db, "chats", chatId);
        await updateDoc(chatRef, {
          lastMessage: text,
          updatedAt: Timestamp.now(),
        });

        setValue("text", "");
      }
    } catch (error) {
      console.log("ERROR ", error);
    }
  };

  return (
    <form
      className="absolute md:bottom-3 bottom-20 left-4 right-4 flex gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        placeholder="Message..."
        className="shadow-lg px-3 h-14 grow rounded-4xl bg-slate-50 dark:bg-slate-700 placeholder:text-slate-500 text-slate-950 dark:text-slate-50"
        {...register("text", { required: true })}
      />

      <button
        className="shadow-lg cursor-pointer h-14 w-14 rounded-full bg-slate-50 dark:bg-slate-700 flex justify-center items-center"
        type="submit"
      >
        <FaRegPaperPlane color={iconColors[safeTheme]} size={24} />
      </button>
    </form>
  );
};
