import { z } from 'zod';

export const activityLevelSchema = z.object({
	activityLevel: z.enum(['sedentary', 'light', 'active', 'veryActive']),
});

export type ActivityLevelSchema = z.infer<typeof activityLevelSchema>;
