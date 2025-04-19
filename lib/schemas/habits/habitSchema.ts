import { z } from 'zod';

export const habitSchema = z.object({
	name: z
		.string()
		.min(3, 'Habit must be at least 3 characters long.')
		.max(20, 'Habit must be at most 20 characters long.')
		.regex(/^[a-zA-Z\s'-]+$/, {
			message:
				'Habit can only contain letters, spaces, apostrophes, or hyphens.'
		}),
	icon: z.string({
		message: 'Please choose an icon.'
	}),
	color: z.string({
		message: 'Please choose a color.'
	}),
	schedules: z
		.array(z.number())
		.min(1, 'Please select at least one day.')
		.max(7, 'Please select at most 7 days'),
	reminder: z
		.object({
			hours: z.number(),
			minutes: z.number(),
			seconds: z.number()
		})
		.nullable()
});

export type HabitSchema = z.infer<typeof habitSchema>;
