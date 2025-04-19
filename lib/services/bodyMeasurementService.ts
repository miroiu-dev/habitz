import { QueryError } from '../errors';
import { httpClient } from '../httpClient';
import type { ApiError } from '../types';
import { formatError } from '../utils';

export type GetBodyMeasurementLogResponse = {
	neck: number;
	leftBiceps: number;
	rightBiceps: number;
	chest: number;
	abs: number;
	leftTigh: number;
	rightTigh: number;
	leftCalf: number;
	rightCalf: number;
	shoulder: number;
	waist: number;
	hip: number;
};

export type GetBodyMeasurementLogsResponse = {
	data: BodyMeasurementLog[];
};

export type BodyMeasurementLog = {
	id: number;
	createdAt: string;
	waistToHipRatio: number;
} & GetBodyMeasurementLogResponse;

export type CreateBodyMeasurementLogResponse = {
	id: number;
};

type CreateBodyMeasurementLogPayload = GetBodyMeasurementLogResponse;

export type DeleteBodyMeasurementLogResponse = {
	id: number;
};

export async function getBodyMeasurementLogs(
	date: string
): Promise<BodyMeasurementLog[]> {
	try {
		const response = await httpClient.get<GetBodyMeasurementLogsResponse>(
			`body-measurement-logs?date=${date}`
		);

		const { data } = await response.json();

		return data;
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}

export async function getBodyMeasurementLog(): Promise<GetBodyMeasurementLogResponse> {
	try {
		const response = await httpClient.get<GetBodyMeasurementLogResponse>(
			'body-measurement-logs/newest'
		);

		const data = await response.json();

		return data;
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}

export async function createBodyMeasurementLog(
	payload: CreateBodyMeasurementLogPayload
): Promise<CreateBodyMeasurementLogResponse | ApiError> {
	try {
		const response =
			await httpClient.post<CreateBodyMeasurementLogResponse>(
				'body-Measurement-logs',
				{
					json: payload
				}
			);

		return await response.json();
	} catch (error) {
		return await formatError(error);
	}
}

export async function deleteBodyMeasurementLog(
	id: number
): Promise<DeleteBodyMeasurementLogResponse> {
	try {
		const response =
			await httpClient.delete<DeleteBodyMeasurementLogResponse>(
				`body-measurement-logs/${id}`
			);

		return await response.json();
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}
