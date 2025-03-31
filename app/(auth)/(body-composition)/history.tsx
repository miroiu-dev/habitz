import { HistoryCard } from '@/components/body-composition/history-card';
import { Calendar, Container } from '@/components/ui';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function History() {
	const [selectedDate, setSelectedDate] = useState<string>(
		new Date().toString()
	);
	const date = useMemo(() => new Date(), []);
	const data = useMemo(
		() => [
			{ id: 1, label: 'Neck', value: 1.1 },
			{ id: 2, label: 'L Biceps', value: 1.2 },
			{ id: 4, label: 'L Biceps', value: 1.2 },
			{ id: 5, label: 'L Biceps', value: 1.2 },
			{ id: 6, label: 'L Biceps', value: 1.2 },
			{ id: 7, label: 'L Biceps', value: 1.2 },
			{ id: 8, label: 'L Biceps', value: 1.2 }
		],
		[]
	);

	return (
		<SafeAreaView edges={['bottom']}>
			<ScrollView
				bounces={false}
				overScrollMode='never'
				showsVerticalScrollIndicator={false}
			>
				<Container>
					<Calendar
						style={{ marginBottom: 16 }}
						markedDates={{
							[selectedDate]: {
								selected: true,
								disableTouchEvent: true
							}
						}}
						onDayPress={date => setSelectedDate(date.dateString)}
					/>
					<View className='gap-4'>
						<HistoryCard date={date} data={data} />
						<HistoryCard date={date} data={data} />
						<HistoryCard date={date} data={data} />
					</View>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
}
