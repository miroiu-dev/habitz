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
	'run'
];

export const HABIT_COLORS = [
	'#FF995F', // Orange
	'#BF6DD8', // Purple
	'#6D9BFF', // Light Blue
	'#0083D6', // Blue
	'#007EA6', // Dark Blue
	'#02BFB0', // Teal
	'#279E82' // Green
];

export const HABIT_SCHEDULES = [
	{ label: 'S', value: 0 },
	{ label: 'M', value: 1 },
	{ label: 'T', value: 2 },
	{ label: 'W', value: 3 },
	{ label: 'T', value: 4 },
	{ label: 'F', value: 5 },
	{ label: 'S', value: 6 }
];
