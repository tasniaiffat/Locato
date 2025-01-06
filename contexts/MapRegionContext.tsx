import { MapRegionType } from "@/types/MapRegionType";
import { createContext, Dispatch, SetStateAction } from "react";

export const MapRegionContext = createContext<{
    mapRegion: MapRegionType;
    setMapRegion: Dispatch<SetStateAction<MapRegionType>>;
}>({
    mapRegion: {
        latitude: 23.8103, 
        longitude: 90.4125, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421
    }, 
    setMapRegion: () => {}
});    