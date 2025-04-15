import { useQuery } from '@tanstack/react-query';
import type { QueryError } from '../errors';
import { getUser } from '../services/auth-service';
import type { User } from '../types';

export function useUser() {
	const { isPending, data, error, isError, refetch } = useQuery<
		User,
		QueryError
	>({
		queryKey: ['users/me'],
		queryFn: getUser
	});

	return { isPending, isError, data, error, refetch };
}
