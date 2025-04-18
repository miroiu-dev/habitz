import { useQuery } from '@tanstack/react-query';
import type { QueryError } from '../errors';
import { type HabitLog, getHabitLogs } from '../services/habitService';

export function useHabitLogs() {
	const { isPending, data, error, isError, refetch } = useQuery<
		HabitLog[],
		QueryError
	>({
		queryKey: ['habit-logs'],
		queryFn: getHabitLogs
	});

	const isEmpty = data?.length === 0 && !isPending;

	return { isPending, isError, data, error, refetch, isEmpty };
}
