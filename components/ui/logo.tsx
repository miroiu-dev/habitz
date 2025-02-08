import { View } from 'react-native';
import { Text } from './text';

export function Logo() {
	return (
		<View className="relative">
			<Text variant="custom" className="z-10 font-syne text-[22px]">
				habitz
			</Text>
			<View className="w-[65px] h-6 bg-primary-20 absolute top-0.5 -left-0.5" />
		</View>
	);
}
