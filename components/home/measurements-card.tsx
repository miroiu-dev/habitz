import type { MuscleMeasurement } from '@/lib/services/statisticsService';
import { cn } from '@/lib/utils';
import { Link } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../ui';

type MeasurementProps = {
	muscle: string;
	value: number;
	change: number;
};

function Measurement({ change, muscle, value }: MeasurementProps) {
	const changeDisplay =
		change === 0
			? 'N/A'
			: change > 0
				? `+${change.toFixed(1)}`
				: `${change.toFixed(1)}`;

	return (
		<View className='flex flex-1 flex-row bg-neutral-0 rounded-lg gap-4'>
			<View className='flex p-4'>
				<Text variant='body/small'>{muscle}</Text>
				<View className='flex flex-row items-baseline justify-between w-full'>
					<Text variant='title/base'>{value.toFixed(1)} cm</Text>
					<Text
						variant='body/small'
						className={cn(
							change > 0
								? 'text-positive'
								: change < 0
									? 'text-danger'
									: 'text-neutral-70'
						)}
					>
						{changeDisplay}
					</Text>
				</View>
			</View>
		</View>
	);
}

type MeasurementsCardProps = {
	chest?: MuscleMeasurement;
	shoulder?: MuscleMeasurement;
	leftBiceps?: MuscleMeasurement;
	rightBiceps?: MuscleMeasurement;
};

export function MeasurementsCard({
	chest,
	leftBiceps,
	rightBiceps,
	shoulder
}: MeasurementsCardProps) {
	return (
		<View className='flex flex-1 gap-2 bg-primary-1 p-4 rounded-lg'>
			<Text variant='title/large'>Body Measurements</Text>
			<Text>
				Track your muscle growth over time.{' '}
				<Link href='/(auth)/(body-measurement)/general' asChild>
					<TouchableOpacity>
						<Text className='underline'>Start tracking →</Text>
					</TouchableOpacity>
				</Link>
			</Text>

			<View className='gap-4'>
				<View className='flex flex-row gap-2'>
					<Measurement
						muscle='Chest'
						value={chest?.currentMeasurement ?? 0}
						change={chest?.absoluteChange ?? 0}
					/>
					<Measurement
						muscle='Shoulder'
						value={shoulder?.currentMeasurement ?? 0}
						change={shoulder?.absoluteChange ?? 0}
					/>
				</View>
				<View className='flex flex-row gap-2'>
					<Measurement
						muscle='Left Biceps'
						value={leftBiceps?.currentMeasurement ?? 0}
						change={leftBiceps?.absoluteChange ?? 0}
					/>
					<Measurement
						muscle='Right Biceps'
						value={rightBiceps?.currentMeasurement ?? 0}
						change={rightBiceps?.absoluteChange ?? 0}
					/>
				</View>
			</View>
		</View>
	);
}
