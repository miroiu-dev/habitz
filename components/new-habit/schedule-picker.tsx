import { HABIT_SCHEDULES } from '@/constants';
import { cn } from '@/lib/utils';
import {
	Controller,
	type FieldValues,
	type UseControllerProps
} from 'react-hook-form';
import { FlatList, Pressable, View } from 'react-native';
import { FormError, Text } from '../ui';

type SchedulePickerProps<TFieldValues extends FieldValues = FieldValues> =
	UseControllerProps<TFieldValues>;

export function SchedulePicker<TFieldValues extends FieldValues = FieldValues>({
	control,
	name
}: SchedulePickerProps<TFieldValues>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onBlur, onChange, value, disabled },
				fieldState: { error, invalid }
			}) => (
				<View className='gap-1'>
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
								disabled={disabled}
								onBlur={onBlur}
								onPress={() => {
									const alreadyExists = value.includes(
										item.value
									);

									if (alreadyExists) {
										const newDays = value.filter(
											(day: number) => day !== item.value
										);

										return onChange(newDays);
									}

									const newDays = Array.from(
										new Set([...value, item.value])
									);

									onChange?.(newDays);
								}}
								className={cn(
									'size-12 bg-primary-1 flex justify-center items-center rounded-full',
									value?.includes(item.value) &&
										'border-2 bg-primary-10'
								)}
							>
								<Text variant='body/medium'>{item.label}</Text>
							</Pressable>
						)}
					/>
					{invalid && <FormError error={error?.message} />}
				</View>
			)}
		/>
	);
}
