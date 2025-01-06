// import z from 'zod';

// export const CoordinateSchema = z.object({
//     latitude: z.number(),
//     longitude: z.number(),
// });

// export type CoordinateType = z.infer<typeof CoordinateSchema>;


export type CoordinateType = {
    latitude: number,
    longitude: number
}