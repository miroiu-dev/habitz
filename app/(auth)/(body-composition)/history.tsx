import { HistoryCard } from '@/components/body-composition/history-card';
import { Container } from '@/components/ui';
import { Calendar } from '@/components/ui/calendar';
import {
	type CalendarActiveDateRange,
	type CalendarOnDayPress,
	fromDateId,
	toDateId
} from '@marceloterreiro/flash-calendar';
import { DateTime } from 'luxon';
import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function History() {
	const [currentCalendarMonth, setCurrentCalendarMonth] = useState<Date>(
		DateTime.now().toJSDate()
	);
	const [selectedDate, setSelectedDate] = useState<Date>(
		DateTime.now().toJSDate()
	);

	const handleDayPress = useCallback<CalendarOnDayPress>(dateId => {
		setCurrentCalendarMonth(fromDateId(dateId));
		setSelectedDate(fromDateId(dateId));
	}, []);

	const calendarActiveDateRanges = useMemo<CalendarActiveDateRange[]>(
		() => [
			{
				startId: toDateId(selectedDate),
				endId: toDateId(selectedDate)
			}
		],
		[selectedDate]
	);

	const handlePreviousMonth = useCallback(() => {
		setCurrentCalendarMonth(
			DateTime.fromJSDate(currentCalendarMonth)
				.minus({ months: 1 })
				.toJSDate()
		);
	}, [currentCalendarMonth]);

	const handleNextMonth = useCallback(() => {
		setCurrentCalendarMonth(
			DateTime.fromJSDate(currentCalendarMonth)
				.plus({ months: 1 })
				.toJSDate()
		);
	}, [currentCalendarMonth]);

	return (
		<SafeAreaView edges={['bottom']}>
			<ScrollView
				bounces={false}
				overScrollMode='never'
				showsVerticalScrollIndicator={false}
			>
				<Container>
					<Calendar
						calendarActiveDateRanges={calendarActiveDateRanges}
						onNextMonthPress={handleNextMonth}
						onPreviousMonthPress={handlePreviousMonth}
						calendarMonthId={toDateId(currentCalendarMonth)}
						calendarColorScheme='light'
						onCalendarDayPress={handleDayPress}
						calendarRowVerticalSpacing={4}
					/>

					<View className='gap-4'>
						<HistoryCard
							date={new Date()}
							data={[
								{ id: 1, label: 'Neck', value: 1.1 },
								{ id: 2, label: 'L Biceps', value: 1.2 },
								{ id: 4, label: 'L Biceps', value: 1.2 },
								{ id: 5, label: 'L Biceps', value: 1.2 },
								{ id: 6, label: 'L Biceps', value: 1.2 },
								{ id: 7, label: 'L Biceps', value: 1.2 },
								{ id: 8, label: 'L Biceps', value: 1.2 }
							]}
						/>
						<HistoryCard
							date={new Date()}
							data={[
								{ id: 1, label: 'Neck', value: 1.1 },
								{ id: 2, label: 'L Biceps', value: 1.2 },
								{ id: 4, label: 'L Biceps', value: 1.2 },
								{ id: 5, label: 'L Biceps', value: 1.2 },
								{ id: 6, label: 'L Biceps', value: 1.2 },
								{ id: 7, label: 'L Biceps', value: 1.2 },
								{ id: 8, label: 'L Biceps', value: 1.2 }
							]}
						/>
						<HistoryCard
							date={new Date()}
							data={[
								{ id: 1, label: 'Neck', value: 1.1 },
								{ id: 2, label: 'L Biceps', value: 1.2 },
								{ id: 4, label: 'L Biceps', value: 1.2 },
								{ id: 5, label: 'L Biceps', value: 1.2 },
								{ id: 6, label: 'L Biceps', value: 1.2 },
								{ id: 7, label: 'L Biceps', value: 1.2 },
								{ id: 8, label: 'L Biceps', value: 1.2 }
							]}
						/>
					</View>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
}
