// import { z } from "zod";

// const ZoneSchema = z.object({
//     createdAt: z.date().nullable(),
//     updatedAt: z.date().nullable(),
//     id: z.number(),
//     title: z.string(),
// });

export type ZoneType = {
    createdAt: Date | null;
    updatedAt: Date | null;
    id: number;
    title: string;
}