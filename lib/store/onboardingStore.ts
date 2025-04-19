import { create } from 'zustand/react';

import {
	ActivityLevel,
	type ActivityLevelSchema,
	Gender,
	Goal,
	type GoalSchema,
	type WeeklyGoalSchema,
	type WelcomeSchema,
	type YouSchema
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
		activityLevel: ActivityLevel.active,
		fullName: '',
		gender: Gender.male,
		goal: Goal.maintain,
		goalWeight: Number.NaN,
		height: Number.NaN,
		weeklyGoal: Number.NaN,
		weight: Number.NaN,
		updateWelcomeData: data => set(data),
		updateActivityLevel: data => set(data),
		updateGoal: data => set(data),
		updateWeeklyGoal: data => set(data),
		updateYou: data => set(data)
	})
);
