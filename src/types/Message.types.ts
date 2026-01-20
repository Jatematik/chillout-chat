import { Timestamp } from "firebase/firestore";

export interface IMessage {
  id: string;
  text: string;
  senderId: string;
  sentAt: Timestamp;
  status: "sent" | "pending" | "error";
}

export interface IMessageInList {
  id: string;
  isOwner?: boolean;
  text: string;
}
