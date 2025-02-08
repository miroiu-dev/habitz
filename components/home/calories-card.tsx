import { View } from 'react-native';
import { DonoutChart, Icon, Text } from '../ui';

export function CaloriesCard() {
	return (
		<View className="flex flex-1 bg-primary-1 gap-2 p-4 rounded-lg">
			<View className="gap-1">
				<Text variant="title/large">Calories</Text>
				<Text>Remaining = goal - food + exercise.</Text>
			</View>
			<View className="flex flex-row justify-between items-center flex-1">
				<DonoutChart
					value="526"
					text="Remaining"
					radius={70}
					percentage={30}
					textFontSize={18}
					valueFontSize={20}
				/>
				<View className="flex gap-2">
					<View className="flex flex-row gap-1 items-center">
						<Icon type="fire" />
						<View className="flex">
							<Text variant="body/small">Base goal</Text>
							<Text variant="body/small">2,100</Text>
						</View>
					</View>
					<View className="flex flex-row gap-1 items-center">
						<Icon type="fire" />
						<View className="flex">
							<Text variant="body/small">Base goal</Text>
							<Text variant="body/small">2,100</Text>
						</View>
					</View>
					<View className="flex flex-row gap-1 items-center">
						<Icon type="fire" />
						<View className="flex">
							<Text variant="body/small">Base goal</Text>
							<Text variant="body/small">2,100</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
