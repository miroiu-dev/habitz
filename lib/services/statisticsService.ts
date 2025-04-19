import { QueryError } from '../errors';
import { httpClient } from '../httpClient';
import { formatError } from '../utils';

export type MuscleMeasurement = {
	absoluteChange: number;
	currentDate: string;
	currentMeasurement: number;
	initialDate: string;
	initialMeasurement: number;
	percentageChange: number;
};

export type GetStatisticsResponse = {
	calorieBreakdown: {
		bmr: number;
		activityCalories: number;
		goalCalories: number;
	};
	macroNutrientTargets: {
		carbGrams: number;
		fatGrams: number;
		proteinGrams: number;
		totalCalories: number;
		totalGrams: number;
		proteinPercentage: number;
		carbPercentage: number;
		fatPercentage: number;
	};
	muscleProgress: {
		chest: MuscleMeasurement;
		shoulder: MuscleMeasurement;
		leftBiceps: MuscleMeasurement;
		rightBiceps: MuscleMeasurement;
	};
};

export async function getStatistics(): Promise<GetStatisticsResponse> {
	try {
		const response =
			await httpClient.get<GetStatisticsResponse>('statistics');

		const data = await response.json();

		return data;
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}
