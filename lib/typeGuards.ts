import type { ApiError } from './types';

export function isError<T>(response: T | ApiError): response is ApiError {
	if (Object.hasOwn(response as ApiError, 'status')) {
		return true;
	}

	return false;
}
