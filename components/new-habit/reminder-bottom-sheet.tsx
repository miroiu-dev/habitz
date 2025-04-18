import type { Duration } from '@/lib/types';
import type {
	BottomSheetProps,
	BottomSheetModal as RNBottomSheetModal
} from '@gorhom/bottom-sheet';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { forwardRef, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimerPicker } from 'react-native-timer-picker';
import { BottomSheetModal, Button, Container, Text } from '../ui';

type ReminderBottomSheet = {
	initialValue: Duration;
	onConfirm: (duration: Duration) => void;
} & Omit<BottomSheetProps, 'children'>;

export const ReminderBottomSheet = forwardRef<
	RNBottomSheetModal,
	ReminderBottomSheet
>(({ initialValue, onConfirm, ...props }, ref) => {
	const [duration, setSelectedDuration] = useState<Duration>(
		initialValue ?? {
			hours: 0,
			minutes: 0,
			seconds: 0
		}
	);

	return (
		<BottomSheetModal ref={ref} {...props}>
			<SafeAreaView edges={['bottom']}>
				<Container className='gap-6'>
					<Text variant='title/large' className='text-center'>
						Choose{' '}
						<Text variant='title/large' className='text-primary-30'>
							hour
						</Text>
					</Text>
					<View className='justify-center items-center'>
						<TimerPicker
							initialValue={duration}
							onDurationChange={duration =>
								setSelectedDuration(duration)
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
							onConfirm(duration);

							if (ref && 'current' in ref && ref.current) {
								ref.current.dismiss();
							}
						}}
					/>
				</Container>
			</SafeAreaView>
		</BottomSheetModal>
	);
});
