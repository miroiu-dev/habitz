import { CircleBottom, CircleTop } from '@/components/habit';
import { Calendar, Container, Icon, IconButton, Text } from '@/components/ui';
import { ColorsLight } from '@/constants/Colors';
import { toast } from '@/lib/toast';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
	SafeAreaView,
	useSafeAreaInsets
} from 'react-native-safe-area-context';

export default function Habit() {
	const { top } = useSafeAreaInsets();
	const { back } = useRouter();

	return (
		<SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
			<View className='h-60 bg-orange overflow-hidden border-b-2'>
				<Container className='relative' style={{ marginTop: top }}>
					<View className='absolute -top-60 left-16'>
						<CircleTop />
					</View>
					<View className='flex flex-row items-center justify-between'>
						<IconButton type='back' onPress={() => back()} />
						<TouchableOpacity
							onPress={() =>
								toast.danger({
									title: 'Are you sure?',
									actionText: 'Yes',
									action: () => console.log('test'),
									position: 'bottom',
									autoHide: false,
									bottomOffset: 65,
									swipable: true
								})
							}
						>
							<Text>Delete</Text>
						</TouchableOpacity>
					</View>
					<View className='absolute -right-10 top-20'>
						<CircleBottom />
					</View>

					<View className='flex flex-row gap-4 mt-8'>
						<View className='size-12 justify-center items-center bg-yellow rounded-lg'>
							<Icon type='cup' />
						</View>
						<View className='gap-2'>
							<Text variant='title/xlarge'>Hydrate</Text>
							<Text>Everyday</Text>
						</View>
					</View>
				</Container>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode='never'
				bounces={false}
			>
				<View className='flex flex-row items-center p-6 gap-6 border-b-2'>
					<Icon type='arrow-up' />
					<Text variant='title/medium'>Trending up</Text>
				</View>
				<View className='flex flex-row border-b-2'>
					<View className='p-6 gap-6 items-start flex-row w-1/2 border-r-2'>
						<Icon type='fire' />
						<View className='gap-2'>
							<Text variant='title/medium'>Streak</Text>
							<Text variant='body/large'>12 days</Text>
						</View>
					</View>
					<View className='p-6 gap-6 items-start flex-row w-1/2'>
						<Icon type='award' />
						<View className='gap-2'>
							<Text variant='title/medium'>Record</Text>
							<Text variant='body/large'>24 days</Text>
						</View>
					</View>
				</View>
				<Calendar
					markedDates={{
						'2025-03-16': {
							selected: true,
							disableTouchEvent: true
						},
						'2025-03-17': {
							selected: true,
							disableTouchEvent: true
						}
					}}
					theme={{
						textInactiveColor: ColorsLight.neutral[70],
						monthTextColor: ColorsLight.neutral[70],
						arrowColor: ColorsLight.neutral[70],
						calendarBackground: ColorsLight.neutral[0],
						textSectionTitleColor: ColorsLight.neutral[40],
						selectedDayBackgroundColor: ColorsLight.neutral[70],
						selectedDayTextColor: ColorsLight.neutral[0],
						todayTextColor: ColorsLight.neutral[70],
						dayTextColor: ColorsLight.neutral[70],
						textDisabledColor: ColorsLight.neutral[70],
						textDayFontFamily: 'DMSans_Regular',
						textMonthFontFamily: 'DMSans_Regular',
						textDayHeaderFontFamily: 'DMSans_Regular',
						todayButtonFontFamily: 'DMSans_Regular'
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}
