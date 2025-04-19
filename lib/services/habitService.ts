import type { Icon } from '@/components/ui';
import { DateTime } from 'luxon';
import { QueryError } from '../errors';
import { httpClient } from '../httpClient';
import type { HabitSchema } from '../schemas/habits/habitSchema';
import type { ApiError } from '../types';
import { formatError } from '../utils';

export enum CellStatus {
	Empty = 0,
	Complete = 1,
	Incomplete = 2
}

export type LogHabitResponse = {
	id: number;
	isCompleted: boolean;
};

export type GetHabitLogsResponse = {
	data: HabitLog[];
};

export type CreateHabitResponse = {
	id: number;
};

export type Header = {
	icon?: Icon;
	id?: number;
};

export type Cell = {
	status: CellStatus;
	color: string;
};

export type RowData = {
	day: number;
	cells: Cell[];
};
export type GetHistoryResponse = {
	date: string;
	header: Header[];
	rows: RowData[];
};

export type HabitLog = {
	id: number;
	color: string;
	icon: Icon;
	name: string;
	isCompleted: boolean;
	reminder?: string;
	habitId: number;
};

export type GetHabitResponse = {
	id: number;
	name: string;
	icon: Icon;
	color: string;
	logs: string[];
	currentStreak: number;
	recordStreak: number;
	trend: 'Steady' | 'Trending up' | 'Trending down';
	scheduleDays: number[];
};

export type DeleteHabitResponse = {
	id: number;
};

export async function createHabit(
	payload: HabitSchema
): Promise<CreateHabitResponse | ApiError> {
	try {
		const response = await httpClient.post<CreateHabitResponse>('habits', {
			json: {
				...payload,
				reminder:
					payload.reminder !== null
						? DateTime.fromObject({
								hour: payload.reminder.hours,
								minute: payload.reminder.minutes
							}).toFormat('HH:mm')
						: null
			}
		});

		return await response.json();
	} catch (error) {
		return await formatError(error);
	}
}

export async function getHabitLogs(): Promise<HabitLog[]> {
	try {
		const response =
			await httpClient.get<GetHabitLogsResponse>('habit-logs');
		const { data } = await response.json();

		return data;
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}

export async function logHabit(
	id: number,
	isCompleted: boolean
): Promise<LogHabitResponse> {
	try {
		const response = await httpClient.put<CreateHabitResponse>(
			'habit-logs',
			{
				json: {
					habitLogId: id,
					isCompleted
				}
			}
		);

		return await response.json();
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}

export async function getHistory(): Promise<GetHistoryResponse> {
	try {
		const response =
			await httpClient.get<GetHistoryResponse>('habit-logs/history');
		const data = await response.json();

		return data;
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}

export async function getHabit(habitId: number): Promise<GetHabitResponse> {
	try {
		const response = await httpClient.get<GetHabitResponse>(
			`habits/${habitId}`
		);

		const data = await response.json();

		return data;
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}

export async function deleteHabit(id: number): Promise<LogHabitResponse> {
	try {
		const response = await httpClient.delete<DeleteHabitResponse>(
			`habits/${id}`
		);

		return await response.json();
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}
