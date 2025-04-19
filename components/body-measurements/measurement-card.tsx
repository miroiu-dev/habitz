import { useBodyMeasurementLog } from '@/lib/queries/useBodyMeasurementLog';
import { useBodyMeasurementStore } from '@/lib/store/bodyMeasurementStore';
import type { Muscle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { memo, useMemo } from 'react';
import { Pressable, type PressableProps, View } from 'react-native';
import { Skeleton, Text } from '../ui';
import { EllipseCorner } from './ellipse-corner';

type Side = 'L' | 'R';

type MeasurementCard = {
	label: string;
	muscle: Muscle;
	unit?: string;
	side?: Side;
	isActive?: boolean;
	onSelectMuscle: (muscle: Muscle) => void;
} & PressableProps;

export const MeasurementCard = memo(
	({
		label,
		unit = 'cm',
		side,
		onSelectMuscle,
		muscle,
		onPress,
		isActive,
		...props
	}: MeasurementCard) => {
		const { isPending } = useBodyMeasurementLog();

		const value = useBodyMeasurementStore(
			state => state[muscle as keyof typeof state] as number
		);

		const displayValue = useMemo(() => value.toFixed(1), [value]);

		return (
			<Pressable
				className={cn(
					'relative flex gap-1 p-2 rounded-lg bg-primary-1 overflow-hidden max-w-20 min-w-20',
					isActive && 'bg-primary-20'
				)}
				onPress={event => {
					onSelectMuscle(muscle);
					onPress?.(event);
				}}
				{...props}
			>
				<Text variant='body/small'>{label}</Text>
				<View className='flex flex-row items-baseline gap-1'>
					{isPending && (
						<Skeleton
							height={16}
							width={32}
							style={{ marginTop: 8 }}
						/>
					)}
					{!isPending && (
						<Text variant='title/base'>{displayValue}</Text>
					)}
					{!isPending && <Text variant='body/small'>{unit}</Text>}
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
