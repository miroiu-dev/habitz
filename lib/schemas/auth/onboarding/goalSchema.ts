import { z } from 'zod';

export enum Goal {
	lose = 0,
	maintain = 1,
	gain = 2
}

export const goalSchema = z.object({
	goal: z.nativeEnum(Goal)
});

export type GoalSchema = z.infer<typeof goalSchema>;
