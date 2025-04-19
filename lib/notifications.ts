import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { toast } from './toast';

export async function registerForPushNotificationsAsync() {
	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C'
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			throw new Error(
				'Permission not granted to get push token for push notification!'
			);
		}
		const projectId =
			Constants?.expoConfig?.extra?.eas?.projectId ??
			Constants?.easConfig?.projectId;
		if (!projectId) {
			throw new Error('Project ID not found');
		}
		try {
			const pushTokenString = (
				await Notifications.getExpoPushTokenAsync({
					projectId
				})
			).data;
			console.log(pushTokenString);
			return pushTokenString;
		} catch (e: unknown) {
			throw new Error(`${e}`);
		}
	} else {
		throw new Error('Must use physical device for push notifications');
	}
}

export async function scheduleWeeklyNotification(
	weekDay: number,
	hour: number,
	minute: number,
	title: string,
	body: string,
	habitName: string,
	habitId: number
) {
	const hasPermission = await requestNotificationPermissions();

	if (!hasPermission) {
		console.log('Notification permissions not granted');

		toast.danger({
			title: 'Notification permissions not granted',
			description:
				'Please enable notifications in your device settings to receive reminders.'
		});

		return null;
	}

	const notificationId = await Notifications.scheduleNotificationAsync({
		content: {
			title: title,
			body: body,
			sound: true,
			priority: Notifications.AndroidNotificationPriority.MAX,
			data: {
				habitId
			}
		},
		trigger: {
			weekday: weekDay + 1,
			hour: hour,
			minute: minute,
			type: Notifications.SchedulableTriggerInputTypes.WEEKLY
		},
		identifier: getIdentifier(habitName, weekDay)
	});

	console.log('Weekly notification scheduled with ID:', notificationId);
	return notificationId;
}

export async function cancelNotification(identifier: string) {
	await Notifications.cancelScheduledNotificationAsync(identifier);
	console.log('Notification canceled:', identifier);
}

async function requestNotificationPermissions() {
	const { status } = await Notifications.requestPermissionsAsync();

	return status === 'granted';
}

export function getIdentifier(habitName: string, weekDay: number) {
	return `${habitName}-weekly-notification-${weekDay}`;
}
