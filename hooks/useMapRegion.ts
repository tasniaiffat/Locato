import { MapRegionContext } from "@/contexts/MapRegionContext";
import { useContext } from "react";

export const useMapRegion = () => {
    const { mapRegion, setMapRegion } = useContext(MapRegionContext);
    return { mapRegion, setMapRegion };
}