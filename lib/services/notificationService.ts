import type { Icon } from '@/components/ui';
import { QueryError } from '../errors';
import { httpClient } from '../httpClient';
import type { ApiError } from '../types';
import { formatError } from '../utils';

export type Notification = {
	id: number;
	icon: Icon;
	title: string;
	description: string;
	createdAt: string;
};

export type GetNotificationsResponse = {
	data: Notification[];
};

export async function getNotifications(): Promise<Notification[]> {
	try {
		const response =
			await httpClient.get<GetNotificationsResponse>('notifications');
		const { data } = await response.json();

		return data;
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}

export type CreateNotificationResponse = {
	id: number;
};

export type CreateNotificationPayload = {
	habitId: number;
	title: string;
	description: string;
};

export async function createNotification(
	payload: CreateNotificationPayload
): Promise<CreateNotificationResponse | ApiError> {
	try {
		const response = await httpClient.post<CreateNotificationResponse>(
			'notifications',
			{
				json: payload
			}
		);

		return await response.json();
	} catch (error) {
		return await formatError(error);
	}
}
