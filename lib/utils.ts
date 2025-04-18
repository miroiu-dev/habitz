import { MUSCLE_MAP } from '@/constants';
import { type ClassValue, clsx } from 'clsx';
import { HTTPError } from 'ky';
import { twMerge } from 'tailwind-merge';
import type { ApiError, Duration, ErrorResponse, Muscle } from './types';

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

export type MuscleKey = keyof typeof MUSCLE_MAP;

export function getMuscle(muscle: string, side?: 'L' | 'R'): Muscle {
	const actualMuscle = MUSCLE_MAP[muscle as MuscleKey];

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

export function formatReminder(reminder: Duration) {
	return `${reminder.hours.toString().padStart(2, '0')}:${reminder.minutes.toString().padStart(2, '0')}`;
}

export async function formatError(error: unknown): Promise<ApiError> {
	if (error instanceof HTTPError) {
		const response = await error.response.json<ErrorResponse>();

		if (response) {
			const validationError = response?.errors?.[0].description;

			return {
				title: response.title,
				description: validationError ?? response.detail,
				status: response.status
			};
		}

		return {
			description: error.message,
			title: error.name,
			status: 500
		};
	}

	const otherError = error as Error;

	return {
		description: otherError.message,
		title: otherError.name,
		status: 500
	};
}
