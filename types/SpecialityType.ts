// import z from 'zod';

// export const SpecialitySchema = z.object({
//     createdAt: z.date().nullable(),
//     updatedAt: z.date().nullable(),
//     id: z.number(),
//     title: z.string(),
// });

// export type SpecialityType = z.infer<typeof SpecialitySchema>;

export type SpecialityType = {
    createdAt: Date | null;
    updatedAt: Date | null;
    id: number;
    title: string;
}