import { useTheme } from "next-themes";

type SafeTheme = "light" | "dark";

export const useSafeTheme = () => {
  const { theme = "light", setTheme } = useTheme();
  const safeTheme = (theme === "dark" ? "dark" : "light") as SafeTheme;

  const setSafeTheme = (value: typeof safeTheme) => setTheme(value);

  return {
    safeTheme,
    setSafeTheme,
  } as const;
};
