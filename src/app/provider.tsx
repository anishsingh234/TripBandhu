"use client";
import React, { useEffect, useState, useContext, useCallback } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "./Context/UserDetailContext";
import { TripDetailContext } from "./Context/TripDetailContext";

/* ---------------- PROVIDER COMPONENT ---------------- */
export default function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const createUserMutation = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [tripDetailInfo, setTripDetailInfo] = useState<any>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const { user, isLoaded } = useUser();

  // Memoize the user creation function to prevent unnecessary recreations
  const createNewUser = useCallback(async () => {
    if (!user || isCreatingUser) return;
    
    setIsCreatingUser(true);
    try {
      const result = await createUserMutation({
        email: user.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user.imageUrl ?? "",
        name: user.fullName ?? "",
      });
      setUserDetail(result);
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setIsCreatingUser(false);
    }
  }, [user, isCreatingUser, createUserMutation]);

  useEffect(() => {
    // Only run when Clerk has finished loading and user exists
    if (isLoaded && user) {
      createNewUser();
    }
  }, [isLoaded, user, createNewUser]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider
        value={{ tripDetailInfo, setTripDetailInfo }}
      >
        <Header />
        {children}
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}

/* ---------------- CUSTOM HOOKS ---------------- */
export const useUserDetail = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserDetail must be used within Provider");
  }
  return context;
};

export const useTripDetail = () => {
  const context = useContext(TripDetailContext);
  if (!context) {
    throw new Error("useTripDetail must be used within Provider");
  }
  return context;
};