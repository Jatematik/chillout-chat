"use client";
import { FaCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { useSafeTheme } from "@/hooks";
import { iconColors } from "@/utils";

export const ChatItem = () => {
  const { safeTheme } = useSafeTheme();

  return (
    <li>
      <Link
        href={"/chat/1"}
        className="h-18 rounded-xl py-2 px-3 bg-gray-200 dark:bg-gray-800 flex gap-1 items-center justify-between"
      >
        <div className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-1">
          <div className="h-12 w-12 rounded-full relative ">
            <FaCircleUser size={48} color={iconColors[safeTheme]} />
            <div className="absolute top-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-green-500"></div>
          </div>

          <div className="flex flex-col gap-0.5 grow ">
            <span className="font-bold text-base whitespace-nowrap overflow-hidden text-ellipsis text-slate-950 dark:text-slate-100">
              Figma Teams
            </span>
            <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-slate-950 dark:text-slate-100">
              text
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center h-5 p-1.5 rounded-full bg-green-500">
          <span className="text-sm text-slate-50">2</span>
        </div>
      </Link>
    </li>
  );
};
