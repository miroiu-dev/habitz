import { View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { Text } from '../text';
import { AnimatedText } from './animated-text';

type MeasurementProps = {
	scrollX: SharedValue<number>;
	minValue: number;
};

export function Measurement({ minValue, scrollX }: MeasurementProps) {
	return (
		<View className="flex flex-row gap-1 items-baseline justify-center mb-2">
			<AnimatedText displayText={scrollX} defaultValue={minValue} />
			<Text
				variant="body/small"
				style={{ fontVariant: ['tabular-nums'] }}
			>
				cm
			</Text>
		</View>
	);
}
