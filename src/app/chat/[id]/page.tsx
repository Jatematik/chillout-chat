import { FaRegPaperPlane } from "react-icons/fa6";
import { ChatList } from "@/components";
import { MainLayout } from "@/layout";
import { Chat } from "@/views";

export default function Page() {
  return (
    <MainLayout>
      <div className="flex">
        <ChatList />
        <Chat />
      </div>
    </MainLayout>
  );
}
