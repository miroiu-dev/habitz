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

export function getHistoryDate(date: string) {
	return DateTime.fromISO(date, { zone: 'utc' }).toFormat('MMMM yyyy');
}

export function getDaysOfWeek(days: number[]) {
	const daysOfWeek = {
		0: 'Sun',
		1: 'Mon',
		2: 'Tue',
		3: 'Wed',
		4: 'Thu',
		5: 'Fri',
		6: 'Sat'
	};

	if (days.length === 7) {
		return 'Everyday';
	}

	return days
		.map(day => daysOfWeek[day as keyof typeof daysOfWeek])
		.join(', ');
}

export function getMarkedDates(logs: string[]) {
	return logs.reduce(
		(acc, date) => {
			const formattedDate = DateTime.fromISO(date, {
				zone: 'utc'
			}).toFormat('yyyy-LL-dd');

			acc[formattedDate] = {
				selected: true,
				disableTouchEvent: true
			};
			return acc;
		},
		{} as Record<
			string,
			{
				selected: boolean;
				disableTouchEvent: boolean;
			}
		>
	);
}
