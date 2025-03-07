import { useBodyCompositionStore } from '@/lib/store/body-composition-store';
import type { Muscle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { memo, useCallback } from 'react';
import { Pressable, type PressableProps, View } from 'react-native';
import { Text } from '../ui';
import { EllipseCorner } from './ellipse-corner';

type Side = 'L' | 'R';

type MeasurementCard = {
	label: string;
	muscle: Muscle;
	value: number;
	unit?: string;
	side?: Side;
	isActive?: boolean;
	onSelectMuscle: (muscle: Muscle) => void;
} & PressableProps;

export const MeasurementCard = memo(
	({
		label,
		value,
		unit = 'cm',
		side,
		onSelectMuscle,
		muscle,
		onPress,
		isActive,
		...props
	}: MeasurementCard) => {
		return (
			<Pressable
				className={cn(
					'relative flex gap-1 p-2 pr-6 rounded-lg bg-primary-1 overflow-hidden',
					isActive && 'bg-primary-20'
				)}
				onPress={event => {
					onSelectMuscle(muscle);
					onPress?.(event);
				}}
				{...props}
			>
				<Text variant="body/small">{label}</Text>
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
);
