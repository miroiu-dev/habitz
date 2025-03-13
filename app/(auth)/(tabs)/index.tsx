import {
	CaloriesCard,
	HabitList,
	HomeHeader,
	MacrosCard
} from '@/components/home';
import { Carousel, Container, Text } from '@/components/ui';
import { getTimeOfDay } from '@/lib/time';
import { Link } from 'expo-router';
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
					<Link href='/(auth)/(body-composition)'>asd</Link>
					<Carousel swipeTreshold={50}>
						<CaloriesCard />
						<MacrosCard />
					</Carousel>
				</Container>
				<HabitList />
			</ScrollView>
		</SafeAreaView>
	);
}
