import { useStatistics } from '@/lib/queries/useStatistics';
import { Dimensions, View } from 'react-native';
import { Carousel, GlobalError, Skeleton } from '../ui';
import { MacrosCard } from './macros-card';
import { MeasurementsCard } from './measurements-card';

const { width } = Dimensions.get('window');

export function Statistics() {
	const { data, isPending, error, isError, refetch } = useStatistics();

	if (isError && error) {
		return <GlobalError error={error} refetch={refetch} />;
	}

	if (!data && isPending) {
		return (
			<View className='flex'>
				<Skeleton width={width - 48} height={288} />
				<View className='flex flex-row mt-4 gap-2 justify-center'>
					<Skeleton width={24} height={8} />
					<Skeleton width={8} height={8} />
				</View>
			</View>
		);
	}

	return (
		data && (
			<Carousel swipeTreshold={50}>
				<MacrosCard
					bmrCalories={data.calorieBreakdown.bmr}
					carbs={data.macroNutrientTargets.carbGrams}
					exerciseCalories={data.calorieBreakdown.activityCalories}
					fats={data.macroNutrientTargets.fatGrams}
					protein={data.macroNutrientTargets.proteinGrams}
					goalCalories={data.calorieBreakdown.goalCalories}
					totalMacros={data.macroNutrientTargets.totalGrams}
					carbPercentage={data.macroNutrientTargets.carbPercentage}
					fatPercentage={data.macroNutrientTargets.fatPercentage}
					proteinPercentage={
						data.macroNutrientTargets.proteinPercentage
					}
				/>
				<MeasurementsCard
					chest={data.muscleProgress.chest}
					shoulder={data.muscleProgress.shoulder}
					leftBiceps={data.muscleProgress.leftBiceps}
					rightBiceps={data.muscleProgress.rightBiceps}
				/>
			</Carousel>
		)
	);
}
