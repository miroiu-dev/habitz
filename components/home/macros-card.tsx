import { ColorsLight } from '@/constants/Colors';
import { View } from 'react-native';
import { DonoutChart, Text } from '../ui';

export function MacrosCard() {
	return (
		<View className="flex flex-1 gap-2 bg-primary-1 p-4 rounded-lg">
			<Text variant="title/large">Macros</Text>
			<Text>Your macronutrients intake for the day.</Text>

			<View className="flex flex-row gap-4 justify-center">
				<View className="flex items-center">
					<Text variant="title/medium">Protein</Text>
					<DonoutChart
						radius={48}
						value="526"
						text="/130g"
						percentage={40}
						color={ColorsLight.blue[30]}
					/>
					<Text>90g left</Text>
				</View>
				<View className="flex items-center">
					<Text variant="title/medium">Fats</Text>
					<DonoutChart
						radius={48}
						value="526"
						text="/130g"
						percentage={30}
						color={ColorsLight.orange}
					/>
					<Text>90g left</Text>
				</View>
				<View className="flex items-center">
					<Text variant="title/medium">Carbs</Text>
					<DonoutChart
						radius={48}
						value="526"
						text="/130g"
						percentage={30}
						color={ColorsLight.green[50]}
					/>
					<Text>90g left</Text>
				</View>
			</View>
		</View>
	);
}
