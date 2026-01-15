"use client";
import { FaSistrix } from "react-icons/fa6";
import { useSafeTheme } from "@/hooks";
import { iconColors } from "@/utils";
import { ChatItem } from "./components/ChatItem";

export const ChatList = () => {
  const { safeTheme } = useSafeTheme();

  return (
    <div className="transition-all min-w-xs max-w-xs bg-slate-100 dark:bg-slate-700 h-dvh flex flex-col border-r border-slate-300 dark:border-slate-800">
      <div className="px-4 py-5 w-full">
        <div className="relative">
          <FaSistrix
            size={20}
            className="absolute top-1/2 left-2 -translate-y-1/2"
            color={iconColors[safeTheme]}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-2 h-9 w-full rounded-3xl border border-slate-400 placeholder:text-slate-950 dark:placeholder:text-slate-100 text-slate-950 dark:text-slate-50"
          />
        </div>
      </div>

      <div className="overflow-y-auto w-full grow p-3 ">
        <h1 className="mb-1.5 text-3xl text-slate-950 dark:text-slate-100">
          Messages
        </h1>
        <ul className="flex flex-col gap-1.5 w-full">
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </ul>
      </div>
    </div>
  );
};
