import { createContext, useContext } from "react";
import { TripInfo } from "../types";

export type TripContextType = {
  tripDetailInfo: TripInfo | null;
  setTripDetailInfo: React.Dispatch<React.SetStateAction<TripInfo | null>>;
};

export const TripDetailContext = createContext<TripContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useTripDetail = () => {
  const context = useContext(TripDetailContext);
  if (!context) {
    throw new Error("useTripDetail must be used within TripDetailProvider");
  }
  return context;
};