"use client";
import Link from "next/link";
import {
  FaGear,
  FaRegComments,
  FaRegBookmark,
  FaReact,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import clsx from "clsx";

import { ToggleTheme } from "../toggleTheme";
import { iconColors } from "@/utils";
import { useSafeTheme } from "@/hooks";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

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
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);

      Cookies.remove("session");

      router.replace("/login");
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <aside
      className={clsx(
        "md:py-6",
        "py-3",
        "flex",
        "flex-row",
        "md:flex-col",
        "justify-center",
        "md:justify-between",
        "bg-slate-100",
        "dark:bg-slate-700",
        "border-slate-300",
        "dark:border-slate-800",
        "md:border-r-8 border-r-0",
        "md:border-t-0 border-t-8",
        "transition-all",
        "fixed",
        "md:static",
        "bottom-0 left-0 right-0",
        "z-50",
        "gap-2.5",
        "md:gap-0",
      )}
    >
      <nav>
        <div
          className={clsx(
            "mb-16 px-2.5 md:flex justify-center items-center",
            "hidden",
          )}
        >
          <Link href={"/"}>
            <FaReact size={34} color={iconColors[safeTheme]} />
          </Link>
        </div>

        <ul className={clsx("flex md:flex-col md:gap-5", "flex-row gap-2.5")}>
          {routes.map((route) => (
            <li
              key={route.title}
              className="px-2.5 flex items-center justify-center"
            >
              <Link
                href={route.path}
                className="flex flex-col justify-center items-center gap-1"
              >
                {route.icon(iconColors[safeTheme])}
                <span className="hidden md:inline text-xs text-slate-900 dark:text-slate-100 ">
                  {route.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex justify-center items-center flex-col gap-6">
        <ToggleTheme />
        <button
          onClick={handleSignOut}
          className="flex justify-center items-center cursor-pointer"
        >
          <FaArrowRightFromBracket size={30} />
        </button>
      </div>
    </aside>
  );
};
