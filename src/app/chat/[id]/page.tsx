import { ChatList } from "@/components";
import { MainLayout } from "@/layout";
import { Chat } from "@/views";

export default function Page() {
  return (
    <MainLayout>
      <div className="flex">
        <ChatList cssStyles="hidden" />
        <Chat />
      </div>
    </MainLayout>
  );
}
