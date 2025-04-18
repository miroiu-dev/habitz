import { useQuery } from '@tanstack/react-query';
import type { QueryError } from '../errors';
import { type GetHistoryResponse, getHistory } from '../services/habitService';

export function useHistory() {
	const { isPending, data, error, isError, refetch } = useQuery<
		GetHistoryResponse,
		QueryError
	>({
		queryKey: ['habit-logs/history'],
		queryFn: getHistory
	});

	return { isPending, isError, data, error, refetch };
}
