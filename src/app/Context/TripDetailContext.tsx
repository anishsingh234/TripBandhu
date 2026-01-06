import { createContext } from "react";
import { TripInfo } from "../create-new-trip/_components/ChatBot";

export type TripContextType={
    tripDetailInfo:TripInfo | null,
    setTripDetailInfo:React.Dispatch<React.SetStateAction<TripInfo | null>> ;
}
export const TripDetailContext =
  createContext<TripContextType | undefined>(undefined);
