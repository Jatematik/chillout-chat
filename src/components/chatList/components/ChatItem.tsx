"use client";
import { FaCircleUser } from "react-icons/fa6";
import { FC, memo } from "react";
import Link from "next/link";
import { useSafeTheme } from "@/hooks";
import { iconColors } from "@/utils";

interface ChatItemProps {
  displayName: string | null;
  isTyping: boolean;
  lastMessage: string | null;
  chatId: string;
}

export const ChatItem: FC<ChatItemProps> = memo(
  ({ displayName, isTyping, lastMessage, chatId }) => {
    const { safeTheme } = useSafeTheme();

    return (
      <li>
        <Link
          href={`/chat/${chatId}`}
          className="h-18 rounded-xl py-2 px-3 bg-gray-200 dark:bg-gray-800 flex gap-1 items-center justify-between"
        >
          <div className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-1">
            <div className="h-12 w-12 rounded-full relative ">
              <FaCircleUser size={48} color={iconColors[safeTheme]} />
              <div className="absolute top-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>

            <div className="flex flex-col gap-0.5 grow ">
              <span className="font-bold text-base whitespace-nowrap overflow-hidden text-ellipsis text-slate-950 dark:text-slate-100">
                {displayName}
              </span>
              {lastMessage && (
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-slate-950 dark:text-slate-100">
                  {lastMessage}
                </span>
              )}
            </div>
          </div>
        </Link>
      </li>
    );
  },
);
