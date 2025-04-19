import type { Icon } from '@/components/ui';

export const HABIT_ICONS: Icon[] = [
	'clock',
	'calendar',
	'bed',
	'smile',
	'cup',
	'fire',
	'home',
	'location',
	'palette',
	'run',
	'exercise'
] as const;

export const HABIT_COLORS = [
	'#FF995F', // Orange
	'#BF6DD8', // Purple
	'#6D9BFF', // Light Blue
	'#0083D6', // Blue
	'#007EA6', // Dark Blue
	'#02BFB0', // Teal
	'#279E82' // Green
] as const;

export const HABIT_SCHEDULES = [
	{ label: 'S', value: 0 },
	{ label: 'M', value: 1 },
	{ label: 'T', value: 2 },
	{ label: 'W', value: 3 },
	{ label: 'T', value: 4 },
	{ label: 'F', value: 5 },
	{ label: 'S', value: 6 }
] as const;

export const MUSCLE_MAP = {
	Neck: 'neck',
	Shoulder: 'shoulder',
	Chest: 'chest',
	Biceps: {
		L: 'leftBiceps',
		R: 'rightBiceps'
	},
	Abs: 'abs',
	Waist: 'waist',
	Hip: 'hip',
	Tigh: {
		L: 'leftTigh',
		R: 'rightTigh'
	},
	Calf: {
		L: 'leftCalf',
		R: 'rightCalf'
	}
} as const;

export const MOTIVATIONAL_MESSAGES = [
	"Keep your streak going – you're building a better you!",
	'Small steps today lead to big results tomorrow.',
	"You're crushing it! Keep going!",
	'Discipline today, success tomorrow.',
	'One step closer to your goal – don’t stop now!',
	'Stay consistent, your future self will thank you.',
	'Habit unlocked! Time to level up.'
] as const;
