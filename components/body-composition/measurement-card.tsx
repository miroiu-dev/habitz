import { Pressable, type PressableProps, View } from 'react-native';
import { Text } from '../ui';
import { EllipseCorner } from './ellipse-corner';

type Side = 'L' | 'R';

type MeasurementCard = {
	muscle: string;
	value: number;
	unit?: string;
	side?: Side;
} & PressableProps;

export function MeasurementCard({
	muscle,
	value,
	unit = 'cm',
	side,
	...props
}: MeasurementCard) {
	return (
		<Pressable
			className="relative flex gap-1 p-2 pr-6 rounded-lg bg-primary-1 overflow-hidden"
			{...props}
		>
			<Text variant="body/small">{muscle}</Text>
			<View className="flex flex-row items-baseline gap-1">
				<Text variant="title/base">{value}</Text>
				<Text variant="body/small">{unit}</Text>
			</View>

			{side && (
				<EllipseCorner
					style={{ position: 'absolute', top: -8, right: -10 }}
					side={side}
				/>
			)}
		</Pressable>
	);
}
