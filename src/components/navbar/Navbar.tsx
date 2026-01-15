"use client";
import Link from "next/link";
import { FaGear, FaRegComments, FaRegBookmark, FaReact } from "react-icons/fa6";

import { ToggleTheme } from "../toggleTheme";
import { iconColors } from "@/utils";
import { useSafeTheme } from "@/hooks";

const routes = [
  {
    title: "Chats",
    path: "/",
    icon: (color = iconColors.light) => (
      <FaRegComments size={34} color={color} />
    ),
  },
  {
    title: "Save",
    path: "/save",
    icon: (color = iconColors.light) => (
      <FaRegBookmark size={34} color={color} />
    ),
  },
  {
    title: "Settings",
    path: "/settings",
    icon: (color = iconColors.light) => <FaGear size={34} color={color} />,
  },
];

export const Navbar = () => {
  const { safeTheme } = useSafeTheme();

  return (
    <aside className="py-6 flex flex-col justify-between bg-slate-100 dark:bg-slate-700 transition-all border-r-8 border-slate-300 dark:border-slate-800">
      <nav>
        <div className="mb-16 px-2.5 flex justify-center items-center">
          <Link href={"/"}>
            <FaReact size={34} color={iconColors[safeTheme]} />
          </Link>
        </div>

        <ul className="flex flex-col gap-5">
          {routes.map((route) => (
            <li key={route.title} className="px-2.5">
              <Link
                href={route.path}
                className="flex flex-col justify-center items-center gap-1"
              >
                {route.icon(iconColors[safeTheme])}
                <span className="text-xs text-slate-900 dark:text-slate-100 ">
                  {route.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex justify-center">
        <ToggleTheme />
      </div>
    </aside>
  );
};
