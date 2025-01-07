// import z from 'zod';
import { ZoneType } from './ZoneType';

export enum SpecialistRole {
    ROLE_SERVICE_PROVIDER = "ROLE_SERVICE_PROVIDER",
    ROLE_USER = "ROLE_USER",
}


// export const SpecialistRole = z.enum(
//     ["ROLE_SERVICE_PROVIDER", "ROLE_USER"]
// );

// export const SpecialistSchema = z.object({
//     active: z.boolean(),
//     certifications: z.string(),
//     createdAt: z.string(),
//     email: z.string().email(),
//     experienceYears: z.number(),
//     id: z.number().nonnegative(),
//     locationLatitude: z.number(),
//     locationLongitude: z.number(),
//     name: z.string(),
//     rating: z.number().nonnegative(),
//     role: SpecialistRole,
//     serviceRate: z.number().nonnegative(),
//     specialties: z.array(z.string()),
//     updatedAt: z.string(),
//     zone: ZoneSchema,
// });

// export type SpecialistType = z.infer<typeof SpecialistSchema>;

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
    role: SpecialistRole.ROLE_SERVICE_PROVIDER | SpecialistRole.ROLE_USER;
    serviceRate: number;
    specialties: string[];
    updatedAt: string;
    zone: ZoneType;
};

// export const SpecialistResponseSchema = z.object({
//     content: z.array(SpecialistSchema),
//     totalPages: z.number().nonnegative(),
// });

// export type SpecialistResponseType = z.infer<typeof SpecialistResponseSchema>;

export type SpecialistResponseType = {
    content: SpecialistType[];
    totalPages: number;
};


// export const SpecialistCreateSchema = z.object({
//     email: z.string().email(),
//     password: z.string(),
//     name: z.string(),
//     zoneId: ZoneSchema.shape.id,
//     locationLatitude: z.number(),
//     locationLongitude: z.number(),
//     experienceYears: z.number().nonnegative(),
//     rating: z.number().nonnegative(),
//     serviceRate: z.number().nonnegative(),
//     certifications: z.string(),
//     specialties: z.array(z.number().nonnegative()),
// });

// export type SpecialistCreateType = z.infer<typeof SpecialistCreateSchema>;
export type SpecialistCreateType = {
    email: string;
    password: string;
    name: string;
    zoneId: ZoneType["id"];
    locationLatitude: number;
    locationLongitude: number;
    experienceYears: number;
    rating: number;
    serviceRate: number;
    certifications: string;
    specialties: number[];
};