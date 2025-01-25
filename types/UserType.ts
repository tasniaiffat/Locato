import { SpecialistRole } from "./SpecialistType";
import { ZoneType } from "./ZoneType";

export type UserType = {
    createdAt: string;
    updatedAt: string;
    id: number;
    email: string;
    name: string;
    active: boolean;
    role: SpecialistRole.ROLE_USER,
    zone: ZoneType | null;
    locationLatitude: number;
    locationLongitude: number;
}