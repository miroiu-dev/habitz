import {
	getBodyMassIndex,
	getMinimumWeight,
	isUnderweight
} from '@/lib/health';
import { z } from 'zod';
import { Goal } from './goalSchema';

export const youSchema = z.object({
	weight: z.coerce
		.number({ message: 'Please enter your current weight.' })
		.min(13, 'Please enter an accurate current weight.')
		.max(454, 'Please enter an accurate current weight.'),
	height: z.coerce
		.number({ message: 'Please enter an accurate height.' })
		.min(92, 'Please enter an accurate height.')
		.max(254, 'Please enter an accurate height.'),
	goalWeight: z.coerce
		.number({ message: 'Please enter an estimated goal weight.' })
		.max(
			454,
			'Your goal weight must be between your current weight and 454kg.'
		)
		.optional()
});

export const youWithGoalSchema = youSchema
	.extend({
		goal: z.nativeEnum(Goal)
	})
	.superRefine((data, ctx) => {
		if (data.goal === Goal.maintain) {
			return true;
		}

		if (!data.height || !data.weight) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['goalWeight'],
				message: 'Please enter your height and weight first.'
			});
		}

		if (!data.goalWeight) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['goalWeight'],
				message: 'Please enter an estimated goal weight.'
			});
		}

		if (data.goalWeight === data.weight) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['goalWeight'],
				message:
					'Your goal weight should be different from your current weight.'
			});
		}

		const height = data.height / 100;
		const bmi = getBodyMassIndex(data.goalWeight, height);

		if (data.goal === Goal.lose) {
			if (data.goalWeight >= data.weight) {
				return ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['goalWeight'],
					message:
						'Your goal weight is higher than your current weight.'
				});
			}

			if (isUnderweight(bmi)) {
				const minimumWeight = getMinimumWeight(height);

				return ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['goalWeight'],
					message: `This goal weight is considered underweight for your height. Please enter a goal weight of ${minimumWeight}kg or higher.`
				});
			}
		}

		if (data.goal === Goal.gain && data.goalWeight <= data.weight) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['goalWeight'],
				message: 'This goal weight is lower than your current weight.'
			});
		}
	});

export type YouSchema = z.infer<typeof youSchema>;
export type YouWithGoalSchema = z.infer<typeof youWithGoalSchema>;
