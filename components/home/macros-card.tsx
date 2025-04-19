import { ColorsLight } from '@/constants/Colors';
import { View } from 'react-native';
import { Icon, Text } from '../ui';
import { NutritionChart } from './nutrition-chart';

type MacrosCardProps = {
	protein: number;
	carbs: number;
	fats: number;
	totalMacros: number;
	exerciseCalories: number;
	goalCalories: number;
	bmrCalories: number;
	proteinPercentage: number;
	carbPercentage: number;
	fatPercentage: number;
};

export function MacrosCard({
	bmrCalories,
	carbs,
	exerciseCalories,
	fats,
	goalCalories,
	protein,
	totalMacros,
	proteinPercentage,
	carbPercentage,
	fatPercentage
}: MacrosCardProps) {
	return (
		<View className='flex flex-1 gap-2 bg-primary-1 p-4 rounded-lg'>
			<Text variant='title/large'>Intake</Text>
			<Text>Your intake for the day.</Text>

			<View className='flex flex-row gap-4 justify-center'>
				<View className='flex items-center'>
					<Text variant='title/medium'>Protein</Text>
					<NutritionChart
						radius={48}
						value={protein.toFixed(0)}
						text={`/${totalMacros.toFixed(0)}g`}
						percentage={proteinPercentage}
						color={ColorsLight.blue[30]}
					/>
					<View className='flex items-center'>
						<Text>Goal</Text>
						<View className='flex flex-row items-center gap-1'>
							<Icon type='fire' width={16} height={16} />
							<Text>{goalCalories.toFixed(0)} cal</Text>
						</View>
					</View>
				</View>

				<View className='flex items-center'>
					<Text variant='title/medium'>Fats</Text>
					<NutritionChart
						radius={48}
						value={fats.toFixed(0)}
						text={`/${totalMacros.toFixed(0)}g`}
						percentage={fatPercentage}
						color={ColorsLight.orange}
					/>
					<View className='flex items-center'>
						<Text>BMR</Text>
						<View className='flex flex-row items-center gap-1'>
							<Icon type='bmr' width={16} height={16} />
							<Text>{bmrCalories.toFixed(0)} cal</Text>
						</View>
					</View>
				</View>
				<View className='flex items-center'>
					<Text variant='title/medium'>Carbs</Text>
					<NutritionChart
						radius={48}
						value={carbs.toFixed(0)}
						text={`/${totalMacros.toFixed(0)}g`}
						percentage={carbPercentage}
						color={ColorsLight.green[50]}
					/>
					<View className='flex items-center'>
						<Text>Exercise</Text>
						<View className='flex flex-row items-center gap-1'>
							<Icon type='exercise' width={16} height={16} />
							<Text>{exerciseCalories.toFixed(0)} cal</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
