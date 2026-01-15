import { Navbar } from "@/components";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh">
      <Navbar />

      <div className="grow">{children}</div>
    </div>
  );
};
