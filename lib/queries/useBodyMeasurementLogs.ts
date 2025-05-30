import { useQuery } from '@tanstack/react-query';
import type { QueryError } from '../errors';
import {
	type GetBodyMeasurementLogsResponse,
	getBodyMeasurementLogs
} from '../services/bodyMeasurementService';

export function useBodyMeasurementLogs(date: string) {
	const { isPending, data, isError, error, refetch } = useQuery<
		GetBodyMeasurementLogsResponse,
		QueryError
	>({
		queryKey: ['body-measurement-logs', date],
		queryFn: () => getBodyMeasurementLogs(date)
	});

	const isEmpty = !isPending && data?.measurements?.length === 0;

	return { isPending, data, isError, error, refetch, isEmpty };
}
