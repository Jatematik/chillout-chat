import { MainLayout } from "@/layout";
import { ChatList } from "@/components";
import { Home } from "@/views";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="flex">
        <ChatList />
        <Home />
      </div>
    </MainLayout>
  );
}
