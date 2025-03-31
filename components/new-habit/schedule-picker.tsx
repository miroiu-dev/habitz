import { HABIT_SCHEDULES } from '@/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { Text } from '../ui';

type SchedulePickerProps = {
	onScheduleChange?: (days: number[]) => void;
};

export function SchedulePicker({ onScheduleChange }: SchedulePickerProps) {
	const [selectedDays, setSelectedDays] = useState<number[]>([]);

	return (
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			bounces={false}
			contentContainerClassName='gap-4'
			overScrollMode='never'
			data={HABIT_SCHEDULES}
			keyExtractor={item => String(item.value)}
			renderItem={({ item }) => (
				<Pressable
					onPress={() => {
						setSelectedDays(prev => {
							const alreadyExists = prev.includes(item.value);

							if (alreadyExists) {
								const newDays = prev.filter(
									day => day !== item.value
								);
								onScheduleChange?.(newDays);

								return newDays;
							}

							const newDays = Array.from(
								new Set([...prev, item.value])
							);
							onScheduleChange?.(newDays);

							return newDays;
						});
					}}
					className={cn(
						'size-12 bg-primary-1 flex justify-center items-center rounded-full',
						selectedDays?.includes(item.value) &&
							'border-2 bg-primary-10'
					)}
				>
					<Text variant='body/medium'>{item.label}</Text>
				</Pressable>
			)}
		/>
	);
}
