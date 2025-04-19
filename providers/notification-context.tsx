import { registerForPushNotificationsAsync } from '@/lib/notifications';
import { createNotification } from '@/lib/services/notificationService';
import { useQueryClient } from '@tanstack/react-query';
import type { EventSubscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import type React from 'react';
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react';

interface NotificationContextType {
	expoPushToken: string | null;
	notification: Notifications.Notification | null;
	error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
	undefined
);

export const useNotification = () => {
	const ctx = useContext(NotificationContext);
	if (ctx === undefined) {
		throw new Error(
			'useNotification must be used within a NotificationProvider'
		);
	}
	return ctx;
};

interface NotificationProviderProps {
	children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
	children
}) => {
	const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
	const [notification, setNotification] =
		useState<Notifications.Notification | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const queryClient = useQueryClient();
	const notificationListener = useRef<EventSubscription>();
	const responseListener = useRef<EventSubscription>();
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: router is a stable refrence
	useEffect(() => {
		registerForPushNotificationsAsync().then(
			token => setExpoPushToken(token),
			error => setError(error)
		);

		notificationListener.current =
			Notifications.addNotificationReceivedListener(
				async notification => {
					console.log('🔔 Notification Received: ', notification);

					await createNotification({
						title: notification.request.content?.title ?? '',
						description: notification.request.content?.body ?? '',
						habitId: notification.request.content.data?.habitId ?? 0
					});

					await queryClient.invalidateQueries({
						queryKey: ['notifications']
					});

					setNotification(notification);
				}
			);

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(response => {
				console.log(
					'🔔 Notification Response: ',
					JSON.stringify(response, null, 2),
					JSON.stringify(
						response.notification.request.content.data,
						null,
						2
					)
				);

				router.push('/(auth)/(notifications)/notifications');
			});

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(
					responseListener.current
				);
			}
		};
	}, []);

	return (
		<NotificationContext.Provider
			value={{ expoPushToken, notification, error }}
		>
			{children}
		</NotificationContext.Provider>
	);
};
