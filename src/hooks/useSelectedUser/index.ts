import { SelectedUserContext } from "@/context/SelectedUserContext";
import { useContext } from "react";

export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext);
  if (!context) {
    throw new Error(
      "useSelectedUser must be used within a SelectedUserProvider",
    );
  }
  return context;
};
