import { QueryClient, onlineManager } from '@tanstack/react-query';
import { addNetworkStateListener } from 'expo-network';
import { HTTPError } from 'ky';

onlineManager.setEventListener(setOnline => {
	const eventSubscription = addNetworkStateListener(state => {
		setOnline(!!state.isConnected);
	});

	return eventSubscription.remove;
});

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				if (
					error instanceof HTTPError &&
					error.response.status === 401
				) {
					return false;
				}

				return failureCount < 3;
			},
			staleTime: 5 * 60 * 1000
		},
		mutations: {
			retry: (failureCount, error) => {
				if (
					error instanceof HTTPError &&
					error.response.status === 401
				) {
					return false;
				}

				return failureCount < 3;
			}
		}
	}
});
