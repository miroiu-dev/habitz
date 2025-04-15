import type { ActivityLevelSchema } from './activityLevelSchema';
import type { GoalSchema } from './goalSchema';
import type { WeeklyGoalSchema } from './weeklyGoalSchema';
import type { WelcomeSchema } from './welcomeSchema';
import type { YouSchema } from './youSchema';

export {
	type ActivityLevelSchema,
	activityLevelSchema,
	ActivityLevel
} from './activityLevelSchema';
export {
	type CreateAccountSchema,
	createAccountSchema
} from './createAccountSchema';
export { type GoalSchema, goalSchema, Goal } from './goalSchema';
export { type WeeklyGoalSchema, weeklyGoalSchema } from './weeklyGoalSchema';
export {
	type WelcomeSchema,
	welcomeSchema,
	Gender
} from './welcomeSchema';
export { type YouSchema, youSchema } from './youSchema';
export type SignUpSchema = WelcomeSchema &
	GoalSchema &
	ActivityLevelSchema &
	WeeklyGoalSchema &
	YouSchema;
