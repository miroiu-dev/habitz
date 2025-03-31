import { z } from 'zod';

export enum ActivityLevel {
	sedentary = 0,
	light = 1,
	active = 2,
	veryActive = 3
}

export const activityLevelSchema = z.object({
	activityLevel: z.nativeEnum(ActivityLevel)
});

export type ActivityLevelSchema = z.infer<typeof activityLevelSchema>;
