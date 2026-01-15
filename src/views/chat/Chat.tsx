"use client";
import { Message } from "@/components";
import { useSafeTheme } from "@/hooks";
import { iconColors } from "@/utils";
import { FaCircleUser, FaRegPaperPlane } from "react-icons/fa6";

const mockMessages = [{}];

export const Chat = () => {
  const { safeTheme } = useSafeTheme();

  return (
    <div className="h-dvh grow flex flex-col bg-linear-to-r from-red-200 to-yellow-200 dark:from-blue-200 relative">
      <div className="transition-all min-h-20 bg-slate-100 dark:bg-slate-700 p-4">
        <div className="flex gap-1">
          <div className="h-12 w-12 rounded-full">
            <FaCircleUser size={48} color={iconColors[safeTheme]} />
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-base whitespace-nowrap overflow-hidden text-ellipsis text-slate-950 dark:text-slate-100">
              Figma Teams
            </span>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto w-full grow px-4 pt-3 pb-20 relative flex flex-col-reverse gap-2">
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem at
                    maiores ducimus omnis dolores ad quae cumque reiciendis esse
                    possimus? maiores ducimus omnis dolores ad quae cumque reiciendis
                    esse possimus?"
        />
        <Message isOwner text="Hello!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message isOwner text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
        <Message text="Hi!" />
      </div>

      <form className="absolute bottom-3 left-4 right-4 flex gap-4">
        <input
          type="text"
          placeholder="Message..."
          className="shadow-lg px-3 h-14 grow rounded-4xl bg-slate-50 dark:bg-slate-700 placeholder:text-slate-950 dark:placeholder:text-slate-100 text-slate-950 dark:text-slate-50"
        />

        <button
          className="shadow-lg cursor-pointer h-14 w-14 rounded-full bg-slate-50 dark:bg-slate-700 flex justify-center items-center"
          type="submit"
        >
          <FaRegPaperPlane color={iconColors[safeTheme]} size={24} />
        </button>
      </form>
    </div>
  );
};
