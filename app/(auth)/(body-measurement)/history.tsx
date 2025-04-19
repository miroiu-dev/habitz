import { HistoryCard } from '@/components/body-measurements/history-card';
import {
	Calendar,
	Container,
	EmptyList,
	GlobalError,
	Skeleton
} from '@/components/ui';
import { useBodyMeasurementLogs } from '@/lib/queries/useBodyMeasurementLogs';
import { getMarketDateLogs } from '@/lib/time';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function History() {
	const [selectedDate, setSelectedDate] = useState<string>(
		DateTime.now().toFormat('yyyy-MM-dd')
	);

	const { data, error, isError, isPending, refetch, isEmpty } =
		useBodyMeasurementLogs(selectedDate);

	const availableDates =
		data?.map(x => DateTime.fromISO(x.createdAt).toFormat('yyyy-MM-dd')) ??
		[];

	return (
		<SafeAreaView edges={['bottom']}>
			{isError && error && (
				<GlobalError error={error} refetch={refetch} />
			)}
			{!isError && (
				<ScrollView
					bounces={false}
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
				>
					<Container>
						<Calendar
							style={{ marginBottom: 16 }}
							markedDates={{
								...getMarketDateLogs(availableDates),
								[selectedDate]: {
									selected: true,
									disableTouchEvent: true
								}
							}}
							onDayPress={date =>
								setSelectedDate(date.dateString)
							}
							disabledByDefault={isPending}
							disableArrowRight={isPending}
							disableArrowLeft={isPending}
							disableMonthChange={isPending}
						/>
						{isEmpty && (
							<EmptyList
								title='No history found'
								description='Please add your body measurements to see the history.'
								className='mx-0'
							/>
						)}
						{isPending && (
							<View className='gap-4'>
								<Skeleton width={width - 48} height={136} />
								<Skeleton width={width - 48} height={136} />
							</View>
						)}
						{!isPending && data && (
							<View className='gap-4'>
								{data.map(x => (
									<HistoryCard
										key={x.id}
										data={x}
										selectedDate={selectedDate}
									/>
								))}
							</View>
						)}
					</Container>
				</ScrollView>
			)}
		</SafeAreaView>
	);
}
