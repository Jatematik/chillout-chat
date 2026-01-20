import { mainBgColor } from "@/utils/colors";
import clsx from "clsx";

export const Home = () => {
  return (
    <div
      className={clsx(
        "hidden",
        "h-dvh",
        "grow",
        "md:flex",
        "items-center",
        "justify-center",
        mainBgColor,
      )}
    >
      <p className="text-xl">Choose who you would like to write to</p>
    </div>
  );
};
