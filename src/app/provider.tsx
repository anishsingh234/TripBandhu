import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useContext } from "react";
import { UserDetailContext } from "./Context/UserDetailContext";
import { TripContextType, TripDetailContext } from "./Context/TripDetailContext";
export default function Providerh({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CreateUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo,setTripDetailInfo]=useState<any>();
  const { user } = useUser();
  useEffect(() => {
    user && CreateNewUser();
  }, [user]);
  const CreateNewUser = async () => {
    const result = await CreateUser({
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      imageUrl: user?.imageUrl ?? "",
      name: user?.fullName ?? "",
    });
    setUserDetail(result);
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{tripDetailInfo,setTripDetailInfo}}>
      <div>
        <Header />
        {children}
      </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}


export const useUserDetail=()=>{
  return useContext(UserDetailContext);
}





export const useTripDetail = () => {
  const context = useContext(TripDetailContext);
  if (!context) {
    throw new Error("useTripDetail must be used within TripDetailProvider");
  }
  return context;
};
