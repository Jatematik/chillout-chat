import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SelectedUserProvider } from "@/context/SelectedUserContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Chillout chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <SelectedUserProvider>
          <ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </SelectedUserProvider>
      </body>
    </html>
  );
}
