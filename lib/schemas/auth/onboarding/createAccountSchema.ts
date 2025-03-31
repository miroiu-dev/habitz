import { z } from 'zod';

export const createAccountSchema = z
	.object({
		email: z
			.string({ message: 'Please enter your email address.' })
			.email('Please enter a valid email address.'),
		password: z
			.string({ message: 'Please enter your password.' })
			.min(8, 'Password must be at least 8 characters long.')
			.max(20, 'Password must be at most 20 characters long.')
			.regex(
				/[A-Z]/,
				'Password must contain at least one uppercase letter.'
			)
			.regex(
				/[a-z]/,
				'Password must contain at least one lowercase letter.'
			)
			.regex(/\d/, 'Password must contain at least one number.')
			.regex(
				/[@$!%*?&]/,
				'Password must contain at least one special character.'
			),
		confirmPassword: z
			.string({ message: 'Please confirm your password.' })
			.nonempty('Please confirm your password.')
	})
	.refine(({ confirmPassword, password }) => password === confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword']
	});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
