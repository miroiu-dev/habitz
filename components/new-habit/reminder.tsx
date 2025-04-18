import { formatReminder } from '@/lib/utils';
import type { BottomSheetModal as RNBottomSheetModal } from '@gorhom/bottom-sheet';

import type { Duration } from '@/lib/types';
import { useRef } from 'react';
import {
	Controller,
	type FieldValues,
	type UseControllerProps
} from 'react-hook-form';
import { View } from 'react-native';
import { ActionPresentationCard, FormError, IconButton, Text } from '../ui';
import { ReminderBottomSheet } from './reminder-bottom-sheet';

type ReminderProps<TFieldValues extends FieldValues = FieldValues> =
	UseControllerProps<TFieldValues>;

export function Reminder<TFieldValues extends FieldValues = FieldValues>({
	control,
	name
}: ReminderProps<TFieldValues>) {
	const ref = useRef<RNBottomSheetModal>(null);

	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onBlur, onChange, value },
				fieldState: { invalid, error }
			}) => {
				return (
					<View className='gap-1'>
						<ActionPresentationCard
							disabled={value !== null}
							onPress={() => ref.current?.present()}
							icon='bell'
							illustration='phone-notification-sm'
							title='Add'
							onBlur={onBlur}
							content={
								value !== null ? (
									<View className='flex flex-row px-2 rounded-lg items-center border-2 bg-neutral-0 gap-2'>
										<Text>{formatReminder(value)}</Text>
										<IconButton
											type='cross'
											width={16}
											height={16}
											onPress={() => {
												onChange(null);
											}}
										/>
									</View>
								) : null
							}
						/>
						<ReminderBottomSheet
							ref={ref}
							initialValue={value}
							onConfirm={(duration: Duration) =>
								onChange(duration)
							}
						/>
						{invalid && <FormError error={error?.message} />}
					</View>
				);
			}}
		/>
	);
}
