"use client";
import { useSafeTheme, useSelectedUser } from "@/hooks";
import { iconColors } from "@/utils";
import { useRouter } from "next/navigation";
import { FaCircleUser, FaAngleLeft } from "react-icons/fa6";

export const ChatHeader = () => {
  const { safeTheme } = useSafeTheme();
  const { selectedUser } = useSelectedUser();
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <div className="transition-all min-h-20 bg-slate-100 dark:bg-slate-700 p-4 flex items-center gap-6">
      <button
        className="h-6 w-6 rounded-full flex justify-center items-center"
        onClick={handleBack}
      >
        <FaAngleLeft size={24} color={iconColors[safeTheme]} />
      </button>
      <div className="flex gap-1">
        <div className="h-12 w-12 rounded-full">
          <FaCircleUser size={48} color={iconColors[safeTheme]} />
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-base whitespace-nowrap overflow-hidden text-ellipsis text-slate-950 dark:text-slate-100">
            {selectedUser?.displayName}
          </span>
          <span className="text-sm text-green-500">Online</span>
        </div>
      </div>
    </div>
  );
};
