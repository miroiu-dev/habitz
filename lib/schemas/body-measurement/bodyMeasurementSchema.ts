import { z } from 'zod';

export const bodyMeasurementSchema = z.object({
	neck: z.number(),
	leftBiceps: z.number(),
	rightBiceps: z.number(),
	chest: z.number(),
	abs: z.number(),
	leftTigh: z.number(),
	rightTigh: z.number(),
	leftCalf: z.number(),
	rightCalf: z.number(),
	shoulder: z.number(),
	waist: z.number(),
	hip: z.number()
});

export type BodyMeasurementSchema = z.infer<typeof bodyMeasurementSchema>;
