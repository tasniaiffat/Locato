import { createContext, Dispatch, SetStateAction } from "react";
import * as Location from 'expo-location'

export const LocationContext = createContext<{
    location: Location.LocationObject|null,
    setLocation: Dispatch<SetStateAction<Location.LocationObject|null>>
}>({location: null, setLocation: () => {}});