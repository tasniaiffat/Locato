export enum SpecialistRole {
    ROLE_SERVICE_PROVIDER = "ROLE_SERVICE_PROVIDER",
    ROLE_USER = "ROLE_USER",
}


export type SpecialistType = {
    active: boolean;
    certifications: string;
    createdAt: string;
    email: string;
    experienceYears: number;
    id: number;
    locationLatitude: number;
    locationLongitude: number;
    name: string;
    rating: number;
    role: "ROLE_SERVICE_PROVIDER" | "ROLE_USER";
    serviceRate: number;
    specialties: string[];
    updatedAt: string;
    zone: any;
};

export type SpecialistResponseType = {
    content: SpecialistType[];
    totalPages: number;
};