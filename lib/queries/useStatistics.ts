import { useQuery } from '@tanstack/react-query';
import type { QueryError } from '../errors';
import {
	type GetStatisticsResponse,
	getStatistics
} from '../services/statisticsService';

export function useStatistics() {
	const { isPending, data, error, isError, refetch } = useQuery<
		GetStatisticsResponse,
		QueryError
	>({
		queryKey: ['statistics'],
		queryFn: getStatistics
	});

	return { isPending, isError, data, error, refetch };
}
