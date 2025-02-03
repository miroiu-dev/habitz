import { z } from 'zod';

export const goalSchema = z.object({
	goal: z.enum(['lose', 'maintain', 'gain']),
});

export type GoalSchema = z.infer<typeof goalSchema>;
