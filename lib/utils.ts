import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...classNames: ClassValue[]) {
	return twMerge(clsx(classNames));
}

export function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function getEmptyArray(length: number) {
	return Array.from({ length }, (_, index) => index);
}
