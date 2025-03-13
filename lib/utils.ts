import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Muscle } from './types';

export function cn(...classNames: ClassValue[]) {
	return twMerge(clsx(classNames));
}

export function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function getIndexedArray(length: number) {
	return Array.from({ length }, (_, index) => index);
}

export function generateScaleData(
	minValue: number,
	maxValue: number,
	step: number
) {
	const data = [];

	for (let i = minValue; Number(i.toFixed(1)) <= maxValue; i += step) {
		data.push(Number(i.toFixed(1)));
	}

	return data;
}

export function camelToFlat(str: string) {
	return str.replace(/([A-Z])/g, ' $1').toLowerCase();
}

export const muscleMap = {
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

export type MuscleKey = keyof typeof muscleMap;

export function getMuscle(muscle: string, side?: 'L' | 'R'): Muscle {
	const actualMuscle = muscleMap[muscle as MuscleKey];

	if (side && typeof actualMuscle === 'object') {
		return actualMuscle[side];
	}

	return actualMuscle as Muscle;
}

export function getWaistHipRatio(waist: number, hip: number) {
	if (waist > 0 && hip > 0) {
		return (waist / hip).toFixed(2);
	}

	return '--';
}

export function getWaistHipRatioColor(waistHipRatio: string) {
	const ratio = Number(waistHipRatio);

	if (Number.isNaN(ratio)) {
		return '';
	}

	if (ratio < 0.96) {
		return 'text-blue-40';
	}

	if (ratio > 0.96 && ratio < 1) {
		return 'text-positive';
	}

	return 'text-gold';
}

export function getWaistHipRatioText(waistHipRatio: string) {
	const ratio = Number(waistHipRatio);

	if (Number.isNaN(ratio)) {
		return '--';
	}

	if (ratio < 0.96) {
		return 'Low';
	}

	if (ratio > 0.96 && ratio < 1) {
		return 'Standard';
	}

	return 'High';
}
