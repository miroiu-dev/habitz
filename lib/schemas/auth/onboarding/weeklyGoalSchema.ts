import { z } from 'zod';

export const weeklyGoalSchema = z.object({
	weeklyGoal: z.number(),
});

export type WeeklyGoalSchema = z.infer<typeof weeklyGoalSchema>;
