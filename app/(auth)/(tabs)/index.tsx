import { HabitList, HomeHeader } from '@/components/home';
import { Statistics } from '@/components/home/statistics';
import { Container, Text } from '@/components/ui';
import { getTimeOfDay } from '@/lib/time';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
	const timeOfDay = getTimeOfDay();

	return (
		<SafeAreaView>
			<ScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode='never'
			>
				<Container>
					<HomeHeader />
					<Text variant='title/xlarge' className='mb-8'>
						Good {timeOfDay}
					</Text>
					<Statistics />
				</Container>
				<HabitList />
			</ScrollView>
		</SafeAreaView>
	);
}
