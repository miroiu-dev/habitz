import { z } from 'zod';

export const signInSchema = z.object({
	email: z
		.string({ message: 'Please provide an email address.' })
		.email('The email address you entered is not valid.'),
	password: z
		.string({ message: 'Please enter your password.' })
		.nonempty('Please enter your password.')
});

export type SignInSchema = z.infer<typeof signInSchema>;
