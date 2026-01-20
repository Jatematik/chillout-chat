"use client";
import clsx from "clsx";
import { useParams } from "next/navigation";

import { ChatHeader, MessageForm, MessageList } from "@/components";
import { mainBgColor } from "@/utils/colors";

export const Chat = () => {
  const params = useParams<{ id: string }>();

  return (
    <div
      className={clsx(
        "h-dvh",
        "grow",
        "flex",
        "flex-col",
        "bg-linear-to-r relative",
        "md:pb-0",
        "pb-20",
        mainBgColor,
      )}
    >
      <ChatHeader />
      <MessageList id={params?.id} />

      <MessageForm chatId={params?.id} />
    </div>
  );
};
