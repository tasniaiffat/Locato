import { SelectedSpecialistContext } from "@/contexts/SelectedSpecialistContext";
import { useContext } from "react";

const useSelectedSpecialist = () => {
    const { selectedSpecialist, setSelectedSpecialist } = useContext(SelectedSpecialistContext);
    return { selectedSpecialist, setSelectedSpecialist };
};

export default useSelectedSpecialist;