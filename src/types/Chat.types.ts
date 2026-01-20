import { Timestamp } from "firebase/firestore";

export interface IChat {
  id: string;
  users: string[];
  profiles: {
    [x: string]: {
      displayName: string | null;
      isTyping: boolean;
      avatar: null;
    };
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastMessage: null;
}

export interface IChatInList {
  id: string;
  displayName: string | null;
  isTyping: boolean;
  lastMessage: string | null;
  avatar: string | null;
}
