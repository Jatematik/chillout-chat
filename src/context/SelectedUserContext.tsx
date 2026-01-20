"use client";
import { IChatInList } from "@/types/Chat.types";
import { FC, createContext, useState, ReactNode } from "react";

interface SelectedUserContextType {
  selectedUser: IChatInList | null;
  handleSelectUser: (user: IChatInList | null) => void;
}

export const SelectedUserContext = createContext<
  SelectedUserContextType | undefined
>(undefined);

export const SelectedUserProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedUser, setSelectedUser] = useState<IChatInList | null>(null);

  const handleSelectUser = (user: IChatInList | null) => setSelectedUser(user);

  return (
    <SelectedUserContext.Provider value={{ selectedUser, handleSelectUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
};
