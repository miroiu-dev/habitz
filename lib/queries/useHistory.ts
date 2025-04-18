import { useQuery } from '@tanstack/react-query';
import type { QueryError } from '../errors';
import {
	type GetStatisticsResponse,
	getStatistics
} from '../services/habitService';

export function useHistory() {
	const { isPending, data, error, isError, refetch } = useQuery<
		GetStatisticsResponse,
		QueryError
	>({
		queryKey: ['habit-logs/history'],
		queryFn: getStatistics
	});

	return { isPending, isError, data, error, refetch };
}
