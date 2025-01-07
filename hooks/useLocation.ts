import { LocationContext } from "@/contexts/LocationContext";
import { useContext } from "react";

export const useLocation = () => {
    const { location, setLocation } = useContext(LocationContext);
    return { location, setLocation };
}