import {
	CaloriesCard,
	HabitList,
	HomeHeader,
	MacrosCard,
} from '@/components/home';
import { Container, Text } from '@/components/ui';
import { Carousel } from '@/components/ui/carousel';
import { getTimeOfDay } from '@/lib/time';
import { ScrollView } from 'react-native';

export default function Home() {
	const timeOfDay = getTimeOfDay();

	return (
		<>
			<ScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode="never"
			>
				<Container>
					<HomeHeader />
					<Text variant="title/xlarge" className="mb-8">
						Good {timeOfDay}
					</Text>
					<Carousel>
						<CaloriesCard />
						<MacrosCard />
						<CaloriesCard />
						<MacrosCard />
					</Carousel>
				</Container>
				<HabitList />
			</ScrollView>
		</>
	);
}
