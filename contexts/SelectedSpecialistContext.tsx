import { createContext, Dispatch, SetStateAction, useState } from "react";
import { SpecialistType } from "@/types/SpecialistType";

export const SelectedSpecialistContext = createContext<{
    selectedSpecialist:SpecialistType | null,
    setSelectedSpecialist: Dispatch<SetStateAction<SpecialistType | null>>
} >({ selectedSpecialist:null,setSelectedSpecialist:()=>{} });