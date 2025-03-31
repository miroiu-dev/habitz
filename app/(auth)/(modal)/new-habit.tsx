import { ColorPicker } from '@/components/new-habit/color-picker';
import { FormStep } from '@/components/new-habit/form-step';
import { IconPicker } from '@/components/new-habit/icon-picker';
import { Reminder, type ReminderData } from '@/components/new-habit/reminder';
import { SchedulePicker } from '@/components/new-habit/schedule-picker';
import { Button, Container, Text } from '@/components/ui';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Improve() {
	const [reminder, setReminder] = useState<ReminderData | null>(null);

	return (
		<SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode='never'
			>
				<Container className='flex-1 gap-20'>
					<View className='relative gap-6 mt-5'>
						<View className='absolute -top-10'>
							<FormStep text='01' />
						</View>
						<View className='flex flex-row'>
							<Text variant='title/large'>I want to</Text>
							<TextInput
								value='hike'
								className='text-2xl font-space-grotesk-bold ml-2 border-b-2 flex-1'
							/>
						</View>
					</View>

					<View className='relative gap-6'>
						<View className='absolute -top-10'>
							<FormStep text='02' />
						</View>
						<Text variant='title/large'>Iconography</Text>
						<IconPicker />
					</View>
					<View className='relative gap-6'>
						<View className='absolute -top-10'>
							<FormStep text='03' />
						</View>
						<Text variant='title/large'>Colors</Text>
						<ColorPicker />
					</View>

					<View className='relative gap-6'>
						<View className='absolute -top-10'>
							<FormStep text='04' />
						</View>
						<Text variant='title/large'>Schedule</Text>
						<SchedulePicker />
					</View>

					<View className='relative gap-6'>
						<View className='absolute -top-10'>
							<FormStep text='05' />
						</View>
						<Text variant='title/large'>Reminder</Text>
						<Reminder
							onReminderChange={data => setReminder(data)}
							value={reminder}
						/>
					</View>

					<Button title='Start new habit' className='-mt-8' />
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
}
