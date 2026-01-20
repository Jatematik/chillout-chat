"use client";
import { FaMoon, FaSun } from "react-icons/fa6";
import clsx from "clsx";

import { iconColors } from "@/utils";
import { useSafeTheme } from "@/hooks";

export const ToggleTheme = () => {
  const { safeTheme, setSafeTheme } = useSafeTheme();

  const toggleTheme = () =>
    setSafeTheme(safeTheme === "light" ? "dark" : "light");

  return (
    <button
      className="hidden h-20 w-10 cursor-pointer md:flex flex-col rounded-4xl items-center justify-between bg-slate-400 dark:bg-slate-900 p-1.5 gap-2.5 relative z-20"
      onClick={toggleTheme}
    >
      <FaSun
        size={28}
        className="relative z-20 transition-all duration-300"
        color={iconColors[safeTheme]}
      />
      <FaMoon
        size={28}
        className="relative z-20 transition-all duration-300"
        color={iconColors[safeTheme]}
      />

      <div
        className={clsx(
          "rounded-3xl",
          "w-9",
          "h-9",
          "absolute left-0.5",
          "transition-all",
          [
            safeTheme === "light" && ["top-0.5", "bg-slate-200"],
            safeTheme === "dark" && ["top-10.5", "bg-slate-500"],
          ],
        )}
      ></div>
    </button>
  );
};
