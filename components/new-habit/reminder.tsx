import { formatReminder } from '@/lib/utils';
import type { BottomSheetModal as RNBottomSheetModal } from '@gorhom/bottom-sheet';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimerPicker } from 'react-native-timer-picker';
import { ActionPresentationCard, IconButton } from '../ui';
import { BottomSheetModal, Button, Container, Text } from '../ui';

export type ReminderData = {
	hours: number;
	minutes: number;
	seconds: number;
};

type ReminderProps = {
	onReminderChange?: (reminder: ReminderData | null) => void;
	value: ReminderData | null;
};

export function Reminder({ value, onReminderChange }: ReminderProps) {
	const [selectedHour, setSelectedHour] = useState<ReminderData>({
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	const ref = useRef<RNBottomSheetModal>(null);

	const content = useMemo(
		() =>
			value !== null ? (
				<View className='flex flex-row px-2 rounded-lg items-center border-2 bg-neutral-0 gap-2'>
					<Text>{formatReminder(value)}</Text>
					<IconButton
						type='cross'
						width={16}
						height={16}
						onPress={() => {
							onReminderChange?.(null);
							setSelectedHour({
								hours: 0,
								minutes: 0,
								seconds: 0
							});
						}}
					/>
				</View>
			) : null,
		[value, onReminderChange]
	);

	return (
		<>
			<ActionPresentationCard
				disabled={value !== null}
				onPress={() => ref.current?.present()}
				icon='bell'
				illustration='phone-notification-sm'
				title='Add'
				content={content}
			/>

			<BottomSheetModal ref={ref}>
				<SafeAreaView edges={['bottom']}>
					<Container className='gap-6'>
						<Text variant='title/large' className='text-center'>
							Choose{' '}
							<Text
								variant='title/large'
								className='text-primary-30'
							>
								hour
							</Text>
						</Text>
						<View className='justify-center items-center'>
							<TimerPicker
								initialValue={selectedHour}
								onDurationChange={duration =>
									setSelectedHour(duration)
								}
								padWithNItems={1}
								hourLabel=':'
								minuteLabel=''
								padHoursWithZero
								hideSeconds
								LinearGradient={LinearGradient}
								Haptics={Haptics}
								styles={{
									theme: 'light',
									backgroundColor: '#fff',
									pickerItem: {
										fontSize: 32,
										fontFamily: 'DMSans_Regular',
										fontVariant: ['tabular-nums']
									},
									pickerLabel: {
										fontSize: 30
									},
									pickerContainer: {
										marginRight: 6
									},
									pickerLabelContainer: {
										right: -20,
										top: 0,
										bottom: 6,
										width: 40,
										alignItems: 'center'
									}
								}}
							/>
						</View>
						<Button
							title='Confirm'
							onPress={() => {
								onReminderChange?.(selectedHour);
								ref.current?.dismiss();
							}}
						/>
					</Container>
				</SafeAreaView>
			</BottomSheetModal>
		</>
	);
}
