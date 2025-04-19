import { CircleBottom, CircleTop } from '@/components/habit';
import {
	Calendar,
	Container,
	GlobalError,
	Icon,
	IconButton,
	Skeleton,
	Text
} from '@/components/ui';
import { ColorsLight } from '@/constants/Colors';
import type { QueryError } from '@/lib/errors';
import { cancelNotification, getIdentifier } from '@/lib/notifications';
import { useHabit } from '@/lib/queries';
import {
	type LogHabitResponse,
	deleteHabit
} from '@/lib/services/habitService';
import { getDaysOfWeek, getMarkedDates } from '@/lib/time';
import { toast } from '@/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
	SafeAreaView,
	useSafeAreaInsets
} from 'react-native-safe-area-context';

export default function Habit() {
	const { id } = useLocalSearchParams();
	const { top } = useSafeAreaInsets();
	const router = useRouter();

	const { isPending, data, error, isError, refetch } = useHabit(Number(id));
	const queryClient = useQueryClient();
	const { mutateAsync } = useMutation<
		LogHabitResponse,
		QueryError,
		{ id: number }
	>({
		mutationFn: ({ id }) => deleteHabit(id),
		onError: (err, variables, context) => {
			toast.danger({
				title: err.title,
				description: err.description
			});
		},
		onSettled: async () => {
			if (!data) return;

			await Promise.all(
				data.scheduleDays.map(dayOfWeek =>
					cancelNotification(getIdentifier(data.name, dayOfWeek))
				)
			);

			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['habit-logs'] }),
				queryClient.invalidateQueries({
					queryKey: ['habit-logs/history']
				})
			]);

			toast.success({
				title: 'The habit was deleted successfully.'
			});

			router.replace('/(auth)/(tabs)');
		}
	});

	return (
		<SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
			{!isError && (
				<>
					<View className='h-60 bg-orange overflow-hidden border-b-2'>
						<Container
							className='relative'
							style={{ marginTop: top }}
						>
							<View className='absolute -top-60 left-16'>
								<CircleTop />
							</View>
							<View className='flex flex-row items-center justify-between'>
								<IconButton
									type='back'
									onPress={() => router.back()}
								/>
								<TouchableOpacity
									disabled={isPending}
									onPress={() =>
										toast.danger({
											title: 'Are you sure?',
											actionText: 'Yes',
											action: () =>
												mutateAsync({ id: Number(id) }),
											position: 'bottom',
											autoHide: true,
											visibilityTime: 6000,
											swipable: true,
											bottomOffset: 65
										})
									}
								>
									<Text>Delete</Text>
								</TouchableOpacity>
							</View>
							<View className='absolute -right-10 top-20'>
								<CircleBottom />
							</View>

							{data && (
								<View className='flex flex-row gap-4 mt-8'>
									<View className='size-12 justify-center items-center bg-yellow rounded-lg'>
										<Icon type={data.icon} />
									</View>
									<View className='gap-2'>
										<Text variant='title/xlarge'>
											{data.name}
										</Text>
										<Text>
											{getDaysOfWeek(data.scheduleDays)}
										</Text>
									</View>
								</View>
							)}
							{isPending && (
								<View className='flex flex-row gap-4 mt-8'>
									<Skeleton
										height={48}
										width={48}
										borderRadius={8}
									/>
									<View className='gap-2'>
										<Skeleton
											height={32}
											width={120}
											borderRadius={8}
										/>
										<Skeleton
											height={16}
											width={80}
											borderRadius={8}
										/>
									</View>
								</View>
							)}
						</Container>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						overScrollMode='never'
						bounces={false}
					>
						{data && (
							<View className='flex flex-row items-center p-6 gap-6 border-b-2'>
								<Icon
									width={24}
									height={24}
									type={
										data.trend === 'Steady'
											? 'minus'
											: 'arrow-up'
									}
									style={{
										transform: [
											{
												rotate:
													data.trend ===
													'Trending down'
														? '90deg'
														: '0deg'
											}
										]
									}}
								/>
								<Text variant='title/medium'>{data.trend}</Text>
							</View>
						)}
						{isPending && (
							<View className='flex flex-row items-center p-6 gap-6 border-b-2'>
								<Skeleton
									height={24}
									width={24}
									borderRadius={8}
								/>

								<Skeleton
									height={18}
									width={120}
									borderRadius={8}
								/>
							</View>
						)}
						<View className='flex flex-row border-b-2'>
							<View className='p-6 gap-6 items-start flex-row w-1/2 border-r-2'>
								<Icon type='fire' />
								<View className='gap-2'>
									<Text variant='title/medium'>Streak</Text>
									{data && (
										<Text variant='body/large'>
											{data.currentStreak} days
										</Text>
									)}
									{isPending && (
										<Skeleton
											height={20}
											width={80}
											borderRadius={8}
										/>
									)}
								</View>
							</View>

							<View className='p-6 gap-6 items-start flex-row w-1/2'>
								<Icon type='award' />
								<View className='gap-2'>
									<Text variant='title/medium'>Record</Text>
									{data && (
										<Text variant='body/large'>
											{data.recordStreak} days
										</Text>
									)}
									{isPending && (
										<Skeleton
											height={20}
											width={80}
											borderRadius={8}
										/>
									)}
								</View>
							</View>
						</View>
						<Calendar
							disabledByDefault={isPending}
							disableArrowRight={isPending}
							disableArrowLeft={isPending}
							disableMonthChange={isPending}
							markedDates={getMarkedDates(data?.logs ?? [])}
							theme={{
								textInactiveColor: ColorsLight.neutral[70],
								monthTextColor: ColorsLight.neutral[70],
								arrowColor: ColorsLight.neutral[70],
								calendarBackground: ColorsLight.neutral[0],
								textSectionTitleColor: ColorsLight.neutral[40],
								selectedDayBackgroundColor:
									ColorsLight.neutral[70],
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
				</>
			)}
			{isError && error && (
				<GlobalError error={error} refetch={refetch} />
			)}
		</SafeAreaView>
	);
}
