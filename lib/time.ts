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
