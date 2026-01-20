"use client";
import { FaSistrix } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";
import { FC, useState } from "react";

import { useSafeTheme } from "@/hooks";
import { iconColors } from "@/utils";
import { findUserByUsername } from "@/lib/findUserByUserName";
import type { IUser } from "@/types/User.types";
import { UserItem } from "./components/UserItem";
import { Chats } from "./components/Chats";
import clsx from "clsx";

type Inputs = {
  searchValue: string;
};

interface ChatListProps {
  cssStyles?: string;
}

export const ChatList: FC<ChatListProps> = ({ cssStyles }) => {
  const { safeTheme } = useSafeTheme();
  const [searchUser, setSearchUser] = useState<IUser | null>(null);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ searchValue }) => {
    try {
      const user = await findUserByUsername(searchValue);

      setSearchUser(user);
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <div
      className={clsx(
        "transition-all md:min-w-xs md:max-w-xs bg-slate-100 dark:bg-slate-700 h-dvh flex flex-col md:border-r border-slate-300 dark:border-slate-800 md:pb-0",
        "min-w-none max-w-none w-full border-r-0 pb-24",
        cssStyles,
      )}
    >
      <div className="px-4 py-5 w-full">
        <form className="relative" onSubmit={handleSubmit(onSubmit)}>
          <FaSistrix
            size={20}
            className="absolute top-1/2 left-2 -translate-y-1/2"
            color={iconColors[safeTheme]}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-2 h-9 w-full rounded-3xl border border-slate-400 placeholder:text-slate-500 text-slate-950 dark:text-slate-50"
            {...register("searchValue")}
          />
        </form>
      </div>

      <div className="overflow-y-auto w-full grow p-3 ">
        {searchUser ? (
          <>
            <h1 className="mb-1.5 text-3xl text-slate-950 dark:text-slate-100">
              Find user
            </h1>
            <ul className="flex flex-col gap-1.5 w-full">
              <UserItem user={searchUser} />
            </ul>
          </>
        ) : (
          <Chats />
        )}
      </div>
    </div>
  );
};
