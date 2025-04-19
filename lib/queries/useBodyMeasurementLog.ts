import { useQuery } from '@tanstack/react-query';
import type { QueryError } from '../errors';
import {
	type GetBodyMeasurementLogResponse,
	getBodyMeasurementLog
} from '../services/bodyMeasurementService';

export function useBodyMeasurementLog() {
	const { isPending, data, isError, error, refetch } = useQuery<
		GetBodyMeasurementLogResponse,
		QueryError
	>({
		queryKey: ['body-measurement-logs/newest'],
		queryFn: getBodyMeasurementLog
	});

	return { isPending, data, hasError: isError, error, refetch };
}
