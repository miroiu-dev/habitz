import { z } from 'zod';

export const welcomeSchema = z.object({
	fullName: z
		.string({ message: 'Please enter your full name.' })
		.nonempty('Please enter your full name.')
		.regex(/^[a-zA-Z\s'-]+$/, {
			message:
				'Full name can only contain letters, spaces, apostrophes, or hyphens',
		}),
	gender: z.enum(['male', 'female'], {
		message: 'Please select a gender!',
	}),
	age: z.coerce
		.number({ message: 'Please enter your age.' })
		.min(17, 'You must be at least 17 years old to use Habitz.')
		.max(120, 'Please enter an age less than 120.'),
});

export type WelcomeSchema = z.infer<typeof welcomeSchema>;
