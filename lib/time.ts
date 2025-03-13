import { DateTime } from 'luxon';

export function getTimeOfDay() {
	const now = DateTime.now();

	const hour = now.hour;

	if (hour >= 4 && hour < 12) {
		return 'morning';
	}

	if (hour >= 12 && hour < 17) {
		return 'afternoon';
	}

	return 'evening';
}

export function getToday() {
	return DateTime.now().toFormat('dd MMMM, yyyy');
}

export function formatHistoryDate(date: Date) {
	return DateTime.fromJSDate(date).toFormat('MMMM dd, yyyy HH:mm:ss');
}
