// import { z } from "zod";

// const ZoneSchema = z.object({
//     createdAt: z.date().nullable(),
//     updatedAt: z.date().nullable(),
//     id: z.number(),
//     title: z.string(),
// });

export type ZoneType = {
    createdAt: string | null;
    updatedAt: string | null;
    id: number;
    title: string;
}

export type SpecialtyType = {
    createdAt: string | null;
    updatedAt: string | null;
    id: number;
    title: string;
}