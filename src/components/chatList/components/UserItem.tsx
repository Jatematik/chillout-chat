"use client";
import { FaCircleUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { useSafeTheme } from "@/hooks";
import { iconColors } from "@/utils";
import { IUser } from "@/types/User.types";
import { getOrCreateChat } from "@/lib/getOrCreateChat";

interface UserItemProps {
  user: IUser;
}

export const UserItem: FC<UserItemProps> = ({ user }) => {
  const { safeTheme } = useSafeTheme();
  const router = useRouter();

  const handleGoToChat = async () => {
    const chatId = await getOrCreateChat(user);

    router.push(`/chat/${chatId}`);
  };

  return (
    <li>
      <button
        onClick={handleGoToChat}
        className="h-18 rounded-xl py-2 px-3 bg-gray-200 dark:bg-gray-800 flex gap-1 items-center justify-between w-full cursor-pointer"
      >
        <div className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-1">
          <div className="h-12 w-12 rounded-full relative ">
            <FaCircleUser size={48} color={iconColors[safeTheme]} />
          </div>

          <div className="flex flex-col gap-0.5 grow items-start">
            <span className="font-bold text-base whitespace-nowrap overflow-hidden text-ellipsis text-slate-950 dark:text-slate-100">
              {user.displayName}
            </span>
            <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-blue-400">
              @{user.username}
            </span>
          </div>
        </div>
      </button>
    </li>
  );
};
