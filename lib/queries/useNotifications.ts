import { useQuery } from '@tanstack/react-query';
import type { QueryError } from '../errors';

import {
	type Notification,
	getNotifications
} from '../services/notificationService';

export function useNotifications() {
	const { isPending, data, error, isError, refetch, isFetching } = useQuery<
		Notification[],
		QueryError
	>({
		queryKey: ['notifications'],
		queryFn: getNotifications
	});

	const isEmpty = data?.length === 0 && !isPending;

	return { isFetching, isError, data, error, refetch, isEmpty };
}
