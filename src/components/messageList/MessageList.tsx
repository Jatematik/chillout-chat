import { FC } from "react";
import { useMessages } from "@/hooks/useMessages";
import { Message } from "./components/Message";

interface MessageListProps {
  id?: string | null;
}

export const MessageList: FC<MessageListProps> = ({ id }) => {
  const { messages } = useMessages({ id });

  return (
    <div className="overflow-y-auto w-full grow px-4 pt-3 pb-20 relative flex flex-col-reverse gap-2">
      {messages.map((item) => (
        <Message key={item.id} text={item.text} isOwner={item.isOwner} />
      ))}
    </div>
  );
};
