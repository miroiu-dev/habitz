import { toast } from '@/lib/toast';
import { router } from 'expo-router';
import ky, { HTTPError } from 'ky';
import { tokenManager } from './auth';
import type { AuthenticationResponse } from './types';

export const httpClient = ky.create({
	prefixUrl: process.env.EXPO_PUBLIC_API_URL,
	timeout:
		process.env.EXPO_PUBLIC_ENVIRONMENT === 'debug' ? 2147483647 : 10000,
	hooks: {
		beforeRequest: [
			async request => {
				const accessToken = await tokenManager.getAccessToken();

				request.headers.set('Authorization', `Bearer ${accessToken}`);
			}
		],
		beforeRetry: [
			async ({ request, options, error, retryCount }) => {
				if (
					!(
						error instanceof HTTPError &&
						error.response.status === 401
					)
				) {
					return;
				}

				const refreshEndpoint = '/users/refresh-token';
				const requestUrl = new URL(request.url);

				if (requestUrl.pathname.endsWith(refreshEndpoint)) {
					console.error(
						'Refresh token request itself failed with 401. Stopping retry.'
					);
					toast.danger({
						title: 'Session expired',
						description:
							'Could not refresh session. Please sign in again',
						autoHide: true
					});

					await tokenManager.clearTokens();
					router.push('/(public)');

					return ky.stop;
				}

				console.log(
					`Attempting to refresh token (Retry #${retryCount + 1})...`
				);

				const oldRefreshToken = await tokenManager.getRefreshToken();

				if (!oldRefreshToken) {
					console.error(
						'No refresh token found. Cannot refresh session.'
					);

					toast.danger({
						title: 'Session expired',
						description: 'Please sign in again',
						autoHide: true
					});
					router.push('/(public)');

					return ky.stop;
				}

				try {
					const {
						accessToken: newAccessToken,
						refreshToken: newRefreshToken
					} = await ky
						.post<AuthenticationResponse>(refreshEndpoint, {
							hooks: {},
							prefixUrl: options.prefixUrl,
							json: {
								refreshToken: oldRefreshToken
							},
							retry: 0
						})
						.json();

					await tokenManager.setTokens(
						newAccessToken,
						newRefreshToken
					);
					console.log('Token refreshed successfully.');

					request.headers.set(
						'Authorization',
						`Bearer ${newAccessToken}`
					);
				} catch (refreshError) {
					console.error('Failed to refresh token:', refreshError);
					await tokenManager.clearTokens();

					toast.danger({
						title: 'Session Error',
						description:
							'Could not refresh your session. Please sign in again.',
						autoHide: true
					});

					router.push('/(public)');

					return ky.stop;
				}
			}
		]
	}
});
