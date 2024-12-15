import { createContext, Dispatch, SetStateAction } from "react";
import * as Location from 'expo-location'
import { CoordinateType } from "@/types/CoordinateType";

export const SpecialistLocationContext = createContext<{
    locations: CoordinateType[]|null,
    setLocations: Dispatch<SetStateAction<CoordinateType[]>>
}|null>(null);