import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...classNames: ClassValue[]) {
	return twMerge(clsx(classNames));
}

export function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function getIndexedArray(length: number) {
	return Array.from({ length }, (_, index) => index);
}

export const generateScaleData = (
	minValue: number,
	maxValue: number,
	step: number
) => {
	const data = [];

	for (let i = minValue; Number(i.toFixed(1)) <= maxValue; i += step) {
		data.push(Number(i.toFixed(1)));
	}

	return data;
};
