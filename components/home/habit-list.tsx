import { View } from 'react-native';
import { Text } from '../ui';

export function HabitList() {
	return (
		<View className="flex">
			<View className="py-3 px-6">
				<Text variant="title/large">Habits</Text>
			</View>
			<View className="flex flex-row items-center border-t px-6 py-4">
				<View className="flex flex-row items-center justify-between flex-1">
					<Text variant="title/medium">Hydrate</Text>
					<Text variant="title/medium" className="text-neutral-40">
						4/8
					</Text>
				</View>
			</View>
		</View>
	);
}
