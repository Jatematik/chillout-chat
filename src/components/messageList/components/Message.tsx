"use client";
import { FC } from "react";
import { FaCircleUser } from "react-icons/fa6";
import clsx from "clsx";

interface MessageProps {
  isOwner?: boolean;
  text: string;
}

export const Message: FC<MessageProps> = ({ isOwner, text }) => {
  return (
    <div
      className={clsx(
        "flex",
        {
          "justify-end": isOwner,
        },
        {
          "justify-start": !isOwner,
        },
      )}
    >
      {isOwner ? (
        <div className="flex gap-2 items-end basis-2/3 justify-end">
          <p className="bg-gray-300 rounded-xl p-2 text-slate-950">{text}</p>
          <div className="h-12 w-12 rounded-full relative ">
            <FaCircleUser size={48} />
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-end basis-2/3 justify-start">
          <div className="h-12 w-12 rounded-full relative ">
            <FaCircleUser size={48} />
          </div>
          <p className="bg-blue-300 rounded-xl p-2 text-slate-950">{text}</p>
        </div>
      )}
    </div>
  );
};
