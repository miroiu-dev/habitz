import { create } from 'zustand/react';

import type {
	ActivityLevelSchema,
	GoalSchema,
	WeeklyGoalSchema,
	WelcomeSchema,
	YouSchema,
} from '../schemas/auth';

type OnboardingData = WelcomeSchema &
	GoalSchema &
	ActivityLevelSchema &
	WeeklyGoalSchema &
	YouSchema;

type OnboardingActions = {
	updateWelcomeData: (data: WelcomeSchema) => void;
	updateGoal: (data: GoalSchema) => void;
	updateActivityLevel: (data: ActivityLevelSchema) => void;
	updateWeeklyGoal: (data: WeeklyGoalSchema) => void;
	updateYou: (data: YouSchema) => void;
};

export const useOnboardingStore = create<OnboardingData & OnboardingActions>(
	set => ({
		age: Number.NaN,
		activityLevel: 'active',
		fullName: '',
		gender: 'male',
		goal: 'maintain',
		goalWeight: Number.NaN,
		height: Number.NaN,
		weeklyGoal: 0.25,
		weight: Number.NaN,
		updateWelcomeData: data => set(data),
		updateActivityLevel: data => set(data),
		updateGoal: data => set(data),
		updateWeeklyGoal: data => set(data),
		updateYou: data => set(data),
	})
);
