import { useQuery } from '@tanstack/react-query';
import type { QueryError } from '../errors';
import { type GetHabitResponse, getHabit } from '../services/habitService';

export function useHabit(habitId: number) {
	const { isPending, data, error, isError, refetch } = useQuery<
		GetHabitResponse,
		QueryError
	>({
		queryKey: ['habits', habitId],
		queryFn: () => getHabit(habitId)
	});

	return { isPending, isError, data, error, refetch };
}
