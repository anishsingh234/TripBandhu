import { createContext, useContext } from "react";

type UserDetail = {
  _id?: string;
  email?: string;
  imageUrl: string;
  name: string;
  _creationTime?: number;
  subscription?: string;
} | null;

export type UserContextType = {
  userDetail: UserDetail;
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetail>>;
};

export const UserDetailContext = createContext<UserContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useUserDetail = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserDetail must be used within UserDetailProvider");
  }
  return context;
};